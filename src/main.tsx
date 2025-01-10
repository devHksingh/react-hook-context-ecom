import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import CartProducts from './components/CartProducts.tsx'
import WishList from './components/WishList.tsx'

import ErrorPage from './ErrorPage.tsx'
import Display from './components/Display.tsx'
import { CartProvider } from './components/CartContext.tsx'

// import DisplayProducts from './components/DisplayProducts.tsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>}>
      <Route  path=''  element={<Display/>}  >
        <Route  path='/:productId' element={<Display/>}/>
      </Route>
      
      <Route path='/cart' element={<CartProducts/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
