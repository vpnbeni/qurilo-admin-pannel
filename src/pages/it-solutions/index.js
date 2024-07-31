import { API_URL } from "@/api/commonApi";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { FaMeta } from "react-icons/fa6";


// Fetch data on the server side
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}auth/v1/it/category`);
  const data = await res.json();
  return {
    props: {
      initialData: data?.data,
    },
  };
}

const ItPage = ({ initialData }) => {
  const pagePush = useRouter()

  const [data, setData] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newSlugName, setNewSlugName] = useState("");

  const refreshData = async () => {
    const res = await fetch(`${API_URL}auth/v1/it/category`);
    const newData = await res.json();
    setData(newData.data);
  };

  const handleAddService = async () => {
    const res = await fetch(`${API_URL}auth/v1/it/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ servicesName: newServiceName, slugName:newSlugName }),
    });

    if (res.status === 200) {
      setIsAddModalOpen(false);
      setNewServiceName("");
      setNewSlugName("");
      refreshData();
    } else {
      // Handle error
      console.error("Failed to add service");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-9">IT Services</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue text-white px-4 h-max py-2 font-semibold rounded-md"
        >
          ADD
        </button>
      </div>

      <div
        className={`flex gap-2 justify-between items-center ${
          isAddModalOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="bg-red-100 p-2 rounded-sm">
          <h1 className="font-bold">Services Name :-</h1>
          {data && data.length > 0 ? (
            <ul>
              {data.map((service) => (
                <li
                  key={service._id}
                  className="mb-2 p-2 bg-white shadow-lg rounded-sm mt-2 flex justify-between items-end gap-2 "
                >
                  <p className="capitalize font-semibold p-1 px-10 cursor-pointer" onClick={()=>pagePush.push(`/it-solutions/${service.slugName}`)}>
                    {" "}
                    {service.servicesName}
                  </p>
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
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-[300px] relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              <AiOutlineClose size={25} />
            </button>
            <h2 className="text-lg font-bold my-4">Add Slug Name & Category</h2>
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="border-2 p-2 w-full mb-4"
              placeholder="Enter slug name"
            />
            <input
              type="text"
              value={newSlugName}
                            onChange={(e) => setNewSlugName(e.target.value)}
              className="border-2 p-2 w-full mb-4"
              placeholder="Enter category name"
            />
            <button
              onClick={handleAddService}
              className="bg-blue text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItPage;

const UpdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(service.mainServicesName);

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/mainservice/${service._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mainServicesName: updateData }),
    });

    if (res.status === 200) {
      setIsOpen(false);
      refreshData();
    } else {
      // Handle error
      console.error("Failed to update service");
    }
  };

  return (
    <>
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <MdModeEditOutline />
      </p>
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-[300px] h-max relative">
            <div className="flex items-center justify-between">
            <h2 className="teext-black font-medium text-lg ">Edit Slug Name  & Category</h2>
              <button
              onClick={() => setIsOpen(false)}
              className=" text-black"
            >   
              <AiOutlineClose className="" size={25} />
            </button>
           </div>
    
            <input type="text" placeholder="Enter new slug name" className="border-2 outline-red-200 p-1 w-full rounded-sm  my-4"/>
            
              <input
                value={updateData}
                onChange={(e) => setUpdateData(e.target.value)}
                className="border-2 outline-red-200 rounded-sm p-1 w-full"
                placeholder="Enter new category name"
              />
            
            <button
              onClick={handleUpdate}
              className="bg-green-600 py-1 px-2 mt-4 rounded-md text-white"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};








// // Meta Update // //
const MetaupdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metaTag, setMetaTag] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/it/meta-tag/it-solution`, {
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













