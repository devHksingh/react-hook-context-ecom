// DisplayProducts.tsx
// import { useLoaderData, useNavigation } from "react-router-dom"
// import { Products } from "../types/productTypes"
import { NavLink } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { createContext, useCallback, useReducer } from "react";
import { CartItem } from "../types/cartTypes";
import { CartProvider } from "../contexts/cart";
import CartProducts from "./CartProducts";




const DisplayProducts = () => {
    
    // const navigation = useNavigation();
    const {data,error,loading:dataLoading} = useFetchProducts() ;
    // const [cartProduct,setCartProduct] = useState([{productId:0,quantity:0}])
    // const [likeProduct,setLikeProduct] = useState([{productId:0}])
    // const handleQuantity = (id: number, action: "add" | "remove") => {
    //         console.log(id, action);
          
    //         setCartProduct((prev)=>{
    //             const existingItem = cartProduct.find((item)=>item.productId === id)
    //             console.log(existingItem);
    
    //             if(existingItem){
    //                 if(action==="add"){
    //                     return prev.map((product)=>{
    //                         if(product.productId === id){
    //                             return {...product,quantity:product.quantity+1}
    //                         }else{
    //                             return product
    //                         }
    //                     })
    //                 }else if(action === 'remove'){
    //                     return existingItem.quantity>1? 
    //                     prev.map((product)=>product.productId ===id?{...product,quantity:product.quantity-1}:product):
    //                     prev.filter((product)=> product.productId !==id)
    //                 }
    //             }else{
    //                 if(action === "add"){
    //                     return [...prev,{productId:id,quantity:1}]
    //                 }else if(action === "remove"){
    //                     return prev
    //                 }
    //             }
                
    //         })
    //       };
    
    // const handleLikeProduct = useCallback((id:number)=>{
    //         console.log(id)
    //         const productAlreadyExist =  likeProduct.find((product)=>product.productId === id)
    //         if(productAlreadyExist){
    //             setLikeProduct((prev)=>{
    //                 return prev.filter((product)=> product.productId !==id)
    //             })
                
    //         }else{
    //             setLikeProduct((prev)=>[...prev,{productId:id}])
                
    //         }
    //     },[likeProduct])

    
    interface Action {
        type:"add"| "remove",
        payload:{
            productId:number,
            quantity:number
        }
    }

    // interface CartItem{
    //     productId:number;
    //     quantity:number;
    // }
    
    const initialState = [
        {
            productId:0,
            quantity:0
        }
    ]
    
    function cartReducer(cartState:CartItem[],action:Action):CartItem[]{
        const {type,payload} = action
        switch(type){
            case "add":{
                const existingItem = cartState.find((item)=>item.productId === payload.productId)
                if(existingItem){
                    return cartState.map((item)=> item.productId === payload.productId?{...item,quantity:item.quantity+1}:item)
                }else{
                    return [...cartState,{productId:payload.productId,quantity:1}]
                }
                
            }
            case "remove":{
                return cartState.map((item)=>item.productId ===payload.productId?{...item,quantity:Math.max(0,item.quantity-1)}:item).filter((item)=>item.quantity>0)
            }
            default:
                return cartState
        }
    }

    const [cartState,cartDispatch] = useReducer(cartReducer,initialState)

    // const addItemToCart = (productId:number)=>{
    //     cartDispatch({type:"add",payload:{productId,quantity:1}})
    // }

    // const removeItemToCart = (productId:number)=>{
    //     cartDispatch({type:"remove",payload:{productId,quantity:0}})
    // }

    interface WishListAction{
        
        payload:{
            productId:number
        }
    }
    interface WishListState{
        productId:number;
    }

    function whishListReducer(wishListState:WishListState[],action:WishListAction){
        const {payload}= action
        const existingItem = wishListState.find((item)=>item.productId === payload.productId)
        if(existingItem){
            return wishListState.filter((item)=>item.productId !== payload.productId)
        }else{
            return [...wishListState,{productId:payload.productId}]
        }
        
    }
    const [wishListState,wishListDispatch] = useReducer(whishListReducer,[{productId:0}])

    const handlewishlistProduct = useCallback((productId:number)=>{
        wishListDispatch({payload:{productId}})
    },[])
    
    const handleAddProduct = useCallback((productId:number)=>{
        cartDispatch({type:"add",payload:{productId,quantity:1}})
    },[])
    const handleRemoveProduct = useCallback((productId:number)=>{
        cartDispatch({type:"remove",payload:{productId,quantity:0}})
    },[])

    
     
    console.log(wishListState)
    return (
        <>
            <div className="flex-col items-center justify-center max-w-4xl p-2 mx-auto">
            {/* <div>
                    {cartState.map((item)=><p key={item.productId}>
      Product ID: {item.productId}, Quantity: {item.quantity}
    </p>)}
                </div> */}
                { 
                dataLoading ? (
            <div
              className={`absolute w-full h-full bg-black inset-0 ${
                dataLoading
                  ? " bg-red-300 animate-pulse"
                  : "bg-transparent pointer-events-none"
              }`}
            ></div>):<div className="grid max-w-4xl grid-cols-1 gap-2 p-4 mx-auto md:grid-cols-4">
                {/* <h1>Products</h1> */}
                {data.map((product)=>(
                  <div key={product.id} className="container w-full p-2 space-y-4 border rounded-md text-pretty">
                  <span>{product.id}</span>
                  <div className="p-2 mb-2"><img src={product.image} className="block aspect-square hover:rotate-1"/></div>
                  <div className="flex flex-col justify-center gap-2 m-2 place-items-center">
                      <div className="cursor-pointer " ><FiHeart onClick={()=>handlewishlistProduct(product.id)} className={`cursor-pointer ${wishListState.find((item)=>item.productId ===product.id)?`fill-red-600 text-red-600`:`"hover:text-red-600 hover:fill-red-600"`}`} /></div>
                      <div className="flex items-center justify-center gap-4 ">
                          <FiShoppingCart className="fill-orange-400"/>
                          <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="addToCart"  onClick={()=>handleAddProduct(product.id)}><FiPlus/></button>
                          <span>{cartState.find((item)=>item.productId ===product.id)?.quantity||0} </span>
                          <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="removeToCart"  onClick={()=>handleRemoveProduct(product.id)}><FiMinus/></button>
                      </div>
                  </div>
                  
                  <p className="text-center ">Price: ${product.price}</p>
                  <NavLink to={`/${product.id}`} className={({isActive}) =>
                                        `block text-center  mt-2  rounded-md p-1 font-semibold transition-all duration-200 hover:bg-orange-600 ${isActive ?"bg-sky-500":"bg-orange-400"}`
                                    }>Buy</NavLink>
                <h2 className="text-wrap ">{product.title}</h2>
                  
              </div>
                ))}
                
                
            </div>
            }
                
            </div>

            <CartProvider value={{cartState,handleAddProduct,handleRemoveProduct}}>
                <CartProducts/>
            </CartProvider>
            
            
            
        </>
    )
}

export default DisplayProducts



/*
dataLoading ? (
            <div
              className={`absolute w-full h-full bg-black inset-0 ${
                dataLoading
                  ? " bg-zinc-300 animate-pulse"
                  : "bg-transparent pointer-events-none"
              }`}
            ></div>


            {data.map((product)=>(<div key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={`${product.image}`} alt={`${product.title}`} />
                    <p>{product.price}</p>
                    <p>{`${product.rating}`}</p>
                </div>))}
*/