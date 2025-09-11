

import { BrowserRouter,Routes, Route, } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SubmitTicket from './pages/SubmitTicket'
import ViewTicket from './pages/ViewTicket' 

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path ='/submitTicket' element={<SubmitTicket/>}/>
      <Route path='/viewTicket/:id' element={<ViewTicket/>}/> 
      </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App
