// DisplayProducts.tsx
// import { useLoaderData, useNavigation } from "react-router-dom"
// import { Products } from "../types/productTypes"
import { NavLink } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useCallback, useState } from "react";

const DisplayProducts = () => {
    // const navigation = useNavigation();
    const {data,error,loading:dataLoading} = useFetchProducts() ;
    const [cartProduct,setCartProduct] = useState([{productId:0,quantity:0}])
        const [likeProduct,setLikeProduct] = useState([{productId:0}])
    const handleQuantity = (id: number, action: "add" | "remove") => {
            console.log(id, action);
          
            setCartProduct((prev)=>{
                const existingItem = cartProduct.find((item)=>item.productId === id)
                console.log(existingItem);
    
                if(existingItem){
                    if(action==="add"){
                        return prev.map((product)=>{
                            if(product.productId === id){
                                return {...product,quantity:product.quantity+1}
                            }else{
                                return product
                            }
                        })
                    }else if(action === 'remove'){
                        return existingItem.quantity>1? 
                        prev.map((product)=>product.productId ===id?{...product,quantity:product.quantity-1}:product):
                        prev.filter((product)=> product.productId !==id)
                    }
                }else{
                    if(action === "add"){
                        return [...prev,{productId:id,quantity:1}]
                    }else if(action === "remove"){
                        return prev
                    }
                }
                
            })
          };
    
        const handleLikeProduct = useCallback((id:number)=>{
            console.log(id)
            const productAlreadyExist =  likeProduct.find((product)=>product.productId === id)
            if(productAlreadyExist){
                setLikeProduct((prev)=>{
                    return prev.filter((product)=> product.productId !==id)
                })
                
            }else{
                setLikeProduct((prev)=>[...prev,{productId:id}])
                
            }
        },[likeProduct])
    
    return (
        <>
            <div>
                { 
                dataLoading ? (
            <div
              className={`absolute w-full h-full bg-black inset-0 ${
                dataLoading
                  ? " bg-red-300 animate-pulse"
                  : "bg-transparent pointer-events-none"
              }`}
            ></div>):<div className="grid max-w-xl grid-cols-1 gap-2 p-4 mx-auto md:grid-cols-3">
                {/* <h1>Products</h1> */}
                {data.map((product)=>(
                  <div key={product.id} className="container p-2 space-y-4 border rounded-md ">
                  <span>{product.id}</span>
                  <div className="p-2 mb-2"><img src={product.image} className="block aspect-square hover:rotate-1"/></div>
                  <div className="flex flex-col justify-center gap-2 m-2 place-items-center">
                      <div className="cursor-pointer " ><FiHeart onClick={()=>handleLikeProduct(product.id)} className={`cursor-pointer ${likeProduct.find((item)=>item.productId ===product.id)?`fill-red-600 text-red-600`:`"hover:text-red-600 hover:fill-red-600"`}`} /></div>
                      <div className="flex items-center justify-center gap-4 ">
                          <FiShoppingCart className="fill-orange-400"/>
                          <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="addToCart"  onClick={()=>handleQuantity(product.id,"add")}><FiPlus/></button>
                          <span>{cartProduct.find((item)=>item.productId === product.id)?.quantity ||0} </span>
                          <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="removeToCart"  onClick={()=>handleQuantity(product.id,"remove")}><FiMinus/></button>
                      </div>
                  </div>
                  <h2 className="text-wrap ">{product.title}</h2>
                  <NavLink to={`/${product.id}`} className={({isActive})=>{ return isActive?`bg-sky-400`:` border text-lg font-medium bg-orange-400 capitalize`}}>Buy</NavLink>
                  <p className="text-center">${product.price}</p>
              </div>
                ))}
                
                
            </div>
            }
            </div>
            
            
            
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