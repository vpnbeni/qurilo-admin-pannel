import React, { useState } from "react";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";


const ViewDataModal = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <AiOutlineEye />
      </p>
      {isOpen && ( 
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-1/2 h-auto relative text-start">
            <div className="flex justify-start my-4 font-bold text-lg">Service Details</div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 text-black"
            >
              <AiOutlineClose size={25} />
            </button>
            <div className="border-2 p-2 w-full mb-4">
              <strong>Service Name:</strong> {service.servicesName}
            </div>
            <div className="border-2 p-2 w-full mb-4">
              <strong>Slug Name:</strong> {service.slugName}
            </div>
            <div className="border-2 p-2 w-full mb-4">
              <strong>Meta Description:</strong> {service.metaDescription}
            </div>
            <div className="border-2 p-2 w-full mb-4">
              <strong>Meta Tag:</strong> {service.metaTitle}
            </div>
            <div className="border-2 p-2 w-full mb-4">
              <strong>Key Word:</strong> {service.keyWord}
            </div>
            {/* Add more dynamic data as needed */}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDataModal;
