/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3ruIUvS5R7R
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { GlobalContext } from "@/App"
import { reshpeUser } from "@/lib/utils"
import { jwtDecode } from "jwt-decode"

export function Login() {
  const navigate = useNavigate()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    try {
      const res = await api.post(`/users/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChangeLoing = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogin()
    if (token) {
      const decodedToken = jwtDecode(token)
      const user = reshpeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)
      navigate("/")
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in.
          </p>
        </div>
        <form action="POST" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" required type="email" onChange={handleChangeLoing} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input name="password" required type="password" onChange={handleChangeLoing} />
          </div>
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don`t have an account?
          <Link
            className="font-medium text-gray-900 hover:underline dark:text-gray-50"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
