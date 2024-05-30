import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"

import { useQuery, useQueryClient } from "@tanstack/react-query"

import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { Link, useSearchParams } from "react-router-dom"
import { Hero } from "@/components/hero"
import { Button } from "@/components/ui/button"

export function Home() {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defaultSearch)

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleRemoveUser } = context

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
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }

  return (
    <>
      <NavbarDefault handleSearch={handleSearch} searchBy={searchBy} handleChange={handleChange} />
      <div className="flex items-center mb-30">
        <Hero />
      </div>
      <form className=" w-full my-3 md:w-1/2 mx-auto items-end" onSubmit={handleSearch}>
        <input
          className="peer w-50 ml-2 h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          type="search"
          placeholder="Search for a product"
          onChange={handleChange}
          value={searchBy}
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <section className="flex justify-center flex-wrap flex-col md:flex-row gap-4 my-auto">
        {products?.length === 0 && <p>No product found , try searching with other name </p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <Card key={product.id} className="w-[300px]">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <img
                    alt="Product Image"
                    className="object-cover w-full h-52 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    height={320}
                    src={product.image}
                    style={{
                      aspectRatio: "400/320",
                      objectFit: "cover"
                    }}
                    width={400}
                  />
                </CardHeader>

                <div className="bg-white p-3 dark:bg-gray-950">
                  <CardTitle>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                  </CardTitle>
                  <CardContent>
                    {" "}
                    <p className="text-base font-semibold">RS{product.price}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="inline-flex items-center gap-4 justify-center rounded-md  px-4 py-2 text-sm font-medium  transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2d2d2d] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#ff6b6b] dark:text-white dark:hover:bg-[#ff4d4d] dark:focus-visible:ring-[#ff3333] animate-pulse">
                      <Button onClick={() => handleAddCart(product)}>Add to Cart</Button>
                      <Link className=" w-max" to={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
