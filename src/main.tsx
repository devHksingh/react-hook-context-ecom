import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import CartProducts from './components/CartProducts.tsx'
import WishList from './components/WishList.tsx'

import ErrorPage from './ErrorPage.tsx'
import Display from './components/Display.tsx'
import { CartProvider } from './components/CartContext.tsx'
import ProductPage from './components/ProductPage.tsx'
import { WishListProvider } from './components/WishListContext.tsx'

// import DisplayProducts from './components/DisplayProducts.tsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>}>
      <Route  path=''  element={<Display/>}  >
      </Route>
        <Route  path='/:productId' element={<ProductPage/>}/>
      
      <Route path='/cart' element={<CartProducts/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      
    </Route>
  )
)


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <StrictMode>
    <CartProvider>
      <WishListProvider>
        <RouterProvider router={router} />
      </WishListProvider>
    </CartProvider>
  </StrictMode>,
);
