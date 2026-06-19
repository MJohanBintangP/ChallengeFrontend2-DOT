import { useEffect, useState } from "react"
import { useQuizStore } from "../stores/quizStore"

function calculateRemainingTime(startedAt: number | null, duration: number) {
  if (!startedAt) return duration

  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000)

  return Math.max(0, duration - elapsedSeconds)
}

export function useQuizTimer() {
  const status = useQuizStore((state) => state.status)
  const duration = useQuizStore((state) => state.duration)
  const startedAt = useQuizStore((state) => state.startedAt)
  const finishQuiz = useQuizStore((state) => state.finishQuiz)

  const [remainingTime, setRemainingTime] = useState(() =>
    calculateRemainingTime(startedAt, duration)
  )

  useEffect(() => {
    if (status !== "playing") return

    const intervalId = window.setInterval(() => {
      const nextRemainingTime = calculateRemainingTime(startedAt, duration)

      setRemainingTime(nextRemainingTime)

      if (nextRemainingTime <= 0) {
        finishQuiz()
      }
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [status, startedAt, duration, finishQuiz])

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`

  return {
    remainingTime,
    formattedTime,
  }
}
