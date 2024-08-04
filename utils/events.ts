
import 'server-only'
import { db } from '@/db/db'
import { and, asc, eq } from 'drizzle-orm'
import { events } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'

export const getEvents = memoize(async (userId: string) => {

  const data = await db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: {
        id: true,
        name: true,
        startOn: true,
        status: true,
    },
    with: { 
        rsvps: true,
    },
    limit: 5,
    orderBy: [asc(events.startOn)],
  })

  return data ?? []
}, {
  persist: true,
  revalidateTags: (userId) => [userId, 'dashboard:events'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'dashboard:events',
})

export const getAllEvents = memoize(async (userId: string) => {

  const data = await db.query.events.findMany({
    where: eq(events.createdById, userId),
    orderBy: [asc(events.startOn)],
  })

  return data ?? []
}, {
  persist: true,
  revalidateTags: () => ['allevents'],
  suppressWarnings: true,
  log: ['datacache', 'verbose', 'dedupe'],
  logid: 'allevents',
})

export const getEvent = memoize(async (userId: string, eventId: string) => {
  return db.query.events.findFirst({
      where: and(eq(events.createdById, userId), eq(events.id, eventId)),
    })
  },
  {
    persist: true,
    revalidateTags: (eventId) => ['event', eventId],
    suppressWarnings: true,
    logid: 'event',
  }
)