
import React, { useEffect, useState } from 'react';
import ServiceCard from '@/component/cards/ServiceCard';
import { API_URL } from '@/api/commonApi';
import { MdModeEditOutline } from "react-icons/md";
import Modal from '@/component/modals/Modal';
import LoadingButton from '@/component/buttons/LoadingButton';
import { HiOutlinePlus } from "react-icons/hi";

const CloudService = ({ id }) => {
  const [serviceCardData, setServiceCardData] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');
  const [headingLoading , setHeadingLoading] = useState(false);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);


  const [visibleCards, setVisibleCards] = useState(3);
  const [showAllCards, setShowAllCards] = useState(false);

  const fetchServiceCardData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/it/service-card/${id}`);
      const data = await response.json();
      setServiceCardData(data?.data);
      setEditHeading(data?.data?.mainHeading);
      setEditContent(data?.data?.description);
      setHeadingLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleEditData = async (idd) => {
    setUpdateLoading(true)
    const dataSend = {
      mainHeading: editHeading,
      description: editContent,
      slugName: id
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/it/service-card/${idd}`, {
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
    }finally {
      setUpdateLoading(false);
    }
  }

  const handleToggleCards = () => {
    setShowAllCards(!showAllCards);
    setVisibleCards(showAllCards ? 3 : serviceCardData?.managementServiceData?.length);
  };

  const handleSaveNewCard = async () => {
    setUpdateLoading(true)
    const formData = new FormData();
    formData.append('cardTitle', newCardTitle);
    formData.append('cardDescription', newCardDescription);
    formData.append('slugName', id);
    if (newImage) {
      formData.append('icon', newImage);
    }
    try {
      const response = await fetch(`${API_URL}auth/v1/it/service-card`, {
        method: 'POST',
       
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      // fetchServiceCardData();
      setSuccessfullyEdited(!successfullyEdited);
      setNewCardTitle('');
      setNewCardDescription('');
      setIsModalVisible(false);

    } catch (error) {
      console.error(error);
    }finally {
      setUpdateLoading(false);
    }
  };

  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: editHeading,
      description: editContent,
      slugName: id
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/it/service-card`, {
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
      fetchServiceCardData();
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (id) {
      fetchServiceCardData();
    }
  }, [id, successfullyEdited])

  return (
    <section className='group'>
      <div className="px-6 lg:px-20 py-16 grid grid-cols-1 gap-8 bg-white text-black">
        {/* Headings */}
        <div className="relative flex flex-col gap-6">
          {edit ? (
            <>
              <input value={editHeading} onChange={(e) => setEditHeading(e.target.value)} className='w-3/4 p-2 mx-auto rounded-sm text-2xl font-[600] text-black border-[1px] border-gray-600 text-center' />
              <textarea rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} className='w-3/4 p-2 rounded-sm mx-auto text-xl text-black border-[1px] border-gray-600 text-center' />
            </>
          ) : (
            <>
              <div className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
                {serviceCardData?.mainHeading}
              </div>
              <p className="text-center text-[18px] font-[400] mt-2">
                {serviceCardData?.description}
              </p>
            </>
          )}
          {edit ? (
            headingLoading ? <div className='flex justify-center absolute -right-5 bottom-5'> <LoadingButton /> </div> : <button className='bg-green-600 absolute -right-5 bottom-5 rounded-md px-3 py-2 w-max mx-auto text-white' onClick={handleHeading}>Save</button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 relative">
          {serviceCardData?.managementServiceData?.slice(0, visibleCards).map((card, i) => (
            <ServiceCard
              key={i} 
              category={"it"}
              setNewImage={setNewImage}
              newImage={newImage}
              id={card?._id}
              icon={card.icon}
              name={card.cardTitle}
              des={card.cardDescription}
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

      <div className="relative">
      <Modal
        isVisible={isModalVisible}
        setNewImage={setNewImage}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveNewCard}
        title={newCardTitle}
        setTitle={setNewCardTitle}
        description={newCardDescription}
        setDescription={setNewCardDescription}
        updateLoading={updateLoading}
      />
      </div>
    </section>
  );
};

export default CloudService;



