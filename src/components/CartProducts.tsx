import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"
import { useCart } from "./CartContext"
import useFetchProducts from "../hooks/useFetchProducts"

const CartProducts = () => {
  const {data,loading:loadingData} = useFetchProducts()
  const {cartState,handleAddProduct,handleRemoveProduct} = useCart()
  return (
    <>
      {
        loadingData?<div className="flex items-center justify-center h-screen text-xl text-purple-400 animate-pulse">Loading Cart...</div>:<>
        
        {data && (
        <div className="flex-col items-center justify-center max-w-4xl p-2 mx-auto">
        <h1 className="text-xl font-bold text-center">CartProducts</h1>
        {cartState.map((product)=>(
          <div className="grid max-w-6xl grid-cols-1 gap-2 p-4 mx-auto border md:grid-cols-4" key={product.productId}>
            <div className="p-2 mb-2"><img src={data.find((item)=>item.id === product.productId)?.image} className="block aspect-square hover:rotate-1"/></div>
            <div className="flex flex-col justify-center gap-1 m-2 place-items-center">
          </div>
          <h2 className="self-center text-center text-wrap">{data.find((item)=>item.id === product.productId)?.title}</h2>
          <div className="flex items-center justify-center gap-4 ">
                                    <FiShoppingCart className="fill-orange-400"/>
                                    <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="addToCart"  onClick={()=>handleAddProduct(product.productId)}><FiPlus/></button>
                                    <span>{cartState.find((item)=>item.productId ===product.productId)?.quantity||0} </span>
                                    <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="removeToCart"  onClick={()=>handleRemoveProduct(product.productId)}><FiMinus/></button>
          </div>
              
          <div className="flex gap-4">
            <span>Price {(data.find((item)=>item.id === product.productId)?.price as number)}</span>
            <span>Total Price {(data.find((item)=>item.id === product.productId)?.price as number)*(cartState.find((item)=>item.productId ===product.productId)?.quantity as number)}</span>
          </div>
          
          </div>
        ))}
      </div>
      
      )}
        </>
      }
      
    </>
  )
}

export default CartProducts