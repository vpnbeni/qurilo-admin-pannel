import { API_URL } from "@/api/commonApi";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import DashboardCard from "@/component/cards/DashboardCard";
import { FaMeta } from "react-icons/fa6";

// Fetch data on the server side
export async function getServerSideProps() {
  let initialData = [];

  try {
    const res = await fetch(`${API_URL}auth/v1/development/category`);
    const data = await res.json();
    if (data && data.data) {
      initialData = data.data;
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newSlugName, setNewSlugName] = useState("");
  const pagePush = useRouter();

  const pageName="development"

  const handleAddService = async () => {
    const res = await fetch(`${API_URL}auth/v1/development/category`, {
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
        <h2 className="text-2xl font-bold ">Development Services</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#521950] text-white  font-bold x px-6 py-2 h-auto   rounded-md"
        >
          ADD
        </button>
      </div>
      <div className="flex gap-2">
        <div className=" p-2 rounded-sm flex">
          {data && data.length > 0 ? (
            <div className="flex gap-5 flex-wrap">
              {data.map((service) => (
                <DashboardCard service={service} pageName={pageName}  setData={setData}/>
              ))}
            </div>
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

export default DevelopmentPage;


