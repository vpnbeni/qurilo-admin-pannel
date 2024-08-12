import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const BusinessCard = ({ card, index }) => {
  const [editCard, setEditCard] = useState(false);
  const [cardTitle, setCardTitle] = useState(card?.cardTitle);
  const [description, setDescription] = useState(card?.cardDescription);
  const [icon, setIcon] = useState(card?.icon);
  return (
    <div className="group relative ">
      {editCard ?(
       <div className="flex flex-col gap-2 w-2/3 mx-auto ">
       <input
         type="text"
         className="p-2 m-2 w-full text-black border border-black rounded-lg"
         name="cardTitle"
         id="cardTitle"
         value={cardTitle}
         onChange={(e) => e.target.value}
       />
       <div className="" >
       <textarea
         type="text"
         className="p-2 m-2 w-full text-black border border-black rounded-lg"
         name="description"
         id="description"
         value={description}
         onChange={(e) => e.target.value}
       />
       </div>
       <div className="text-white mx-2 flex gap-2">
         <div
           className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
           onClick={() => {
             setEditCard(!editCard);
           }}
         >
           {" "}
           Cancel
         </div>
         <div
           className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
           onClick={() => {
             handleSave();
           }}
         >
           {" "}
           Save
         </div>
       </div>
     </div>
      ):(
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
          <Link href={card.slugLink} className="flex items-center justify-between text-lg">
            <h2 className="font-[600] text-xl md:text-xl lg:text-base xl:text-lg">
              {card.cardTitle}
            </h2>
            <FaArrowRightLong className="text-primary-500 text-2xl lg:text-xl xl:text-2xl group-hover:-rotate-45 transition-all ease-in-out duration-300" />
          </Link>
          <div className="text-zinc-800 mb-2 md:text-base lg:text-xs xl:text-base">
            {card.cardDescription}
          </div>
          <p className="w-full h-[1px] bg-zinc-400 group-hover:bg-primary-500 group-hover:h-[2px] transition-all ease-in-out duration-300"></p>
        </div>
        <div
            className={`absolute bottom-8 z-30 right-2 text-black group-hover:block hidden cursor-pointer `}
            onClick={() => {
              setEditCard(!editCard);
            }}
          >
            <MdEdit className="cursor-pointer text-black" size={20} />
          </div>
      </div>
      )}
      
    </div>
  );
};

export default BusinessCard;
