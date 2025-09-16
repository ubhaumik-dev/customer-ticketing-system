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



const ViewTicket = () => {
  const {id} = useParams();
  const[title,setTitle] = useState('')
  const[description, setDescription] = useState('');
  const[priority, setPriority] = useState('');
  const[status, setStatus] = useState('')
  const[date,setDate] = useState('');
  const[time, setTime] = useState('')
  useEffect(() => {
  //console.log(id);
  if(id){
  var slicedId = id.slice(1);
  //console.log(slicedId)
  //console.log(typeof slicedId)
   //var nId = (slicedId)
  }
   const storedData = localStorage.getItem('TicketData');
   //console.log(storedData);
   if(storedData){
    const parsedData = JSON.parse(storedData)
    //console.log(parsedData);
    //console.log("parsedData type is",typeof parsedData)
    let filteredData: dataProps[] = parsedData.filter((ticket:dataProps) => ticket.id === slicedId );
  // console.log(filteredData); 
  //setFormData(filteredData[])
  //console.log(Object.keys(filteredData))
  setTitle(JSON.stringify(filteredData[0].title).replace(/^"(.+)"$/,'$1'))

  setDescription(JSON.stringify(filteredData[0].description).replace(/^"(.+)"$/,'$1'))
  setPriority(JSON.stringify(filteredData[0].priority).replace(/^"(.+)"$/,'$1'))
  setStatus(JSON.stringify(filteredData[0].status).replace(/^"(.+)"$/,'$1'))
  setDate(JSON.stringify(filteredData[0].date).replace(/^"(.+)"$/,'$1'))
  setTime(JSON.stringify(filteredData[0].time).replace(/^"(.+)"$/,'$1'));
 // console.log(filteredData[2]);
   }
  }, [])
  
  return (
    <div className='w-auto h-auto max-h-auto bg-primary-1 flex flex-col items-center md:h-auto xl:py-2'>
    <h1 className='text-quaternary-1 text-center font-bold text-3xl md:text-4xl mt-5'>Ticket ID {id}</h1>
    <form className='flex flex-col h-fit w-fit border border-black space-y-2  rounded-md mx-auto my-4 py-6 px-4 bg-quaternary-1 mt-10 max-h-fit  md:w-1/2'>
       <div className='flex flex-row'> 
         <p className='font-bold'> ID </p> 
        <p className='font-normal ml-2'> {id}</p> 
      </div> 
      <label htmlFor="title" className='text-primary-1 font-bold'>Title</label>
      <div className='h-10 max-h-auto  w-full   rounded-md  focus:outline-none hover:cursor-pointer'> {title}
      </div>
     

      <label htmlFor="description" className='mt-5 text-primary-1 font-bold'>Description</label>
      <textarea
        id="description"
        name="description"
        value = {description}
        rows={4}
        className=' w-full resize-none bg-white rounded-md px-2 py-1 md:py-4 xl:py-8 border border-gray-300 focus:outline-none hover:cursor-pointer'
      readOnly
      ></textarea>
    
<label className='mt-5 text-primary-1 font-bold' > Priority</label>
<input value= {priority} className='h-8 w-full px-2 py-1 bg-white rounded-md focus:outline-none hover:cursor-pointer' readOnly/>
    
<label className='mt-5 text-primary-1 font-bold'> Status </label>
<input value={status} className='h-8 w-full px-2 py-1 bg-white rounded-md  focus:outline-none hover:cursor-pointer' readOnly/>
<div className='flex flex-row'>
  <p className='font-bold'> Date created </p>
  <p className='ml-2'> {date}</p>
</div>

<div className='flex flex-row'>
  <p className='font-bold'> Time created </p>
  <p className='ml-2'> {time}</p>
</div>
    </form>
    </div>
  )
}

export default ViewTicket