import  { useEffect, useState } from 'react'
import Oops from '../components/Oops';
import { Delete02Icon, MultiplicationSignIcon } from "hugeicons-react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  
interface dataProps{
  title: string,
  description:string,
  status:string,
  priority:string,
  id: string,
  date: string,
  time: string
}
  const navigate = useNavigate();
  const[data, setData] = useState<dataProps[]>(JSON.parse(localStorage.getItem('TicketData') || '[]'))
  const[openPopUp, setOpenPopUp] = useState(false);
  const[deleteId, setdeleteId] = useState('');
  const[updateId, setUpdateId] = useState('');
  const[updateValue, setUpdateValue] = useState('')
  const[openUpdatePopup, setOpenUpdatePopup] = useState(false)
  const[search, setSearch] = useState('');
  const[filteredItems, setFilteredItems] = useState(data);
 // const[selectedFilters, setSelectedFilters]= useState([]);
 const[filter, setFilter] = useState(false);
  useEffect(() => {
    if(openPopUp || openUpdatePopup){
      document.body.style.overflow ='hidden'
    }
    else{
      document.body.style.overflow ='unset'
    }
   
  }, [openPopUp, openUpdatePopup])


function handleDelete(deleteId:string)
{
  setData(data=> { 
    const updatedData = data.filter((item)=>item.id!== deleteId)
    localStorage.setItem('TicketData',JSON.stringify(updatedData));
    return updatedData
  })
  setOpenPopUp(false)
}

function handleUpdate(updateId:string){
  //console.log("updateId", updateId)
  //console.log("updated value", e.target.value);
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
   localStorage.setItem('TicketData', JSON.stringify(updatedData));
   setData(updatedData);
  }
}

//useEffect(() => {
//handleFilterStatus;
//  
//}, [filter])



const handleFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) =>{
  //console.log(e.target.value)
  const filtered = data.filter((item)=>{
    if(e.target.value ==='Low')
      return item.priority === 'Low';
    else if(e.target.value === 'Medium')
      return item.priority === 'Medium'
    else if(e.target.value === 'High')
      return item.priority=== 'High'
    else if(e.target.value === 'All')
      return item;
      
  })
console.log(filtered);
setFilteredItems(filtered);
}

const handleFilterPriority = (e: React.ChangeEvent<HTMLSelectElement> ) =>
{

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
  <MultiplicationSignIcon size={30} className='cursor-pointer place-self-end-safe' onClick={()=>{setOpenUpdatePopup(false)} } /> 
      <div className='flex flex-col gap-y-8'> 
      <p> Update status for ID: {updateId} ?</p>
      <select className='h-fit w-fit px-2 py-1 rounded-md border border-primary-1'  value={updateValue} onChange={(e)=>{setUpdateValue(e.target.value)}} >
        <option> Open </option>
        <option> Pending </option>
        <option> Resolved </option>
      </select>
      </div>
      <div className='flex flex-row  gap-4 md:justify-between'> 
      <button className='h-fit w-fit px-6 py-2 bg-quaternary-1 border border-primary-1 rounded-sm text-primary-1 font-bold'> Cancel</button>
      <button className='h-fit w-fit px-6 py-2 bg-primary-1 rounded-sm text-quaternary-1 font-bold cursor-pointer' onClick={()=>{setOpenUpdatePopup(false); saveInLocalStorage(); } }> Update</button>
      </div>
    </div>
  </div>
}


    <div className='h-screen w-full px-3 md:px-4 bg-white '> 
     <div className='md:flex md:flex-row md:justify-between'>
    <input placeholder='Search Query' className='px-2 h-10 w-5/7  mt-4 md:w-2/7 bg-white rounded-md border border-fuchsia-900 focus:outline-primary-1' onChange={(e)=>{setSearch(e.target.value);}}/>
   <div className='flex flex-row justify-evenly mt-5 md:gap-x-4'> 
    <label className='mt-2'> Priority</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' onChange={(e)=>{ handleFilterStatus(e)}}>
      <option value='All'> All</option>
      <option value='Low'> Low</option>
      <option value='Medium'> Medium</option>
      <option value='High'> High</option>
    </select>
     <label className='mt-2'> Status</label>
    <select className='h-fit w-fit px-2 py-1 border border-black rounded-md ml-2 bg-white focus:outline-primary-1' onChange={(e)=>{handleFilterPriority(e)}}>
      <option value='All'> All</option>
      <option value='Open'> Open</option>
      <option value='Pending'> Pending</option>
      <option value='Resolved'> Resolved</option>
    </select>
    </div>
   </div>
   
   <div className=' lg:grid lg:grid-cols-3 lg:space-x-3'> 
    {
       
      data.filter((item)=>{
        return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
      }).map(item =>
       
      <div className='h-auto max-h-auto w-auto max-w-auto space-y-4 px-2 py-4 border border-fuchsia-800 bg-quaternary-1 text-primary-1  rounded-md mt-10 ' key={item.id}>
        <div className='flex flex-row justify-between'> 
        <p>ID: {item.id}</p>
        <p>{item.priority}</p>
        </div>
        <p className='max-w-6/7 overflow-hidden truncate'>{item.title} </p>
        <div className='flex gap-2 max-w-fit'> 
        <Link className='text-primary-1 font-bold h-fit w-fit px-2 py-2 border border-primary-1 rounded-md' to={`/viewTicket/:${item.id}`}>View</Link>
        <button className='text-white font-bold h-fit w-fit px-2 py-2 bg-primary-1 rounded-md cursor-pointer hover:bg-blue-950' onClick={()=>{setUpdateId(item.id); setOpenUpdatePopup(true); handleUpdate(item.id)}}>Update Status</button>
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