import React, { ChangeEvent, FormEvent, useContext } from "react"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { Cart } from "./component/cart"
import { ShoppingCartIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Role } from "@/types"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import bb from "../../public/images/loge.png"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import users from "@/api/users"

// type NavbarProps = {
//   handleSearch?: (e: FormEvent) => void
//   handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
//   searchBy?: string
// }

export function NavbarDefault() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  return (
   

    <header className="flex fixed top-0 h-16 font-weight: 900; w-full items-center square border justify-between px-6 md:px-6 text-4xl bg-white	">
      <Link className="flex items-center gap-2" to="/">
    
      <span className="font-serif">4K-Vision</span>  
      </Link>
      <nav className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-full w-max items-center justify-center px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/"
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              {state.user?.role === Role.Admin && (
                <Link
                  className="group inline-flex h-full w-max items-center justify-center px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-full w-max items-center justify-center px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/contacthera"
              >
                ContactUs
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="hidden md:flex items-center gap-2">
        <Button className="rounded-full" size="icon" variant="ghost">
          <ShoppingCartIcon className="h-6 w-6" />
          <Cart />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserIcon className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{!state.user && <Link to="/login">Login</Link>}</DropdownMenuItem>
            <DropdownMenuItem>{!state.user && <Link to="/signup">Sign Up</Link>}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {state.user && (
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              className="group inline-flex h-full w-max items-center justify-center px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              to="/"
            >
              Home
            </Link>
            {state.user?.role === Role.Admin && (
              <Link
                className="group inline-flex h-full w-max items-center justify-center px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/dashboard"
              >
                Dashboard
              </Link>
            )}
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/contacthera"
            >
              ContactUs
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-12 w-15">
                  <AvatarFallback>user</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{!state.user && <Link to="/signup">Login</Link>}</DropdownMenuItem>
                <DropdownMenuItem>{!state.user && <Link to="/signup">Sign Up</Link>}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {state.user && (
                    <Link to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="rounded-full" size="icon" variant="ghost">
              <ShoppingCartIcon className="h-6 w-6" />
              <Cart />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
