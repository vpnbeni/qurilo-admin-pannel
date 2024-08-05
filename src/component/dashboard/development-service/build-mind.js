import React, { useState, useEffect } from "react";
import ContactButton from "@/component/buttons/ContactButton";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";
import Image from "next/image";

const BuildMind = ({ data, page, id }) => {
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState("");
  const [mainDes, setMainDes] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [contactImage1, setContactImage1] = useState("");
  const [contactImage2, setContactImage2] = useState("");
  const [contactImage3, setContactImage3] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      const res = await fetch(`${API_URL}auth/v1/${page}/project-mind/${id}`);
      const result = await res.json();
      console.log(result);
      setFetchedData(result?.data);
      console.log(result,'devdata')
      setMainHeading(result?.data?.project?.cardTitle);
      setMainDes(result?.data?.project?.cardDescription);
      setContactImage1(result?.data?.project?.image[0]);
      setContactImage2(result?.data?.project?.image[1]);
      setContactImage3(result?.data?.project?.image[2]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setContactImage1(URL.createObjectURL(file));
  };
  const handleImageChange2 = (e) => {
    const file = e.target.files[1];
    setNewImage(file);
    setContactImage2(URL.createObjectURL(file));
  };
  const handleImageChange3 = (e) => {
    const file = e.target.files[2];
    setNewImage(file);
    setContactImage3(URL.createObjectURL(file));
  };
  const handleCancel=()=>{
    setEdit(false); // Exit edit mode
        setNewImage(null); // Reset newImage state
  }
  const handleSave = async (idd) => {
    setLoading(true); // Start loading state
    const formData = new FormData();
    formData.append("cardTitle", mainHeading);
    formData.append("cardDescription", mainDes);
    formData.append("slugName", id);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/${page}/project-mind/${idd}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        await fetchData(id); // Refetch data after saving
        setEdit(false); // Exit edit mode
        setNewImage(null); // Reset newImage state
      } else {
        console.error("Failed to update the card");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // End loading state
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
                className="text-black w-full h-[100px] px-2 py-2 rounded-md border-2 border-gray-700"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange1}
                className="text-black px-2 py-2 rounded-md border-2 border-gray-700"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange2}
                className="text-black px-2 py-2 rounded-md border-2 border-gray-700"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange3}
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
        <div className="flex items-center flex-wrap md:flex-nowrap gap-x-6 justify-center">
  <div className="relative my-4 lg:my-0 text-whit e/90">
    <Image    alt="project completed" width={180} height={180} quality={100} className="animate-spin-slow" src={contactImage1} />
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className="text-center font-semibold text-lg ">5+</p>
      <p className="text-center w-[99%] font-medium  text-base"> Country Served</p>
    </div>
  </div>
  <div className="relative my-4 lg:my-0 ">
    <Image alt="project completed" quality={100} width={180} height={180} className="animate-spin-slow" src={contactImage2} />
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className="text-center text-lg font-semibold">150+</p>
      <p className="text-center w-[99%] font-medium  text-base">Projects completed</p>
    </div>
  </div>
  <div className="relative my-4 lg:my-0">
    <Image   alt="project completed" qualtiy={100} width={180} height={180} className="animate-spin-slow" src={contactImage3} />
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className="text-center font-semibold text-lg ">70+</p>
      <p className="text-center w-[99%] font-medium text-base ">Tech Stack Expertise</p>
    </div>
  </div>
</div>
      </div>
      <div className="absolute bottom-5 right-5 hidden mt-4 group-hover:flex justify-end">
        {edit ? (
          loading ? (
            <LoadingButton />
          ) : (
           <div className="flex gap-2">
             <button onClick={() => handleCancel()} className="text-white font-bold bg-red-600 my-4 px-4 py-2 rounded-md">
              Cancel
            </button>
            <button onClick={() => handleSave(fetchedData?.project?._id)} className="text-white font-bold bg-green-600 my-4 px-4 py-2 rounded-md">
              Save
            </button>
           </div>
          )
        ) : (
          <MdEdit onClick={() => setEdit(true)} size={26} className="text-white cursor-pointer" />
        )}
      </div>
    </section>
  );
};

export default BuildMind;
