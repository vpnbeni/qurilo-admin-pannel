import React, { useState, useEffect } from "react";
import ContactButton from "@/component/buttons/ContactButton";
import { MdEdit } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import { API_URL } from "@/api/commonApi";

import LoadingButton from '../../buttons/LoadingButton'; 

const Developmentdiscuss = ({ data, type, id }) => {
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState("");
  const [mainDes, setMainDes] = useState("");
  const [fetchedDataDev, setFetchedDataDev] = useState(null);
  const [contactImage, setContactImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      const res = await fetch(`${API_URL}auth/v1/development/project-discuss/${id}`);
      const result = await res.json();
      setFetchedDataDev(result?.data);
      setMainHeading(result?.data?.project?.cardTitle);
      setMainDes(result?.data?.project?.cardDescription);
      setContactImage(result?.data?.project?.image); // Assuming the image URL is part of the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setContactImage(URL.createObjectURL(file));
  };

  const handleSave = async (idd) => {
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("cardTitle", mainHeading);
    formData.append("cardDescription", mainDes);
    formData.append("slugName", id);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/development/project-discuss/${idd}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setEdit(false); // Exit edit mode
        setFetchedDataDev(result?.data); // Optionally update fetchedDataDev with the latest data from the response
        setNewImage(null); // Reset newImage state
      } else {
        console.error("Failed to update the card");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <section className="relative group py-20 px-6 bg-gradient-to-r from-black to-gray-800">
      <div className="w-full text-white grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">
        <div className="flex items-center gap-5 flex-col lg:items-start lg:px-20">
          {edit ? (
            <>
              <input
                value={mainHeading}
                onChange={(e) => setMainHeading(e.target.value)}
                className="text-black w-full p-2 text-xl font-medium rounded-md border-2 border-gray-700"
              />
              <textarea
                value={mainDes}
                onChange={(e) => setMainDes(e.target.value)}
                className="text-black w-full min-h-[100px] px-2 py-2 rounded-md border-2 border-gray-700"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-black px-2 py-2 rounded-md border-2 border-gray-700"
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl text-center lg:text-start">{mainHeading}</h1>
              <p className="text-lg text-gray-300 text-center lg:text-start mb-5">{mainDes}</p>
            </>
          )}
          <ContactButton text={data.button} />
        </div>
        {type === "img" ? (
          <div className="flex items-center justify-center">
            {contactImage && <img src={contactImage} alt="contactImage" className="h-[10rem] md:h-[12rem]" />}
          </div>
        ) : (
          <div className="flex items-center flex-wrap md:flex-nowrap gap-x-2 justify-center">
            {/* Assuming you have specific conditions for images like animateImg1, animateImg2, animateImg3 */}
            <div className="relative">
              <img className="animate-spin-slow" src={animateImg1} alt="animateImg1" />
              <div className="absolute left-[1.5rem] top-[3rem]">
                <p className="text-center">2500+</p>
                <p className="text-center w-[99%] font-medium text-gray-200 text-sm">satisfied customers</p>
              </div>
            </div>
            <div className="relative">
              <img className="animate-spin-slow" src={animateImg2} alt="animateImg2" />
              <div className="absolute left-[1.5rem] top-[3rem]">
                <p className="text-center">2500+</p>
                <p className="text-center w-[99%] font-medium text-gray-200 text-sm">satisfied customers</p>
              </div>
            </div>
            <div className="relative">
              <img className="animate-spin-slow" src={animateImg3} alt="animateImg3" />
              <div className="absolute left-[1.5rem] top-[3rem]">
                <p className="text-center">2500+</p>
                <p className="text-center w-[99%] font-medium text-gray-200 text-sm">satisfied customers</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 right-6 hidden mt-4 group-hover:flex justify-end">
        {edit ? (
          isLoading ? (
            <LoadingButton />
          ) : (
            <>
              <button
                onClick={() => setEdit(false)}
                className="text-white font-bold bg-red-600 my-4 px-4 py-2 rounded-md "
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(fetchedDataDev?.project?._id)}
                className="text-white font-bold bg-green-600 my-4 px-4 py-2 rounded-md ml-2"
              >
                Save
              </button>
            </>
          )
        ) : (
          <MdEdit onClick={() => setEdit(true)} size={26} className="text-white cursor-pointer" />
        )}
      </div>
    </section>
  );
};

export default Developmentdiscuss;
