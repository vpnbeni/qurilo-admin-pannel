import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const EditFaqModal = ({ isOpen, onClose, onSave, editData, setEditData, addPoint, deletePoint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed py-20 inset-0 bg-black bg-opacity-50 overflow-y-scroll min-h-screen flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg w-1/2 h-4/5 overflow-hidden overflow-y-scroll">
        <h2 className="text-2xl mb-4">Edit FAQ</h2>
        <input
          type="text"
          value={editData.faqTitle}
          onChange={(e) => setEditData({ ...editData, faqTitle: e.target.value })}
          className="block w-full mb-4 p-2 border"
          placeholder="FAQ Title"
        />
        <textarea
          value={editData.faqDescription}
          onChange={(e) => setEditData({ ...editData, faqDescription: e.target.value })}
          className="block w-full mb-4 p-2 border"
          placeholder="FAQ Description"
        />
        {editData.faqPoint.map((point, index) => (
          <div key={index} className="relative flex items-center mb-4">
            <input
              type="text"
              value={point}
              onChange={(e) => {
                const newPoints = [...editData.faqPoint];
                newPoints[index] = e.target.value;
                setEditData({ ...editData, faqPoint: newPoints });
              }}
              className="block w-full p-2 border"
              placeholder={`Point ${index + 1}`}
            />
            <button
              className="absolute -right-8 text-red-500 mx-2"
              onClick={() => deletePoint(index)}
            >
              <FaTimes size={20} />
            </button>
          </div>
        ))}
        <button
          className="flex items-center bg-blue-500 text-black p-2 rounded mb-4"
          onClick={addPoint}
        >
          <FaPlus className="mr-2" /> Add Point
        </button>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white p-2 rounded mr-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFaqModal;
