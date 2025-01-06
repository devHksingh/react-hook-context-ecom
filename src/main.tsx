import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Products from './components/Products.tsx'
import CartProducts from './components/CartProducts.tsx'
import WishList from './components/WishList.tsx'
// import Github from './components/Github.tsx'
// import githubInfoLoader from './utils/testFetch.ts'
import getAllProducts from './utils/fetchProducts.ts'
import ErrorPage from './ErrorPage.tsx'
import ProductPage from './components/ProductPage.tsx'
// import githubInfoLoader from './utils/testFetch.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>}>
      <Route path='' loader={getAllProducts} element={<Products/>}  >
        <Route path='/:productId' element={<ProductPage/>}/>
      </Route>
      
      <Route path='/cart' element={<CartProducts/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      {/* <Route path='/git' loader={githubInfoLoader}  element={<Github/>} /> */}
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
