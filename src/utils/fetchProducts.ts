import axios, { AxiosError } from "axios";

const getAllProducts = async () => {

    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error;
        }
    }
}

export default getAllProducts
