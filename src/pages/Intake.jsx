import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 1,
    question: "What's your core idea?",
    hint: "Describe it in 1–2 sentences. Don't worry about details yet.",
    type: 'textarea',
    placeholder: "e.g. An app that helps freelancers track their invoices and clients..."
  },
  {
    id: 2,
    question: "Who is it for?",
    hint: "Who is your target audience?",
    type: 'textarea',
    placeholder: "e.g. Small business owners, students, freelancers in Southeast Asia..."
  },
  {
    id: 3,
    question: "What problem does it solve?",
    hint: "What pain point or need does your idea address?",
    type: 'textarea',
    placeholder: "e.g. Freelancers waste hours chasing unpaid invoices with no system..."
  },
  {
    id: 4,
    question: "What type of product is it?",
    hint: "Choose the best fit for your idea.",
    type: 'choice',
    options: ['Website', 'Mobile App', 'Web App', 'All of the above']
  },
  {
    id: 5,
    question: "What are the must-have features for launch?",
    hint: "List the core features your MVP needs. One per line is fine.",
    type: 'textarea',
    placeholder: "e.g. User login, invoice creation, PDF export, payment tracking..."
  },
  {
    id: 6,
    question: "Any design preferences or inspiration?",
    hint: "Colors, feel, or apps you admire. Skip if unsure.",
    type: 'textarea',
    placeholder: "e.g. Clean and minimal like Notion, dark mode, professional feel..."
  },
  {
    id: 7,
    question: "What is your rough budget range?",
    hint: "A ballpark is fine. This helps us tailor the tech stack.",
    type: 'choice',
    options: ['Under $500', '$500 – $2,000', '$2,000 – $10,000', '$10,000+', 'Not sure yet']
  },
  {
    id: 8,
    question: "What is your desired timeline?",
    hint: "When would you like the project ready?",
    type: 'choice',
    options: ['ASAP (1–4 weeks)', '1–3 months', '3–6 months', 'No rush']
  },
  {
    id: 9,
    question: "Do you have an existing brand, domain, or assets?",
    hint: "Logo, colors, domain name, existing website?",
    type: 'textarea',
    placeholder: "e.g. I have a logo and domain chyurumstudio.com, no website yet..."
  },
  {
    id: 10,
    question: "Any technical preferences?",
    hint: "Or leave it to us — we'll recommend the best stack.",
    type: 'choice',
    options: ['Leave it to you', 'React / Next.js', 'WordPress', 'Mobile (React Native)', 'I have specific needs']
  },
]

export default function Intake() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  function handleChoice(option) {
    const updated = { ...answers, [q.id]: option }
    setAnswers(updated)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setInputValue('')
    } else {
      submitAnswers(updated)
    }
  }

  function handleNext() {
    if (!inputValue.trim()) return
    const updated = { ...answers, [q.id]: inputValue.trim() }
    setAnswers(updated)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setInputValue('')
    } else {
      submitAnswers(updated)
    }
  }

  async function submitAnswers(finalAnswers) {
    setLoading(true)
    // Store answers in localStorage for now
    localStorage.setItem('chyurum_answers', JSON.stringify(finalAnswers))
    // Navigate to result page (we'll build this next)
    setTimeout(() => {
      navigate('/result')
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Chyuru is crafting your roadmap...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          <span className="text-purple-400 font-semibold text-sm">Chyurum Studio</span>
          <span className="text-gray-500 text-sm">{current + 1} / {questions.length}</span>
        </div>
        {/* Progress bar */}
        <div className="max-w-xl mx-auto mt-3 h-1 bg-gray-800 rounded-full">
          <div
            className="h-1 bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">

          <p className="text-gray-500 text-sm mb-2">{q.hint}</p>
          <h2 className="text-2xl font-semibold mb-6 leading-snug">{q.question}</h2>

          {q.type === 'textarea' && (
            <div>
              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500 transition-colors text-sm leading-relaxed"
                rows={4}
                placeholder={q.placeholder}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.metaKey) handleNext()
                }}
                autoFocus
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-600 text-xs">Cmd/Ctrl + Enter to continue</span>
                <button
                  onClick={handleNext}
                  disabled={!inputValue.trim()}
                  className="bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-all"
                >
                  {current === questions.length - 1 ? 'Generate roadmap →' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {q.type === 'choice' && (
            <div className="flex flex-col gap-3">
              {q.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleChoice(option)}
                  className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl px-4 py-3.5 text-sm text-gray-200 transition-all duration-150"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Back button */}
          {current > 0 && (
            <button
              onClick={() => { setCurrent(current - 1); setInputValue(answers[questions[current - 1].id] || '') }}
              className="mt-6 text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}