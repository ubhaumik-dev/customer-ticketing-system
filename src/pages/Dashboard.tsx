import React, { useEffect, useState } from 'react'
import {Chart as ChartJS} from "chart.js/auto"
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {

interface dataProps{
  title: string,
  description:string,
  status:string,
  priority:string,
  id: string,
  date: string,
  time: string,
  comments: object
}

const[data,setData] = useState<dataProps[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'));
const[comment, setComment] = useState(false)
const[commentValue, setCommentValue] = useState('')

function handleComment(commentValue:string)
{
 console.log(comment);
 setComment(false);
 let nObj = {comment : commentValue};

 setCommentValue('');
}


useEffect(() => {
  
if(comment)
{
  document.body.style.overflow === 'hidden'
}
else 
{
  document.body.style.overflow === 'unset'
}
  
}, [comment])

  return (
    <div className='h-auto max-h-auto w-auto max-w-auto  px-3 md:px-6'>
        <div className='h-fit w-fit px-2 py-5 bg-primary-1 rounded-md'>
            <p className='text-quaternary-1'> Tickets by Status </p>

        </div>
        <table className='h-screen w-full mx-auto bg-quaternary-1 rounded-lg table-auto  py-1 text-left '>
          <tbody> 
        <tr className='bg-gray-300 text-center'>
               
                <th> Title </th>
                <th className='hidden text-center '> Description</th>
                <th className='text-center'> Priority </th>
                <th className='md:text-center'> Status </th>
                <th className='md:text-center'> Date </th>
                <th className=''> Action</th>
        </tr>
        {
          data.map(item =>
            
            <tr className='odd:bg-gray-100 even:bg-gray-200' key={item.id}>
               
                <td className=' max-w-4 overflow-hidden truncate text-center'>{item.title}</td>
                <td className=' max-w-6 overflow-hidden truncate hidden'>{item.description}</td>
                <td className='text-center'>{item.priority}</td>
                <td className='md:text-center' >{item.status} </td>
                <td className='md:text-center'> {item.date}</td>
                <td> <button className='h-fit w-fit px-1 py-2 bg-primary-1 text-xs text-white font-bold rounded-md' onClick={()=> {setComment(true)}}> Add comment </button></td>
            </tr>
  
          )
        }
      </tbody>
    </table>
        {
          comment && 
          <div className='fixed z-10 inset-0 bg-black/50 grid place-items-center'>
            <div className='bg-white h-fit w-fit px-10 py-8 rounded-md'>
               
              <textarea className='border border-black rounded-md w-full' rows={3} value={commentValue} onChange={(e)=>{setCommentValue(e.target.value)}}></textarea>
              <div className='flex flex-row mx-auto gap-2'>
                <button className='h-fit w-fit px-1 py-2 bg-quaternary-1 text-primary-1 font-bold border border-primary-1 rounded-md mt-5' onClick={() =>{setComment(false)}}> Cancel </button>
             <button className='h-fit w-fit px-2 py-2 bg-primary-1 text-quaternary-1 rounded-md mt-5' onClick={()=>handleComment(commentValue)}> Add comment </button>
            </div>
            </div>
          </div> 
        }
    
    </div>
  )
}

export default Dashboard