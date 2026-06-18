import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/stores/authStore"

export default function Quiz() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    return navigate("/result")
  }

  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1>Quiz Page</h1>
      <h1>{user?.username}</h1>
      <button
        className="cursor-pointer rounded-sm bg-white p-2 text-black"
        onClick={handleNavigate}
      >
        Selesai
      </button>
    </div>
  )
}
