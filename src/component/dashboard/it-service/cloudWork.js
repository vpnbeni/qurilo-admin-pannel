import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import AddCardModal from "@/component/modals/AddCardModal";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";

const CloudWork = ({ data, id }) => {
  const [editingId, setEditingId] = useState(null);
  const [cloudWorkData, setCloudWorkData] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editHeading, setEditHeading] = useState(false);
  const [editMainHeading, setEditMainHeading] = useState('');
  const [editContent, setEditContent] = useState('');
  const [headingLoading, setHeadingLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initial visible cards count
  const [showAll, setShowAll] = useState(false); // Toggle to show all cards
  

  const slugName = id;

  const fetchCloudWork = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/it/cloud-work/${id}`);
      const data = await response.json();
      setCloudWorkData(data?.data);
      setEditMainHeading(data?.data?.mainHeading);
      setEditContent(data?.data?.description);
      setHeadingLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCloudWork();
    }
  }, [id]);

  const handleEditClick = (card) => {
    setEditingId(card._id);
    setEditTitle(card.cardTitle);
    setEditDescription(card.cardDescription);
    setEditIcon(null);
  };
  const handleCancelClick=()=>{
    fetchCloudWork();
    setEditingId(null);
  }
  const handleSaveClick = async (card) => {
    setUpdateLoading(true);
    const formData = new FormData();

    formData.append("cardTitle", editTitle);
    formData.append("cardDescription", editDescription);
    formData.append("slugName", slugName);
    if (editIcon) {
      formData.append("icon", editIcon);
    }
    try {
      const response = await fetch(
        `${API_URL}auth/v1/it/cloud-work/${card._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save card data");
      }

      await response.json();
      fetchCloudWork();
      setEditingId(null);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleAddNewCard = async (title, description, icon) => {
    const formData = new FormData();
    formData.append("cardTitle", title);
    formData.append("cardDescription", description);
    formData.append("slugName", slugName);
    if (icon) {
      formData.append("icon", icon);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/it/cloud-work`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add new card");
      }

      await response.json();
      fetchCloudWork();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding new card:", error);
    }
  };
  const handleHeadingCancel =()=>{
    fetchCloudWork();
    setEditHeading(false);

  }
  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: editMainHeading,
      description: editContent,
      slugName: id
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/it/cloud-work`, {
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
      
     fetchCloudWork();
      setEditHeading(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMore = () => {
    setShowAll(true);
    setVisibleCount(cloudWorkData?.cloudWork?.length);
  };

  const handleViewLess = () => {
    setShowAll(false);
    setVisibleCount(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      deleteCard(idd);
    }
  };
  const deleteCard = async (idd) => {
    try {
      const response = await fetch(`${API_URL}auth/v1/it/cloud-work/${idd}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      const result = await response.json();
      fetchCloudWork();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <section className="bg-white group lg:ml-10 lg:mr-10 my-10">
      <div className="flex relative flex-col gap-6">
        {editHeading ? (
          <div className="flex flex-col items-center gap-y-4">
            <input value={editMainHeading} onChange={(e) => setEditMainHeading(e.target.value)} className="border-[1px] px-2 py-1 font-medium text-3xl rounded-sm w-3/4 text-center border-gray-900"></input>
            <textarea rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="border-[1px] px-2 py-1 rounded-sm w-3/4 text-center border-gray-900"/>
          </div>
        ) : (
          <>
            <div className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
              {cloudWorkData?.mainHeading}
            </div>
            <p className="text-center text-[18px] font-[400] mt-2">
              {cloudWorkData?.description}
            </p>
          </>
        )}

        {editHeading ? (
         <div className="flex justify-center"> {headingLoading ? <LoadingButton/> : 
          <div className="flex gap-2 ">
            <button onClick={handleHeadingCancel} className="bg-red-600 text-white px-4 py-2  rounded-md">Cancel</button>

            <button onClick={handleHeading} className="bg-green-600 text-white px-4 py-2  rounded-md">Save</button>
          </div>
         }
         </div>
        ) : (
          <div className="hidden absolute bottom-14 right-4 group-hover:flex justify-center">
            <MdModeEdit
              onClick={() => setEditHeading(true)}
              className="cursor-pointer"
              size={26}
            />
          </div>
        )}
        
      </div>
      <div className="flex justify-end relative me-4">
        <button
          className="bg-blue hidden group-hover:block absolute top-6 right-[-3.75rem] text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:mt-4 mx-0 mb-20">
        {cloudWorkData?.cloudWork?.slice(0, visibleCount).map((card, index) => (
          <div
            key={card.id}
            className="flex-1 relative group min-w-[300px] max-w-[400px]"
          >
            <div className="relative mx-5 p-6 py-12 lg:p-6 lg:w-80 lg:min-h-72 rounded-xl bg-white hover:border-blue border-[0.1px] shadow-sm hover:shadow-blue">
              <div className={`flex ${editingId === card?._id ? "flex-col" : "flex-row"} w-full items-center my-3 gap-5`}>
                {editingId === card?._id ? (
                  <input className="w-full"
                    type="file"
                    onChange={(e) => setEditIcon(e.target.files[0])}
                  />
                ) : (
                  card.icon && (
                    <Image
                      src={card.icon}
                      width={100}
                      height={100}
                      alt="image"
                      className="h-10 w-10"
                    />
                  )
                )}
                {editingId === card?._id ? (
                  <input
                    className="border-[1px] rounded-sm p-2 w-full border-black font-medium text-xl"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  <h3 className="text-xl text-black font-medium font-sans">
                    {card.cardTitle}
                  </h3>
                )}
              </div>
              <p className="border-[2px] border-blue mt-4 mb-2"></p>
              {editingId === card?._id ? (
                <textarea
                  rows={5}
                  value={editDescription}
                  className="border-[1px] rounded-sm p-2 w-full mb-4 border-black"
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
                <p className="leading-7 font-sans break-words text-gray-500 mb-5 dark:text-gray-400">
                  {card.cardDescription}
                </p>
              )}
              {editingId === card?._id ? (
                updateLoading ? (
                <div className="flex justify-end">  <LoadingButton /></div>
                ) : (
                  <div className="flex justify-end gap-2">
                  <button
                    className="text-white  bg-red-600 px-4 py-2 rounded-md"
                    onClick={() => handleCancelClick()}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white  bg-green-600 px-4 py-2 rounded-md"
                    onClick={() => handleSaveClick(card)}
                  >
                    Save
                  </button>
                  </div>
                )
              ) : (
                <MdModeEditOutline
                  onClick={() => handleEditClick(card)}
                  size={26}
                  className="cursor-pointer absolute bottom-2 right-3 hidden group-hover:block"
                />
                
              )}
             <RxCross2 className="cursor-pointer text-red-600 absolute top-2 right-3 hidden group-hover:block" onClick={() => handleDeleteClick(card?._id)} size={27} /> 
              <div className={`absolute ${editingId === card?._id ? "hidden" : "block"}  bottom-2  md:bottom-5 right-10 cursor-pointer flex items-center text-blue underline justify-end font-normal rounded-md bg-white transition-all duration-500`}>
                Know More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-4 w-4 ml-3"
                >
                  <path
                    fill="currentColor"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cloudWorkData?.cloudWork?.length > 3 && (
        <div className="flex justify-center mb-4">
          {showAll ? (
            <button
              onClick={handleViewLess}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              View Less
            </button>
          ) : (
            <button
              onClick={handleViewMore}
              className="bg-blue text-white px-4 py-2 rounded-md"
            >
              Load More
            </button>
          )}
        </div>
      )}
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddNewCard}
      />
    </section>
  );
};

export default CloudWork;







