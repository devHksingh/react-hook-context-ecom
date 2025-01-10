import { useEffect, useState } from "react"
import { Products } from "../types/productTypes"
import getAllProducts from "../utils/fetchProducts"

const useFetchProducts = () => {
    const [data,setData] = useState<Products[]>([])
    const [error,setError] = useState(false)
    const [loading,setLoading]= useState(true)

    const fetchProduct =async()=>{
        setLoading(true)
        setError(false)
        try {
            const response = await getAllProducts()
            if(response){
                console.log(response);
                
                setData(response)
            }
        } catch (error) {
            setError(true)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[])
  return {loading,data,error}
}

export default useFetchProducts