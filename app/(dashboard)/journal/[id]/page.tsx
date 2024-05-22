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
  })

  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const entry = (await getEntry(id)) as JournalEntry
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">AI Analysis</h2>
        </div>
        <div>
          <ul>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Summary</span>
              <span>summary</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Subject</span>
              <span>subject</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Mood</span>
              <span>mood</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Is terrible</span>
              <span>terrible</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
