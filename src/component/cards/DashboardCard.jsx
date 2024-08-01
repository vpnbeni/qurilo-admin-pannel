import React,{useState} from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { API_URL } from "@/api/commonApi";

const DashboardCard = ({service, pageName, setData}) => {
    const refreshData = async () => {
        const res = await fetch(`${API_URL}auth/v1/${pageName}/category`);
        const newData = await res.json();
        setData(newData.data || []);
      };
    return (
        <div>
            <div key={service._id}
                className="mb-2 p-2 bg-gray-200 cursor-pointer  shadow-lg min-w-[300px] rounded-xl mt-2 flex justify-between items-end gap-2"
            >
                <div
                    className=" font-semibold p-1 px-4 cursor-pointer"
                    onClick={() => pagePush.push(`${pageName}-solutions/${service.slugName}`)}
                >
                    <div >
                        {service.slugName}

                    </div>
                    <div className="flex justify-start font-normal">
                        {service.servicesName}

                    </div>
                </div>
                <div><button>
                    <UpdateModel service={service} refreshData={refreshData} />
                </button>
                    <button>
                        <MetaupdateModel service={service} refreshData={refreshData} />
                    </button>
                </div>
            </div>
        </div>
    )
}


const UpdateModel = ({ service, refreshData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState(service);
  console.log(updateData,"updateData")
    const handleUpdate = async () => {
      const res = await fetch(`${API_URL}auth/v1/service/${service._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ servicesName: updateData.servicesName, slugName:updateData.slugName }),
      });
  
      if (res.status === 200) {
        refreshData();
        setIsOpen(false);
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
            <div className="bg-white p-4 rounded-md w-1/3 h-auto relative text-start">
            <div className="flex justify-start my-4 font-bold text-lg">Update Slug </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-1 text-black"
              >
                <AiOutlineClose size={25} />
              </button>
              <input
                value={updateData.servicesName}
                onChange={(e) => setUpdateData(e.target.value)}
                className="border-2 p-1 w-full mb-4"
              />
              <input
                value={updateData.slugName}
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
      const res = await fetch(`${API_URL}auth/v1/development/meta-tag/development-solution`, {
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
  export default DashboardCard