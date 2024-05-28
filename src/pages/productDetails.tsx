import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Slider } from "@material-tailwind/react"
import { Label } from "@radix-ui/react-label"

export function Productdetails({ productDetiles }: { productDetiles: Product }) {
  
  const params = useParams()

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
      <NavbarDefault />

      <div className="flex justify-center grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-48">
        <div className="grid gap-4 md:gap-10 items-start">
          
          <video id="backVideo" className="videoTag" autoPlay loop muted>
            <source src="../../public/images/mavic-3-pro.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">
                {" "}
                <span className="text-xs"> SR</span>
                {product.price}
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>{product.description}</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              {/* <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select> */}
            </div>
            <Button size="lg">Buy Now </Button>
          </div>
        </div>
      </div>
      {/* <section className="mt-8 w-full aspect-video overflow-hidden relative">
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white px-4 md:px-6 bg-gradient-to-b from-black/50 to-transparent">
          <h1 className="text-3xl md:text-5xl font-bold">Introducing the WhimsiMug</h1>
          <p className="text-lg md:text-xl max-w-[800px] mt-4">
            <video
              className="absolute inset-0 z-[-1] h-full w-full object-cover"
              height={500}
              style={{
                aspectRatio: "520/580",
                objectFit: "cover"
              }}
              width={520}
              src="../../public/images/mavic-3-pro.mp4"
              autoPlay
              loop
              muted
            />{" "}
            Sip in style and magic with our delightful WhimsiMug, a companion that transforms your
            daily routine into a whimsical experience.
          </p>
        </div>
        <span className="w-full h-full object-cover rounded-md bg-muted" />
      </section>
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="flex gap-4">
              <img
                alt="Product Image"
                className="aspect-[3/4] object-cover rounded-lg"
                height={400}
                src="/placeholder.svg"
                width={300}
              />
              <img
                alt="Hero product"
                height={600}
                src=" ../images/mavic-3-classic.jpg "
                width={800}
              />
              <img alt="Product Image" height={400} src="src/images/art.jpg" width={300} />
              <img
                alt="Product Image"
                className="aspect-[3/4] object-cover rounded-lg"
                height={400}
                src="/placeholder.svg"
                width={300}
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Sip in Style and Magic</p>
            </div>
            <div className="space-y-4">
              <p>
               {product.description}
              </p>
              <p>
                Crafted with premium materials and attention to detail, the WhimsiMug is not just a
                functional item, but a work of art that will bring a smile to your face every time
                you use it.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">$29.99</div>
              <Button size="lg">Buy Now</Button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
