import { useEffect, useState } from "react"
import getAllProducts from "../utils/fetchProducts"
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"

const Products = () => {
    const [products,setProducts]= useState([])
    const [cartProduct,setCartProduct] = useState([])
    const [quantity,setQuantity] = useState({productId:null,quantity:0})
    useEffect(()=>{
        async function getData(){
            const fetchData = await getAllProducts()
            setProducts(fetchData)

        }
        getData()
        
    }, [])
    interface Products{
        id:number
        category:string
        description:string
        image:string
        title:string
        rating:{
            rate:number
            count:number
        }
        price:number

    }

  return (
    <div>
        {/* <button type="button" className="bg-indigo-500 p-4 rounded" disabled>
                
                <span className="motion-safe:animate-spin">Processing...</span>
              </button> */}
        <h1 className="text-center font-bold text-xl">Products</h1>
        <p className="text-center">Total product in Cart is {cartProduct.length}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-xl mx-auto gap-2 p-4">
            
            {products&& products.map((product:Products,index:number)=>{
                return(
                    <div key={index} className=" container border p-2  rounded-md space-y-4">
                        <span>{product.id}</span>
                        <div className="p-2 mb-2"><img src={product.image} className="block aspect-square hover:rotate-1"/></div>
                        <div className="flex flex-col justify-center place-items-center m-2 gap-2">
                            <div className=" cursor-pointer"><FiHeart className="hover:text-red-600 hover:fill-red-600"/></div>
                            <div className=" flex justify-center gap-4 items-center">
                                <FiShoppingCart className="fill-orange-400"/>
                                <button className="border px-1 py-0.5 rounded hover:bg-stone-200"><FiPlus/></button>
                                <span>Cart </span>
                                <button className="border px-1 py-0.5 rounded hover:bg-stone-200"><FiMinus/></button>
                            </div>
                        </div>
                        <h2 className="text-wrap ">{product.title}</h2>
                        <p className="text-center">${product.price}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Products