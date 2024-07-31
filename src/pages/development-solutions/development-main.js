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

const ItMain = () => {
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const id = "cloud-server";

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/development/main-service/${id}`);
      const result = await response.json();
      if (result.status) {
        setData(result.banner);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

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
    formData.append('slugName', id);
    try {
      const response = await fetch(`${API_URL}auth/v1/it/main-service/${editData._id}`, {
        method: 'PUT',
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        setData(data.map(item => item._id === editData._id ? editData : item));
        fetchData(); // Refetch data to ensure it’s updated
        closeModal();
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
    formData.append('slugName', id);
    try {
      const response = await fetch(`${API_URL}auth/v1/it/main-service`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        fetchData(); // Refetch data to ensure it’s updated
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

  return (
    <div className="  ">
      <ItBanner />
      
      <div className=" flex flex-col items-end">
      <button
        className="flex items-center bg-green-500   m-8 text-white p-2 rounded mb-4"
        onClick={openAddModal}
      >
        <FaPlus className="mx-2" /> Add Card
      </button>
      {data && data.map((item, index) => (
        <section
          key={index}
          className={`w-full bg-white group relative max-h-screen lg:flex justify-between mb-10 lg:mt-8 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
        >
          <div className={`md:m-8 relative m-2 w-1/2`}>
            <img
              src={item.image}
              alt={item.mainHeading}
              className="rounded-xl max-h-screen"
            />
          </div>
          <div className="ml-0 lg:w-1/2 lg:mt-16 lg:mb-20">
            <Industry data={[item]} />
            <button
              className="absolute -bottom-4 right-4 bg-blue-500 text-black p-2 rounded-full hidden group-hover:flex"
              onClick={() => openModal(item)}
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
            <h2 className="text-2xl mb-4">{isAddModalOpen ? "Add Industry" : "Edit Industry"}</h2>
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
            {isLoading ? (
              <LoadingButton />
            ) : (
              <div>
                <button
                  className="bg-red-500 text-white p-2 rounded mr-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={isAddModalOpen ? handleAdd : handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItMain;
