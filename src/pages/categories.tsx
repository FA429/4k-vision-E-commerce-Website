// import { NavbarDefault } from "@/components/Navbar"
// import { AlertDelete } from "@/components/component/alertDelete"
// import { UpdateProduct } from "@/components/component/updateProduct"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Category } from "@/types"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { Table } from "lucide-react"
// import CategoryService from "../api/categories"

// import { ChangeEvent, FormEvent, useState } from "react"

// export function category (){
//     const queryClient = useQueryClient()





//   const { data: category, error: catError } = useQuery<Category[]>({
//     queryKey: ["categorys"],
//     queryFn: CategoryService.getAll
//   })
//   const productWitheCat = products?.map((product) => {
//     const Category = category?.find((cat) => cat.id === product.categoryId)
//     if (Category) {
//       return {
//         ...product,
//         categoryId: Category.type
//       }
//     }
//     return product
//   })

  
//     return (
//         <>
//           <NavbarDefault />
//           <form className="mt-10 w-1/3 mx-auto" onSubmit={handleSubmit}>
//             <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
    
//             <select name="cats" onChange={handleSelect}>
//               {category?.map((cat) => {
//                 return (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.type}
//                   </option>
//                 )
//               })}
//             </select>
    
//             <Input
//               name="name"
//               className="mt-4"
//               type="text"
//               placeholder="Name"
//               onChange={handleChange}
//             />
//             <Input
//               name="description"
//               className="mt-4"
//               type="text"
//               placeholder="description"
//               onChange={handleChange}
//             />
//             <Input
//               name="price"
//               className="mt-4"
//               type="text"
//               placeholder="Price"
//               onChange={handleChange}
//             />
    
//             <div className="flex justify-between">
//               <Button variant="outline" type="reset" className="mt-4">
//                 Reset
//               </Button>
//               <Button type="submit" className="mt-4">
//                 Submit
//               </Button>
//             </div>
//           </form>
//           <div className="mt-20">
//             <h1>Products</h1>
//             <Table>
//               <TableCaption>A list of your recent products.</TableCaption>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>productId</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead className="text-left">categoryId</TableHead>
//                   <TableHead className="text-left">price</TableHead>
//                   <TableHead className="text-left"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {productWitheCat?.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell className="text-left">{product.id}</TableCell>
//                     <TableCell className="text-left">{product.name}</TableCell>
//                     <TableCell className="text-left">{product.categoryId}</TableCell>
//                     <TableCell className="text-left">{product.price}</TableCell>
//                     <TableCell className="text-left">
//                       <UpdateProduct product={product} />
//                     </TableCell>
//                     <TableCell className="text-left">
//                       <AlertDelete product={product} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </>
//       )
// }