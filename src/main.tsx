import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Products from './components/Products.tsx'
import CartProducts from './components/CartProducts.tsx'
import WishList from './components/WishList.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Products/>} />
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
