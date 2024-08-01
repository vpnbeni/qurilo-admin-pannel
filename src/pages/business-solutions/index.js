import { API_URL } from '@/api/commonApi';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { FaMeta } from "react-icons/fa6";
import DashboardCard from '@/component/cards/DashboardCard';

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

    const pageName="business"

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
                       <DashboardCard service={service} pageName={pageName} setData={setData}/>
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

