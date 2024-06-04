import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Slider } from "@material-tailwind/react"
import { Label } from "@radix-ui/react-label"
import { Cart } from "@/components/component/cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"

export function Productdetails({ productDetiles }: { productDetiles: Product }) {
  const params = useParams()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { handleAddCart } = context

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: product, error } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })

  if (!product) {
    return <p>Product not found</p>
  }
  console.log("product details ", product)
  return (
    <>
    <NavbarDefault/>
    <div>
        <video id="backVideo" className="videoTag" autoPlay loop muted width={1600} height={900}>
              <source src="../../public/images/homeVidoe.mp4" type="video/mp4" />
            </video>
        </div>
      <main className="flex mt-56  ">
        
        <div className="  container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex">
          <img
                    alt="Product Image"
                    className="object-cover w-full h-auto"
                    height={320}
                    src={product.image}
                    
                    width={400}
                  />           
          </div>
          <div className="space-y-6 ">
            <div>
              <h1 className="flex text-3xl font-bold mb-56">{product.name}</h1>
              <p className="flex text-gray-500">{product.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price}</span>
            
              <Button
                onClick={() => handleAddCart(product)}
                className="bg-gray-900 hover:bg-gray-800 text-white"
                size="lg"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto text-center">
          <p>© 2024 4K-Vision. All rights reserved.</p>
        </div>
      </footer>
      </>
  )
}
