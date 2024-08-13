import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const ItServicesCard = ({ title, image, link }) => {
  const [cardEdit,setCardEdit]=useState(false)
  
  return (
    <div  className="relative lg:w-[21%] md:w-[40%] w-[90%] h-[22rem] rounded-md overflow-hidden cursor-pointer transition-transform duration-500 ease-linear hover:-translate-y-3 group">
      {cardEdit ?(
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
      ):(
        <div>
          <Image fill={true} src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-linear" />
          <h2 className="text-2xl font-semibold text-white mt-9 px-6 absolute z-10">{title}</h2>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80"></div>
      <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-black before:opacity-0 before:transition-opacity before:duration-100 before:ease-linear group-hover:before:opacity-90"></div>
    </div>
  );
};

export default ItServicesCard;
