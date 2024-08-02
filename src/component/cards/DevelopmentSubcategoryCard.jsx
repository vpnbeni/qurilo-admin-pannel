import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoTrashBin } from 'react-icons/io5';
import { API_URL } from '@/api/commonApi';
import { FaTimes } from "react-icons/fa";
import LoadingButton from '../buttons/LoadingButton';
export default function DevelopmentSubcategoryCard({
  image,
  title,
  des,
  cardId,
  setSuccessfullyEdited,
  successfullyEdited,id
}) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState(title);
  const [editDes, setEditDes] = useState(des);
  const [editImage, setEditImage] = useState(null);
  const [updateLoading , setUpadateLoading] = useState(false);
  const handleSave = async (idd) => {
    setUpadateLoading(true);
    const formData = new FormData();
    formData.append('cardTitle', editTitle);
    formData.append('cardDescription', editDes);
    formData.append('slugName', id);
    if (editImage) {
      formData.append('icon', editImage);
    }
    try {
      const response = await fetch(`${API_URL}auth/v1/development/service-card/${idd}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        setEditId(null); // Exit edit mode
        setUpadateLoading(false);
        setSuccessfullyEdited(!successfullyEdited);
      } else {
        console.error('Failed to update the card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/development/service-card/${cardId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessfullyEdited(!successfullyEdited);
      } else {
        console.error('Failed to delete the card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      handleDelete(idd);
    }
  };
  return (
    <div className="relative p-7 rounded-xl bg-white hover:border-blue border-[1px] shadow-sm group">
      {editId === cardId ? (
        <>
          <input type="file" onChange={(e) => setEditImage(e.target.files[0])} className="mb-2" />
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border-[1px] my-2 w-full text-medium border-gray-600" />
          <textarea value={editDes} onChange={(e) => setEditDes(e.target.value)} className="border-[1px] my-2 w-full border-gray-600" rows={5} />
        </>
      ) : (
        <>
          <img src={image} alt={title} className="w-16 h-16 object-cover mb-5" />
          <h3 className="md:text-xl text-black font-bold font-sans mb-7">
            {title}
            <p className="border-[1px] mt-5 border-blue-900 border-blue hover:border-white"></p>
          </h3>
          <p className="font-medium leading-7 break-words font-sans text-gray-500 mb-6 dark:text-gray-400">
            {des}
          </p>
        </>
      )}
      {editId === cardId ? (
        updateLoading ? <LoadingButton/> : <button onClick={() => handleSave(cardId)} className="text-white bg-green-600 px-4 py-2 rounded-md">
          Save
        </button>
      ) : (
        <MdEdit
          onClick={() => setEditId(cardId)}
          size={26}
          className="absolute bottom-6 right-6 cursor-pointer hidden group-hover:block"
        />
      )}
      <FaTimes
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 text-red-500 hidden group-hover:block cursor-pointer"
        size={24}
      />
    </div>
  );
}