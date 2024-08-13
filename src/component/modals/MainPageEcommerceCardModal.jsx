import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { API_URL } from "@/api/commonApi";

const EcommerceCardModal = ({ isOpen, onClose, cardData, onSave }) => {
  const [cardTitle, setCardTitle] = useState(cardData?.cardTitle || "");
  const [point, setPoint] = useState(cardData?.point || [""]);
  const [image, setImage] = useState(cardData?.image || "");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (cardData) {
      setCardTitle(cardData.cardTitle || "");
      setPoint(cardData.point || [""]);
      setImage(cardData.image || "");
    }
  }, [cardData]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("cardTitle", cardTitle);
      formData.append("image", imageFile);
      formData.append("point", JSON.stringify(point));

      const method = cardData ? "PUT" : "POST";
      const url = cardData
        ? `${API_URL}auth/v1/home-page/qurilo/eco-solutions/${cardData.id}`
        : `${API_URL}auth/v1/home-page/qurilo/eco-solutions`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save card");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{cardData ? "Edit Card" : "Add New Card"}</h2>
            <MdClose className="cursor-pointer" size={24} onClick={onClose} />
          </div>
          <input
            type="text"
            className="p-2 w-full mb-4 border border-gray-300 rounded"
            placeholder="Card Title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <input
            type="file"
            className="p-2 w-full mb-4"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <textarea
            className="p-2 w-full mb-4 border border-gray-300 rounded"
            placeholder="Points (comma separated)"
            value={point.join(", ")}
            onChange={(e) => setPoint(e.target.value.split(",").map((item) => item.trim()))}
          />
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSave}>
              Save
            </button>
            <button className="bg-gray-500 text-white p-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EcommerceCardModal;
