import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

interface dataType{
  title: string,
  description:string,
  priority:string,
  id: string,
  date: string,
  time: string
}
const SubmitTicket = () => {
  const formik = useFormik({
    initialValues: {
      //id:crypto.randomUUID(),
      //date: new Date().toLocaleDateString(),
      //time: new Date().toLocaleTimeString(),
      title: '',
      description: '',
      priority:'',
      id:'',
      date:'',
      time:''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .required('Required'),
      description: Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Required'),
      priority: Yup.string().required('Required'),
    }),
    onSubmit: (values: dataType ) => {
      //alert(JSON.stringify(values, null, 2));
      const id= crypto.randomUUID();
      const date = new Date().toLocaleDateString();
      const time= new Date().toLocaleTimeString();
      //console.log(values)
      //console.log(typeof values);
      var obj2 = {id:id, date: date, time: time};
      Object.assign(values,obj2);
      //values['id'] = id;
      //values['date'] = date;
      //values['time'] = time;
      let data = JSON.parse(localStorage.getItem('TicketData') || '[]')
      if(!Array.isArray(data))
      {
        data =[];
      }
      //console.log(data)

      data.push(values);
      localStorage.setItem('TicketData', JSON.stringify(data));
    
    },
  });
  return (
    <>
    <div className='w-screen h-screen bg-fuchsia-50  xl:py-2'>
    <h1 className='text-fuchsia-600 text-center font-bold text-4xl my-auto'>Submit Ticket</h1>
    <form onSubmit={formik.handleSubmit}  className='flex flex-col h-fit w-fit border border-black  rounded-md mx-auto my-auto py-6 px-4 bg-fuchsia-200 mt-10 max-h-fit md:w-1/2'>
        
      <label htmlFor="title">title</label>
      <input
        id="title"
        name="title"
        type="text"
        className='h-10 w-full px-2 bg-white rounded-md border border-gray-300 focus:outline-violet-900'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="description" className='mt-5'>Description</label>
      <textarea
        id="description"
        name="description"
        rows={4}
        className=' w-full resize-none bg-white rounded-md px-2 py-1 md:py-4 xl:py-8 border border-gray-300 focus:outline-violet-900'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      ></textarea>
      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}
<label className='mt-5'> Priority</label>
   <select
            name='priority'
            className='bg-white h-10 rounded-md border border-gray-300  focus:outline-violet-900 lg:w-1/2'
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
           
          > 
            <option value="Low" className='rounded' id='low' defaultChecked>Low</option>
            <option value="Medium" className='rounded' id='medium'>Medium</option>
            <option value="High" className='rounded' id='high'>High</option>
          </select>
      {formik.touched.priority && formik.errors.priority ? (
        <div>{formik.errors.priority}</div>
      ) : null}

      <button type="submit" className='h-fit w-fit px-6 py-2 bg-fuchsia-500 rounded-md mt-5 text-white cursor-pointer hover:bg-fuchsia-700 lg:m-auto lg:mt-7'>Submit</button>
    </form>
    </div>
  </>
  );
};
export default SubmitTicket