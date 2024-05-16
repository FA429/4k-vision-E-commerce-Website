import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"
import "./App.css"
import { Productdetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/:productId",
    element: <Productdetails />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddCart: (product: Product) => void
  hanleDeleteFromCArt: (id: string) => void
}

type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)
function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })
  const handleAddCart = (product: Product) => {
    const isDuplicated = state.cart.find((item) => item.id === product.id)
    if(isDuplicated ) return 
      
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const hanleDeleteFromCArt = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)

    setState({
      ...state,
      cart: filteredCart
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddCart, hanleDeleteFromCArt }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
