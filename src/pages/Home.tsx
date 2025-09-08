import React from 'react'
import Oops from '../components/Oops';

import '../App.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div >
      <div className='navbar h-20 bg-blue-300 flex flex-row justify-evenly lg:h-30'>
       <p className='text-fuchsia-800 text-2xl font-extrabold my-auto md:text-3xl lg:text-4xl xl:text-5xl'> TicketNow </p>
       <button className="bg-fuchsia-600 h-fit w-fit px-6 py-2 rounded-md text-white my-auto cursor-pointer md:text-2xl lg:py-4 lg:px-6  xl:rounded-lg hover:bg-fuchsia-700" onClick={() =>{navigate('/submitTicket')}} >Add ticket</button>
      </div>
      <Oops/>
    </div>
  )
}

export default Home