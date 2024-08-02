import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import LoadingButton from "@/component/buttons/LoadingButton";

const AddCardModal = ({ isOpen, onClose, onSave, addLoading }) => {
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
      <div className="bg-white p-6 rounded-md" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between mb-4'>
          <h2 className="text-2xl font-bold">Add Card</h2>
          <RxCross1 size={26} onClick={onClose} className='cursor-pointer' />
        </div>
        <input
          type="text"
          placeholder="Card Title"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          className="border-2 w-full border-gray-700 rounded-md px-2 py-3 mb-4"
        />
        <textarea
          placeholder="Card Description"
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
          className="border-2 w-full border-gray-700 rounded-md px-2 py-3 mb-4"
          rows="4"
        />
        <input
          type="file"
          onChange={(e) => setNewCardIcon(e.target.files[0])}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          {addLoading ? (
            <LoadingButton />
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
