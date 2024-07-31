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
    const res = await fetch(`${API_URL}auth/v1/industrie/category`);
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

const IndustriesPage = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newSlugName, setNewSlugName] = useState("");
  const pagePush = useRouter();

  const refreshData = async () => {
    const res = await fetch(`${API_URL}auth/v1/industrie/category`);
    const newData = await res.json();
    setData(newData.data || []);
  };

  const handleAddService = async () => {
    const res = await fetch(`${API_URL}auth/v1/industrie/category`, {
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
    }
  };

  return (
    <>
      <div className="flex justify-between mb-9">
        <h2 className="text-2xl font-bold">Industries Services</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue text-white px-6 py-2 h-auto font-semibold rounded-md"
        >
          ADD
        </button>
      </div>
      <div className="flex gap-2">
        <div className="bg-red-100 p-2 rounded-sm w-full min-h-[300px]">
          <h1 className="font-bold">Services Name :-</h1>
          <div className="flex w-full ">
            {data && data.length > 0 ? (
              <div className="w-full flex gap-5 m-4">
                {data.map((service) => (
                  <div
                    key={service._id}
                    className=" p-2  w-1/2 bg-white shadow-lg rounded-sm mt-2 flex justify-between items-end gap-2"
                  >
                    <button
                      className="capitalize font-semibold p-1 px-10"
                      onClick={() => pagePush.push(`industrie/${service.slugName}`)}
                    >
                      {service.servicesName}
                    </button>
                    <div className="flex gap-2 items-center justify-center">
                      <button>
                        <UpdateModel service={service} refreshData={refreshData} />
                      </button>
                      <button>
                        <MetaupdateModel service={service} refreshData={refreshData} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No services available.</p>
            )}
          </div>
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

export default IndustriesPage;

const UpdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(service.servicesName);

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/service/${service._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ servicesName: updateData }),
    });

    if (res.status === 200) {
      setIsOpen(false);
      refreshData();
    } else {
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
          <div className="bg-white p-4 rounded-md w-[300px] h-[140px] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-black"
            >
              <AiOutlineClose size={25} />
            </button>
            <input
              value={updateData}
              onChange={(e) => setUpdateData(e.target.value)}
              className="border-2 p-1 w-full mb-4"
            />
            <button
              onClick={handleUpdate}
              className="bg-slate-400 py-1 px-2 mt-4 rounded-md text-white"
            >
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
  const [metaTag, setMetaTag] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}auth/v1/industrie/meta-tag/industrie-solution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metaTag: metaTag,
        metaDescription: metaDescription,
      }),
    });

    if (res.status === 200) {
      setIsOpen(false);
      refreshData();  
    } else {
      console.error("Failed to update meta data");
    }
  };

  return (
    <>
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <FaMeta />
      </p>
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-1/2 h-[240px] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-black"
            >
              <AiOutlineClose size={25} />
            </button>
            <input
              value={metaTag}
              onChange={(e) => setMetaTag(e.target.value)}
              placeholder="Meta Tag"
              className="border-2 p-1 w-full mb-4"
            />
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="border-2 p-1 w-full mb-4"
            />
            <button
              onClick={handleUpdate}
              className="bg-slate-400 py-1 px-2 mt-4 rounded-md text-white"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};
