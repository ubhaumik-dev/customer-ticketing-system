import  { useEffect, useState } from 'react'
import Oops from '../components/Oops';
import { Delete02Icon } from "hugeicons-react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Home = () => {
  
interface dataType{
  title: string,
  description:string,
  status:string,
  priority:string,
  id: string,
  date: string,
  time: string
}
  const navigate = useNavigate();
  const [data, setData] = useState<dataType[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'))
  const [openPopUp, setOpenPopUp] = useState(false);
  const [deleteId, setdeleteId] = useState('');

  useEffect(() => {
    if(openPopUp){
      document.body.style.overflow ='hidden'
    }
    else{
      document.body.style.overflow ='unset'
    }
   
  }, [openPopUp])
function showPopup()
{
  setOpenPopUp(true);
}
function handleDelete(deleteId:string)
{
  setData(data=> { 
    const updatedData = data.filter((item)=>item.id!== deleteId)
    localStorage.setItem('TicketData',JSON.stringify(updatedData));
    return updatedData
  })
  setOpenPopUp(false)
}


  
  return (
    <div >
      <div className='navbar h-20 bg-primary-1 flex flex-row justify-evenly lg:h-30'>
       <p className='text-quaternary-1 text-2xl font-extrabold my-auto md:text-3xl lg:text-4xl xl:text-5xl'> TicketNow </p>
       <button className="bg-quaternary-1 h-fit w-fit px-6 py-2 rounded-md text-primary-1 my-auto cursor-pointer md:text-2xl  lg:px-6  xl:rounded-lg " onClick={() =>{navigate('/submitTicket')}} >Add ticket</button>
      </div>
    


     {data.length===0 ? <Oops/>:
    <> 
    {
      openPopUp &&
      
     <div className="fixed inset-0 grid place-items-center bg-black/50  px-2 z-10">
  <div className="bg-white p-6 rounded-lg shadow-lg w-fit px-4">
    <p className="text-xl font-semibold mb-4"> Are you sure you want to delete the ticket ?</p>
    <div className='flex flex-row justify-center gap-4'> 
    <button className='h-fit w-fit px-6 py-2 border border-primary-1 text-primary-1 rounded-md' onClick={()=>{setOpenPopUp(false)}}>Cancel </button>
    <button className='h-fit w-fit px-6 py-2 bg-red-500 hover:bg-red-700 text-quaternary-1 font-bold rounded-md' onClick={()=>handleDelete(deleteId)}>Delete</button>
    </div>
  </div>
</div>
}



    <div className='h-screen w-full px-3 md:px-4 bg-white '> 
     <div className='md:flex md:flex-row md:justify-between'>
    <input placeholder='Search Query' className='px-2 h-10 w-5/7  mt-4 md:w-2/7 bg-white rounded-md border border-fuchsia-900 focus:outline-primary-1'/>
   <div className='flex flex-row justify-evenly mt-5 md:gap-x-4'> 
    <label className='mt-2'> Priority</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white'>
      <option> Low</option>
      <option> Medium</option>
      <option> High</option>
    </select>
     <label className='mt-2'> Status</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white'>
      <option> Open</option>
      <option> Pending</option>
      <option> Resolved</option>
    </select>
    </div>
   </div>
   <div className=' lg:grid lg:grid-cols-3 lg:space-x-3'> 
    {
       
      data.map(item =>
       
      <div className='h-auto max-h-auto w-auto max-w-auto space-y-4 px-2 py-4 border border-fuchsia-800 bg-quaternary-1 text-primary-1  rounded-md mt-10 ' key={item.id}>
        <div className='flex flex-row justify-between'> 
        <p>ID: {item.id}</p>
        <p>{item.priority}</p>
        </div>
        <p className='max-w-6/7 overflow-hidden truncate'>{item.title} </p>
        <div className='flex gap-2 max-w-fit'> 
        <Link className='text-primary-1 font-bold h-fit w-fit px-2 py-2 border border-primary-1 rounded-md' to={`/viewTicket/:${item.id}`}>View</Link>
        <button className='text-white font-bold h-fit w-fit px-2 py-2 bg-primary-1 rounded-md'>Update Status</button>
        <Delete02Icon size={30} className='mt-2' onClick={()=>{showPopup(); setdeleteId(item.id)}}/>
        </div>
        <div>
          <p>Status:  {item.status}</p>
          <p>Created Date:  {item.date}</p>
        </div>
      </div>
    
    
      )
    }
    </div>
    </div>
    </>
    } 
    </div>

  )
}

export default Home