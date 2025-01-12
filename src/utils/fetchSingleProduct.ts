import axios, { AxiosError } from "axios"



const getSingleProduct= async(productId:string)=>{
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`) 
        if(response){
            return response.data
        }
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error("Unable to fecth single product")
        }
    }
}


export default getSingleProduct