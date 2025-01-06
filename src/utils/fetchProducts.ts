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
/*
 const githubInfoLoader = async () => {

    const response = await fetch('https://api.github.com/users/hiteshchoudhary').then(data=>data.json()).then(data=>data)
    console.log(response)
    
    return  response
}
export default githubInfoLoader

*/