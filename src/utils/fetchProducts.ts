import axios, { AxiosError } from "axios";

const getAllProducts =async()=>{
    try {
        const products = await axios.get('https://fakestoreapi.com/products')
        if(products){
            console.log(products.data);
            
            return products.data
        }
    } catch (error) {
        if(error instanceof AxiosError){
            console.log(error.isAxiosError)
            console.log(error.message)
        }
    }
}

export default getAllProducts
