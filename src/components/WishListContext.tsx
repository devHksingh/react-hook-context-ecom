import { createContext, ReactNode, useContext, useReducer } from "react";


interface WishListContextType {
    wishListState: WishListState[];
    handleWishListProduct: (productId: number) => void;
}


interface WishListAction {

    payload: {
        productId: number
    }
}
interface WishListState {
    productId: number;
}

const WishListContex = createContext<WishListContextType[] | undefined>(undefined)

const wishListReducer = (wishListState: WishListState[], action: WishListAction) => {
    const { payload } = action
    const existingProduct = wishListState.find((item) => item.productId === payload.productId)
    if (existingProduct) {
        return wishListState.filter((item) => item.productId !== payload.productId)
    } else {
        return [...wishListState, { productId: payload.productId }]
    }
}

export const wishListProvider = ({ children }: { children: ReactNode }) => {
    const [wishListState,dispatch] = useReducer(wishListReducer,[])

    const handleWishListProduct = (productId:number)=>{
        dispatch({payload:productId})
    }

    return (
        <WishListContex.Provider value={{wishListState,handleWishListProduct}}>
            {children}
        </WishListContex.Provider>
    )

 }

export const useWishList = ()=>{
    const context = useContext(WishListContex)
    if(!context){
        throw new Error("sdaf")
    }
    return context
}