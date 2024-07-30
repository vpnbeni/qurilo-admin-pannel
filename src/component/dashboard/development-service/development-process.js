import React, { useState, useEffect } from 'react';
import Heading2 from '@/component/headings/Heading2';
import { MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { IoTrashBin } from 'react-icons/io5';
import { API_URL } from '@/api/commonApi';
import { FaTimes } from "react-icons/fa"; 
import { FiPlus } from "react-icons/fi";
import LoadingButton from '../../buttons/LoadingButton';

const Developmentprocess = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditingMain, setIsEditingMain] = useState(false);
  const [mainHeadingEdit, setMainHeadingEdit] = useState('');
  const [mainDescEdit, setMainDescEdit] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCardData, setNewCardData] = useState({ cardTitle: '', cardDescription: '' });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/development/process-card/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.data);
      setMainHeadingEdit(result.data.mainHeading);
      setMainDescEdit(result.data.description);
      setLoading(false);  
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleEditClick = (cardId) => {
    setEditingId(cardId);
    setEditData(data.processCard.find(card => card._id === cardId));
  };

  const handleSaveClick = async (cardId) => {
    setButtonLoading(true);
    try {
      const updateData = {
        cardTitle: editData.cardTitle,
        cardDescription: editData.cardDescription,
        slugName: id,
      };

      const newUrl = `${API_URL}auth/v1/development/process-card/${cardId}`;
      const res = await fetch(newUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        throw new Error('Failed to update card');
      }
      await fetchData();
      setEditingId(null);
    } catch (error) {
      setError(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMainEditClick = () => {
    setIsEditingMain(true);
  };
  const handleMainCancelClick=()=>{
    fetchData();
    setIsEditingMain(!isEditingMain);

  }
  const handleMainSaveClick = async () => {
    setButtonLoading(true);
    try {
      const updateData = {
        mainHeading: mainHeadingEdit,
        description: mainDescEdit,
        slugName: id,
      };

      const res = await fetch(`${API_URL}auth/v1/development/process-card/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        throw new Error('Failed to update main heading and description');
      }
       fetchData();
      setIsEditingMain(false);
    } catch (error) {
      setError(error);
    } finally {
      setButtonLoading(false);
    }
  };

  

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalSaveClick = async () => {
    setModalLoading(true);
    try {
      const postData = {
        ...newCardData,
        slugName: id,
      };

      const res = await fetch(`${API_URL}auth/v1/development/process-card/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        throw new Error('Failed to add new card');
      }
      await fetchData();
      setShowModal(false);
      setNewCardData({ cardTitle: '', cardDescription: '' });
    } catch (error) {
      setError(error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalCancelClick = () => {
    setShowModal(false);
    setNewCardData({ cardTitle: '', cardDescription: '' });
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCardData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteClick = async (cardId) => {
    try {
      const deleteUrl = `${API_URL}auth/v1/development/process-card/${cardId}`;
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete card');
      }
      await fetchData();
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const { mainHeading, processCard, description } = data;

  return (
    <section className="w-full pt-5 pb-9 bg-[#f8f8f8]">
      <div className="pt-6 relative group">
        {isEditingMain ? (
          <>
            <div className='flex flex-col w-full h-40 items-center'>
              <input
                type="text"
                value={mainHeadingEdit}
                onChange={(e) => setMainHeadingEdit(e.target.value)}
                className="text-2xl w-full lg:w-[800px] font-bold bg-white p-4 border-b-2 border-black focus:outline-none"
              />
              <textarea
                value={mainDescEdit}
                onChange={(e) => setMainDescEdit(e.target.value)}
                className="mt-2 w-full lg:w-[800px] text-base bg-white p-4 border-b-2 border-black focus:outline-none"
              />
              <div className="absolute bottom-4 right-4 flex items-center">
                <button onClick={handleMainCancelClick} className="bg-red-500 text-white p-2 rounded">
                  Cancel
                </button>
                {buttonLoading ? (
                  <LoadingButton />
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleMainCancelClick} className="bg-red-500 text-white p-2 rounded mx-3">
                    Cancel
                  </button>
                  <button onClick={handleMainSaveClick} className="bg-green-500 text-white p-2 rounded mx-3">
                    Save
                  </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center lg:mx-44 mx-8 md:mt-8 mt-4">
              <h2 className="font-semibold text-2xl font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8">
                {mainHeading}
              </h2>
              <p className="text-base text-desc text-body-color font-sans">{description}</p>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center">
              <button onClick={handleMainEditClick} className="text-transparent group-hover:text-black">
                <MdEdit size={30} />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="relative group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mx-16 md:mt-8 mt-4">
        {processCard?.map((devdata, index) => {
          const bgColor = index % 2 === 0 ? "bg-blue" : "bg-white";
          const txtColor = index % 2 === 0 ? "text-white" : "text-black";
          const isEditing = editingId === devdata._id;

          return (
            <div
              key={devdata._id}
              className={`relative mx-2 ${bgColor} w-full md:my-4 my-2 text-center z-10 py-6 px-6 shadow-md rounded-xl group`}
            >
              <div className="absolute top-4 right-4  items-center group-hover:flex hidden">
                <button onClick={() => handleDeleteClick(devdata._id)} className="text-white">
                  <FaTimes className="h-4 w-4 text-red-500 cursor-pointer" />
                </button>
              </div>
              {isEditing ? (
                <div className="w-full">
                  <input
                    type="text"
                    name="cardTitle"
                    value={editData.cardTitle}
                    onChange={handleChange}
                    className="text-xl font-medium my-4 w-full overflow-x-scroll bg-transparent border-b-2 border-white focus:outline-none"
                  />
                  <textarea
                    name="cardDescription"
                    value={editData.cardDescription}
                    onChange={handleChange}
                    className="text-base w-full mb-4 h-40 bg-transparent border-b-2 border-white focus:outline-none"
                  />
                </div>
              ) : (
                <>
                  <div className="absolute flex justify-center items-center -top-4 left-[45%] bg-white rounded-full w-8 h-8">
                    <div className="border-4 rounded-full p-1 w-2 h-2 border-[#558BDC]"></div>
                  </div>
                  <h1 className={`text-xl font-medium my-4 ${txtColor}`}>
                    {devdata.cardTitle}
                  </h1>
                  <p className={`md:text-base text-center ${txtColor}`}>
                    {devdata.cardDescription}
                  </p>
                </>
              )}
              {isEditing ? (
                <div className="bottom-3 flex gap-4 items-center">
                  <button onClick={handleCancelClick} className="bg-red-500 text-white p-2 rounded">
                    Cancel
                  </button>
                  {buttonLoading ? (
                    <LoadingButton />
                  ) : (
                    <button onClick={() => handleSaveClick(devdata._id)} className="bg-green-500 text-white p-2 rounded">
                      Save
                    </button>
                  )}
                </div>
              ) : (
                <div className="absolute bottom-4 right-4  items-center group-hover:flex hidden">
                  <button onClick={() => handleEditClick(devdata._id)} className="text-white">
                    <MdEdit className='text-black' size={20} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <button className="absolute group-hover:bg-green-500 text-xl font-medium my-4 text-transparent group-hover:text-white px-6 py-2 rounded-xl -right-5 -top-14" onClick={handleAddClick}>
          <FiPlus />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl mb-4">Add Card</h2>
            <input
              type="text"
              name="cardTitle"
              value={newCardData.cardTitle}
              onChange={handleNewCardChange}
              placeholder="Card Title"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <textarea
              name="cardDescription"
              value={newCardData.cardDescription}
              onChange={handleNewCardChange}
              placeholder="Card Description"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleModalCancelClick} className="bg-red-500 text-white p-2 rounded">
                Cancel
              </button>
              {modalLoading ? (
                <LoadingButton />
              ) : (
                <button onClick={handleModalSaveClick} className="bg-green-500 text-white p-2 rounded mr-2">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Developmentprocess;
