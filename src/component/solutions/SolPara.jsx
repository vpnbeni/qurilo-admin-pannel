import React from "react";
import { FaCheckCircle, FaPlus, FaTimes } from "react-icons/fa";

const SolPara = ({ data, editing, handleChange, handleAddItem, handleRemoveItem }) => {
  return (
    <div className="mt-5 lg:ml-10  group">
      <ul className="text-base mt-5 flex flex-col gap-4 text-gray-500">
        {data?.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-base text-desc text-black font-medium font-sans">
            <FaCheckCircle className="h-4 w-4 text-[#558BDC]" />
            {editing ? (
              <>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                  className="text-black w-full p-3 font-medium font-sans"
                />
                <FaTimes
                  className="h-4 w-4 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveItem(index)}
                />
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
      {editing && (
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 mt-4 bg-blue-500 text-white p-2 rounded group-hover:text-black"
        >
          <FaPlus className="h-4 w-4" />
          Add Item
        </button>
      )}
    </div>
  );
};

export default SolPara;
