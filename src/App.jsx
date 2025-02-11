import { Route, Routes } from 'react-router-dom'
import { Main } from './Components/Main/MainCompo'
import { SignUp } from './Components/Auth/SignUp'
import { SignIn } from './Components/Auth/SignIn'

function App() {
  return (
    <>
     <Routes>
       <Route path='/' element={<Main />} />
       <Route path='/signup' element={<SignUp />} />
       <Route path='/signin' element={<SignIn />} />
     </Routes>
    </>
  )
}

export default App
