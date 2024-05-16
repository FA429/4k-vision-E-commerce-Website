import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
// import { useQuery } from "@tanstack/react-query"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"

import { ChangeEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { Link, useSearchParams } from "react-router-dom"
import { Cart } from "@/components/component/cart"

export function Home() {
  const [searchParams, setSearchParams]= useSearchParams()
  const defaultSearch =searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defaultSearch)
  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddCart } = context

  console.log(searchBy)

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?search=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
setSearchParams({
  ...searchParams,
  searchBy: value
  

})
  }
  const handleSearch = (e) =>{
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })

  }

  return (
    <>
      <NavbarDefault />
      <div >
        <form className="flex gap-2 w-full md:w-1/2 mx-auto mb-6" onSubmit={handleSearch}>
        <input type="search" placeholder="Search for a product" onChange={handleChange} value={searchBy}/>
        <Button type="submit">Search</Button>
        </form>
      </div>

      <section className="flex flex-wrap flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.length === 0 && <p>No product foun , try searching with other name </p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <img src={product.image} />
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardContent>{product.price}</CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-400" onClick={() => handleAddCart(product)}>
                Add to cart
              </Button>
              <Button variant="outline">
                <Link to={`/products/${product.id}`}>checkit</Link>
              </Button>
            </CardFooter>
          </Card>
        
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
