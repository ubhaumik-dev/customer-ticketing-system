import React, { useState } from 'react'
import Oops from '../components/Oops';

import '../App.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  
interface dataType{
  title: string,
  description:string,
  priority:string,
  id: string,
  date: string,
  time: string
}
  const navigate = useNavigate();
  const [data, setData] = useState<dataType[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'))
  return (
    
    <div >
      <div className='navbar h-20 bg-blue-300 flex flex-row justify-evenly lg:h-30'>
       <p className='text-fuchsia-800 text-2xl font-extrabold my-auto md:text-3xl lg:text-4xl xl:text-5xl'> TicketNow </p>
       <button className="bg-fuchsia-600 h-fit w-fit px-6 py-2 rounded-md text-white my-auto cursor-pointer md:text-2xl lg:py-4 lg:px-6  xl:rounded-lg hover:bg-fuchsia-700" onClick={() =>{navigate('/submitTicket')}} >Add ticket</button>
      </div>
     {data.length===0 ? <Oops/>:
    <> 
    {
      data.map(item =><p key={item.id}>{item.id}</p>)
    }
    
    </>} 
    </div>

  )
}

export default Home