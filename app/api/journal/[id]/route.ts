import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json()
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: content,
    },
  })

  return NextResponse.json({ data: entry })
}
