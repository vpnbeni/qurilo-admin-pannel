import Image from "next/image";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import LoadingButton from "@/component/buttons/LoadingButton";
import { API_URL } from "@/api/commonApi";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const WhyChooseUsCard = ({ card, editId, id, setEditId, fetchBenefits }) => {
  const [editTitle, setEditTitle] = useState(card.cardTitle);
  const [editDes, setEditDes] = useState(card.cardDescription);
  const [editImage, setEditImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCancel=()=>{
    fetchBenefits();
    setEditId(null);

  }
  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("cardTitle", editTitle);
    formData.append("cardDescription", editDes);
    formData.append("icon", editImage);
    formData.append("slugName", id);

    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/benefit-card/${card._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        fetchBenefits();
        setEditId(null);
      } else {
        console.error("Failed to update card");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (idd) => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/benefit-card/${idd}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      const result = await response.json();
      fetchBenefits();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <div className="flex gap-6">
      <Image
        src={card.icon}
        width={50}
        height={50}
        alt={card.cardTitle}
        className="w-12 h-12 object-cover aspect-auto"
      />
      <div className="relative flex w-full flex-col items-start gap-2 border-b-[1px] border-bgColor-100 pb-4">
        {editId === card._id ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-2xl font-[600] text-black border-[1px] border-gray-600 text-center lg:text-start p-2"
            />
            <textarea
              value={editDes}
              onChange={(e) => setEditDes(e.target.value)}
              className="w-full text-lg font-normal text-black border-[1px] border-gray-600 text-center lg:text-start p-2"
            />
            <input
              type="file"
              onChange={(e) => setEditImage(e.target.files[0])}
            />
            <div className="flex w-full justify-end mt-2">
              {loading ? (
                <LoadingButton />
              ) : (
                <div className="flex gap-2">
                  <button
                  onClick={handleCancel}
                  className="cursor-pointer bg-red-800 text-lg font-normal text-white  border-[1px] rounded-md px-3 py-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="cursor-pointer bg-green-800 text-lg font-normal text-white  border-[1px] rounded-md px-3 py-1"
                >
                  Save
                </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full justify-between items-center">
              <h3 className="text-lg font-[700]">{card.cardTitle}</h3>
              <RxCross2
                onClick={() => deleteCard(card?._id)}
                size={24}
                className="absolute right-0 text-red-600 my-1 hidden group-hover:block cursor-pointer"
              />
            </div>

            <p className="text-base break-words">{card.cardDescription}</p>
          </>
        )}
        <div className="hidden absolute -right-5 bottom-2 group-hover:flex w-full justify-end me-5">
          {editId !== card._id && (
            <MdModeEditOutline
              onClick={() => setEditId(card._id)}
              className=" cursor-pointer text-black"
              size={25}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsCard;
