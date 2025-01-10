import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem } from "../types/cartTypes";

interface Action {
  type: "add" | "remove";
  payload: { productId: number };
}

interface CartContextType {
  cartState: CartItem[];
  handleAddProduct: (productId: number) => void;
  handleRemoveProduct: (productId: number) => void;
  
}

const cartReducer = (cartstate:CartItem[],action:Action):CartItem[]=>{
    const {type,payload}= action
    switch(type){
        case "add":{
            const existingItem = cartstate.find((item)=>item.productId === payload.productId)
            if(existingItem){
                return cartstate.map((item)=>item.productId ===payload.productId?{...item,quantity:item.quantity+1}:item)
            }else{
                return [...cartstate,{productId:payload.productId,quantity:1}]
            }
        }
        case "remove":{
            return cartstate.map((item)=>
                item.productId === payload.productId?{...item,quantity:Math.max(0,item.quantity-1)}:item
            ).filter((item)=>item.quantity>0)
        }
        

        default:
            return cartstate
    }

}

const CartContext = createContext<CartContextType|undefined>(undefined)

export const CartProvider = ({children}:{children:ReactNode})=>{

    const [cartState,dispatch]= useReducer(cartReducer,[])

    const handleAddProduct = (productId:number)=>{
        dispatch({type:"add",payload:{productId}})
    }
    const handleRemoveProduct =(productId:number)=>{
        dispatch({type:"remove",payload:{productId}})
    }
    return(
        <CartContext.Provider value={{cartState,handleAddProduct,handleRemoveProduct}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart =():CartContextType=>{
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}


