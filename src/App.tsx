import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import "./App.css"
import { Productdetails } from "./pages/productDetails"
import { Login } from "./pages/login"
import { SignUp } from "./pages/signup"
import { PrivateRoute } from "./components/component/privateRoute"
import { ContactHera } from "./pages/contacthera"
import { Toaster } from "./components/ui/toaster"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },{path:"/contacthera",
  element: <ContactHera/>

  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:productId",
    element: <Productdetails />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void

}

type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}

export const GlobalContext = createContext<GlobalContextType | null>(null)
function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)

      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddCart = (product: Product) => {
    // const isDuplicated = state.cart.find((item) => item.id === product.id)
    // if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user: user
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index,1)


    setState({
      ...state,
      cart: cart
    })
  }
  return (
    <div className="App">
      <Toaster/>
      <GlobalContext.Provider
        value={{ state, handleAddCart, handleDeleteFromCart, handleStoreUser,handleRemoveUser }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
