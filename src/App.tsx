

import { BrowserRouter,Routes, Route, } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SubmitTicket from './pages/SubmitTicket'
import ViewTicket from './pages/ViewTicket' 
import Dashboard from './pages/Dashboard'



function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element={<Home  />}/>
      <Route path ='/submitTicket' element={<SubmitTicket/>}/>
      <Route path='/viewTicket/:id' element={<ViewTicket/>}/> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App
