
import 'server-only'
import { db } from '@/db/db'
import { asc, eq } from 'drizzle-orm'
import { events } from '@/db/schema'
import { delay } from './delay'
import { memoize } from 'nextjs-better-unstable-cache'

export const getEvents = memoize(async (userId: string) => {
  await delay()

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