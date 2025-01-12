import { useEffect, useState } from "react"
import { Products } from "../types/productTypes"
import getSingleProduct from "../utils/fetchSingleProduct"


const useFetchSingleProduct = (productId:string) => {

    const [data,setData]= useState<Products>()
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState(false)

    const singleFecthProduct=async()=>{
        try {
            setLoading(true)
            const response= await  getSingleProduct(productId)
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
        singleFecthProduct()
    },[])
    
  
    return {data,loading,error}
  
}

export default useFetchSingleProduct