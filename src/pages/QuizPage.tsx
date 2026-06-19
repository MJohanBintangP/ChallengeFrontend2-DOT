import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { useQuizStore } from "@/features/quiz/stores/quizStore"
import { useQuizTimer } from "@/features/quiz/hooks/useQuizTimer"

export default function Quiz() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const questions = useQuizStore((state) => state.questions)
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  )
  const answers = useQuizStore((state) => state.answers)
  const status = useQuizStore((state) => state.status)
  const error = useQuizStore((state) => state.error)
  const startQuiz = useQuizStore((state) => state.startQuiz)
  const answerQuestion = useQuizStore((state) => state.answerQuestion)
  const resumeQuiz = useQuizStore((state) => state.resumeQuiz)

  const currentQuestion = questions[currentQuestionIndex]

  const { formattedTime } = useQuizTimer()

  useEffect(() => {
    if (status === "finished") {
      navigate("/result")
    }
  }, [status, navigate])

  // useEffect(() => {
  //   console.log("Quiz status:", status)
  // }, [status])

  useEffect(() => {
    resumeQuiz()
  }, [resumeQuiz])

  if (status === "idle") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold">Quiz Page</h1>

        <p className="text-sm text-muted-foreground">Halo, {user?.username}</p>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <Button type="button" onClick={startQuiz}>
          Start Quiz
        </Button>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading questions...</p>
      </div>
    )
  }

  if (status === "playing" && currentQuestion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>Total soal: {questions.length}</p>
            <p>Dikerjakan: {answers.length}</p>
            <p>Timer: {formattedTime}</p>
          </div>

          <div className="rounded-lg border p-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Soal {currentQuestionIndex + 1} dari {questions.length}
            </p>

            <h2 className="text-xl font-semibold">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                type="button"
                variant="outline"
                className="justify-start text-left whitespace-normal"
                onClick={() => answerQuestion(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Something went wrong.</p>
    </div>
  )
}
