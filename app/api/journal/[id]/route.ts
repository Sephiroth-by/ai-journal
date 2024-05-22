import { analyzeEntry } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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

  const analysis = await analyzeEntry(content)

  const analysisEntry = await prisma.analysis.update({
    where: {
      entryId: entry.id,
    },
    data: {
      ...analysis,
    },
  })

  return NextResponse.json({ data: entry, analysis: analysisEntry })
}
