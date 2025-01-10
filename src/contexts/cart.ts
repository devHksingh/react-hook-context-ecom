import { createContext, useContext } from "react";
import { CartContextType } from "../types/cartContextType";

export const CartContext = createContext<CartContextType|undefined>(undefined)


export const CartProvider = CartContext.Provider

export default function useCart(){
    if( useContext(CartContext) === undefined){
        throw new Error('cart context must have type of CartContextType')
    }else{
        return useContext(CartContext)
    }

}
