import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { API_URL } from "@/api/commonApi";

const DevelopmentCard = ({ card, index, setSuccessfullyEdited, successfullyEdited }) => {
  const [cardEdit, setCardEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(card?.cardTitle);
  const [point, setPoint] = useState(card?.point || []);
  const [image, setImage] = useState(card?.image);
  const [icon, setIcon] = useState(card?.icon);
  const [imageFile, setImageFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);

  const handleAddItem = () => {
    setPoint([...point, ""]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...point];
    newItems.splice(index, 1);
    setPoint(newItems);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0])); // For previewing the selected image
  };

  const handleIconChange = (e) => {
    setIconFile(e.target.files[0]);
    setIcon(URL.createObjectURL(e.target.files[0])); // For previewing the selected icon
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("cardTitle", cardTitle);
    formData.append("point", JSON.stringify(point));
    formData.append("slugLink", card.slugLink);

    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/development-solutions/${card._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setCardEdit(false); // Exit edit mode after saving
        setSuccessfullyEdited(!successfullyEdited); // Notify parent component of changes
      } else {
        console.error("Failed to update card data");
      }
    } catch (error) {
      console.error("Error updating card data:", error);
    }
  };
  const handleDeleteCard = async (id) => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/development-solutions/${id}`, {
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
      handleDeleteCard(idd);
    }
  };
  return (
    <div data-aos={index % 2 === 0 ? "zoom-out-up" : "zoom-out-down"} className="card w-full h-[20rem] relative">
      {cardEdit ? (
        <div className="flex flex-col gap-2 w-full h-full mx-auto bg-black p-4 overflow-hidden relative z-30 overflow-y-scroll ">
          <input
            type="text"
            className="p-2 m-2 w-full text-black"
            name="cardTitle"
            id="cardTitle"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <div className="flex justify-center items-center">
            <span className="text-white mx-4 font-semibold text-xl">Image</span>
            <input
              type="file"
              className="p-2 m-2 w-full text-white border border-white rounded-xl"
              placeholder="Image"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
            {image && <Image src={image} alt="Image Preview" width={100} height={100} />}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-white mx-4 font-semibold text-xl">Icon</span>
            <input
              type="file"
              className="p-2 m-2 w-full text-white border border-white rounded-xl"
              placeholder="Icon"
              name="icon"
              id="icon"
              onChange={handleIconChange}
            />
            {icon && <Image src={icon} alt="Icon Preview" width={100} height={100} />}
          </div>
          <div className="mx-4">
            <h2>Description</h2>
            {point?.map((item, index) => (
              <div
                className="flex justify-center items-center gap-2"
                key={index}
              >
                <input
                  type="text"
                  className="p-2 m-2 w-full text-black"
                  value={item}
                  onChange={(e) =>
                    setPoint(
                      point.map((item, i) =>
                        i === index ? e.target.value : item
                      )
                    )
                  }
                />
                <RxCross2
                  className="text-xl text-red-500 cursor-pointer"
                  onClick={() => handleDeleteItem(index)}
                />
              </div>
            ))}
            <div
              className="mx-4 my-2 cursor-pointer "
              onClick={handleAddItem}
            >
              <IoMdAdd className="text-2xl text-white" />
            </div>
          </div>
          <div className="text-white mx-2 flex gap-2">
            <div
              className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
              onClick={() => {
                setCardEdit(false);
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
        <div className="content w-full h-full relative group">
          <div className="back h-full w-full ">
            <div
              className="back-content w-full h-full flex items-end justify-start px-4 pb-5"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(106,106,106,0) 50%, rgba(255,248,248,0) 100%) ,url(${card?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="overlay flex text-white items-center gap-2">
                {icon && (
                  <Image
                    src={card?.icon}
                    alt={card?.cardTitle}
                    className="h-8 w-8"
                    sizes="(width: 8rem),(width: 8rem)"
                    width="auto"
                    height="auto"
                  />
                )}
                <h3 className="text-xl font-semibold">{card?.cardTitle}</h3>
              </div>
            </div>
          </div>
          <div className="front w-full h-full bg-white text-black py-6 px-8">
            <div className="flex flex-col items-start justify-between w-full h-full">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl xl:text-2xl font-semibold capitalize">
                  {card?.cardTitle}
                </h3>
                <p className="w-32 h-[2px] bg-primary-500"></p>
              </div>
              <ul className="flex flex-col gap-2">
                {card?.point?.map((des, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 font-semibold lg:text-base text-[14px]"
                  >
                    <FaCheck />
                    {des}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`absolute top-5 z-30 right-5 text-red-500 group-hover:block hidden cursor-pointer `}
              
            >
              <RxCross2 className="cursor-pointer text-red-500" size={26} onClick={() => handleDeleteClick(card?._id)} />
            </div>
            <div
              className={`absolute bottom-5 z-30 right-5 text-black group-hover:block hidden cursor-pointer `}
              onClick={() => {
                setCardEdit(!cardEdit);
              }}
            >
              <MdEdit className="cursor-pointer text-black" size={26} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentCard;
