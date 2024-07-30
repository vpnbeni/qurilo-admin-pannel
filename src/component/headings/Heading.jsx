import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import LoadingButton from "../buttons/LoadingButton";

const Heading = ({ heading , subheading , id , fetchTechnologyCards }) => {
  const [headingChange, setHeadingChange] = useState(false);
  const [headingValue, setHeadingValue] = useState('');
  const [subHeadingValue, setSubHeadingValue] = useState('');
  const [headingLoading , setHeadingLoading] = useState(false);

  useEffect(() => {
    setHeadingValue(heading);
    setSubHeadingValue(subheading);
  }, []);

  const handleHeadingChange = () => {
    setHeadingChange(true);

  };
  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: headingValue,
      description: subHeadingValue,
      slugName: id
    };
    try {
      const response = await fetch(`${API_URL}auth/v1/business/technology-card`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
      const data = await response.json();
      setHeadingChange(false);
      fetchTechnologyCards();
      setHeadingLoading(false);

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center flex-col justify-center gap-3">
      {headingChange ? (
        <>
        <input
          type="text"
          className="outline-none bg-gray-200 p-2 border-b border-solid border-gray-400 w-full"
          value={headingValue}
          onChange={(e) => setHeadingValue(e.target.value)}
        />
        <input 
        type="text"
        className="outline-none bg-gray-200 p-2 border-b border-solid border-gray-400 w-full"
        value={subHeadingValue}
        onChange={(e) => setSubHeadingValue(e.target.value)}></input>
        </>
      ) : (
        <>
        <h2 className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
          {heading}
        </h2>
        <p>{subheading}</p>
        </>
      )}

      <div className="hidden group-hover:flex justify-end me-5 gap-x-1">
        {headingChange ? (
         headingLoading ? <LoadingButton/>   : <div onclick={()=>handleHeading()} className="cursor-pointer border-green-800 text-lg font-normal hover:bg-green-800 hover:text-white text-green-600 border-[1px] rounded-md px-3 py-1">Save</div>
        ) : (<MdModeEditOutline
          onClick={() => handleHeadingChange()}
          className="cursor-pointer text-green-600"
          size={25}
        />)}
      </div>
    </div>
  );
};

export default Heading;
