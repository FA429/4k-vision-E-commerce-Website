export type Product = {
  id: string
  categoryId: string
  name: string
  price: number    
  image: string
  description: string
  quantity: number
  background:string
}

export type ProductWithoutId = Omit<Product, 'id'>

export type ProductUpdate = Omit<ProductWithoutId, 'categoryId' | 'background'>

export type Category =  {
  id: string,
  type: string
}
export type User =  {
 id: string
 role:string
 name:string
 email:string
 phone:string
}
export const Role = { 
  Customer :"Customer" ,
  Admin :"Admin" 
} as const


export type DecodedUser ={
  Role: { readonly Customer: "Customer"; readonly Admin: "Admin" }
  aud: string
emailaddress :string
exp: 1716975874
iss:string
name: string
nameidentifier : number
role : keyof typeof Role
}
