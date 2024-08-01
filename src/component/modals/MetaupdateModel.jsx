import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMeta } from "react-icons/fa6";
import { API_URL } from "@/api/commonApi";

const MetaupdateModel = ({ service, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metaTag, setMetaTag] = useState(service.metaTag || "");
  const [metaDescription, setMetaDescription] = useState(service.metaDescription || "");

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}auth/v1/development/meta-tag/development-solution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metaTag,
          metaDescription,
        }),
      });

      if (res.ok) {
        setIsOpen(false);
        refreshData();
      } else {
        console.error("Failed to update meta data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <FaMeta />
      </p>
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-1/2 relative">
            <div className="flex justify-start my-4 font-bold text-lg">Update Meta Data</div>
            <button onClick={handleCancel} className="absolute top-2 right-2 p-1 text-black">
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

export default MetaupdateModel;
