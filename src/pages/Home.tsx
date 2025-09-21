import  { useEffect, useState } from 'react'
import Oops from '../components/Oops';
import { Delete02Icon} from "hugeicons-react";
import '../App.css'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home= () => {

interface commentProp {
    text: string;
    date: string;
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


  //const navigate = useNavigate();
  const[data, setData] = useState<dataProps[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'))
  const[openPopUp, setOpenPopUp] = useState(false);
  const[deleteId, setdeleteId] = useState('');
  const[updateId, setUpdateId] = useState('');
  const[updateValue, setUpdateValue] = useState('')
  const[openUpdatePopup, setOpenUpdatePopup] = useState(false)
  const[search, setSearch] = useState('');
  const[filteredItems, setFilteredItems] = useState(data);
  //const[filter, setFilter] = useState(false);
  const[priority, setPriority] = useState('');
  const[status, setStatus] = useState('');
  
  useEffect(() => {
    if(openPopUp || openUpdatePopup){
      document.body.style.overflow ='hidden'
    }
    else{
      document.body.style.overflow ='unset'
    }
   
  }, [openPopUp, openUpdatePopup])

useEffect(() => {

  setFilteredItems(data.filter((ticket)=>{
    if(priority === 'All' || status=== 'All')
    {
      //console.log(status, priority)
      return data;
    }
    
    else
      return (!priority || ticket.priority === priority) && (!status || ticket.status === status)
  }))
  //console.log(status, priority)
}, [status, priority])



function handleDelete(deleteId:string)
{
  setFilteredItems(data=> { 
    const updatedData = data.filter((item)=>item.id!== deleteId)
    localStorage.setItem('TicketData',JSON.stringify(updatedData));
    return updatedData
  })
  setOpenPopUp(false)
}

function handleUpdate(updateId:string){
  //console.log("updateId", updateId)
  //console.log("updated value", e.target.value);
  setOpenUpdatePopup(true); 
  setUpdateId(updateId); 
  const storedData = localStorage.getItem('TicketData');
  if(storedData){
    const parsedData = JSON.parse(storedData);
    const filteredData:dataProps[] = parsedData.filter((ticket:dataProps)=> ticket.id=== updateId)
    setUpdateValue(filteredData[0].status)
  }
}

 function saveInLocalStorage()
 { 
  const storedData = localStorage.getItem('TicketData');
  if(storedData){
   const parsedData:dataProps[] = JSON.parse(storedData);
   const updatedData = parsedData.map(ticket => ticket.id=== updateId ? {...ticket, status: updateValue}:ticket)
   console.log("updatedData is", updatedData)
   localStorage.setItem('TicketData', JSON.stringify(updatedData));
   setFilteredItems(updatedData);
  }
}



  return (
    <div >
     <Navbar/>
    


     { status==='' && priority==='' && filteredItems.length===0 ? <Oops/>: (status!=='' || priority!=='') && filteredItems.length===0 ?
     <>
     <div className='px-3 md:px-4'> 
       <div className='md:flex md:flex-row md:justify-between'>
    <input placeholder='Search Query' className='px-2 h-10 w-5/7  mt-4 md:w-2/7 bg-white rounded-md border border-fuchsia-900 focus:outline-primary-1'  onChange={(e)=>{setSearch(e.target.value);}}/>
   <div className='flex flex-row justify-evenly mt-5 md:gap-x-4'> 
    <label className='mt-2'> Priority</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' value={priority} onChange={(e) =>{setPriority(e.target.value)}}>
      <option value='All'> All</option>
      <option value='Low'> Low</option>
      <option value='Medium'> Medium</option>
      <option value='High'> High</option>
    </select>
     <label className='mt-2'> Status</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' value={status} onChange={(e) =>{setStatus(e.target.value)}} >
      <option value='All'> All</option>
      <option value='Open'> Open</option>
      <option value='Pending'> Pending</option>
      <option value='Resolved'> Resolved</option>
    </select>
    </div>
   </div>
<p className='font-bold text-lg text-center mt-5'> No data to show</p>
</div>
     </>
     :
     <>
    {
      openPopUp &&
      
     <div className="fixed inset-0 grid place-items-center bg-black/50  px-2 z-10">
  <div className="bg-white p-6 rounded-lg shadow-lg w-fit px-4">
    <p className="text-xl font-semibold mb-4 w-fit max-w-auto"> Are you sure you want to delete the ticket ?</p>
    <div className='flex flex-row justify-center gap-4'> 
    <button className='h-fit w-fit px-6 py-2 border border-primary-1 text-primary-1 rounded-md font-bold cursor-pointer' onClick={()=>{setOpenPopUp(false)}}>Cancel </button>
    <button className='h-fit w-fit px-6 py-2 bg-red-500 hover:bg-red-700 text-quaternary-1 font-bold rounded-md cursor-pointer' onClick={()=>handleDelete(deleteId)}>Delete</button>
    </div>
  </div>
</div>
}
{
  updateId!== null  &&  openUpdatePopup &&
  <div className='fixed inset-0 bg-black/50 grid place-items-center'>
    <div className='h-auto w-auto bg-quaternary-1 px-10 py-8 rounded-md space-y-4 md:px-14'>
      <div className='flex flex-row justify-between'> 
      <p> Update status for ID: {updateId} ?</p>
      </div>
    
      <select className='h-fit w-fit px-2 py-1 rounded-md border border-primary-1 hover:cursor-pointer'  value={updateValue} onChange={(e)=>{setUpdateValue(e.target.value)}} >
        <option> Open </option>
        <option> Pending </option>
        <option> Resolved </option>
      </select>
      
      <div className='flex flex-row  gap-4 md:justify-between'> 
      <button className='h-fit w-fit px-6 py-2 bg-quaternary-1 border border-primary-1 rounded-sm text-primary-1 font-bold hover:cursor-pointer' onClick={()=>setOpenUpdatePopup(false)}> Cancel</button>
      <button className='h-fit w-fit px-6 py-2 bg-primary-1 rounded-sm text-quaternary-1 font-bold cursor-pointer' onClick={()=>{setOpenUpdatePopup(false); saveInLocalStorage(); } }> Update</button>
      </div>
    </div>
  </div>
}


    <div className='h-screen w-full px-3 md:px-4 bg-white '> 
     <div className='md:flex md:flex-row md:justify-between'>
    <input placeholder='Search Query' className='px-2 h-10 w-5/7  mt-4 md:w-2/7 bg-white rounded-md border border-fuchsia-900 focus:outline-primary-1'  onChange={(e)=>{setSearch(e.target.value);}}/>
   <div className='flex flex-row justify-evenly mt-5 md:gap-x-4'> 
    <label className='mt-2'> Priority</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' value={priority} onChange={(e) =>{setPriority(e.target.value)}}>
      <option value='All'> All</option>
      <option value='Low'> Low</option>
      <option value='Medium'> Medium</option>
      <option value='High'> High</option>
    </select>
     <label className='mt-2'> Status</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' value={status} onChange={(e) =>{setStatus(e.target.value)}} >
      <option value='All'> All</option>
      <option value='Open'> Open</option>
      <option value='Pending'> Pending</option>
      <option value='Resolved'> Resolved</option>
    </select>
    </div>
   </div>




   <div className=' lg:grid lg:grid-cols-3 lg:space-x-3'> 
    {
       
      filteredItems.filter((item)=>{
        return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
      }).map(item =>
       
      <div className='h-auto max-h-auto w-auto max-w-auto space-y-4 px-2 py-4 border border-fuchsia-800 bg-quaternary-1 text-primary-1  rounded-md mt-10 shadow-xl/30 hover:scale-102' key={item.id}>
        <div className='flex flex-row justify-between'> 
        <p className='font-bold'>ID: {item.id}</p>
       <p className={item.priority==='Low'? 'h-fit w-fit px-1 py-1 bg-green-200 text-green-600 text-center rounded-sm font-bold': item.priority=== 'High' ? 'h-fit w-fit px-1 py-1 bg-red-300 font-bold rounded-sm text-red-800 text-center': 'text-yellow-600 text-center bg-yellow-200 h-fit w-fit px-1 py-1 rounded-sm font-bold'}>{item.priority}</p>
        </div>
        <p className='max-w-6/7 overflow-hidden truncate'>{item.title} </p>
        <div className='flex gap-2 max-w-fit'> 
        <Link className='text-primary-1 font-bold h-fit w-fit px-2 py-2 border border-primary-1 rounded-md' to={`/viewTicket/:${item.id}`}>View</Link>
        <button className='text-white font-bold h-fit w-fit px-2 py-2 bg-primary-1 rounded-md cursor-pointer hover:bg-blue-950' onClick={()=>{ handleUpdate(item.id)}}>Update Status</button>
        <Delete02Icon size={30} className='mt-2 cursor-pointer' onClick={()=>{setOpenPopUp(true); setdeleteId(item.id)}}/>
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