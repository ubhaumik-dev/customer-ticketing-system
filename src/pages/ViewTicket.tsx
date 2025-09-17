//import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface dataProps{
  title: string,
  description:string,
  priority:string,
  status:string,
  id: string,
  date: string,
  time: string,
  comments: object
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
    <div className='w-auto h-screen max-h-screen px-3 bg-primary-1 flex flex-col items-center '>
    <h1 className='text-quaternary-1 text-center font-bold text-3xl md:text-4xl mt-5'>Ticket ID {id}</h1>
    <div className='flex flex-col h-fit w-fit border border-black space-y-2  rounded-md mx-auto my-4 py-6 px-4 bg-quaternary-1 mt-10 max-h-fit  md:w-1/2 xl:w-fit xl:px-12'>
       <div className='flex flex-row'> 
         <p className='font-bold'> ID </p> 
        <p className='font-normal ml-2'> {id}</p> 
      </div> 
      <div className='flex flex-row gap-2'> 
      <div className='text-primary-1 font-bold'>Title</div>
      <div className='h-fit max-h-auto  w-full  rounded-md'> {title} </div>
      </div>
      <div className='flex flex-row gap-1'> 
      <div  className=' text-primary-1 font-bold'>Description</div>
      <div className='w-full resize-none  rounded-md px-2'>{description}</div>
      </div>
      <div className='flex flex-row'> 
      <div className=' text-primary-1 font-bold' > Priority</div>
      <div  className='h- fit w-full px-2 rounded-md '> {priority} </div>
    </div>
    <div className='flex flex-row gap-1'>
    <div className=' text-primary-1 font-bold'> Status </div>
    <div className='h-fit w-full px-2   rounded-md  '>{status} </div>
    </div>
<div className='flex flex-row gap-2'>
  <p className='font-bold'> Date created </p>
  <p className=''> {date}</p>
</div>

<div className='flex flex-row gap-2'>
  <p className='font-bold'> Time created </p>
  <p className=''> {time}</p>
</div>
<Link className='h-fit w-fit px-6 py-2 bg-primary-1 text-quaternary-1 font-bold rounded-md cursor-pointer' to='/'> Back </Link>
    </div>
    </div>
  )
}

export default ViewTicket