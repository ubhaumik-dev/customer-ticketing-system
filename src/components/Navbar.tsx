import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
     <div className='navbar h-20 bg-primary-1 flex flex-row justify-around lg:h-30'>
       <p className='text-quaternary-1 text-2xl font-extrabold my-auto md:text-3xl lg:text-4xl xl:text-5xl'> TicketNow </p>
       <div className='flex flex-row gap-2'> 
       <button className="bg-quaternary-1 h-fit w-fit px-2 py-1 rounded-md text-primary-1 my-auto cursor-pointer md:text-lg  lg:px-4  xl:rounded-md " onClick={() =>{navigate('/submitTicket')}} >Add ticket</button>
       <button className="bg-quaternary-1 h-fit w-fit px-2 py-1 rounded-md text-primary-1 my-auto cursor-pointer md:text-lg  lg:px-4  xl:rounded-md" onClick={() =>{navigate('/dashboard')}} >Dashboard </button>
      </div>
      </div>
  )
}

export default Navbar