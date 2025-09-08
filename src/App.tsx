

import { BrowserRouter,Routes, Route, } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SubmitTicket from './pages/SubmitTicket'
function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path ='/submitTicket' element={<SubmitTicket/>}/>
      </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App
