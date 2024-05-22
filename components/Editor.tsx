'use client'

import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [text, setText] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)

  const router = useRouter()

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry.id, _text)

      setEntry(data)
      setIsSaving(false)
    },
  })

  return (
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
  )
}

export default Editor
