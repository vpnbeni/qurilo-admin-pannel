import { API_URL } from "@/api/commonApi";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import LoadingButton from "../buttons/LoadingButton";
import { RxCross2 } from "react-icons/rx";

const ServiceCard = ({
  type,
  category,
  icon,
  name,
  des,
  id,
  slugName,
  setSuccessfullyEdited,
  successfullyEdited,
  editingId,
  setEditingId,
  newImage,
  setNewImage
}) => {
  const [editName, setEditName] = useState("");
  const [editDes, setEditDes] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleEditClick = (id) => {
    if (editingId !== id) {
      setEditingId(id);
      setEditName(name);
      setEditDes(des);
    } else {
      setEditingId(null);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleCancelClick = () => {
    setEditingId(!id);
    setSuccessfullyEdited(!successfullyEdited);
  }

  const handleSaveClick = async (idd) => {
    setUpdateLoading(true);
    
    const formData = new FormData();
    formData.append('cardTitle', editName);
    formData.append('cardDescription', editDes);
    formData.append('slugName', slugName);
    if (newImage) {
      formData.append('icon', newImage);
    }
    try {
      const response = await fetch(`${API_URL}auth/v1/${category}/service-card/${idd}`, {
        method: "PUT",
        
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      const result = await response.json();
      setSuccessfullyEdited(!successfullyEdited);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setUpdateLoading(false);
      setEditingId(null);
    }
  };

  const deleteCard = async (idd) => {
    try {
      const response = await fetch(`${API_URL}auth/v1/${category}/service-card/${idd}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      const result = await response.json();
      setSuccessfullyEdited(!successfullyEdited);
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      deleteCard(idd);
    }
  };

  return (
    <div>
      <div className="p-7 h-full relative rounded-xl bg-white hover:bg-lightblue transition-all ease-in-out duration-100 border-[1px] shadow-sm">
        {editingId === id ? (
          <>
            <input
              value={editName}
              onChange={(e) => handleInputChange(e, setEditName)}
              className="w-full mb-4 p-2 border rounded-md"
              placeholder="Edit Name"
            />
            <textarea
              value={editDes}
              rows={5}
              onChange={(e) => handleInputChange(e, setEditDes)}
              className="w-full mb-4 p-2 border rounded-md"
              placeholder="Edit Description"
            />
            <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="mb-2" />
          </>
        ) : (
          <>
            <div className="">
              {icon && (
                <img
                  src={icon}
                  alt={name}
                  className="w-16 h-16 object-cover mb-5" 
                />
              )}
              <h3 className="md:text-xl text-black font-bold font-sans mb-7">
                {name}
                <p className={`border-[1px] mt-5 ${type && type === "industries" ? "border-blue" : "border-primary-500"}`}></p>
              </h3>
            </div>
            <p className="font-medium break-words leading-7 font-sans text-gray-500 mb-6 dark:text-gray-400">
              {des}
            </p>
          </>
        )}
        <div className={`py-3 ${editingId === id ? "hidden" : ""} pt-6 cursor-pointer flex items-center text-black underline justify-end w-full font-normal rounded-md bg-transparent transition-all duration-500`}>
          Know More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-5 w-5 ms-3"
          >
            <path
              fill="#000"
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-x-3">
          {editingId === id ? (
            updateLoading ? (
              <div className="absolute right-2 hidden group-hover:block bottom-4"> <LoadingButton /></div>
            ) : (
              <div className="flex gap-4" >
                <button
                  onClick={handleCancelClick}
                  className="bg-red-600 text-white px-4 py-2  hidden group-hover:block bottom-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveClick(id)}
                  className="bg-green-600 text-white px-4 py-2  hidden group-hover:block bottom-4 rounded-md"
                >
                  Save
                </button>
              </div>
            )
          ) : (
            <MdEdit
              className="cursor-pointer absolute right-2 hidden group-hover:block bottom-4"
              onClick={() => handleEditClick(id)}
              size={27}
            />
          )}
          <RxCross2
            className="cursor-pointer hidden group-hover:block text-red-600 absolute right-1 top-2"
            onClick={() => handleDeleteClick(id)}
            size={27}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
