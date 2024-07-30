import React, { useState, useEffect } from "react";
import ContactButton from "@/component/buttons/ContactButton";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";

const BuildMind = ({ data, type, id }) => {
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState("");
  const [mainDes, setMainDes] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [contactImage, setContactImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      const res = await fetch(`${API_URL}auth/v1/development/project-mind/${id}`);
      const result = await res.json();
      console.log(result);
      setFetchedData(result?.data);
      setMainHeading(result?.data?.project?.cardTitle);
      setMainDes(result?.data?.project?.cardDescription);
      setContactImage(result?.data?.project?.image);
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
    setLoading(true); // Start loading state
    const formData = new FormData();
    formData.append("cardTitle", mainHeading);
    formData.append("cardDescription", mainDes);
    formData.append("slugName", id);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/development/project-mind/${idd}`, {
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
        <div className="flex items-center justify-center">
          {contactImage && <img src={contactImage} alt="contactImage" className="h-[10rem] md:h-[12rem]" />}
        </div>
      </div>
      <div className="absolute bottom-5 right-5 hidden mt-4 group-hover:flex justify-end">
        {edit ? (
          loading ? (
            <LoadingButton />
          ) : (
            <button onClick={() => handleSave(fetchedData?.project?._id)} className="text-white font-bold bg-green-600 my-4 px-4 py-2 rounded-md">
              Save
            </button>
          )
        ) : (
          <MdEdit onClick={() => setEdit(true)} size={26} className="text-white cursor-pointer" />
        )}
      </div>
    </section>
  );
};

export default BuildMind;
