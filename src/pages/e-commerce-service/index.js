import { API_URL } from '@/api/commonApi';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMeta } from "react-icons/fa6";
import { useRouter } from 'next/router';
// Fetch data on the server side
export async function getServerSideProps() {
  let initialData = [];
  try {
    const res = await fetch(`${API_URL}auth/v1/ecommerce/category`);
    const data = await res.json();
    if (data && data.data) {
      initialData = data?.data;
    }
  } catch (error) {
    console.log(error);
  }
  
  return {
    props: {
      initialData,
    },
  };
}
const DevelopmentPage = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const pagePush = useRouter()
  const refreshData = async () => {
    const res = await fetch(`${API_URL}auth/v1/ecommerce/category`);
    const newData = await res.json();
    setData(newData.data || []);
  };
  return (
    <div className='flex gap-2'>
      <div className='bg-red-100 p-2 rounded-sm'>
        <h1 className='font-bold'>Services Name :-</h1>
        {data && data.length > 0 ? (
          <ul>
            {data.map(service => (
              <li key={service._id} className='mb-2 p-2 bg-white shadow-lg rounded-sm mt-2 flex justify-between items-end  gap-1 '>
                <button className='capitalize font-semibold p-1 px-10' onClick={()=>pagePush.push(`e-commerce-service/${service.slugName}`)}> {service.servicesName}</button>
                <button>
                  <UpdateModel service={service} refreshData={refreshData} />
                </button>
                <button>
                  <MetaupdateModel service={service} refreshData={refreshData} /> 
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
};
export default DevelopmentPage;



const UpdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(service.servicesName);
  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/service/${service._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ servicesName: updateData }),
    });
    if (res.status === 200) {
      setIsOpen(false);
      refreshData();
    } else {
      // Handle error
      console.error('Failed to update service');
    }
  };
  return (
    <>
      <p className='cursor-pointer' onClick={() => setIsOpen(true)}><MdModeEditOutline /></p>
      {isOpen && (
        <div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center'>
          <div className='bg-white p-4 translate-x-30 rounded-md w-[300px] h-[140px] relative '>
            <button onClick={() => setIsOpen(false)} className='absolute !z-50 -top-7 -right-4 p-1 text-black'>
              <AiOutlineClose size={25} />
            </button>
            <p className='text-base text-black pt-4'>
              <input
                value={updateData}
                onChange={(e) => setUpdateData(e.target.value)}
                className='border-2 outline-red-200 p-1 w-[100%]'
              />
            </p>
            <button
              onClick={handleUpdate}
              className='bg-slate-400 py-1 px-2 mt-4 rounded-md text-white'>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const MetaupdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metaTag, setMetaTag] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/ecommerce/meta-tag/ecommerce-solution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metaTag: metaTag,
        metaDescription: metaDescription
      }),
    });

    if (res.status === 200) {
      setIsOpen(false);
      refreshData();
    } else {
      // Handle error
      console.error('Failed to update meta data');
    }
  };

  return (
    <>
      <p className='cursor-pointer' onClick={() => setIsOpen(true)}><FaMeta /></p>
      {isOpen && (
        <div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center'>
          <div className='bg-white p-4 translate-x-30 rounded-md w-[300px] h-[240px] relative'>
            <button onClick={() => setIsOpen(false)} className='absolute !z-50 -top-7 -right-4 p-1 text-black'>
              <AiOutlineClose size={25} />
            </button>
            <div className='text-base text-black pt-4'>
              <input
                value={metaTag}
                onChange={(e) => setMetaTag(e.target.value)}
                placeholder='Meta Tag'
                className='border-2 outline-red-200 p-1 w-[100%]'
              />
            </div>
            <div className='text-base text-black pt-4'>
              <input
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder='Meta Description'
                className='border-2 outline-red-200 p-1 w-[100%]'
              />
            </div>
            <button
              onClick={handleUpdate}
              className='bg-slate-400 py-1 px-2 mt-4 rounded-md text-white'>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};
