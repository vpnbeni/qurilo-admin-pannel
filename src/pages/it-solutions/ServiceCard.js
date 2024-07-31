import { useState } from 'react';
import { EyeIcon, EyeOffIcon, PencilIcon, PencilAltIcon } from '@heroicons/react/outline';
import { IoEye,IoMdEyeOff } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
const ServiceCard = ({ service, onView, onUpdate, isViewing, isUpdating }) => {
  const { servicesName, slugName, metaTag, metaDescription } = service;
  console.log('service', service)

  return (
    <div className="group relative w-1/4 rounded-3xl overflow-hidden shadow-lg p-4 m-4 bg-gray-200">
      <div>
        <h2 className="text-xl font-bold mb-2">{servicesName}</h2>
        <p className="text-gray-800 text-base mb-2">{slugName}</p>
        <p className="text-gray-800 text-base mb-2">{metaTag}</p>
        <p className="text-gray-800 text-base mb-2">
          {metaDescription?.length > 50 ? `${metaDescription.substring(0, 50)}...` : metaDescription}
        </p>
      </div>
      <div className=" text-black absolute justify-end right-6 bottom-2 flex gap-2">
        <div
          onClick={() => onView(service)}
          className=" text-blue-700 font-bold py-2 rounded cursor-pointer"
        >
          {isViewing ? (
            <IoMdEyeOff  className="" />
          ) : (
            <IoEye className="  " />
          )}

        </div>
        <div
          onClick={() => onUpdate(service)}
          className="  text-black  font-bold py-2  rounded cursor-pointer"
        >
          {isUpdating ? (
           <div> <GrDocumentUpdate className="" /></div>
           
          ) : (
            <div>
              
            <GrDocumentUpdate className="" />
              </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
