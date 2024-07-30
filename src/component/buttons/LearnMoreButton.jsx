import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

const LearnMoreButton = () => {
  return (
   
      <button className="px-8 py-2 border-[1px] border-black rounded-md hover:bg-primary-500 hover:text-white transition-all ease-linear duration-200 text-black text-base hover:border-primary-500 flex items-center justify-center gap-2 font-semibold ">
        <p>Learn More</p> <MdArrowForwardIos className=" group-hover:text-white" />
      </button>
  
  );
};

export default LearnMoreButton;
