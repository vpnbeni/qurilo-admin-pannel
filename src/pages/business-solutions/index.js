import { API_URL } from '@/api/commonApi';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { FaMeta } from "react-icons/fa6";


// Fetch data on the server side
export async function getServerSideProps() {
    try {
        const res = await fetch(`${API_URL}auth/v1/business/category`);
        const data = await res.json();
        return {
            props: {
                initialData: data?.data, 
            },
        }; 
    } catch (error) {
       console.log(error) 
    }
    
}

const ServicesList = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const pagePush = useRouter()
    const refreshData = async () => {
        const res = await fetch(`${API_URL}auth/v1/business/category`);
        const newData = await res.json();
        setData(newData.data);
    };

    return (
        <>
            <div className='font-semibold text-2xl py-5'>
                Business solution :-
            </div>
            <div className='flex gap-2'>

                {data && data.length > 0 ? (
                    data.map(service => (
                        <div key={service._id} className='mb-2 p-2 px-6 py-5 bg-[#f5f1f1] shadow-lg shadow-[#6E0854]-500/50 rounded-sm mt-2 flex justify-between items-end gap-2' >
                            <p className='capitalize font-semibold p-1 px-10 cursor-pointer' onClick={()=>pagePush.push(`/business-solutions/${service.slugName}`)}>{service.servicesName}</p>
                            <button className=''>
                                <UpdateModel service={service} refreshData={refreshData} />
                            </button>
                            <button className=''>
                                <MetauppdateModel service={service} refreshData={refreshData} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
        </>
    );
}

export default ServicesList;

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
            <p className='cursor-pointer' onClick={() => setIsOpen(true)}>
                <MdModeEditOutline />
            </p>
            {isOpen && (
                <div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center'>
                    <div className='bg-white p-4 translate-x-30 rounded-md w-[300px] h-[140px] relative'>
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
}


// // Meta UPdate // //


const MetauppdateModel = ({ service, refreshData }) => {
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
            <p className='cursor-pointer' onClick={() => setIsOpen(true)}>
                <FaMeta />
            </p>
            {isOpen && (
                <div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center'>
                    <div className='bg-white p-4 translate-x-30 rounded-md  w-1/2   h-80  relative'>
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
}