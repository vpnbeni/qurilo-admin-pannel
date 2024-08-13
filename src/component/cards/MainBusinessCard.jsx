import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import { RxCross2 } from "react-icons/rx";

const BusinessCard = ({ card, index ,setSuccessfullyEdited,successfullyEdited}) => {
  const [editCard, setEditCard] = useState(false);
  const [cardTitle, setCardTitle] = useState(card?.cardTitle);
  const [description, setDescription] = useState(card?.cardDescription);
  const [image, setImage] = useState(card?.image);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0])); // For previewing the selected image
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("cardTitle", cardTitle);
    formData.append("cardDescription", description);
    formData.append("slugLink", card.slugLink);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/business-solutions/${card._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setEditCard(false); // Exit edit mode after saving
        // Update the card data locally if needed
        setSuccessfullyEdited(!successfullyEdited)
      } else {
        console.error("Failed to update card data");
      }
    } catch (error) {
      console.error("Error updating card data:", error);
    }
  };
  const deleteCard = async (id) => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/business-solutions/${id}`, {
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

  return (
    <div className="group relative">
      {editCard ? (
        <div className="flex flex-col gap-2 w-2/3 mx-auto ">
          <input
            type="text"
            className="p-2 m-2 w-full text-black border border-black rounded-lg"
            name="cardTitle"
            id="cardTitle"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="p-2 m-2 w-full text-black border border-black rounded-lg"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="p-2 m-2 w-full text-black border border-black rounded-lg"
            onChange={handleImageChange}
          />
          <div className="flex justify-start">
            {image && (
              <Image
                src={image}
                alt="Card Image Preview"
                width={100}
                height={100}
                className="object-cover rounded-md mt-2"
              />
            )}
          </div>
          <div className="text-white mx-2 flex gap-2">
            <div
              className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
              onClick={() => {
                setEditCard(false);
              }}
            >
              Cancel
            </div>
            <div
              className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
              onClick={handleSave}
            >
              Save
            </div>
          </div>  
        </div>
      ) : (
        <div
          data-aos={index % 2 === 0 ? "zoom-out-up" : "zoom-out-down"}
          className={`flex items-start justify-between gap-5 md:gap-8 px-6 py-5 transition-all ease-in-out duration-300 ${
            index % 2 === 0 ? "lg:pl-20 lg:pr-2" : "lg:pl-2 lg:pr-20"
          }`}
        >
          <div className="hidden md:block relative w-full md:h-[8rem] lg:h-[8rem] md:w-[20%] lg:w-[30%] overflow-hidden">
            <Image
              src={card.image}
              alt={card.cardTitle}
              fill={true}
              className="w-full h-full object-cover rounded-sm group-hover:scale-110 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-2 lg:gap-1 lg:justify-between lg:w-[70%] md:h-[8rem] md:w-[80%] lg:h-[8rem]">
            <div  className="flex items-center justify-between text-lg">
              <h2 className="font-[600] text-xl md:text-xl lg:text-base xl:text-lg">
                {card.cardTitle}
              </h2>
              <FaArrowRightLong className="text-primary-500 text-2xl lg:text-xl xl:text-2xl group-hover:-rotate-45 transition-all ease-in-out duration-300" />
            </div>
            <div className="text-zinc-800 mb-2 md:text-base lg:text-xs xl:text-base">
              {card.cardDescription}
            </div>
            <p className="w-full h-[1px] bg-zinc-400 group-hover:bg-primary-500 group-hover:h-[2px] transition-all ease-in-out duration-300"></p>
          </div>
          <div
              className={`absolute  justify-center items-center bottom-6 z-30 right-2 text-red-500 group-hover:flex hidden cursor-pointer `}
              
            >
              <RxCross2 className="cursor-pointer text-red-500" size={20} onClick={() => deleteCard(card?._id)} />
                
              <MdEdit className="cursor-pointer text-black" size={20} onClick={() => {
              setEditCard(true);
            }}/>
            </div>
          
        </div>
      )}
    </div>
  );
};

export default BusinessCard;
