import { useCart } from "./CartContext";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import useFetchProducts from "../hooks/useFetchProducts";
import { Link, NavLink } from "react-router-dom";

const Display = () => {
  const {cartState,handleAddProduct,handleRemoveProduct} = useCart()
  const {data,error,loading:dataLoading} = useFetchProducts()

  return (
    <>
    {
        error?(<div>Error occured while fetching data</div>):(
            <div className="flex-col items-center justify-center max-w-4xl p-2 mx-auto">
        <h1 className="text-xl font-bold text-center">Products</h1>
        <Link className="p-1 px-2 text-center rounded-md bg-sky-400 hover:bg-sky-600" to={'/cart'}>Cart {cartState.length} </Link>
        {dataLoading?(
            <div className="flex items-center justify-center min-h-screen bg-stone-400 animate-pulse"><h2 className="mt-4 text-xl font-bold text-center text-red-500 animate-pulse ">Loading...</h2></div>
        ):(
            <div className="grid max-w-4xl grid-cols-1 gap-4 p-4 mx-auto md:grid-cols-4">
                {data.map((product)=>(
                    <div className="container w-full p-2 space-y-4 border rounded-md text-pretty" key={product.id}>
                        <span>{product.id}</span>
                  <div className="p-2 mb-2"><img src={product.image} className="block aspect-square hover:rotate-1"/></div>
                  <div className="flex flex-col justify-center gap-2 m-2 place-items-center">
                      {/* <div className="cursor-pointer " ><FiHeart onClick={()=>handlewishlistProduct(product.id)} className={`cursor-pointer ${wishListState.find((item)=>item.productId ===product.id)?`fill-red-600 text-red-600`:`"hover:text-red-600 hover:fill-red-600"`}`} /></div> */}
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
        )}
    </div>
        )
    }
    </>
  )
};

export default Display;
