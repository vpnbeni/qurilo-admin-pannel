import React, { useState } from "react";
import { API_URL } from "@/api/commonApi";

const AddCardModal = ({ page,setIsModalOpen, setSuccessfullyEdited,desc, successfullyEdited ,mainHeading}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [slugLink, setSlugLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("cardTitle", cardTitle);
    formData.append("mainHeading", mainHeading);
    formData.append("cardDescription", description);
    formData.append("slugLink", slugLink); // Provide a default value or handle this dynamically
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/${page}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessfullyEdited(!successfullyEdited); // Trigger re-fetch of data
        setIsModalOpen(false); // Close the modal
      } else {
        console.error("Failed to add new card");
      }
    } catch (error) {
      console.error("Error adding new card:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-lg pr-10">
        <h2 className="text-xl mb-4">Add New Card</h2>
        <input
          type="text"
          className="p-2 m-2 w-full text-black border border-black rounded-lg"
          name="cardTitle"
          id="cardTitle"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Card Title"
        />
        <input
          type="text"
          className="p-2 m-2 w-full text-black border border-black rounded-lg"
          name="slugLink"
          id="slugLink"
          value={slugLink}
          onChange={(e) => setSlugLink(e.target.value)}
          placeholder="Slug Link"
        />
        {desc && (
          <textarea
          className="p-2 m-2 w-full text-black border border-black rounded-lg"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Card Description"
        />
        )}
        <input
          type="file"
          accept="image/*"
          className="p-2 m-2 w-full text-black border border-black rounded-lg"
          onChange={handleImageChange}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg text-white"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
