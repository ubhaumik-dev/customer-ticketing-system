import React from 'react';

import { useNavigate } from 'react-router-dom';
const Oops = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col my-auto '>
        <img src= "src\images\images (1).jfif" alt='' className='md:w-5/7 md:5/7 mx-auto lg:w-3/7 lg:h-3/7  xl:w-1/7 xl:h-1/7'/>
        <p className='text-2xl text-primary-1 font-bold mx-auto mt-5 lg:text-4xl'> No Ticket to Show </p>
     <div className='mx-auto mt-10'> <button className='bg-primary-1 h-fit w-fit px-6 py-2 rounded-md text-white my-auto cursor-pointer  md:text-xl lg:py-4 lg:px-6 xl:rounded-lg' onClick={() =>{navigate('/submitTicket')}} > Add ticket</button> </div> 
    </div>
  )
}

export default Oops