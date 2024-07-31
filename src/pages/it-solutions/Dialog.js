import { useState, useEffect } from 'react';

const Dialog = ({ isOpen, onClose, service, isUpdate, onUpdateSubmit }) => {
  const [updatedService, setUpdatedService] = useState(service || {});

  useEffect(() => {
    setUpdatedService(service || {});
  }, [service]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdateSubmit(updatedService);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                  {isUpdate ? 'Update Service' : 'Service Details'}
                </h3>
                <div className="mt-2">
                  {isUpdate ? (
                    <>
                      <input
                        type="text"
                        name="serviceName"
                        value={updatedService.servicesName || ''}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        name="slugName"
                        value={updatedService.slugName || ''}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        name="metaTag"
                        value={updatedService.metaTag || ''}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                      />
                      <textarea
                        name="metaDescription"
                        value={updatedService.metaDescription || ''}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <p>{service.serviceName}</p>
                      <p>{service.slugName}</p>
                      <p>{service.metaTag}</p>
                      <p>{service.metaDescription}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={isUpdate ? handleSubmit : onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {isUpdate ? 'Update' : 'Close'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
