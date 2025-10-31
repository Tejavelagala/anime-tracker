import React, { useState } from 'react'
import { addPoll, votePoll, loadData } from '../utils/storage'

export default function Polls({ contextId }) {
  const [question, setQuestion] = useState('')
  const [optionsText, setOptionsText] = useState('')
  const [dataVersion, setDataVersion] = useState(0)

  const data = loadData()
  const polls = data.polls.filter(p => p.contextId === contextId)

  function createPoll() {
    const options = optionsText.split(',').map(s => s.trim()).filter(Boolean)
    if (!question || options.length < 2) return alert('Provide question and at least 2 options')
    addPoll({ contextId, question, options })
    setQuestion('')
    setOptionsText('')
    setDataVersion(v => v + 1)
  }

  function vote(pollId, option) {
    votePoll(pollId, option)
    setDataVersion(v => v + 1)
  }

  return (
    <div>
      <div className="mb-2">
        <input placeholder="Poll question" value={question} onChange={e=>setQuestion(e.target.value)} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1 mr-2" />
        <input placeholder="Options comma-separated" value={optionsText} onChange={e=>setOptionsText(e.target.value)} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1 mr-2" />
        <button onClick={createPoll} className="px-2 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 rounded">Create</button>
      </div>

      {polls.map(poll => (
        <div key={poll.id} className="mb-2 p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800">
          <div className="font-semibold text-gray-800 dark:text-gray-200">{poll.question}</div>
          <div className="flex gap-2 mt-2">
            {poll.options.map(opt => (
              <button key={opt} onClick={()=>vote(poll.id,opt)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">{opt} ({poll.votes?.[opt] || 0})</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
