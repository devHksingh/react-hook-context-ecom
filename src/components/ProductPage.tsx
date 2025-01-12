import { useParams } from "react-router-dom"
import useFetchSingleProduct from "../hooks/useFetchSingleProduct";

const ProductPage = () => {
    const params = useParams<{productId:string}>()
    console.log(params.productId);
    const {data,loading:loadingStatus} = useFetchSingleProduct(params.productId as string)
    if(data){
      console.log(data);
    }
    
  return (
    <div>
      {loadingStatus?<>Loading...</>:
      <>
        <div>
            
        

<div className="relative flex items-center min-h-screen p-5 overflow-hidden bg-stone-300 min-w-screen lg:p-10">
    <div className="relative w-full max-w-6xl p-10 mx-auto text-gray-800 bg-white rounded shadow-xl lg:p-20 md:text-left">
        <div className="items-center -mx-10 md:flex">
            <div className="w-full px-10 mb-10 md:w-1/2 md:mb-0">
                <div className="relative">
                    <img src={data?.image} className="relative z-10 " alt=""/>
                    
                </div>
            </div>
            <div className="w-full px-10 md:w-1/2">
                <div className="mb-10">
                    <h1 className="mb-5 text-2xl font-bold uppercase">{data?.title}
                      <span className="block mt-1 text-sm opacity-80">{data?.category}</span>
                    </h1>
                    
                    <p className="text-sm">{data?.description} <a href="#" className="inline-block text-xs leading-none text-gray-900 border-b border-gray-900 opacity-50 hover:opacity-100">MORE <i className="mdi mdi-arrow-right"></i></a></p>
                </div>
                <div>
                    <div className="inline-block mr-5 align-bottom">
                        <span className="text-2xl leading-none align-baseline">$</span>
                        <span className="text-4xl font-bold leading-none align-baseline">{data?.price}</span>
                        
                    </div>
                    <div className="inline-block align-bottom">
                        <button className="px-10 py-2 font-semibold text-yellow-900 bg-yellow-300 rounded-full opacity-80 hover:opacity-100 hover:text-gray-900"><i className="mr-2 -ml-2 mdi mdi-cart"></i> BUY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



            
            {/* {data?.id} */}
        </div>
      </>}
    </div>
  )
}

export default ProductPage