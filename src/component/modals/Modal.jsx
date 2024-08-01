// components/Modal.js
import React,{useState} from 'react';
import LoadingButton from "../buttons/LoadingButton";

const Modal = ({ isVisible, onClose, onSave,updateLoading, title, setTitle, description, setDescription ,setNewImage}) => {
  if (!isVisible) return null;
  // const [addLoading, setAddLoading] = useState(false);

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add Service Card</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Card Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Card Description"
        />
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="mb-2" />
        {updateLoading ? (<div className="absolute right-2 hidden group-hover:block bottom-4"> <LoadingButton /></div>):(<div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={onSave} className="bg-green-600 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default Modal;
