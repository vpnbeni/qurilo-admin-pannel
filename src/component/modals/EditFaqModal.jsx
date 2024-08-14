import React from 'react';

const EditFaqModal = ({ isOpen, onClose, onSave, editData, setEditData, addPoint, deletePoint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit FAQ</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <label className="block mb-2">
            Title:
            <input
              type="text"
              value={editData.faqTitle}
              onChange={(e) => setEditData({ ...editData, faqTitle: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              value={editData.faqDescription}
              onChange={(e) => setEditData({ ...editData, faqDescription: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <div className="mb-4">
            <label className="block mb-2">Points:</label>
            {editData.faqPoint.map((point, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...editData.faqPoint];
                    newPoints[index] = e.target.value;
                    setEditData({ ...editData, faqPoint: newPoints });
                  }}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => deletePoint(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPoint}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Point
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqModal;
