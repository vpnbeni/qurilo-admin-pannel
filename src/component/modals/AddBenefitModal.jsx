import React, { useState } from "react";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";

const AddBenefitModal = ({ id, onClose, fetchBenefits }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBenefit = async () => {
    setLoading(true);
    const dataSend = {
      image,
      title,
      description,
      slugName: id
    };
    const formData = new FormData();
    formData.append("icon", image);
    formData.append("cardTitle", title);
    formData.append("cardDescription", description);
    formData.append("mainHeading" , '')
    formData.append("description" , "")
    formData.append("slugName", id);

    try {
      const response = await fetch(`${API_URL}auth/v1/business/benefit-card`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add benefit card");
      }
      await response.json();
      fetchBenefits();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl mb-4">Add New Benefit Card</h2>
        <input
          type="file"
          placeholder="Image URL"
        
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          {loading ? (
            <LoadingButton />
          ) : (
            <button
              onClick={handleAddBenefit}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBenefitModal;
