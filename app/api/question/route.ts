import { qa } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { question } = await request.json()
  const user = await getUserFromClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
  })

  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}
