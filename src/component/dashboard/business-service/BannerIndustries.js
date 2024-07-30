
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '../../../component/buttons/ContactButton';
import { MdEdit } from 'react-icons/md';
import { RiLoader4Fill } from "react-icons/ri";
import { API_URL } from '@/api/commonApi';
import LoadingButton from '../../buttons/LoadingButton'; 



const Banner = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({ h1: '', description: '', image: '' });
const [temp,setTemp]=useState(true);
const id="fintech-banking-financial-soutions"
  const fetchData = async (id) => {
    try {
      const res = await fetch(`${API_URL}auth/v1/industrie/banner/${id}`);
      const result = await res.json();
      if (result.status) {
        setData(result.banner);
        setEditData({
          h1: result.banner.h1,
          description: result.banner.description,
          image: result.banner.image,
        });
      } else {
        throw new Error(result.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]); 

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    let formData = new FormData();
    formData.append('h1', editData.h1);
    formData.append('description', editData.description);
    if (editData.image instanceof File) {
      formData.append('image', editData.image);
    }
    formData.append('slugName', id);
    try {
      const res = await fetch(`${API_URL}auth/v1/industrie/banner/${data._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to update banner');
      }
      await fetchData(id);
      setIsEditing(false);
      setIsSaving(false);
    } catch (error) {
      setError(error);
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prevState) => ({ ...prevState, image: file }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section
      className="relative bg-cover md:h-screen bg-center py-32 w-full"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%),url(${editData?.image instanceof File ? URL.createObjectURL(editData?.image) : editData?.image || data?.image})`,
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
                    className="text-3xl w-full font-bold mb-6 bg-transparent border-b-2 border-white focus:outline-none"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    className="text-xl font-sans mb-12 h-[200px] overflow-y-auto w-full bg-transparent border-b-2 border-white focus:outline-none"
                  />
                  <div className="mb-4">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div>
                    {isSaving ? (
                      <LoadingButton />
                    ) : (
                      <div>
                      <button onClick={handleCancelClick}>Cancel</button>
                      <button onClick={handleSaveClick} className="mx-4">
                          Save
                        </button>
                      </div>
                    )}
                    
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
                    <Button text={"Get Free Consultation"} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-4 right-4 cursor-pointer"
        onClick={handleEditClick}
        title="Edit"
      >
        <MdEdit size={30} className="text-white" />
      </div>
    </section>
  );
};

export default Banner;
