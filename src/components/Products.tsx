import { useCallback, useRef, useState } from "react"
// import getAllProducts from "../utils/fetchProducts"
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"
import { Link, useLoaderData, useNavigation,Outlet, NavLink } from "react-router-dom"

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
    const navigation = useNavigation()
    // const [products,setProducts]= useState<Products[]>([])
    const [cartProduct,setCartProduct] = useState([{productId:0,quantity:0}])
    const [likeProduct,setLikeProduct] = useState([{productId:0}])
    // const [quantity,setQuantity] = useState([])
    const likeBtnRef = useRef<HTMLDivElement |null>(null)
    
    const productData = useLoaderData() as Products[]

    
    
    console.log("''''''GETALL PRODUCTS''''''''",productData);
    
    // useEffect(()=>{
    //     async function getData(){
    //         const fetchData = await getAllProducts()
    //         setProducts(fetchData)

    //     }
    //     getData()
        
    // }, [])


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
            if (likeBtnRef.current) {
                console.log(likeBtnRef.current);
                console.log('---------------------------------------');
                
                likeBtnRef.current.style.backgroundColor = "blue";
              }
        }else{
            setLikeProduct((prev)=>[...prev,{productId:id}])
            if(likeBtnRef.current){
                likeBtnRef.current.style.backgroundColor="red"
            }
        }
    },[likeProduct])
      
    
    
    
    if (navigation.state === "loading") {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"/>
                    <p className="text-xl font-semibold text-blue-600">Loading products...</p>
                </div>
            </div>
        );
    }
    // console.log(quantity);
  return (
    <>
    
    <div>
    {/* <button type="button" className="bg-indigo-500 p-4 rounded" disabled>
            
            <span className="motion-safe:animate-spin">Processing...</span>
          </button> */}
    
    <h1 className="text-center font-bold text-xl">Products</h1>
    <p className="text-center">Total product in Cart is {cartProduct.map((item)=><p key={item.productId}>{item.productId} {item.quantity}</p>)}</p>
    <div>Like product id : {likeProduct.map((product)=><p key={product.productId}>{product.productId>0?<>{product.productId}</>:<></>}</p>)}</div>
    <Link className="border p-4 m-2" to={'cart'}>Cart</Link>
    <Link className="border p-4 m-2" to={'git'}>Github</Link>
    {navigation.state !== "idle" && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500">
            <p>LOADING.......</p>
          <div className="w-1/3 h-full bg-blue-700 animate-pulse" />
        </div>
      )}
    <div className="grid grid-cols-1 md:grid-cols-3 max-w-xl mx-auto gap-2 p-4">
        
        {productData&& productData.map((product:Products,index:number)=>{
            return(
                <div key={index} className=" container border p-2  rounded-md space-y-4">
                    <span>{product.id}</span>
                    <div className="p-2 mb-2"><img src={product.image} className="block aspect-square hover:rotate-1"/></div>
                    <div className="flex flex-col justify-center place-items-center m-2 gap-2">
                        <div className=" cursor-pointer" ><FiHeart onClick={()=>handleLikeProduct(product.id)} className={`cursor-pointer ${likeProduct.find((item)=>item.productId ===product.id)?`fill-red-600 text-red-600`:`"hover:text-red-600 hover:fill-red-600"`}`} /></div>
                        <div className=" flex justify-center gap-4 items-center">
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
            )
        })}
    </div>
    <div className="border p-4 "><Outlet /></div>
</div>
        
    </>
  )
}

export default Products