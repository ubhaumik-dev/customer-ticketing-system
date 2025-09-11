//import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

interface dataProps{
  title: string,
  description:string,
  priority:string,
  status:string,
  id: string,
  date: string,
  time: string
}
const[formData, setFormData] = useState<dataProps >({
  title :'',
  description:'',
  priority:'',
status:'',
id:'',
date:'',
time:''
})
//const[title,setTitle] = useState('')
const ViewTicket = () => {
  const {id} = useParams();

  useEffect(() => {
  console.log(id);
  if(id){
  const slicedId = id.slice(1);
  console.log(slicedId)
  }
   const storedData = localStorage.getItem('TicketData');
   //console.log(storedData);
   if(storedData){
    const parsedData = JSON.parse(storedData)
    //console.log(parsedData);
    //console.log("parsedData type is",typeof parsedData)
    //let formData: dataProps[] = parsedData.filter((ticket:dataProps) => ticket.id === slicedId );
   //console.log(formData); 
   //setFormData(parsedData[])
   }
  }, [])
  
  return (
    <div className='w-screen h-screen bg-primary-1 flex flex-col items-center xl:py-2'>
    <h1 className='text-quaternary-1 text-center font-bold text-3xl md:text-4xl mt-5'>Submit Ticket</h1>
    <form className='flex flex-col h-fit w-fit border border-black  rounded-md mx-auto my-auto py-6 px-4 bg-quaternary-1 mt-10 max-h-fit md:w-1/2'>
        <p> {id}</p>
      <label htmlFor="title" className='text-primary-1'>title</label>
      <input
        id="title"
        name="title"
        type="text"
        className='h-10 w-full px-2 bg-white rounded-md border border-gray-300 focus:outline-violet-900'
        readOnly
      />
     

      <label htmlFor="description" className='mt-5 text-primary-1'>Description</label>
      <textarea
        id="description"
        name="description"
        rows={4}
        className=' w-full resize-none bg-white rounded-md px-2 py-1 md:py-4 xl:py-8 border border-gray-300 focus:outline-violet-900'
      readOnly
      ></textarea>
    
<label className='mt-5 text-primary-1'> Priority</label>
            <select
            name='priority'
            className='bg-white h-10 rounded-md border border-gray-300  focus:outline-violet-900 lg:w-1/2'
            disabled> 
            <option value="Low" className='rounded' id='low' defaultChecked>Low</option>
            <option value="Medium" className='rounded' id='medium'>Medium</option>
            <option value="High" className='rounded' id='high'>High</option>
          </select>
    
      <label className='mt-5 text-primary-1'> Status </label>
   <select
            name='status'
            className='bg-white h-10 rounded-md border border-gray-300  focus:outline-violet-900 lg:w-1/2'
           disabled
           
          > 
            <option value="Open" className='rounded' id='low' defaultChecked>Open</option>
            <option value="Pending" className='rounded' id='medium'>Pending</option>
            <option value="Resolved" className='rounded' id='high'>Resolved</option>
          </select>
      

      <button type="submit" className='h-fit w-fit px-6 py-2 bg-primary-1 rounded-md mt-5 text-white cursor-pointer lg:m-auto lg:mt-7'>Submit</button>
    </form>
    </div>
  )
}

export default ViewTicket