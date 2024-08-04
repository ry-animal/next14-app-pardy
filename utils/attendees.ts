import 'server-only'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'

export const getAttendees = memoize(async (userId: string) => {

  const counts = await db.select({
    totalAttendees: sql<number>`count(distinct ${attendees.id})`,
  }).from(events)
  .leftJoin(rsvps, eq(rsvps.eventId, events.id))
  .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
  .where(eq(events.createdById, userId))
  .groupBy(events.id)
  .execute()

  const total = counts.reduce((acc, cur) => acc + cur.totalAttendees, 0)
  return total
}, {
    persist: true,
    revalidateTags: (userId) => [userId, 'dashboard:attendees'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:attendees',
})

export const getGuestList = memoize(
  async (userId: string) => {
    const uniqueAttendees = await db
      .selectDistinct({
        id: attendees.id,
        name: attendees.name,
        email: attendees.email,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .execute()

    return uniqueAttendees
  },
  {
    persist: true,
    revalidateTags: () => ['guests'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'guests',
  }
)