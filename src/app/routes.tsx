import { Route, Routes } from "react-router-dom"

import Login from "../pages/LoginPage"
import Quiz from "../pages/QuizPage"
import Result from "../pages/ResultPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}
