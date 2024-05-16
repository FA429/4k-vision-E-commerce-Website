import api from "@/api"
import { NavbarDefault } from "@/components/Navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function Productdetails(){
const params = useParams()
console.log(params)

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
  const { data: product, error } = useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  console.log(product)
 
if(!product){
  return <p>Product not found</p>
}

return(
<>
<NavbarDefault/>
  <div>
    <h3>
      {product.name}
    </h3>
    <h3>
      {product.id}
    </h3>
  </div>
</>
)
}