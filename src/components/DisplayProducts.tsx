// DisplayProducts.tsx
// import { useLoaderData, useNavigation } from "react-router-dom"
// import { Products } from "../types/productTypes"
import useFetchProducts from "../hooks/useFetchProducts";

const DisplayProducts = () => {
    // const navigation = useNavigation();
    const {data,error,loading:dataLoading} = useFetchProducts() ;

    return (
        <>
            <div>
                { dataLoading ? (
            <div
              className={`absolute w-full h-full bg-black inset-0 ${
                dataLoading
                  ? " bg-red-300 animate-pulse"
                  : "bg-transparent pointer-events-none"
              }`}
            ></div>):<div className="bg-stone-400 min-h-screen p-4">
                <h1>Products</h1>
                {data.map((product)=>(<div key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={`${product.image}`} alt={`${product.title}`} />
                    <p>{product.price}</p>
                    <p>{`${product.rating}`}</p>
                </div>))}
                
                
            </div>}
            </div>
            
            
            
        </>
    )
}
export default DisplayProducts

/*
dataLoading ? (
            <div
              className={`absolute w-full h-full bg-black inset-0 ${
                dataLoading
                  ? " bg-zinc-300 animate-pulse"
                  : "bg-transparent pointer-events-none"
              }`}
            ></div>
*/