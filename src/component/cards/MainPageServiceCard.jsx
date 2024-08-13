import React, { useEffect, useState } from 'react';
import ItBanner from '@/component/dashboard/itService/ItBanner';
import Industry from '@/component/Industry';
import { API_URL } from '@/api/commonApi';
import { MdEdit } from 'react-icons/md';
import { RiLoader4Fill } from 'react-icons/ri';
import { FaPlus, FaTimes } from 'react-icons/fa';
const LoadingButton = () => {
    return (
      <div className="flex justify-center items-center bg-blue w-max rounded-md px-3 py-2 text-white me-4">
        <RiLoader4Fill size={27} className="animate-spin" />
      </div>
    );
  };
  
const MainPageServiceCard = ({card, pageName, slugName,successfullyEdited,setSuccessfullyEdited}) => {
    const [editData, setEditData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const openModal = (item) => {
        setEditData(item);
        setIsModalOpen(true);
      };
    
      const openAddModal = () => {
        setEditData({ mainHeading: '', description: '', point: [''], image: null });
        setIsAddModalOpen(true);
      };
    
      const closeModal = () => {
        setEditData(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
        setSuccessfullyEdited(!successfullyEdited) // Refetch data to ensure it’s updated
        setIsLoading(false);
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setEditData({ ...editData, image: file });
        }
      };
    
      const handleSave = async () => {
        setIsLoading(true); // Set loading to true
        let formData = new FormData();
        formData.append('mainHeading', editData.mainHeading);
        formData.append('description', editData.description);
        formData.append('point', JSON.stringify(editData.point));
        if (editData.image instanceof File) {
          formData.append('image', editData.image);
        }
        formData.append('slugName', slugName);
        try {
          const response = await fetch(`${API_URL}auth/v1/${pageName}/main-service/${editData._id}`, {
            method: 'PUT',
            body: formData,
          });
          const result = await response.json();
          if (result.status) {
            
            closeModal();
            setSuccessfullyEdited(!successfullyEdited) // Refetch data to ensure it’s updated
          }
        } catch (error) {
          console.error('Error updating data:', error);
        } finally {
          setIsLoading(false); // Set loading to false after request completes
        }
      };
    
      const handleAdd = async () => {
        setIsLoading(true); // Set loading to true
        let formData = new FormData();
        formData.append('mainHeading', editData.mainHeading);
        formData.append('description', editData.description);
        formData.append('point', JSON.stringify(editData.point));
        if (editData.image instanceof File) {
          formData.append('image', editData.image);
        }
        formData.append('slugName', slugName);
        try {
          const response = await fetch(`${API_URL}auth/v1/${pageName}/main-service/`, {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          if (result.status) {
            setSuccessfullyEdited(!successfullyEdited) // Refetch data to ensure it’s updated
            
            closeModal();
          }
        } catch (error) {
          console.error('Error adding data:', error);
        } finally {
          setIsLoading(false); // Set loading to false after request completes
        }
      };
    
      const addPoint = () => {
        setEditData({ ...editData, point: [...editData.point, ""] });
      };
    
      const deletePoint = (index) => {
        const newPoints = [...editData.point];
        newPoints.splice(index, 1);
        setEditData({ ...editData, point: newPoints });
      };


      const handleDeleteCard = async (id) => {
        try {
          const response = await fetch(`${API_URL}auth/v1/${pageName}/main-service/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setSuccessfullyEdited(!successfullyEdited); // Notify parent component of changes
          } else {
            console.error("Failed to delete card data");
          }
        } catch (error) {
          console.error("Error deleting card data:", error);
        }
      };
    
      const handleDeleteClick = (idd) => {
        const confirmed = window.confirm("Are you sure you want to delete this card?");
        if (confirmed) {
          handleDeleteCard(idd);
        }
      };
  return (
    <div>
        
      <div className=" flex flex-col items-end">
      <button
        className="flex items-center bg-green-500   m-8 text-white p-2 rounded mb-4"
        onClick={openAddModal}
      >
        <FaPlus className="mx-2" /> Add Card
      </button>
      {card && card.map((cardItem, index) => (
        <section
          key={index}
          className={`w-full bg-white group relative max-h-screen lg:flex justify-between mb-10 lg:mt-8 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
        >
          <div className={`md:m-8 relative m-2 w-1/2`}>
            <img
              src={cardItem.image}
              alt={cardItem.mainHeading}
              className="rounded-xl max-h-screen"
            />
          </div>
          <div className="ml-0 lg:w-1/2 lg:mt-16 lg:mb-20">
          <div
            key={cardItem._id}
            className="max-w-screen-xl mx-auto px-5 bg-white "
          >
            <div className="flex flex-col items-left lg:ml-16">
              <h2 className="font-semibold text-2xl text-left font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8">
                {cardItem.mainHeading}
              </h2>
            </div>
            <div className="grid max-w-xl mx-auto">
              <div className="py-3 mb-4">
                <p className="font-medium font-sans mb-6 dark:text-gray-400 mt-3">
                  {cardItem.description}
                </p>
                {cardItem.point.map((heading, index) => {
                  return (
                    <div key={index} className="border-b-[1px] border-gray-400 pb-4 mt-2">
                      <h3 className="font-medium">
                        {heading}
                      </h3>
                    </div>
                  );
                })}
              </div>
              {cardItem.link && (
                <Link href={cardItem.link} target="_blank">
                  <LearnMoreButton />
                </Link>
              )}
            </div>
          </div>
          <FaTimes
        onClick={()=>handleDeleteClick(cardItem?._id)}
        className="absolute top-2 right-2 text-red-500 hidden group-hover:block cursor-pointer"
        size={24}
      />
            <button
              className="absolute -bottom-4 right-4 bg-blue-500 text-black p-2 rounded-full hidden group-hover:flex"
              onClick={() => openModal(cardItem)}
            >
              <MdEdit size={30} className="text-black" />
            </button>
          </div>
        </section>
      ))}
      </div>
      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl mb-4">{isAddModalOpen ? "Add " : "Edit "}</h2>
            <input
              type="text"
              value={editData.mainHeading}
              onChange={(e) => setEditData({ ...editData, mainHeading: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="Main Heading"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="Description"
            />
            {editData.point.map((point, index) => (
              <div key={index} className="relative flex items-center mb-4">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...editData.point];
                    newPoints[index] = e.target.value;
                    setEditData({ ...editData, point: newPoints });
                  }}
                  className="block w-full p-2 border"
                  placeholder={`Point ${index + 1}`}
                />
                <button
                  className="absolute right-0 text-red-500 mx-2"
                  onClick={() => deletePoint(index)}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            ))}
            <button
              className="flex items-center bg-blue-500 text-black p-2 rounded mb-4"
              onClick={addPoint}
            >
              <FaPlus className="mr-2 " /> 
            </button>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full mb-4 p-2 border"
              accept="image/*"
            />
                  <div className='flex'>
            <button
                  className="bg-red-500 text-white p-2 rounded mr-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
            {isLoading ? (
              <LoadingButton />
            ) : (
                
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={isAddModalOpen ? handleAdd : handleSave}
                >
                  Save
                </button>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPageServiceCard