import React from "react";
import arrow from "../../../public/businessImages/arrowIcon.png";
import Image from "next/image";

const ContactButton = ({ text }) => {
  return (
    <button
      className="relative flex items-center group overflow-hidden bg-white border-[1px] border-gray-200 group-hover:border-white rounded-full cursor-pointer h-14 px-8 pr-16 justify-around"
      style={{ width: "max-content" }}
    >
      <span className="relative z-10 text-base md:text-lg text-black group-hover:text-white mr-2">
        {text}
      </span>
      <div className="absolute right-1 z-10 flex items-center justify-center w-[50px] h-[50px] bg-bgColor-100 rounded-full">
        <Image src={arrow} alt="Arrow Icon" className="w-fit h-6" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-bgColor-100 transition-transform duration-300 transform scale-x-0 origin-right group-hover:scale-x-100"></div>
    </button>
  );
};

export default ContactButton;
