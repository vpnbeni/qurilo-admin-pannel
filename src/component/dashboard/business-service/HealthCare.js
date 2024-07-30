  import React, { useState, useEffect } from 'react';
  import TravelList from '@/component/TravelList';
  import Image from 'next/image';
  import { MdModeEdit } from "react-icons/md";
  import { RxCross2 } from "react-icons/rx";

  const HealthCare = () => {
    const id = "fintech-banking-financial-soutions";
    const [implementationData, setImplementationData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [successfullyEdited, setSuccessfullyEdited] = useState(false);
    const [formData, setFormData] = useState({
      mainHeading: '',
      description: '',
      image: '',
      slugName: id,
    });
    const [imageFile, setImageFile] = useState(null);

    const fetchData = async () => {
      const url = 'https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/industrie/solution';
      try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        const data = await response.json();
        setImplementationData(data?.data);
        setFormData({
          mainHeading: data?.data.mainHeading,
          description: data?.data.description,
          image: data?.data.image,
          slugName: id,
        });
        // console.log('Data fetched successfully:', data.data);
        return data;
      } catch (error) {
        console.error('Failed to fetch data:', error.message);
        return null;
      }
    };
    
    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setFormData({
        mainHeading: implementationData?.mainHeading,
        description: implementationData?.description,
        image: implementationData?.image,
        slugName: id,
      });
      setImageFile(null);
    };

    const handleSave = async () => {
      const url = 'https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/industrie/solution';

      const updatedFormData = new FormData();
      updatedFormData.append('mainHeading', formData.mainHeading);
      updatedFormData.append('description', formData.description);
      updatedFormData.append('slugName', id);

      if (imageFile) {
        updatedFormData.append('image', imageFile);
      }

      try {
        const response = await fetch(url, {
          method: 'PUT', // Assuming the API uses PUT for updates
          body: updatedFormData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setImplementationData(data?.data);
        setIsEditing(false);
        setSuccessfullyEdited(!successfullyEdited)
        setFormData({
          mainHeading: '',
          description: '',
          image: '',
          slugName: id,
        });
        setImageFile(null);
        // console.log('Data saved successfully:', data.data);
      } catch (error) {
        console.error('Failed to save data:', error.message);
      }
    };

    useEffect(() => {
      if (id) {
        fetchData();
        console.log(implementationData)
      }
    }, [id,successfullyEdited]);

    return (
      <div>
        <section className="my-10 relative group">
          {!isEditing && (
            <>
              <div className="text-black text-2xl text-center lg:text-4xl mb-8 capitalize font-[600]">
                {implementationData?.mainHeading}
                <MdModeEdit
                  size={25}
                  className="text-blue-500 cursor-pointer absolute top-0 right-0 opacity-0 group-hover:opacity-100"
                  onClick={handleEditClick}
                />
              </div>
              <p className="text-center w-[60%] mx-auto text-[18px] font-[400] mb-12">
                {implementationData?.description}
              </p>
              <div className="bg-white flex flex-col justify-center lg:flex-row w-full gap-5">
                <div className="lg:w-1/2 flex flex-col">
                  <div className="h-auto w-full relative aspect-[3/2]">
                    {implementationData && (
                      <Image
                        fill={true}
                        src={implementationData?.image}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2">
                  {implementationData && <TravelList data={implementationData?.SolutionData } setSuccessfullyEdited={setSuccessfullyEdited}
              successfullyEdited={successfullyEdited} 
               />}
               
                </div>
              </div>
            </>
          )}
          {isEditing && (
            <div className="bg-white p-6 rounded-md">
              <div className="flex  items-center mb-4">
                <h2 className="text-2xl">Edit Item</h2>
              </div>
              <input
                type="text"
                name="mainHeading"
                value={formData.mainHeading}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="Main Heading"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="Description"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-700 text-white rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  };

  export default HealthCare;
