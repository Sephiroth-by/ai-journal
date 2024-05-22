'use client'

import { updateEntry } from '@/utils/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({
  entry,
}: {
  entry: JournalEntry & { analysis: Analysis }
}) => {
  const [text, setText] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const router = useRouter()

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsSaving(true)

      const { data, analysis } = await updateEntry(entry.id, _text)

      setEntry(data)
      setAnalysis(analysis)
      setIsSaving(false)
    },
  })

  return (
    <>
      <div className="col-span-2">
        <div className="w-full h-full">
          {isSaving && <div>...loading</div>}
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="border-l border-black/10">
        <div
          className="bg-blue-300 px-6 py-10"
          style={{ backgroundColor: analysis?.color }}
        >
          <h2 className="text-2xl">AI Analysis</h2>
        </div>
        <div>
          <ul>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Summary</span>
              <span>{analysis?.summary}</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Subject</span>
              <span>{analysis?.subject}</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Mood</span>
              <span>{analysis?.mood}</span>
            </li>
            <li className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
              <span className="text-lg font-semibold">Is terrible</span>
              <span>{analysis?.negative === true ? 'True' : 'False'}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Editor
