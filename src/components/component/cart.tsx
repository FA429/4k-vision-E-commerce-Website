import {  ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GlobalContext } from "@/App";
import { useContext } from "react";

export function Cart() {
    
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state ,hanleDeleteFromCArt} = context

    return (
      <Popover>
        <PopoverTrigger asChild>
            <div className="flex">
          <ShoppingCart className="cursor-pointer"/><span>{state.cart.length}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div>
                {state.cart.length === 0 && <p>No items</p>}
            </div>
          <div> {state.cart.map((product) => {
            return (
                <div className="mb-4 flex items-center gap-7" key={product.id} >
                    <img src={product.image}  className="w-10 h-10 object-contain"/>
                    <h4>{product.name}</h4>
                    <span className="font-bold">{product.price}</span>
                    <Button variant="destructive" onClick={() => hanleDeleteFromCArt(product.id)}>x</Button>
                </div>
            )
            
          })}  </div>
        </PopoverContent>
      </Popover>
    )
}