import { Group, ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Product } from "@/types"
import api from "@/api"

type order_items = {
  productId: string
  quantity: number
}
type OrderCheckout =  order_items[]
export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart, handleAddCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [key: string]: Product[] })

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  // const checkoutOrder: OrderCheckout = {
  //   items: []
  // }
  const checkoutOrder: OrderCheckout =[]


  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    checkoutOrder.push({
      productId: key,
      quantity: products.length
    })
  })

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex mr-8">
          <ShoppingCart className="cursor-pointer" />
          <span>{Object.keys(groups).length}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-300">
        <div>{state.cart.length === 0 && <p>No items</p>}</div>
        <div>
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]

            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)

            return (
              <div className="mb-4 flex items-center justify-between gap-7" key={product.id}>
                <img src={product.image} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold ">{total}</span>
                <div className="">
                  <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>
                    -
                  </Button>
                  <span> {products.length}</span>
                  <Button variant="outline" onClick={() => handleAddCart(product)}>
                    +
                  </Button>
                </div>
              </div>
            )
          })}
          <p>Total:{total}</p>
        </div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </PopoverContent>
    </Popover>
  )
}
