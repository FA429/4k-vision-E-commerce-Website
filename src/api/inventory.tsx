// import api from "."

// export default {


//     getAll: async () => {
//         try {
//           const res = await api.get("/inventorys")
//           return res.data
//         } catch (error) {
//           console.error(error)
//           return Promise.reject(new Error("Something went wrong"))
//         }
//       },
//       createOne: async () => {
//         try {
//           const res = await api.post("/inventorys")
//           return res.data
//         } catch (error) {
//           console.error(error)
//           return Promise.reject(new Error("Something went wrong"))
//         }
//       },
    
//       UpdateOne: async () => {
//         try {
//           const res = await api.patch(`/products/${updateProduct.id}`, updateProduct)
//           return res.data
//         } catch (error) {
//           console.error(error)
//           return Promise.reject(new Error("Something went wrong"))
//         }
//       },
//       deleteOne: async (id: string) => {
//         try {
//           const res = await api.delete(`/products/${id}`)
//           return res.data
//         } catch (error) {
//           console.error(error)
//           return Promise.reject(new Error("Something went wrong"))
//         }
//       }
    
// }