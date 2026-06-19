export type OpenTDBQuestionType = "multiple" | "boolean"

export type OpenTDBQuestion = {
  type: OpenTDBQuestionType
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type OpenTDBResponse = {
  response_code: number
  results: OpenTDBQuestion[]
}

export type QuizQuestion = {
  id: string
  question: string
  correctAnswer: string
  options: string[]
  type: OpenTDBQuestionType
}

export type QuizStatus = "idle" | "loading" | "playing" | "finished"

export type QuizAnswer = {
  questionId: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

export type QuizStore = {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  duration: number
  startedAt: number | null
  status: QuizStatus
  error: string | null

  startQuiz: () => Promise<void>
  answerQuestion: (selectedAnswer: string) => void
  finishQuiz: () => void
  resetQuiz: () => void
  resumeQuiz: () => void
  clearQuizProgress: () => void
}

export type PersistedQuizState = {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  duration: number
  startedAt: number | null
  status: QuizStatus
}
