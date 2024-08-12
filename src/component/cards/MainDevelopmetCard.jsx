import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import ExploreMoreButton from "../buttons/ExploreMoreButton";
import Link from "next/link";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";

const DevelopmentCard = ({ card }) => {
  const [cardEdit, setCardEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(card?.cardTitle);
  const [point, setPoint] = useState(card?.point);
  const [image, setImage] = useState(card?.image);
  const [icon, setIcon] = useState(card?.icon);

  const handleAddItem = () => {
    setPoint([...point, ""]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...point];
    newItems.splice(index, 1);
    setPoint(newItems);
  };

  const handleSave = () => {
    // Add your save functionality here
    // You can make an API call or update the parent state with the new card details
    setCardEdit(false); // Close the edit mode after saving
  };

  return (
    <div data-aos="fade-up" className="card w-full h-[20rem]">
      {cardEdit ? (
        <div className="flex flex-col gap-2 w-full h-full mx-auto bg-black p-4 overflow-hidden relative z-30 overflow-y-scroll ">
          <input
            type="text"
            className="p-2 m-2 w-full text-black"
            name="cardTitle"
            id="cardTitle"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)} // Update state
          />
          <div className="flex justify-center items-center">
            <span className="text-white mx-4 font-semibold text-xl">Image</span>
            <input
              type="file"
              className="p-2 m-2 w-full text-white border border-white rounded-xl"
              placeholder="Image"
              name="image"
              id="image"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} // Handle image input
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-white mx-4 font-semibold text-xl">Icon</span>
            <input
              type="file"
              className="p-2 m-2 w-full text-white border border-white rounded-xl"
              placeholder="Icon"
              name="icon"
              id="icon"
              onChange={(e) => setIcon(URL.createObjectURL(e.target.files[0]))} // Handle icon input
            />
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
              onClick={() => handleAddItem()}
            >
              <IoMdAdd className="text-2xl text-white" />
            </div>
          </div>
          <div className="text-white mx-2 flex gap-2">
            <div
              className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
              onClick={() => {
                setCardEdit(!cardEdit);
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
      ) : (
        <div className="content w-full h-full relative group">
          <div className="back h-full w-full ">
            <div
              className="back-content w-full h-full flex items-end justify-start px-4 pb-5"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(106,106,106,0) 50%, rgba(255,248,248,0) 100%) ,url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="overlay flex text-white items-center gap-2">
                {icon && (
                  <Image
                    src={card.icon}
                    alt={card.cardTitle}
                    className="h-8 w-8"
                    sizes="(width: 8rem),(width: 8rem)"
                    width="auto"
                    height="auto"
                  />
                )}
                <h3 className="text-xl font-semibold">{card.cardTitle}</h3>
              </div>
            </div>
          </div>
          <div className="front w-full h-full bg-white text-black py-6 px-8">
            <div className="flex flex-col items-start justify-between w-full h-full">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl xl:text-2xl font-semibold capitalize">
                  {card.cardTitle}
                </h3>
                <p className="w-32 h-[2px] bg-primary-500"></p>
              </div>
              <ul className="flex flex-col gap-2">
                {card.point.map((des, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 font-semibold lg:text-base text-[14px]"
                  >
                    <FaCheck />
                    {des}
                  </li>
                ))}
              </ul>
              <div className="w-full">
                <Link href={`/${card.slugLink}`} target="_blank">
                  <ExploreMoreButton />
                </Link>
              </div>
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
