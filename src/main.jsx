
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GeminiContextProvider } from './Context/Context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseContextProvider } from './Context/FirebaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GeminiContextProvider>
      <FirebaseContextProvider>
            <App />
      </FirebaseContextProvider>
    </GeminiContextProvider>
  </BrowserRouter>
)
