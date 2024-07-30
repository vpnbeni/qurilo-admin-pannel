import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { API_URL } from "@/api/commonApi";
import { MdDeleteForever } from "react-icons/md";
import LoadingButton from "../buttons/LoadingButton";
const AddTechnologyModal = ({ setShowAddModal, type, setSuccessfullyEdited, slug, successfullyEdited }) => {
  const [title, setTitle] = useState("");
  const [techList, setTechList] = useState([""]);
  const [inputCount, setInputCount] = useState(1);
  const [addLoading , setAddLoading] = useState(false)
  const handleAddInput = () => {
    setInputCount((prev) => prev + 1);
    setTechList((prev) => [...prev, ""]);
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
    setAddLoading(true)
    const newTech = {
      cardTitle: title,
      cardDescription: techList,
      slugName: slug,
    };
    try {
      const response = await fetch(`${API_URL}auth/v1/${type}/technology-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTech),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShowAddModal(false);
      setSuccessfullyEdited(!successfullyEdited);
      setAddLoading(false)
    } catch (error) {
      console.error("Error adding new technology card:", error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 w-[34rem] h-[25rem] overflow-y-scroll rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4">Add Technology</h2>
            <RxCross2 size={28} onClick={() => setShowAddModal(false)} className="cursor-pointer" />
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
              {index > 0 && (
                <MdDeleteForever
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 cursor-pointer ml-2"
                  size={25}
                />
              )}
            </div>
          ))}
          <button onClick={handleAddInput} className="px-4 py-2 bg-blue text-white rounded mb-4">
            Add More Item
          </button>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
           {addLoading ? <LoadingButton/> :  <button onClick={handleSave} className="px-4 py-2 bg-blue text-white rounded">
              Save
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTechnologyModal;