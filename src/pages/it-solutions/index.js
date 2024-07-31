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
import ServiceCard from "./ServiceCard";
import Dialog from "./Dialog";


const ItPage = ({ initialData }) => {
  const router = useRouter();
  const [services, setServices] = useState(initialData);
  console.log(services, 'datasl')

  const [selectedService, setSelectedService] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [viewingServiceId, setViewingServiceId] = useState(null);
  const [updatingServiceId, setUpdatingServiceId] = useState(null);

  const refreshData = async () => {
    const res = await fetch(`${API_URL}auth/v1/it/category`);
    const newData = await res.json();
    setServices(newData.data);
  };

  const handleView = (service) => {
    if (viewingServiceId === service._id) {
      setViewingServiceId(null);
      setIsDialogOpen(false);
    } else {
      setSelectedService(service);
      setIsUpdateMode(false);
      setIsDialogOpen(true);
      setViewingServiceId(service._id);
      setUpdatingServiceId(null);
    }
  };

  const handleUpdate = (service) => {
    if (updatingServiceId === service._id) {
      setUpdatingServiceId(null);
      setIsDialogOpen(false);
    } else {
      setSelectedService(service);
      setIsUpdateMode(true);
      setIsDialogOpen(true);
      setUpdatingServiceId(service._id);
      setViewingServiceId(null);
    }
  };

  const handleUpdateSubmit = async (updatedService) => {
    if (isUpdateMode) {
      const res = await fetch(`${API_URL}auth/v1/it/category/${updatedService._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicesName: updatedService.servicesName,
          slugName: updatedService.slugName,
        }),
      });
      
      if (res.status === 200) {
        if (updatedService.metaTag || updatedService.metaDescription) {
          const metaRes = await fetch(`${API_URL}auth/v1/it/meta-tag/it-solution`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              metaTag: updatedService.metaTag,
              metaDescription: updatedService.metaDescription,
            }),
          });
          
          if (metaRes.status !== 200) {
            console.error('Failed to update meta data');
          }
        }
        refreshData();
      } else {
        console.error("Failed to update service");
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
    setViewingServiceId(null);
    setUpdatingServiceId(null);
  };

  return (
    <div className="flex flex-wrap">
      {services && services.length > 0 ? (
        services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onView={handleView}
            onUpdate={handleUpdate}
            isViewing={viewingServiceId === service._id}
            isUpdating={updatingServiceId === service._id}
          />
        ))
      ) : (
        <p>No services available.</p>
      )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        service={selectedService}
        isUpdate={isUpdateMode}
        onUpdateSubmit={handleUpdateSubmit}
      />
    </div>
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

            <input type="text" placeholder="Enter new slug name" className="border-2 outline-red-200 p-1 w-full rounded-sm  my-4" />

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
