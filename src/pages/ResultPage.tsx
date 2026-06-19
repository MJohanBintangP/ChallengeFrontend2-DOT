import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/stores/authStore"
import { useQuizStore } from "@/features/quiz/stores/quizStore"

export default function Result() {
  const navigate = useNavigate()

  const logout = useAuthStore((state) => state.logout)

  const questions = useQuizStore((state) => state.questions)
  const answers = useQuizStore((state) => state.answers)
  const resetQuiz = useQuizStore((state) => state.resetQuiz)

  const totalQuestions = questions.length
  const answeredCount = answers.length
  const correctCount = answers.filter((answer) => answer.isCorrect).length
  const wrongCount = answeredCount - correctCount

  const handleRetry = () => {
    resetQuiz()
    navigate("/quiz")
  }

  const handleLogout = () => {
    resetQuiz()
    logout()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-md rounded-lg border p-6 text-center">
        <h1 className="mb-6 text-2xl font-bold">Result Page</h1>

        <div className="space-y-2 text-left">
          <p>Total Soal: {totalQuestions}</p>
          <p>Jumlah Dijawab: {answeredCount}</p>
          <p>Benar: {correctCount}</p>
          <p>Salah: {wrongCount}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="button" className="flex-1" onClick={handleRetry}>
            Ulangi Quiz
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
