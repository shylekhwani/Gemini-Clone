
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GeminiContextProvider } from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <GeminiContextProvider>
       <App />
  </GeminiContextProvider>
)
