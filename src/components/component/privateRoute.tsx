import { reshpeUser } from "@/lib/utils"
import { Login } from "@/pages/login"
import { Role } from "@/types"
import { jwtDecode } from "jwt-decode"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

export function PrivateRoute({ children }: { children: any }) {
  const token = localStorage.getItem("token") || ""

  if (!token) return <Navigate to="/" />

  const decodedToken = jwtDecode(token)
  const decodedUser = reshpeUser(decodedToken)

  return decodedUser.role === Role.Customer ? <Navigate to="/" /> : children
}
