import { API_URL } from '@/api/commonApi';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMeta } from "react-icons/fa6";
import { useRouter } from 'next/router';
import DashboardCard from '@/component/cards/DashboardCard';

// Fetch data on the server side
export async function getServerSideProps() {
  let initialData = [];
  try {
    const res = await fetch(`${API_URL}auth/v1/it/category`);
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

const ItPage = ({ initialData }) => {
  const pageName='it-solutions'
  const [data, setData] = useState(initialData);
  console.log(data,"data")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newSlugName, setNewSlugName] = useState("");
  const pagePush = useRouter();

  
 

  return (
    <>
      <div className="flex justify-between mb-9">
        <h2 className="text-2xl font-bold">It Services</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#521950] text-white  font-bold x px-6 py-2 h-auto   rounded-md"
        >
          ADD
        </button>
      </div>
      <div className='flex gap-5 flex-wrap justify-center '>
                {data && data.length > 0 ? (
                    data.map(service => (
                        <DashboardCard key={service._id} service={service} pageName={pageName} setData={setData} />
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
            {isAddModalOpen && (
                <AddSlugModal setIsAddModalOpen={setIsAddModalOpen} pageName={pageName} setData={setData} />
            )}
    </>
  );
};

export default ItPage;


