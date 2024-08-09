import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { API_URL } from "@/api/commonApi";
import { MdModeEditOutline } from "react-icons/md";

const UpdateModel = ({ service, refreshData, pageName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    servicesName: service.servicesName,
    slugName: service.slugName,
    metaDescription: service.metaDescription,
    metaTitle: service.metaTitle,
    keyWord: service.keyWord,
  });
  console.log(updateData,'updated')

  const handleCancel = () => {
    refreshData();
    setIsOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}auth/v1/${pageName}/category/${service._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        refreshData();
        setIsOpen(false);
    } else {
        console.error("Failed to update service");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <MdModeEditOutline />
      </p>
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-2/3 h-auto relative text-start">
            <div className="flex justify-start my-4 font-bold text-lg">Update Slug</div>
            <button onClick={handleCancel} className="absolute top-2 right-2 p-1 text-black">
              <AiOutlineClose size={25} />
            </button>
            <input
              value={updateData.servicesName}
              onChange={(e) => setUpdateData({ ...updateData, servicesName: e.target.value })}
              className="border-2 p-1 w-full mb-4"
            />
            <input
              value={updateData.slugName}
              onChange={(e) => setUpdateData({ ...updateData, slugName: e.target.value })}
              className="border-2 p-1 w-full mb-4"
            />
            <textarea
              value={updateData.metaDescription}
              onChange={(e) => setUpdateData({ ...updateData, metaDescription: e.target.value })}
              className="border-2 p-1 w-full mb-4 h-20"
            />
            <textarea
              value={updateData.metaTitle}
              onChange={(e) => setUpdateData({ ...updateData, metaTitle: e.target.value })}
              className="border-2 p-1 w-full mb-4 h-20"
            />
            <textarea
              value={updateData.keyWord}
              onChange={(e) => setUpdateData({ ...updateData, keyWord: e.target.value })}
              className="border-2 p-1 w-full mb-4 h-20"
            />
            <div className="flex gap-2">
              <button onClick={handleCancel} className="bg-gray-200 py-1 px-2 mt-4 rounded-md text-black">
                Cancel
              </button>
              <button onClick={handleUpdate} className="bg-[#521950] py-1 px-2 mt-4 rounded-md text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModel;
