import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";

const ItServicesCard = ({ card, link,setSuccessfullyEdited,successfullyEdited}) => {
  const [editCard, setEditCard] = useState(false);
  const [cardTitle, setCardTitle] = useState(card?.cardTitle);
  const [image, setImage] = useState(card?.image);
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0])); // For previewing the selected image
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("cardTitle", cardTitle);
    formData.append("slugLink", card.slugLink);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/it-solutions/${card._id}`, {
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
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/it-solutions/${id}`, {
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
  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      deleteCard(idd);
    }
  };
  return (
    <div  className="relative lg:w-[21%] md:w-[40%] w-[90%] h-[22rem] rounded-md overflow-hidden cursor-pointer transition-transform duration-500 ease-linear hover:-translate-y-3 group">
      {editCard ?(
        <div className="flex flex-col gap-2 w-full h-full mx-auto bg-black border border-w rounded-lg  pr-4 py-4 overflow-hidden relative z-30 ">
        <input
          type="text"
          className="p-2 m-2 w-full text-black"
          name="cardTitle"
          id="cardTitle"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)} // Update state
        />
        <div className="flex justify-center items-center">
          <span className="text-white mx-4 font-semibold text-sm">Image</span>
          <input
            type="file"
            className="p-2 m-2 w-full text-white border border-white rounded-xl"
            placeholder="Image"
            name="image"
            id="image"
            onChange={handleImageChange} // Handle image input
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
        </div>

        
        <div className="text-white mx-2 flex gap-2">
          <div
            className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
            onClick={() => {
              setEditCard(!editCard);
            }}
          >
            Cancel
          </div>
          <div
            className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </div>
        </div>
      </div>
      ):(
        <div>
          <Image fill={true} src={image} alt={cardTitle} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-linear" />
          <h2 className="text-2xl font-semibold text-white mt-9 px-6 absolute z-10">{cardTitle}</h2>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80"></div>
      <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-black before:opacity-0 before:transition-opacity before:duration-100 before:ease-linear group-hover:before:opacity-90"></div>
      <div className="absolute top-4 right-2 group-hover:block hidden">
      <RxCross2 className="cursor-pointer text-red-500" size={20} onClick={() => handleDeleteClick(card?._id)} />
      </div>
      <div
              className={`absolute  justify-center items-center bottom-4 z-30 right-2 text-red-500 group-hover:flex hidden cursor-pointer `}
              
            >
              
                
              <MdEdit className="cursor-pointer text-white" size={20} onClick={() => {
              setEditCard(true);
            }}/>
            </div>
    </div>
  );
};

export default ItServicesCard;
