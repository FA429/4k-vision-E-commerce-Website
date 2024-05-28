
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import api from "@/api"
import { ChangeEvent, FormEvent, useState } from "react"

export function SignUp() {
  const navigate =useNavigate()
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: ""
  })
  const handleSignUp = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChangeSignUp = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault ()
    const response = await handleSignUp()
    if (response){
      navigate("/login")
    }

  }

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input onChange={handleChangeSignUp} name="name" required  />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input onChange={handleChangeSignUp} name="phone" required type="tel" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input onChange={handleChangeSignUp} name="email" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input onChange={handleChangeSignUp} name="password" required type="password"  />
        </div>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link className="font-medium text-gray-900 hover:underline dark:text-gray-50" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
