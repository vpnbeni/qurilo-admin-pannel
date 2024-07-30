import React, { useState, useEffect } from "react";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "../buttons/LoadingButton";
const TechnologyEditModal = ({ tech, setShowModal, slug, type ,successfullyEdited , setSuccessfullyEdited }) => {
  const [title, setTitle] = useState(tech.cardTitle);
  const [techList, setTechList] = useState([...tech.cardDescription]);
  const [inputCount, setInputCount] = useState(tech.cardDescription.length);
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleAddInput = () => {
    setInputCount((prev) => prev + 1);
    setTechList((prev) => [...prev, ""]); // Add a blank input for the new item
  };
  const handleTechChange = (index, value) => {
    const updatedList = [...techList];
    updatedList[index] = value;
    setTechList(updatedList);
  };
  const handleDeleteItem = (index) => {
    const updatedList = techList.filter((_, i) => i !== index);
    setTechList(updatedList);
    setInputCount(updatedList.length);
  };
  const handleSave = async () => {
    setUpdateLoading(true);
    const updatedTech = {
      cardTitle: title,
      cardDescription: techList,
      slugName: slug,
    };
    try {
      const response = await fetch(`${API_URL}auth/v1/${type}/technology-card/${tech._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTech),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSuccessfullyEdited(!successfullyEdited);
      setUpdateLoading(false);
      setShowModal(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating technology card:", error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 w-[34rem] h-[25rem] overflow-y-scroll rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4">Edit Technology</h2>
            <RxCross2 size={28} onClick={() => setShowModal(false)} className="cursor-pointer" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          {techList.map((item, index) => (
            <div key={index} className="mb-4 flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Technology Item {index + 1}</label>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleTechChange(index, e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <MdDeleteForever
                onClick={() => handleDeleteItem(index)}
                className="text-red-500 cursor-pointer ml-2"
                size={25}
              />
            </div>
          ))}
          <button onClick={handleAddInput} className="px-4 py-2 bg-blue text-white rounded mb-4">
            Add More Item
          </button>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            {updateLoading ? <LoadingButton/> : <button onClick={handleSave} className="px-4 py-2 bg-blue text-white rounded">
              Save
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};
const TechnologyCard = ({ tech, type, slug, successfullyEdited , setSuccessfullyEdited }) => {
  const [showModal, setShowModal] = useState(false);
  const editTechnology = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  const deleteTechnology = async (id) => {
    const slugName = slug;
    try {
      const response = await fetch(`${API_URL}auth/v1/${type}/technology-card/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSuccessfullyEdited(!successfullyEdited);
    } catch (error) {
      console.error("Error deleting technology:", error);
    }
  };
  return (
    <>
      <div className="h-full relative group flex flex-col gap-5 py-10 border-b-[1px] border-zinc-400">
       <div className="flex justify-between items-center">   <h1 className="text-xl font-[600]">{tech.cardTitle}</h1>   <RxCross2 onClick={() => deleteTechnology(tech._id)} className="text-red-500 hidden group-hover:block cursor-pointer" size={25} /></div>
        <div className="w-full h-[4px] bg-bgColor-100 rounded-md"></div>
        <div className="flex gap-5 flex-wrap">
          {tech.cardDescription?.map((techUsed, i) => (
            <p
              key={i}
              className="border-2 border-bgColor-100 hover:bg-bgColor-100 transition-all ease-in-out duration-200 hover:text-white py-2 px-4 rounded-md cursor-pointer h-fit"
            >
              {techUsed}
            </p>
          ))}
        </div>
        <div className="hidden absolute bottom-2 -right-5  group-hover:flex justify-end me-5 gap-x-1">
          <MdModeEditOutline onClick={() => editTechnology()} className="cursor-pointer" size={25} />
        </div>
      </div>
      {showModal && (
        <TechnologyEditModal type={type} successfullyEdited={successfullyEdited} setSuccessfullyEdited={setSuccessfullyEdited} slug={slug} setShowModal={setShowModal} tech={tech} />
      )}
    </>
  );
};
export default TechnologyCard;