import React, { useEffect, useState } from 'react'
import {Chart as ChartJS} from "chart.js/auto"
import { Bar, Doughnut } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

const navigate = useNavigate();
interface commentProp {
  text: string,
  date: string
}
interface dataProps{
  title: string,
  description:string,
  status:string,
  priority:string,
  id: string,
  date: string,
  time: string,
  comments: Array<commentProp>
}
const[data,setData] = useState<dataProps[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'));
const[commentpopUp, setCommentPopUp] = useState(false)
const[commentValue, setCommentValue] = useState('')
const[commentId, setCommentId] = useState('')

function handleComment(commentValue:string)
{
 
setCommentPopUp(false);
const storedData = JSON.parse(localStorage.getItem('TicketData') || '[]');
const updatedData = storedData.map((ticket: dataProps) =>{
  if(ticket.id === commentId ){
    const newComment ={
      text: commentValue,
      date: new Date().toLocaleDateString()
    };
    return {
      ...ticket,
      comments: [...ticket.comments, newComment]
    };
  }
  return ticket;
})
if(updatedData){
  localStorage.setItem('TicketData', JSON.stringify(updatedData));
  setData(updatedData);
}
console.log(data);
setCommentValue(''); 
}


useEffect(() => {
  
if(commentpopUp)
{
  document.body.style.overflow = 'hidden'
}
else 
{
  document.body.style.overflow = 'unset'
}
  
},[commentpopUp])


  return (
    <div> 
       <div className='navbar h-20 bg-primary-1 flex flex-row justify-around  lg:h-30'>
       <p className='text-quaternary-1 text-2xl font-extrabold my-auto md:text-3xl lg:text-4xl xl:text-5xl'> TicketNow </p>
       <div className='flex flex-row gap-2'> 
       <button className="bg-quaternary-1 h-fit w-fit px-2 py-1 rounded-md text-primary-1 my-auto cursor-pointer md:text-lg  lg:px-4  xl:rounded-md " onClick={() =>{navigate('/submitTicket')}} >Add ticket</button>
      </div>
      </div>
    <div className='h-auto max-h-auto w-auto max-w-auto px-3 my-5  md:px-6'>
      <div className='flex flex-col gap-5'> 
        <div className='h-fit w-fit px-2 py-5 bg-primary-1 rounded-md'>
         <Bar
            data={{
                labels:  [...new Set(data.map(item => item.status))],
                datasets: [{
                    label: "Status", 

                    
                    data: [data.filter(data => data.status ==='Pending').length,
                      data.filter(item => item.status ==='Open').length,
                      data.filter(item => item.status==='Resolved').length
                    ],
                    backgroundColor:[
                        "#b94658",
                        "#c3b93c",
                        "#54ba45"
                    ],
                    borderRadius: 5
                },
              
              ]
            }}
            />
        </div>
          
            <div className='h-fit w-fit px-2 py-5 bg-primary-1 rounded-md'>
           
         <Doughnut
            data={{
                labels:  [...new Set(data.map(item => item.priority))],
                datasets: [{
                    label: "Status", 

                    
                    data: [data.filter(data => data.priority ==='Medium').length,
                      data.filter(item => item.priority ==='High').length,
                      data.filter(item => item.priority==='Low').length
                    ],
                    backgroundColor:[
                        "#b94658",
                        "#c3b93c",
                        "#54ba45"
                    ]
                   
                },
              
              ]
            }}
            />
        </div>
</div>


        <table className='h-auto w-full mx-auto bg-quaternary-1 rounded-lg table-auto   '>
        <thead className='h-16'> 
        <tr className='bg-gray-300 text-center'>
               
                <th> Title </th>
                <th className='hidden text-center'> Description</th>
                <th className='text-center'> Priority </th>
                <th className='md:text-center'> Status </th>
                <th className='md:text-center'> Date </th>
                <th className=''> Action</th>
        </tr>
        </thead>
        <tbody className=''>
        {
          data.map(item =>
            
            <tr className='odd:bg-gray-100 even:bg-gray-200 hover:scale-101 h-16 ' key={item.id}>
               
                <td  className='max-w-4 overflow-hidden truncate text-center'>{item.title}</td>
                <td  className='max-w-6 overflow-hidden truncate hidden'>{item.description}</td>
                <td  className='text-center'>{item.priority}</td>
                <td  className='md:text-center'>{item.status} </td>
                <td  className='md:text-center'> {item.date}</td>
                <td  className='md:flex md:flex-col md:items-center md:justify-center h-16'> <button className='h-fit w-fit px-1 py-2 bg-primary-1 text-xs ml-2 text-white font-bold rounded-md my-auto' onClick={()=> {setCommentPopUp(true); setCommentId(item.id)}}> Add comment </button></td>
            </tr>
  
          )
        }
      </tbody>
    </table>
        {
          commentpopUp && 
          <div className='fixed z-10 inset-0 bg-black/50 grid place-items-center'>
            <div className='bg-white h-fit w-fit px-10 py-8 rounded-md'>
               
              <textarea className='border border-black rounded-md w-full px-2  py-1' rows={3} value={commentValue} onChange={(e)=>{setCommentValue(e.target.value)}}></textarea>
              <div className='flex flex-row mx-auto gap-2'>
              <button className='h-fit w-fit px-1 py-2 bg-quaternary-1 text-primary-1 font-bold border border-primary-1 rounded-md mt-5 cursor-pointer' onClick={() =>{setCommentPopUp(false)}}> Cancel </button>
             <button className='h-fit w-fit px-2 py-2 bg-primary-1 text-quaternary-1 rounded-md mt-5 cursor-pointer' onClick={()=> {setCommentPopUp(false); handleComment(commentValue)}}> Add comment </button>
            </div>
            </div>
          </div> 
        }
    <p> Comment history </p> 

    <div className='h-auto max-h-auto bg-quaternary-1 py-6'> 
    {
      data.map(item =>(
        <div key={item.id} className='h-full w-full py-6'> 
        <p>{item.id}</p>
        {
          item.comments && item.comments.length>0 ? (
            item.comments.map((comment,index) =>(
              <div className='flex flex-row' key={index} >
              <p>{comment.text}</p>
              <p>{comment.date}</p>
              </div>
            ))
          ) : <p> No comment to show </p>
        }
        </div>
      )
      )
    }
    </div>
</div>
</div>
  )
}

export default Dashboard