import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '../../../component/buttons/ContactButton';
import { MdEdit } from 'react-icons/md';
import { API_URL } from '@/api/commonApi';
const DevelopmentBanner = ({ id }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ h1: '', description: '', image: '' });

  // Function to fetch banner data
  const fetchBannerData = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}auth/v1/business/banner/${id}`);
      const result = await response.json();
      
      if (result.status) {
        setData(result.banner); // Set data to state
        setEditData({
          h1: result.banner.h1,
          description: result.banner.description,
          image: result.banner.image,
        });
      } else {
        throw new Error(result.message || 'Failed to fetch banner data');
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBannerData(id); // Fetch data when ID changes
    }
  }, [id]);

  // Function to handle click on edit button
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prevState) => ({ ...prevState, image: file }));
  };

  // Function to handle save button click
  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('h1', editData.h1);
    formData.append('description', editData.description);
    if (editData.image instanceof File) {
      formData.append('image', editData.image);
    }
    formData.append('slugName', id);

    try {
      const response = await fetch(`${API_URL}auth/v1/business/banner/${data._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update banner');
      }
      await fetchBannerData(id);

      setIsEditing(false); // Exit edit mode
    } catch (error) {
      setError(error);
    }
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    setIsEditing(false); // Exit edit mode
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section
      className="relative bg-cover md:h-screen bg-center py-32 w-full"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%), url(${editData?.image})`,
      }}
    >
      <div className="right-0 md:mt-12 text-left text-white relative z-10">
        <div className="flex items-center relative">
          <div className="text-left md:mx-0 mx-6">
            <div className="md:mx-20">
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="h1"
                    value={editData.h1}
                    onChange={handleChange}
                    className="text-3xl font-bold w-full mb-6 bg-transparent border-b-2 border-white focus:outline-none"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    className="text-xl font-sans mb-12 min-h-[200px] w-full bg-transparent border-b-2 border-white focus:outline-none"
                  />
                  <div className="mb-4">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div>
                  <button onClick={handleCancelClick} className="mr-4">Cancel</button>

                    <button onClick={handleSaveClick} >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                data && (
                  <div>
                    <h1 className="md:text-6xl font-sans xl:w-1/2 w-full leading-10 text-3xl font-bold mb-6">
                      {data.h1}
                    </h1>

                    <p className="text-xl font-sans mb-12 lg:w-1/2 w-full">
                      {data.description}
                    </p>
                    <Button text="Get Free Consultation" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {!isEditing && (
        <div
          className="absolute bottom-4 right-4 cursor-pointer"
          onClick={handleEditClick}
          title="Edit"
        >
          <MdEdit size={30} className="text-white" />
        </div>
      )}
    </section>
  );
};

export default DevelopmentBanner;
