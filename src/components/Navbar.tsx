import React, { ChangeEvent, useContext, useState } from "react"
import { Navbar, Typography, Button } from "@material-tailwind/react"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { Cart } from "./component/cart"
import { MountainIcon } from "lucide-react"

export function NavbarDefault() {
 

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleAddCart } = context

  

  return (
    <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" to="/">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Art By C#</span>
      </Link>
      <nav className="hidden gap-4 md:flex">
        <Link className="text-sm font-medium hover:underline" to="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline" to="/dashboard">
        dashboard
        </Link>
        
        <Link className="text-sm font-medium hover:underline" to="/">
          Contact
        </Link>
      </nav>
      <Cart/>
     
      </div>
    
  )
}


  
  

