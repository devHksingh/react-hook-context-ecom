import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import CartProducts from './components/CartProducts.tsx'
import WishList from './components/WishList.tsx'

import getAllProducts from './utils/fetchProducts.ts'
import ErrorPage from './ErrorPage.tsx'

import DisplayProducts from './components/DisplayProducts.tsx'
import Products from './components/Products.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>}>
      <Route  path=''  element={<DisplayProducts/>}  >
        <Route  path='/:productId' element={<DisplayProducts/>}/>
      </Route>
      
      <Route path='/cart' element={<CartProducts/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
