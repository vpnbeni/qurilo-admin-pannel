import { API_URL } from "@/api/commonApi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdEdit, MdAdd } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import LoadingButton from "@/component/buttons/LoadingButton";

const ManagementService = ({ id }) => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditingMainHeading, setIsEditingMainHeading] = useState(false);
  const [mainHeading, setMainHeading] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [addLoading , setAddLoading] = useState(false);

  const [newCard, setNewCard] = useState({
    cardTitle: "",
    cardDescription: "",

    icon: null,
  });

  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/business/management-card/${id}`);
      const result = await response.json();

      if (result.status) {
        setServices(result.data.cardData);
        setMainHeading(result.data.mainHeading);
        setDescription(result.data.description);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, successfullyEdited]);

  const handleEditClick = (id) => {
    setEditingId(id === editingId ? null : id);
  };

  const handleInputChange = (e, id, field) => {
    const updatedServices = services.map((service) => {
      if (service._id === id) {
        return { ...service, [field]: e.target.value };
      }
      return service;
    });
    setServices(updatedServices);
  };
  const handleCancelEdit=()=>{
    setSuccessfullyEdited((prev) => !prev);
    setEditingId(null);
  }
  const handleEditData = async (idd) => {
    const updatedSingleService = services.find((service) => service._id === idd);
    const formData = new FormData();
    formData.append("cardTitle", updatedSingleService.cardTitle);
    formData.append("cardDescription", updatedSingleService.cardDescription);
    formData.append("slugName", id);

    if (inputRef.current && inputRef.current.files[0]) {
      formData.append("icon", inputRef.current.files[0]);
    }

    try {
      const res = await fetch(`${API_URL}auth/v1/business/management-card/${idd}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        setSuccessfullyEdited((prev) => !prev);

        throw new Error("Failed to update service");
      }

      await res.json();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSaveMainHeading = async () => {
    try {
      const res = await fetch(`${API_URL}auth/v1/business/management-card/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainHeading, description , slugName:id}),
      });

      if (!res.ok) {
        setSuccessfullyEdited((prev) => !prev);

        throw new Error("Failed to update heading");
      }

      await res.json();
      setIsEditingMainHeading(false);
      fetchData(); // Re-fetch to update the UI
    } catch (error) {
      console.error("Error updating heading:", error);
    }
  };

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setNewCard({
      cardTitle: "",
      cardDescription: "",
      icon: null,
    });
  };

  const handleSaveNewCard = async () => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append("cardTitle", newCard.cardTitle);
    formData.append("cardDescription", newCard.cardDescription);
    formData.append("icon", newCard.icon);
    formData.append("slugName", id);

    try {
      const res = await fetch(`${API_URL}auth/v1/business/management-card/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setSuccessfullyEdited((prev) => !prev);

        throw new Error("Failed to save new card");
      }

      const result = await res.json();

      fetchData();
      setAddLoading(false);
      handleCancelClick();
    } catch (error) {
      console.error("Error saving new card:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const res = await fetch(`${API_URL}auth/v1/business/management-card/${cardId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete card");
      }
      fetchData();
      setServices(services.filter((service) => service._id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
        handleDeleteCard(idd);
    }
  };
  return (
    <div className="mt-4 bg-black relative group h-auto">
      <div className="text-center pt-10 relative">
        <h1 className="text-2xl font-semibold font-sans text-white">{mainHeading}</h1>
        <p className="text-white">{description}</p>
        <button
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setIsEditingMainHeading(true)}
        >
          <MdEdit className="text-white" size={26} />
        </button>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 m-4 lg:p-20">
        {(showAll ? services : services.slice(0, 3)).map((service) => (
          <div
            key={service._id}
            className="group bg-black border-2 border-zinc-400 rounded-xl hover:bg-white hover:text-black text-white relative flex flex-col gap-5 shadow-xl p-5 cursor-pointer min-h-full"
          >
            {editingId === service._id ? (
              <div>
                <Image alt={`${service?.cardTitle}`} src={service.icon} width={50} height={50} onClick={() => inputRef.current.click()} className="mb-3" />
                <input
                  value={service.cardTitle}
                  onChange={(e) => handleInputChange(e, service._id, "cardTitle")}
                  className="text-black ps-2 rounded-lg p-2 border-1 border-black w-full"
                />
                <input type="file" ref={inputRef} className="invisible" />
              </div>
            ) : (
              <h1 className="mt-5 font-semibold text-2xl">
                <Image className="mb-4" alt={`${service?.cardTitle}`} src={service.icon} width={50} height={50} />
                {service.cardTitle}
              </h1>
            )}

            {editingId === service._id ? (
              <textarea
                value={service.cardDescription}
                onChange={(e) => handleInputChange(e, service._id, "cardDescription")}
                className="text-sm flex-grow break-words h-full w-full p-2 border rounded-md text-black"
                rows="5"
              />
            ) : (
              <p className="text-base flex-grow font-normal break-words">{service.cardDescription}</p>
            )}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => handleDeleteClick(service._id)} className="text-red-500">
                <RxCross2 size={32} />
              </button>
            </div>
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {editingId === service._id ? (
                <div className="flex gap-2">
                  <button onClick={() => handleCancelEdit()} className="bg-red-600 text-white rounded-md px-2 py-2">
                  Cancel
                </button>
                  <button onClick={() => handleEditData(service._id)} className="bg-green-600 text-white rounded-md px-2 py-2">
                  Save
                </button>
                </div>
              ) : (
                <button onClick={() => handleEditClick(service._id)} className="mt-2">
                  <MdEdit size={32} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pb-4">
        {services.length > 3 && (
          <button onClick={() => setShowAll(!showAll)} className="bg-blue-400 text-white py-1 px-4 text-lg rounded-lg">
            {showAll ? "View Less" : "Load More"}
          </button>
        )}
      </div>
      <div className="absolute right-0 top-[9rem] text-center pb-4">
        <button
          onClick={handleAddCardClick}
          className="bg-blue-400 font-bold group-hover:block hidden bg-white text-black py-1 px-4 text-lg rounded-lg mr-4"
        >
          <MdAdd />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add Card</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Card Title</label>
              <input
                type="text"
                value={newCard.cardTitle}
                onChange={(e) => setNewCard({ ...newCard, cardTitle: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Card Description</label>
              <textarea
                value={newCard.cardDescription}
                onChange={(e) => setNewCard({ ...newCard, cardDescription: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Icon</label>
              <input
                type="file"
                onChange={(e) => setNewCard({ ...newCard, icon: e.target.files[0] })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleCancelClick} className="text-white bg-red-500 py-2 px-4 rounded-md mr-2">
                Cancel
              </button>
             {addLoading ? <LoadingButton/> : <button onClick={handleSaveNewCard} className="bg-blue-500 text-white bg-green-500 py-2 px-4 rounded-md">
                Save
              </button>} 
            </div>
          </div>
        </div>
      )}

      {isEditingMainHeading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Heading</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Main Heading</label>
              <input
                type="text"
                value={mainHeading}
                onChange={(e) => setMainHeading(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="4"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsEditingMainHeading(false)} className="text-white bg-red-500 py-2 px-4 rounded-md mr-2">
                Cancel
              </button>
              <button onClick={handleSaveMainHeading} className="bg-blue-500 text-white bg-green-500 py-2 px-4 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementService;




