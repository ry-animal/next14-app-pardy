'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'

export const createEvent = async () => {
    const user = await getCurrentUser()

    await db.insert(events).values({
        startOn: new Date().toUTCString(),
        createdById: user.id,
        isPrivate: false,
        name: randomName('event', ' '),
    })

    revalidateTag('dashboard:events')
    revalidateTag('allevents')

    return { message: 'Event created' }
};