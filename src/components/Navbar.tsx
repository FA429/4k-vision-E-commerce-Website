import React, { ChangeEvent, FormEvent, useContext } from "react"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { Cart } from "./component/cart"
import { MountainIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Role } from "@/types"

type NavbarProps = {
  handleSearch?: (e: FormEvent) => void
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  searchBy?: string
}

export function NavbarDefault({ handleSearch, handleChange, searchBy }: NavbarProps) {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  const hasSearch = !!handleSearch && !!handleChange
  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  return (
    <nav className="flex fixed top-0 bg-white square border h-16 w-full items-center justify-between md:px-6 ">
      <Link className="flex items-center gap-2" to="/">
        <img src="../../public/images/logo.png"
                  height={200}
                  width={65}

        />
      </Link>
      <nav className="hidden gap-4 md:flex">
        <Link className="text-sm font-medium hover:underline" to="/">
          Home
        </Link>
        {state.user?.role === Role.Admin && (
          <Link className="text-sm font-medium hover:underline" to="/dashboard">
            dashboard
          </Link>
        )}

        <Link className="text-sm font-medium hover:underline" to="/">
          Contact
        </Link>
      </nav>
      {hasSearch && (
        <form className=" w-full md:w-1/2 mx-auto mb-3 items-end" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      )}
      <div className="flex justify-center items-center gap-4">
        <Cart />
      </div>
      <div className="flex items-center gap-4">
        {!state.user && (
          <Link to="/signup">
            <Button variant="outline">Sign in</Button>
          </Link>
        )}
        {!state.user && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        {state.user && (
          <Button variant="outline" onClick={handleLogout}>
            LogOut
          </Button>
        )}
      </div>
    </nav>
  )
}
