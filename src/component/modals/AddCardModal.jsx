import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import LoadingButton from "@/component/buttons/LoadingButton";

const AddCardModal = ({ isOpen, onClose, onSave }) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [newCardIcon, setNewCardIcon] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleSave = () => {
    onSave(newCardTitle, newCardDescription, newCardIcon);
    setNewCardTitle('');
    setNewCardDescription('');
    setNewCardIcon(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white h-max p-6 w-[30rem] rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between'>
          <h2 className="text-xl mb-4">Add New Card</h2>
          <RxCross1 size={26} onClick={onClose} className='cursor-pointer' />
        </div>
        <div className='flex flex-col'>
          <input
            type="file"
            onChange={(e) => setNewCardIcon(e.target.files[0])}
            className="mb-4"
          />
          <input
            type="text"
            placeholder="Card Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="mb-4 p-2 border"
          />
          <textarea
            placeholder="Card Description"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="mb-4 p-2 border"
          />
        </div>
        <div className="flex gap-2">
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-md "
        >
          Save
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default AddCardModal;




