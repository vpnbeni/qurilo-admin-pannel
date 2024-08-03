
import React, { useEffect, useState } from 'react';
import ServiceCard from '@/component/cards/ServiceCard';
import { API_URL } from '@/api/commonApi';
import { MdModeEditOutline } from "react-icons/md";
import Modal from '@/component/modals/Modal';
import LoadingButton from '@/component/buttons/LoadingButton';
import { HiOutlinePlus } from "react-icons/hi";
import { servicesData } from '@/component/assets/industries';

const DigitalSolutionIndustries = ({id}) => {
  const category='industrie'

  const [serviceCardData, setServiceCardData] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');
  const [headingLoading, setHeadingLoading] = useState(false);
  const [mainImg, setMainImg] = useState("");

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [visibleCards, setVisibleCards] = useState(3);
  const [showAllCards, setShowAllCards] = useState(false);

  const fetchServiceCardData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/industrie/service-card/${id}`);
      const data = await response.json();
      setServiceCardData(data?.data);
      setEditHeading(data?.data?.mainHeading);
      setEditContent(data?.data?.description);
      setMainImg(data?.data?.image);

      setHeadingLoading(false);

    } catch (error) {
      console.log(error);
    }
  }



  const handleEditData = async (idd) => {
    const dataSend = {
      mainHeading: editHeading,
      description: editContent,
      slugName: id
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/industrie/service-card/${idd}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleToggleCards = () => {
    setShowAllCards(!showAllCards);
    setVisibleCards(showAllCards ? 3 : serviceCardData?.managementServiceData?.length);
  };

  const handleSaveNewCard = async () => {
    setUpdateLoading(true)
    const formData = new FormData();
    formData.append("cardTitle",newCardTitle);
    formData.append("cardDescription", newCardDescription);
    formData.append("slugName", id);
    if (mainImg) {
      formData.append("image", mainImg);
    }
    try {
      const response = await fetch(`${API_URL}auth/v1/industrie/service-card`, {
        method: 'POST',
        
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccessfullyEdited( (prev) => !prev);

      setIsModalVisible(false);
      setNewCardTitle('');
      setNewCardDescription('');
    } catch (error) {
      console.error(error);
      setUpdateLoading(false)

    }finally{
      setUpdateLoading(false)

    }
  };
const handleHeadingCancel=()=>{
  setEdit(false);
  setSuccessfullyEdited( (prev) => !prev);

}
  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: editHeading,
      description: editContent,
      slugName: id
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/industrie/service-card`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEdit(false);
      fetchServiceCardData();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchServiceCardData();
    }
  }, [id, successfullyEdited,])
  return (
    <section className='group'>
      <div className="px-6 lg:px-20 py-16 grid grid-cols-1 gap-8 bg-white text-black">
        {/* Headings */}
        <div className="relative flex flex-col gap-6">
          {edit ? (
            <>
              <input value={editHeading} onChange={(e) => setEditHeading(e.target.value)} className='w-3/4 p-2 mx-auto rounded-sm text-2xl font-[600] text-black border-[1px] border-gray-600 text-center' />
              <textarea rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} className='w-3/4 p-2 rounded-sm mx-auto text-xl text-black border-[1px] border-gray-600 text-center' />
              <input type="file" className="w-2/3 "  onChange={(e) => setMainImg(e.target.files[0])}/>

            </>
          ) : (
            <>
              <div className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
                {serviceCardData?.mainHeading}
                {/* {servicesData.heading} */}
                <div className="w-full flex justify-center  my-5">  
              <img src={serviceCardData?.image} alt="" />
            </div>
              </div>
              <p className="text-center text-[18px] font-[400] mt-2">
                {serviceCardData?.description}
                {/* {servicesData.desc} */}
              </p>
            </>
          )}
          {edit ? (
            headingLoading ? <div className='flex justify-center absolute -right-5 bottom-5'> <LoadingButton /> </div> : (
              <div className="absolute -right-5 bottom-5 flex gap-4">
                <button className='bg-red-600  rounded-md px-3 py-2 w-max mx-auto text-white' onClick={handleHeadingCancel}>Cancel</button>
                <button className='bg-green-600  rounded-md px-3 py-2 w-max mx-auto text-white' onClick={handleHeading}>Save</button>
              </div>
            )
          ) : (
            <MdModeEditOutline onClick={() => setEdit(!edit)} size={26} className='absolute -right-5 bottom-5 cursor-pointer mx-auto hidden group-hover:block' />
          )}
        </div>
        <div className='flex justify-end relative'>
          <button
            className='bg-blue absolute hidden group-hover:block right-[-6rem] top-12 text-white py-2 px-4 text-lg rounded-lg'
            onClick={() => setIsModalVisible(true)}
          >
            <HiOutlinePlus />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
          {serviceCardData?.managementServiceData?.slice(0, visibleCards).map((card, i) => (
            // {servicesData.services?.slice(0, visibleCards).map((card, i) => (
            <ServiceCard
              type="industries"
              key={i}
              id={card?._id}
              icon={card.icon}
              name={card.cardTitle}
              // name={card.heading}
              // des={card.description}
              des={card.cardDescription}
              category={category}
              slugName={id}
              setSuccessfullyEdited={setSuccessfullyEdited}
              successfullyEdited={successfullyEdited}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))}
        </div>
        <div className="text-center mt-2">
          <button
            className="bg-blue text-white py-2 px-4 text-lg rounded-lg"
            onClick={handleToggleCards}
          >
            {showAllCards ? 'View Less' : 'Load More'}
          </button>
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveNewCard}
        title={newCardTitle}
        setTitle={setNewCardTitle}
        description={newCardDescription}
        setDescription={setNewCardDescription}
        updateLoading={updateLoading}
        editHeading={editHeading}
        setEditHeading={setEditHeading}
        editContent={editContent}
        setEditContent={setEditContent}
      />
    </section>
  );
};

export default DigitalSolutionIndustries;






