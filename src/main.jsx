import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'
import './index.css'
import './polish.css'
import './products.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/products/:slug" element={<ProductPage />} />
    </Routes>
  </BrowserRouter>
)
