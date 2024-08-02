import { API_URL } from "@/api/commonApi";
import React, { useState } from "react";
import DashboardCard from "@/component/cards/DashboardCard";
import AddSlugModal from "@/component/modals/AddSlugModal";

// Fetch data on the server side
export async function getServerSideProps() {
  let initialData = [];

  try {
    const res = await fetch(`${API_URL}auth/v1/business/category`);
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

const BusinessPage = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pageName = "business-solutions";

  const handleAddService = async (newServiceName, newSlugName) => {
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

      if (res.ok) {
        setIsAddModalOpen(false);
        refreshData();
      } else {
        console.error("Failed to add service");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshData = async () => {
    try {
      const res = await fetch(`${API_URL}auth/v1/${pageName}/category`);
      const newData = await res.json();
      setData(newData.data || []);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-9">
        <h2 className="text-2xl font-bold">Business Solutions</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#521950] text-white font-bold px-6 py-2 h-auto rounded-md"
        >
          ADD
        </button>
      </div>
      <div className="flex gap-5 flex-wrap justify-center">
        {data && data.length > 0 ? (
          data.map((service) => (
            <DashboardCard key={service._id} service={service} pageName={pageName} setData={setData} />
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
      {isAddModalOpen && (
        <AddSlugModal setIsAddModalOpen={setIsAddModalOpen} handleAddService={handleAddService} />
      )}
    </>
  );
};

export default BusinessPage;
