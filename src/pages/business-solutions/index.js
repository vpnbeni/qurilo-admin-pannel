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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newServiceName, setNewServiceName] = useState("");
    const [newSlugName, setNewSlugName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const pagePush = useRouter();

    const refreshData = async () => {
        try {
            const res = await fetch(`${API_URL}auth/v1/business/category`);
            const newData = await res.json();
            setData(newData.data);
        } catch (err) {
            console.error('Failed to refresh data', err);
        }
    };

    const handleAddService = async () => {
        if (!newServiceName || !newSlugName) {
            setError("Both fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}auth/v1/business/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    servicesName: newServiceName,
                    slugName: newSlugName,
                }),
            });

            if (res.status === 200) {
                setIsAddModalOpen(false);
                setNewServiceName("");
                setNewSlugName("");
                refreshData();
            } else {
                console.error("Failed to add service");
                setError("Failed to add service. Please try again.");
            }
        } catch (err) {
            console.error("Failed to add service", err);
            setError("Failed to add service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='font-semibold text-2xl py-5 flex justify-between'>
                <span>Business solution :-</span>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue text-white px-4 text-lg py-2 font-semibold rounded-md"
                >
                    ADD
                </button>
            </div>
         
            <div className='flex gap-5 '>
                {data && data.length > 0 ? (
                    data.map(service => (
                        <div key={service._id} className='mb-2 rounded-xl p-2 px-4 py-5 bg-gray-200 shadow-lg shadow-[#6E0854]-500/50  mt-2 flex justify-between items-end gap-2' >
                            <p className='capitalize font-semibold p-1 px-10 cursor-pointer' onClick={() => pagePush.push(`/business-solutions/${service.slugName}`)}>
                                {service.slugName} <br/>
                                {service.servicesName}
                                </p>
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
            {isAddModalOpen && (
                <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-[300px] relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-2 right-2 text-black"
                        >
                            <AiOutlineClose size={25} />
                        </button>
                        <h2 className="text-lg font-bold my-4">Add Service</h2>
                        <input
                            type="text"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            className="border-2 p-2 w-full mb-4"
                            placeholder="Enter service name"
                        />
                        <input
                            type="text"
                            value={newSlugName}
                            onChange={(e) => setNewSlugName(e.target.value)}
                            className="border-2 p-2 w-full mb-4"
                            placeholder="Enter slug name"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            onClick={handleAddService}
                            className={`bg-blue text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ServicesList;

const UpdateModel = ({ service, refreshData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState(service.servicesName);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${API_URL}auth/v1/service/${service._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ servicesName: updateData }),
            });

            if (res.status === 200) {
                setIsOpen(false);
                refreshData();
            } else {
                console.error('Failed to update service');
            }
        } catch (err) {
            console.error('Failed to update service', err);
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

const MetauppdateModel = ({ service, refreshData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [metaTag, setMetaTag] = useState('');
    const [metaDescription, setMetaDescription] = useState('');

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${API_URL}auth/v1/business/meta-tag/business-solution`, {
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
                console.error('Failed to update meta data');
            }
        } catch (err) {
            console.error('Failed to update meta data', err);
        }
    };

    return (
        <>
            <p className='cursor-pointer' onClick={() => setIsOpen(true)}>
                <FaMeta />
            </p>
            {isOpen && (
                <div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center'>
                    <div className='bg-white p-4 translate-x-30 rounded-md w-1/2 h-[240px] relative'>
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
                            <textarea
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
