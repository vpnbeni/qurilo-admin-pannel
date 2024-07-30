import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { FaCircleCheck } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";  // Import Plus icon
import { API_URL } from "@/api/commonApi";

const TravelList = ({ data, setSuccessfullyEdited, successfullyEdited }) => {
  const id = "fintech-banking-financial-soutions";
  const [openIndex, setOpenIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Modal
  const [editData, setEditData] = useState({
    cardTitle: "",
    cardDescription: "",
    point: [],
  });

  const [newCardData, setNewCardData] = useState({  // State for new card
    cardTitle: "",
    cardDescription: "",
    point: [],
  });

  const toggleDetail = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };
  const handleDelete=async (idd)=>{
    const url = 'https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/industrie/solution';
    try {
      const response = await fetch(`${url}/${idd}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Data deleted successfully');
      setSuccessfullyEdited(!successfullyEdited);
    } catch (error) {
      console.error('Failed to delete data:', error.message);
    }
  }
  const handleSave = async (idd) => {
    const updatedData = { ...editData, slugName: id };

    try {
      const response = await fetch(`${API_URL}auth/v1/industrie/solution/${idd}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.status) {
        console.log('Data updated successfully');
        setIsModalOpen(false);
        setSuccessfullyEdited(!successfullyEdited);
      } else {
        console.error('Error updating data:', result.message);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAddNewCard = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewCard = async () => {
    const formData = new FormData();
    formData.append("cardTitle", newCardData.cardTitle);
    formData.append("cardDescription", newCardData.cardDescription);
    const point=newCardData.point;
    console.log(point,"point")
    formData.append("point", JSON.stringify(point));
    formData.append("slugName", id);
    
    console.log(formData)
    try {
      // const newCardDataWithSlug = { ...newCardData, slugName: id };
      const response = await fetch(`${API_URL}auth/v1/industrie/solution/`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(newCardDataWithSlug),
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.status) {
        console.log('New card added successfully');
        setSuccessfullyEdited(!successfullyEdited);
        setIsAddModalOpen(false);
        setNewCardData({
          cardTitle: "",
          cardDescription: "",
          point: [],
        });
      } else {
        console.error('Error adding new card:', result.message);
      }
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setEditData({
      cardTitle: "",
      cardDescription: "",
      point: [],
    });
    setNewCardData({
      cardTitle: "",
      cardDescription: "",
      point: [],
    });
  };

  const handleInputChange = (e, index, isAddModal = false) => {
    const { name, value } = e.target;
    if (name === "point") {
      if (isAddModal) {
        const newPoints = [...newCardData.point];
        newPoints[index] = value;
        setNewCardData({ ...newCardData, point: newPoints });
      } else {
        const newPoints = [...editData.point];
        newPoints[index] = value;
        setEditData({ ...editData, point: newPoints });
      }
    } else {
      if (isAddModal) {
        setNewCardData({ ...newCardData, [name]: value });
      } else {
        setEditData({ ...editData, [name]: value });
      }
    }
  };

  const handleAddItem = (isAddModal = false) => {
    if (isAddModal) {
      setNewCardData({ ...newCardData, point: [...newCardData.point, ""] });
    } else {
      setEditData({ ...editData, point: [...editData.point, ""] });
    }
  };

  const handleDeleteItem = (index, isAddModal = false) => {
    if (isAddModal) {
      const newPoints = newCardData.point.filter((_, i) => i !== index);
      setNewCardData({ ...newCardData, point: newPoints });
    } else {
      const newPoints = editData.point.filter((_, i) => i !== index);
      setEditData({ ...editData, point: newPoints });
    }
  };

  return (
    <div className="mr-5 ml-5 mb-5">
      <button onClick={handleAddNewCard} className="mb-5 p-2 bg-blue-500 text-black rounded">
        <AiOutlinePlus size={20} />
      </button>
      {data?.map((item, index) => (
        <div key={index} className="flex relative group flex-col gap-5 mb-5">
          <div className="flex justify-between">
            <h1 className="text-xl text-black font-medium">{item.cardTitle}</h1>
            {openIndex === index ? (
              <RxCross2
                size={25}
                className="text-red-600 hidden group-hover:block cursor-pointer"
                onClick={() => handleDelete(item._id)}
              />
            ) : (
              <SlArrowDown
                size={20}
                className="text-blue hover:text-blue-200 transform hover:translate-y-2 transition ease-in duration-100 cursor-pointer"
                onClick={() => toggleDetail(index)}
              />
            )}
          </div>
          {openIndex === index && (
            <div className="mt-2">
              <p className="text-base font-normal mb-6 text-black/80">
                {item.cardDescription}
              </p>
              <div className="flex flex-col gap-2">
                {item.point.map((itm, i) => (
                  <div className="flex gap-5 items-center" key={i}>
                    <FaCircleCheck size={20} className="text-primary-500" />
                    <p>{itm}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            onClick={() => handleEditClick(item)}
            className={`hidden group-hover:flex absolute bottom-2 right-0 ${
              openIndex === index ? "opacity-1" : "opacity-0"
            } cursor-pointer justify-end`}
          >
            <MdModeEdit size={25} />
          </div>
          <hr />
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 h-[30rem] overflow-y-auto rounded-md w-1/2">
            <div className="flex  items-center">
              <h2 className="text-2xl mb-4">Edit Item</h2>
            </div>
            <input
              type="text"
              name="cardTitle"
              value={editData.cardTitle}
              onChange={(e) => setEditData({ ...editData, cardTitle: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Title"
            />
            <textarea
              name="cardDescription"
              value={editData.cardDescription}
              onChange={(e) => setEditData({ ...editData, cardDescription: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Detail"
            />
            <div className="flex flex-col gap-2 mb-4">
              {editData.point.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name="point"
                    value={item}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={`Item ${index + 1}`}
                  />
                  <RxCross2
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteItem(index)}
                  />
                </div>
              ))}
              <button
                className="mt-2 bg-blue w-max px-4 py-2 rounded-md text-white"
                onClick={() => handleAddItem()}
              >
                Add Item
              </button>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleSave(editData._id)}
                className="bg-blue text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 h-[30rem] overflow-y-auto rounded-md w-1/2">
            <div className="flex items-center">
              <h2 className="text-2xl mb-4">Add New Card</h2>
            </div>
            <input
              type="text"
              name="cardTitle"
              value={newCardData.cardTitle}
              onChange={(e) => handleInputChange(e, null, true)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Title"
            />
            <textarea
              name="cardDescription"
              value={newCardData.cardDescription}
              onChange={(e) => handleInputChange(e, null, true)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Detail"
            />
            <div className="flex flex-col gap-2 mb-4">
              {newCardData.point.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name="point"
                    value={item}
                    onChange={(e) => handleInputChange(e, index, true)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={`Item ${index + 1}`}
                  />
                  <RxCross2
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteItem(index, true)}
                  />
                </div>
              ))}
              <button
                className="mt-2 bg-blue w-max px-4 py-2 rounded-md text-white"
                onClick={() => handleAddItem(true)}
              >
                Add Item
              </button>
            </div>
            <div className="flex justify-end gap-4">
            <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewCard}
                className="bg-blue text-white px-4 py-2 rounded"
              >
                Save
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelList;
