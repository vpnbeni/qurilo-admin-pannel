import React, { useEffect, useState } from 'react';
import ItBanner from '@/component/dashboard/itService/ItBanner';

import { API_URL } from '@/api/commonApi';
import { MdEdit } from 'react-icons/md';
import { RiLoader4Fill } from 'react-icons/ri';
import { FaPlus, FaTimes } from 'react-icons/fa';
import MainPageServiceCard from '@/component/cards/MainPageServiceCard'
const LoadingButton = () => {
  return (
    <div className="flex justify-center items-center bg-blue w-max rounded-md px-3 py-2 text-white me-4">
      <RiLoader4Fill size={27} className="animate-spin" />
    </div>
  );
};

const EcommerceMain = () => {
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [card, setCard]=useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successfullyEdited,setSuccessfullyEdited]=useState(false)
  const pageName='ecommerce'
  const slugName = "e-commerce";
  const fetchData = async (id) => {

    try {
      const res = await fetch(`${API_URL}auth/v1/${pageName}/main-banner/${slugName}`);
      const result = await res.json();
      if (result.status) {
        setData(result.banner);
        setCard(result.banner.service)
      } else {
        throw new Error(result.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slugName) {
      fetchData(slugName);
    }
  }, [slugName,successfullyEdited]);  


  

  return (
    <div className="  ">
      <ItBanner pageName={pageName} slugName={slugName}/>
      <MainPageServiceCard card={card}  pageName={pageName} slugName={slugName} setSuccessfullyEdited={setSuccessfullyEdited}  successfullyEdited={successfullyEdited} />

    </div>
  );
};

export default EcommerceMain;
