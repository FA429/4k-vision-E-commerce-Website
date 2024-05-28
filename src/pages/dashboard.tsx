import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ProductService from "../api/products"
import CategoryService from "../api/categories"
import UserService from "../api/users"
import { ChangeEvent, FormEvent, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Category, Product, ProductWithoutId, User } from "@/types"
import { NavbarDefault } from "@/components/Navbar"

import { UpdateProduct } from "@/components/component/updateProduct"
import { AlertDelete } from "@/components/component/alertDelete"
import { Link } from "react-router-dom"

import { Card } from "@material-tailwind/react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState<ProductWithoutId>({
    categoryId: "",
    name: "",
    price: 0,
    image: "",
    description: "",
    quantity: 0,
    background:""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await ProductService.createOne(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  const { data: category, error: catError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: CategoryService.getAll
  })
  const { data: user, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserService.getUsers
  })

  const productWitheCat = products?.map((product) => {
    const categoryFound = category?.find((cat) => cat.id === product.categoryId)
    if (categoryFound) {
      return {
        ...product,
        categoryId: categoryFound.type
      }
    }
    return { ...product, categoryId: "" }
  })

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }

  return (
    <>
      <NavbarDefault />
      <form className="mt-10 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>

        <select name="categoryId" onChange={handleSelect}>
          <option selected>Select Category</option>
          {category?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.type}
              </option>
            )
          })}
        </select>

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
        <Input
          name="quantity"
          className="mt-4"
          type="text"
          placeholder="Quantity"
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
              <TableHead>ProductId</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-left">CategoryId</TableHead>
              <TableHead className="text-left">Price</TableHead>

              <TableHead className="text-left">Quantity</TableHead>
              <TableHead className="text-left"></TableHead>

              <TableHead className="text-left"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWitheCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.id}</TableCell>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="text-left">{product.quantity}</TableCell>

                <TableCell className="text-left">
                  <UpdateProduct product={product} />
                </TableCell>
                <TableCell className="text-left">
                  <AlertDelete product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </>
  )
}
