import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProductService from "../../api/products"

import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"

export function UpdateProduct({ product }: { product: Product }) {
  const queryClient = useQueryClient()

  const [updateProduct, setUpdateProduct] = useState(product)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, valueAsNumber } = e.target
    setUpdateProduct({
      ...updateProduct,
      [name]: name == "price" || name == "quantity" ? valueAsNumber : value
    })
  }
  console.log("update product ", updateProduct)

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    const productUpdate = {
      name: updateProduct.name,
      image: updateProduct.image,
      price: updateProduct.price,
      description: updateProduct.description,
      quantity: updateProduct.quantity
    }
    // console.log("update product in submit button", updateProduct)
    await ProductService.UpdateOne(updateProduct.id, updateProduct)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={updateProduct.name}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                defaultValue={updateProduct.price}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                defaultValue={updateProduct.description}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                name="image"
                defaultValue={updateProduct.image}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                defaultValue={updateProduct.quantity}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
