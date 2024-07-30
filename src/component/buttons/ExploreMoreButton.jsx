import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
const ExploreMoreButton = () => {
  return (
    <div className="w-full py-4 text-center bg-primary-500 text-white  rounded-lg hover:bg-gradient-to-tr from-[#3667B1]  to-primary-500 transition-all duration-500 ease-in-out">
      <div className="w-full flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 ease-in-out">
      <p className="">Explore More</p>
      <MdArrowForwardIos />
      </div>
    </div>
  );
};
export default ExploreMoreButton;