import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { API_URL } from "@/api/commonApi";
import { useRouter } from "next/router";
import UpdateModel from "@/component/modals/UpdateModel";
import MetaupdateModel from "@/component/modals/MetaupdateModel";
import ViewDataModal from "@/component/modals/ViewDataModal";

const DashboardCard = ({ service, pageName, setData }) => {
  const router = useRouter();

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
    <div className="mb-2 p-4 relative group bg-gray-200 cursor-pointer shadow-lg w-[300px] rounded-xl mt-2 flex justify-between items-end gap-2 pr-10">
      <div
        className="font-semibold p-1 px-4 cursor-pointer"
        onClick={() => router.push(`${pageName}/${service.slugName}`)}
      >
        <div className="">{service.servicesName}...</div>
        <div className="flex justify-start font-normal truncate overflow-hidden">
          {service.slugName}
        </div>
      </div>
      <div className="absolute right-2 group-hover:flex hidden top-2 gap-2">
        <button>
          <UpdateModel service={service} refreshData={refreshData} pageName={pageName} />
        </button>
        {/* <button>
          <MetaupdateModel service={service} refreshData={refreshData} />
        </button> */}
        <button>
          <ViewDataModal service={service} />
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
