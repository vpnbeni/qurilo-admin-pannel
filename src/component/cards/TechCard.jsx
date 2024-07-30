import React, { useState } from 'react';
import { MdEdit, MdAdd, MdClose } from 'react-icons/md';

const TechnologyCard = ({ tech, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...tech, cardDescription: [...tech.cardDescription] });

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setFormData({ ...tech, cardDescription: [...tech.cardDescription] });
    setIsEditing(false);
    onCancel();
  };

  const handleSaveClick = async () => {
    await onSave(formData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (index, value) => {
    setFormData((prev) => {
      const updatedDescriptions = [...prev.cardDescription];
      updatedDescriptions[index] = value;
      return { ...prev, cardDescription: updatedDescriptions };
    });
  };

  const addDescriptionField = () => {
    setFormData((prev) => ({
      ...prev,
      cardDescription: [...prev.cardDescription, '']
    }));
  };

  const removeDescriptionField = (index) => {
    setFormData((prev) => {
      const updatedDescriptions = prev.cardDescription.filter((_, i) => i !== index);
      return { ...prev, cardDescription: updatedDescriptions };
    });
  };

  return (
    <div className="relative h-full flex flex-col gap-5 py-10 border-b-[1px] border-blue group min-h-[250px]">
      

      {isEditing && (
        <button 
          onClick={addDescriptionField} 
          className="absolute bottom-10 left-2 z-10 text-blue-500 hover:text-blue-700 transition-colors"
        >
          <MdAdd className='text-2xl' />
        </button>
      )}

      <h1 className="text-xl font-semibold font-sans text-black">
        {isEditing ? (
          <input 
            type="text" 
            name="cardTitle" 
            value={formData.cardTitle || ''} 
            onChange={handleInputChange} 
            className="border px-2 py-1 rounded"
          />
        ) : (
          formData.cardTitle
        )}
      </h1>
      <div className="w-full h-[2px] bg-blue rounded-md"></div>
      <div className=" flex gap-5 flex-wrap ">
        {isEditing ? (
          formData.cardDescription?.map((desc, i) => (
            <div key={i} className="relative flex items-center gap-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => handleDescriptionChange(i, e.target.value)}
                className="border-2 font-sans border-blue py-2 px-4 rounded-md"
              />
              <button
                onClick={() => removeDescriptionField(i)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
              >
                <MdClose className='text-xl' />
              </button>
            </div>
          ))
        ) : (
          formData.cardDescription?.map((desc, i) => (
            <p
              key={i}
              className="border-2 font-sans border-blue hover:bg-blue bg-white hover:text-white py-2 px-4 rounded-md cursor-pointer h-fit"
            >
              {desc}
            </p>
          ))
        )}
        {isEditing ? (
        <div className=" flex justify w-full justify-end   gap-2">
          <button 
            onClick={handleCancelClick} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveClick} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          
        </div>
      ) : (
        <div className="absolute bottom-0 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleEditClick} 
            className="bg-blue-500 text-black p-2 rounded"
          >
            <MdEdit className='text-2xl' />
          </button>
        </div>
      )} 
      </div>
    </div>
  );
};

export default TechnologyCard;
