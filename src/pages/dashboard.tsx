import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import api from "@/api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Product } from "@/types"
import { NavbarDefault } from "@/components/Navbar"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log("done", e.target.value)
    setProduct({
      ...product,
      [name]: value
    })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("done", product)

    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <>
    <NavbarDefault/>
      <form className="mt-10 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <Input
          name="categoryId"
          className="mt-4"
          type="text"
          placeholder="Category"
          onChange={handleChange}
        />

        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          name="description"
          className="mt-4"
          type="text"
          placeholder="description"
          onChange={handleChange}
        />
        <Input
          name="price"
          className="mt-4"
          type="text"
          placeholder="Price"
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button variant="outline" type="reset" className="mt-4">
            Reset
          </Button>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
      <div className="mt-20">
        <h1>Products</h1>
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>productId</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-left">categoryId</TableHead>
              <TableHead className="text-left">price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.id}</TableCell>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
