import { useParams } from "react-router-dom"

const ProductPage = () => {
    const params = useParams<{productId:string}>()
    console.log(params);
    
  return (
    <div>Product id {`${params.productId}`}</div>
  )
}

export default ProductPage