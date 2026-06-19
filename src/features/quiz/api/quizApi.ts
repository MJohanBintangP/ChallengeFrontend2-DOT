import type { OpenTDBQuestion, OpenTDBResponse, QuizQuestion } from "../types"
import { shuffleArray } from "../utils/shuffle"

const OPEN_TDB_API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"

export function decodeHTML(value: string): string {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = value
  return textarea.value
}

function normalizeQuestion(
  question: OpenTDBQuestion,
  index: number
): QuizQuestion {
  const correctAnswer = decodeHTML(question.correct_answer)

  const options = shuffleArray([
    correctAnswer,
    ...question.incorrect_answers.map((answer) => decodeHTML(answer)),
  ])

  return {
    id: `question-${index}`,
    question: decodeHTML(question.question),
    correctAnswer,
    options,
    type: question.type,
  }
}

export async function fetchQuestions(): Promise<QuizQuestion[]> {
  const response = await fetch(OPEN_TDB_API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch questions")
  }

  const data = (await response.json()) as OpenTDBResponse

  if (data.response_code !== 0) {
    throw new Error("Failed to load quiz questions")
  }

  return data.results.map(normalizeQuestion)
}
