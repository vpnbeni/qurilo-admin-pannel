import React, { useState, useEffect } from 'react';
import SolPara from '@/component/solutions/SolPara';
import { API_URL } from '@/api/commonApi';
import { MdEdit } from 'react-icons/md';
import Image from 'next/image';

const  ComprehensiveSolution = ({ id }) => {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/ecommerce/solution/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        setData(result.data);
        setTempData(result.data);
      } else {
        console.error('Error fetching data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => { 
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (idd) => {
    const formData = new FormData();
    if (tempData.cardTitle) {
      formData.append('cardTitle', tempData.cardTitle);
    }
    if (tempData.cardDescription) {
      formData.append('cardDescription', tempData.cardDescription);
    }
    tempData.description && tempData.description.forEach((item, index) => {
      formData.append(`description[${index}]`, item);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${API_URL}auth/v1/ecommerce/solution/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log('Data updated successfully');
        fetchData();
      } else {
        console.error('Error updating data:', result.message);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setTempData(data);
    setEditing(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "cardTitle" || name === "cardDescription") {
      setTempData({ ...tempData, [name]: value });
    } else if (name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      const newDescription = [...tempData.description];
      newDescription[index] = value;
      setTempData({ ...tempData, description: newDescription });
    }
  };

  const handleAddItem = () => {
    setTempData({ ...tempData, description: [...tempData.description, ""] });
  };

  const handleRemoveItem = (index) => {
    const newDescription = [...tempData.description];
    newDescription.splice(index, 1);
    setTempData({ ...tempData, description: newDescription });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full bg-white flex mb-10 lg:mt-10 relative group">
      <div className="flex w-screen justify-between items-start">
        <div className="m-5 ml-8 lg:w-1/2">
          <div className="mt-10 lg:ml-10">
            {editing ? (
              <input
                type="text"
                name="cardTitle"
                value={tempData.cardTitle}
                onChange={(e) => handleChange(e, null)}
                className="font-semibold p-2 w-full text-2xl font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8"
              />
            ) : (
              <h2 className="font-semibold text-2xl font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8">
                {data.cardTitle}
              </h2>
            )}
            {editing ? (
              <textarea
                type="text"
                name="cardDescription"
                value={tempData.cardDescription}
                onChange={(e) => handleChange(e, null)}
                className="text-base p-4 w-full min-h-[200px] text-desc text-body-color font-sans"
              />
            ) : (
              <p className="text-base text-desc text-body-color font-sans">
                {data.cardDescription}
              </p>
            )}
          </div>
          <SolPara
            data={tempData.description}
            editing={editing}
            handleChange={handleChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {editing ? (
            <input
              className="mx-auto"
              type="file"
              name="image"
              onChange={(e) => handleChange(e, null)}
            />
          ) : (
            <Image
              className="mx-auto"
              src={tempData.image}
              width={500}
              height={500}
              alt="Solution Image"
            />
          )}
        </div>
      </div>
      {editing ? (
        <div className="absolute right-0 bottom-0 m-5 flex gap-2">
          <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded">
            Cancel
          </button>
          <button onClick={() => handleSave(tempData._id)} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      ) : (
        <div className="absolute right-0 bottom-0 m-5">
          <button onClick={handleEdit} className="bg-blue-500 text-white group-hover:text-black p-2 rounded">
            <MdEdit size={30} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ComprehensiveSolution;
