import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SubmitTicket = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority:''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}  className='flex flex-col h-fit w-fit gap-8 border border-black  rounded-md m-auto py-6 px-4 bg-fuchsia-200'>
        
      <label htmlFor="title">title</label>
      <input
        id="title"
        name="title"
        type="text"
        className='h-10 w-fit px-2 bg-white rounded-md border border-gray-300 focus:outline-violet-900'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        className='h-20 w-full bg-white rounded-md px-2 py-1 border border-gray-300 focus:outline-violet-900'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      ></textarea>
      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

   <select
            name='priority'
            className='bg-white rounded-md border border-gray-300 focus:outline-violet-900'
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          > Priority
            <option value="Low" className='rounded' id='low'>Low</option>
            <option value="Medium" className='rounded' id='medium'>Medium</option>
            <option value="High" className='rounded' id='high'>High</option>
          </select>
      {formik.touched.priority && formik.errors.priority ? (
        <div>{formik.errors.priority}</div>
      ) : null}

      <button type="submit" className='h-fit w-fit px-6 py-2 bg-fuchsia-500 rounded-md text-white cursor-pointer hover:bg-fuchsia-700'>Submit</button>
    </form>
  );
};
export default SubmitTicket