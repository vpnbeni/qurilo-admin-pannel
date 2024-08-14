import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { HiMinus } from "react-icons/hi";
import { MdEdit } from 'react-icons/md';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
const Faq = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data,setData]=useState(null);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);
  const [editHeading, setEditHeading]=useState(false);
  const [mainHeading, setMainHeading]=useState(null);
  const [description, setDescription]=useState(null);
  const [isAddModalOpen,setIsAddModalOpen] = useState(false);
  const [addCard,setAddCard]=useState({
    faqTitle: '',
    faqDescription: '',
    faqPoint: [''],
  })
  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/business/faq/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        setFaqData(result.data.faqData);
        setData(result.data);
        setMainHeading(result.data.mainHeading)
        setDescription(result.data.description)
      } else {
        throw new Error(result.message || 'Failed to fetch FAQ data');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
      console.log(id, 'id')
    }
  }, [id,successfullyUpdated]);

  const handleHeadingEditClick=()=>{
    setEditHeading(true)
  }
  const addFaqCard = async () => {
    setIsLoading(true);
    const updatedData = {
      faqTitle: addCard.faqTitle,
      faqDescription: addCard.faqDescription,
      faqPoint: addCard.faqPoint,
      slugName: id,
    };
  
    
    console.log('Request payload:', updatedData);
  
    try {
      
      if (!updatedData.slugName) {
        throw new Error('slugName is missing or invalid.');
      }
  
      const response = await fetch(`https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/business/faq/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
  
      if (result.status === "success") {
        // Assuming the API returns the newly created FAQ with an _id
        const newFaq = result.data; // Adjust based on your API response
  
        // Update the FAQ data in the local state
        setFaqData((prevData) => [...prevData, newFaq]);
  
        setAddCard({ faqTitle: '', faqDescription: '', faqPoint: [''] });
        setIsAddModalOpen(false);
        setSuccessfullyUpdated(!successfullyUpdated);
      } else {
        throw new Error(result.message || 'Failed to update FAQ data');
      }
    } catch (error) {
      console.error('Error in addFaqCard:', error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateFaqData = async () => {
    setIsLoading(true);
    const updatedData = {
      faqTitle: editData.faqTitle,
      faqDescription: editData.faqDescription,
      faqPoint: editData.faqPoint,
      slugName: id,

    }
    try {
      const response = await fetch(`https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/business/faq/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (result.status === "success") {
        // Update the FAQ data in the local state
        setFaqData((prevData) =>
          prevData.map((item) => (item._id === editData._id ? editData : item))
        );
        setIsModalOpen(false);
      } else {
        throw new Error(result.message || 'Failed to update FAQ data');
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateMainHeading = async () => {
    const updatedData = {
      mainHeading: mainHeading,
      description: description,
      slugName: id,

    }
    try {
      const response = await fetch(`https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/business/faq-heading`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (response.ok) {
        setData(updatedData.data);

        setEditHeading(false); // Exit edit mode after saving
        setSuccessfullyUpdated(!successfullyUpdated)
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } 
  };

 
  const handleMainHeadingSave=()=>{
    updateMainHeading()
  }
  const handleEditClick = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };
  
  const handleDeleteClick=(item)=>{
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      deleteFaqData(item);
    }
  }
  const deleteFaqData = async (item) => {
    try {
      const response = await fetch(`https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/business/faq/${item._id}`, {
        method: 'DELETE',
        
      });
  
      const result = await response.json();
  
      if (result.status === "success") {
        // Update the FAQ data in the local state
        setSuccessfullyUpdated(!successfullyUpdated);
      } else {
        console.error("Failed to delete item:", result.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  const handleSave = () => {
    updateFaqData();
  };
  const handleAddCardSave = () => {
    addFaqCard();
  };

  const addPoint = () => {
    setEditData({ ...editData, faqPoint: [...editData.faqPoint, ''] });
  };
  const addPointAddCard = () => {
    setAddCard({ ...addCard, faqPoint: [...addCard.faqPoint, ''] });
  };

  const deletePoint = (index) => {
    const newPoints = editData.faqPoint.filter((_, i) => i !== index);
    setEditData({ ...editData, faqPoint: newPoints });
  };
  const deletePointAddCard = (index) => {
    const newPoints = addCard.faqPoint.filter((_, i) => i !== index);
    setAddCard({ ...addCard, faqPoint: newPoints });
  };
  const handleAddCard=({type})=>{
    setIsAddModalOpen(true)
    
  }
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-10 lg:my-20 px-6 lg:px-20">
     {editHeading ?(
      <div className="flex flex-col gap-2 w-[50vw] mx-auto  p-4">
      <input
        type="text"
        className="p-2 m-2 w-full text-black border-2 border-black"
        name="mainHeading"
        id="mainHeading"
        value={mainHeading || ""}
        onChange={(e) => setMainHeading(e.target.value)}
      />
      <textarea
        type="text"
        className="p-2 m-2 w-full text-black border-2 border-black"
        name="description"
        id="description"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="text-white mx-2 flex gap-2">
        <div
          className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
          onClick={() => setEditHeading(!editHeading)}
        >
          Cancel
        </div>
        <div
          className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
          onClick={handleMainHeadingSave}
        >
          Save
        </div>
      </div>
    </div>
     ):(
      <div className="flex flex-col gap-5 relative group w-full  justify-center items-center">
      <h1 className="text-3xl font-bold ">{data?.mainHeading}</h1>
      <p className="text-center text-[18px] font-[400] mt-2">
      {data?.description}
      </p>
      <MdEdit size={26} onClick={handleHeadingEditClick} className="absolute right-5 bottom-5 group-hover:block hidden cursor-pointer"/>
    </div>
     )}
     
      <div className="mt-10 lg:w-[72%] md:w-[90%] w-[100%] mx-auto">
      <div className="flex justify-end items-center cursor-pointer" onClick={handleAddCard}>
      <IoMdAdd size={25} className="text-black font-bold "  /> Add Faq
      </div>
        {faqData?.map((item, index) => (
          <div key={item?._id} className="relative group">
            <div
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="flex justify-between items-center md:py-7 py-3 cursor-pointer"
            >
              <h2 className="md:text-lg text-[16px] w-[90%] md:w-[96%] font-normal text-lg">
                {item?.faqTitle}
              </h2>
              {activeIndex === index ? (
                <HiMinus size={25} className="text-bgColor-100 font-bold" />
              ) : (
                <IoMdAdd size={25} className="text-bgColor-100 font-bold" />
              )}
            </div>

            {activeIndex === index && (
              <div className="pb-4 font-normal text-gray-500">
                <p>{item?.faqDescription}</p>
                <ul className="mt-2">
                  {item?.faqPoint?.map((listItem, pointIndex) => (
                    <li key={pointIndex} className="list-disc mx-10 text-sm lg:text-base">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div> 
            )}
            <div className=' justify-center items-center gap-2 absolute bottom-2 right-2 hidden group-hover:flex'> 
            <RxCross2
              size={20}
              className=" cursor-pointer text-red-500"
              onClick={() => handleDeleteClick(item)}
            />
            <MdEdit
              size={20}
              className=" cursor-pointer text-black"
              onClick={() => handleEditClick(item)}
            />
            </div>

            {index !== faqData.length - 1 && (
              <div className="w-[100%] h-[1px] bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
        {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed py-20 inset-0 bg-black bg-opacity-50  overflow-y-scroll  min-h-screen flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-lg w-1/2 mr-4   h-4/5 overflow-hidden overflow-y-scroll">
            <h2 className="text-2xl mb-4">Add FAQ </h2>
            <input
              type="text"
              value={addCard.faqTitle}
              onChange={(e) => setAddCard({ ...addCard, faqTitle: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="FAQ Title"
            />
            <textarea
              value={addCard.faqDescription}
              onChange={(e) => setAddCard({ ...addCard, faqDescription: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="FAQ Description"
            />
            {addCard.faqPoint.map((point, index) => (
              <div key={index} className="relative flex items-center mb-4">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...addCard.faqPoint];
                    newPoints[index] = e.target.value;
                    setAddCard({ ...addCard, faqPoint: newPoints });
                  }}
                  className="block w-full p-2 border"
                  placeholder={`Point ${index + 1}`}
                />
                <button
                  className="absolute -right-8 text-red-500 mx-2"
                  onClick={() => deletePointAddCard(index)}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            ))}
            <button
              className="flex items-center bg-blue-500 text-black p-2 rounded mb-4"
              onClick={addPointAddCard}
            >
              <FaPlus className="mr-2" /> Add Point
            </button>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white p-2 rounded mr-4"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              {isLoading ? (
                <div>Loading...</div> // Replace with your LoadingButton component
              ) : (
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={handleAddCardSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
        {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed py-20 inset-0 bg-black bg-opacity-50  overflow-y-scroll  min-h-screen flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-lg w-1/2 mr-4   h-4/5 overflow-hidden overflow-y-scroll">
            <h2 className="text-2xl mb-4">Edit FAQ</h2>
            <input
              type="text"
              value={editData.faqTitle}
              onChange={(e) => setEditData({ ...editData, faqTitle: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="FAQ Title"
            />
            <textarea
              value={editData.faqDescription}
              onChange={(e) => setEditData({ ...editData, faqDescription: e.target.value })}
              className="block w-full mb-4 p-2 border"
              placeholder="FAQ Description"
            />
            {editData.faqPoint.map((point, index) => (
              <div key={index} className="relative flex items-center mb-4">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...editData.faqPoint];
                    newPoints[index] = e.target.value;
                    setEditData({ ...editData, faqPoint: newPoints });
                  }}
                  className="block w-full p-2 border"
                  placeholder={`Point ${index + 1}`}
                />
                <button
                  className="absolute -right-8 text-red-500 mx-2"
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
              <FaPlus className="mr-2" /> Add Point
            </button>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white p-2 rounded mr-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              {isLoading ? (
                <div>Loading...</div> // Replace with your LoadingButton component
              ) : (
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Faq;
