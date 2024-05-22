'use client'

import { askQuestion } from '@/utils/api'
import { ChangeEvent, FormEvent, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { data } = await askQuestion(value)
    setAnswer(data)
    setLoading(false)
    setValue('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="ask a question"
          value={value}
          onChange={onChange}
          disabled={loading}
          className="border border-gray-300 rounded-md p-2 text-lg"
        ></input>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
        {loading && <p>Loading...</p>}
        {!!answer && <p className="my-4 text-xl">{answer}</p>}
      </form>
    </div>
  )
}

export default Question
