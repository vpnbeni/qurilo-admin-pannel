import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { API_URL } from "@/api/commonApi";

const AddCardModal = ({ onClose, onSuccess ,setSuccessfullyEdited, successfullyEdited ,mainHeading,icon,page}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [slugLink, setSlugLink] = useState("");
  const [point, setPoint] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddItem = () => {
    setPoint([...point, ""]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...point];
    newItems.splice(index, 1);
    setPoint(newItems);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleIconChange = (e) => {
    setIconFile(e.target.files[0]);
  };

  const handleSave = async () => {
    console.log(cardTitle , slugLink , point )
    setLoading(true);
    const formData = new FormData();
    formData.append("cardTitle", cardTitle);
    formData.append("mainHeading", mainHeading);
    formData.append("slugLink", slugLink);
    formData.append("point", JSON.stringify(point));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    // if (iconFile) {
    //   formData.append("icon", iconFile);
    // }

    try {
      const response = await fetch(
        `${API_URL}auth/v1/home-page/qurilo/${page}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const newCard = await response.json();
        setSuccessfullyEdited(!successfullyEdited)
      console.log(successfullyEdited,"successfullyEdited")

        onSuccess(newCard.data); // Notify parent component of the new card
        onClose(); // Close the modal after saving

      } else {
        console.error("Failed to add new card");
      }
    } catch (error) {
      console.error("Error adding new card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Card</h2>
          <IoMdClose className="cursor-pointer" size={24} onClick={onClose} />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Card Title</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded mt-1 w-full"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Slug Link</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded mt-1 w-full"
            value={slugLink}
            onChange={(e) => setSlugLink(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Points</label>
          {point.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded mt-1 w-full"
                value={item}
                onChange={(e) => {
                  const newItems = [...point];
                  newItems[index] = e.target.value;
                  setPoint(newItems);
                }}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="ml-2 text-red-600"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 mt-2"
            onClick={handleAddItem}
          >
            + Add Point
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={handleImageChange}
          />
        </div>

        {!icon && (
          <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Icon</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={handleIconChange}
          />
        </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="mr-4 py-2 px-4 border border-gray-300 rounded text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-green-500 text-white   rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
