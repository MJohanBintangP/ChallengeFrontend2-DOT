import { Route, Routes } from "react-router-dom"

import Login from "../pages/LoginPage"
import Quiz from "../pages/QuizPage"
import Result from "../pages/ResultPage"
import { PublicRoute } from "./guards/PublicRoute"
import { ProtectedRoutes } from "./guards/ProtectedRoute"

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/quiz"
        element={
          <ProtectedRoutes>
            <Quiz />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoutes>
            <Result />
          </ProtectedRoutes>
        }
      />
    </Routes>
  )
}
