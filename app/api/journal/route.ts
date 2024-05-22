import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      content: 'your content goes here',
      userId: user.id,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
