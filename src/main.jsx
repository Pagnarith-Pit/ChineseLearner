import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
//import { SupabaseProvider } from './context/SupabaseProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SupabaseProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </SupabaseProvider> */}
  </StrictMode>,
)
