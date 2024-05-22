import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { JournalEntry } from '@prisma/client'
import React from 'react'

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: { analysis: true },
  })

  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const entry = await getEntry(id)
  if (!entry) {
    return null
  }
  return (
    <div className="w-full h-full grid grid-cols-3">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
