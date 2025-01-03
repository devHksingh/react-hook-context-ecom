import { useEffect, useState } from "react"
import getAllProducts from "../utils/fetchProducts"
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"

const Products = () => {
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
    // interface CartItem{
    //     productId:number
    //     quantity:number
    // }
    const [products,setProducts]= useState<Products[]>([])
    const [cartProduct,setCartProduct] = useState([{productId:0,quantity:0}])
    // const [quantity,setQuantity] = useState([])
    
    useEffect(()=>{
        async function getData(){
            const fetchData = await getAllProducts()
            setProducts(fetchData)

        }
        getData()
        
    }, [])

    // const handleQuantity =(id:number,action:"add"|"remove")=>{
    //     console.log(action)
               
    //     setCartProduct((prev)=>{
    //         const existingItem = prev.find((item)=> item.productId ===id)
    //         if(existingItem){
    //             return prev.map(item => item.productId === id?
    //                 {...item,quantity:item.quantity+1}:item
    //             )
    //         }
    //         return [...prev,{productId:id,quantity:1}]
    //     })
    // }
    // const handleQuantity = (id:number,action:"add"|"remove")=>{
    //     console.log(id,action)
    //     setCartProduct((prev)=>{
    //         const existingItem = prev.find((item)=>item.productId === id)
    //         console.log(existingItem);
    //         if(existingItem){
    //             if(action === "add"){
    //                 return prev.map((item)=>item.productId ===id?{...item,quantity:item.quantity+1}:item)
    //             }else if(action === "remove"){ //remove product if its quantity is less then 1
    //                 // return prev.map((item)=> {
    //                 //     return item.quantity>1? prev.map((item)=>item.productId === id?{...item,quantity:item.quantity-1}:item):prev.filter((item)=>item.productId !== id)
    //                 // })
    //                 return existingItem.quantity>1 ? prev.
    //             }
    //         }else{
    //             if(action === "add"){
    //                 return [...prev,{productId:id,quantity:1}]
    //             }else{
    //                 return prev
    //             }
    //         }
    //     })
    // }

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
      
    
    
    
    console.log('after ');
    // console.log(quantity);
  return (
    <div>
        {/* <button type="button" className="bg-indigo-500 p-4 rounded" disabled>
                
                <span className="motion-safe:animate-spin">Processing...</span>
              </button> */}
        <h1 className="text-center font-bold text-xl">Products</h1>
        <p className="text-center">Total product in Cart is {cartProduct.map((item)=><p key={item.productId}>{item.productId} {item.quantity}</p>)}</p>
         
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
                                <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="addToCart"  onClick={()=>handleQuantity(product.id,"add")}><FiPlus/></button>
                                <span>Cart </span>
                                <button className="border px-1 py-0.5 rounded hover:bg-stone-200" id="removeToCart"  onClick={()=>handleQuantity(product.id,"remove")}><FiMinus/></button>
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