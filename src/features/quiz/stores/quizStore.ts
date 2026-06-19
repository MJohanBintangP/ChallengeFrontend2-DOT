import { create } from "zustand"

import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/lib/storage"

import { fetchQuestions } from "../api/quizApi"
import type { PersistedQuizState, QuizAnswer, QuizStore } from "../types"

const QUIZ_DURATION_SECONDS = 300
const QUIZ_STORAGE_KEY = "quiz-app-progress"

function saveQuizProgress(state: PersistedQuizState) {
  setStorageItem(QUIZ_STORAGE_KEY, state)
}

function getRemainingTime(startedAt: number | null, duration: number) {
  if (!startedAt) return duration

  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000)

  return Math.max(0, duration - elapsedSeconds)
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  duration: QUIZ_DURATION_SECONDS,
  startedAt: null,
  status: "idle",
  error: null,

  startQuiz: async () => {
    set({
      status: "loading",
      error: null,
    })

    try {
      const questions = await fetchQuestions()

      const progress: PersistedQuizState = {
        questions,
        currentQuestionIndex: 0,
        answers: [],
        duration: QUIZ_DURATION_SECONDS,
        startedAt: Date.now(),
        status: "playing",
      }

      saveQuizProgress(progress)

      set({
        ...progress,
        error: null,
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to start quiz"

      set({
        status: "idle",
        error: message,
      })
    }
  },

  answerQuestion: (selectedAnswer: string) => {
    const { questions, currentQuestionIndex, answers, duration, startedAt } =
      get()

    const currentQuestion = questions[currentQuestionIndex]

    if (!currentQuestion) return

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
    }

    const nextAnswers = [...answers, answer]
    const isLastQuestion = currentQuestionIndex === questions.length - 1

    if (isLastQuestion) {
      const progress: PersistedQuizState = {
        questions,
        currentQuestionIndex,
        answers: nextAnswers,
        duration,
        startedAt,
        status: "finished",
      }

      saveQuizProgress(progress)

      set({
        answers: nextAnswers,
        status: "finished",
      })

      return
    }

    const nextQuestionIndex = currentQuestionIndex + 1

    const progress: PersistedQuizState = {
      questions,
      currentQuestionIndex: nextQuestionIndex,
      answers: nextAnswers,
      duration,
      startedAt,
      status: "playing",
    }

    saveQuizProgress(progress)

    set({
      answers: nextAnswers,
      currentQuestionIndex: nextQuestionIndex,
    })
  },

  finishQuiz: () => {
    const { questions, currentQuestionIndex, answers, duration, startedAt } =
      get()

    const progress: PersistedQuizState = {
      questions,
      currentQuestionIndex,
      answers,
      duration,
      startedAt,
      status: "finished",
    }

    saveQuizProgress(progress)

    set({
      status: "finished",
    })
  },

  resetQuiz: () => {
    removeStorageItem(QUIZ_STORAGE_KEY)

    set({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      duration: QUIZ_DURATION_SECONDS,
      startedAt: null,
      status: "idle",
      error: null,
    })
  },

  resumeQuiz: () => {
    const progress = getStorageItem<PersistedQuizState>(QUIZ_STORAGE_KEY)

    if (!progress) return

    const remainingTime = getRemainingTime(
      progress.startedAt,
      progress.duration
    )

    if (progress.status === "playing" && remainingTime <= 0) {
      set({
        ...progress,
        status: "finished",
        error: null,
      })

      return
    }

    set({
      ...progress,
      error: null,
    })
  },

  clearQuizProgress: () => {
    removeStorageItem(QUIZ_STORAGE_KEY)
  },
}))
