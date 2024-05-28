import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"

import { useQuery, useQueryClient } from "@tanstack/react-query"

import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { Link, useSearchParams } from "react-router-dom"
import { Hero } from "@/components/hero"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState("")

  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { handleAddCart } = context

  const searchProducts = async () => {
    try {
      const res = await api.get(`/products?search=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: searchProducts
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
    setSearchParams({
      ...searchParams,
      searchBy: value
    })
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <>
      <NavbarDefault handleSearch={handleSearch} searchBy={searchBy} handleChange={handleChange} />
      <div className="flex items-center mb-96">      <Hero  />
</div>
      

      <section className="flex justify-center flex-wrap flex-col md:flex-row gap-4 my-auto">
        {products?.length === 0 && <p>No product found , try searching with other name </p>}
        {products?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle >{product.name}</CardTitle>
              <img className="aspect-[3/3] object-cover rounded-lg"
               src={product.image} />
            </CardHeader>
            <CardContent></CardContent>
            <CardContent>{product.price}</CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="inline-flex items-center justify-center rounded-md  bg-[#4d4d4d] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#3d3d3d] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d2d2d] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#ff6b6b] dark:text-white dark:hover:bg-[#ff4d4d] dark:focus-visible:ring-[#ff3333] animate-pulse"
                onClick={() => handleAddCart(product)}
              >
                Add to cart
              </Button>
              <Button variant="outline">
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
