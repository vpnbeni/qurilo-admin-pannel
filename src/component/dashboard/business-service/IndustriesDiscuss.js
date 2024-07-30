import React, { useState  , useEffect} from "react";
import { contactData1 } from "@/component/assets/business";
import ContactButton from "@/component/buttons/ContactButton";
import contactImage from "../../../../public/businessImages/contact.png";
import Image from "next/image";
import { MdModeEditOutline } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";


const IndustrieDiscuss = () => {
const id="fintech-banking-financial-soutions"

  const slug = id
  const [edit, setEdit] = useState(false);
  const [editHeading, setEditHeading] = useState('');
  const [editDes, setEditDes] = useState('');
  const [dataGet, setDataGet] = useState([]);
  const [successfullyEdited , setSuccessfullyEdited] = useState(false)
  const [editImage, setEditImage] = useState(null);
  const [editLoading , setEditLoading] = useState(false);
  const fetchProjectBanner = async () => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/industrie/project-discuss/${id}`
      );
    
      if (!response.ok) {
        throw new Error("Failed to fetch Project minds");
      }
      const data = await response.json();

      setDataGet(data.data);
      setEditHeading(data.data?.project?.cardTitle);
      setEditDes(data.data?.project?.cardDescription);
    } catch (error) {
      console.error("Error fetching project-minds:", error);
    }
  } 

  useEffect(() => {
    fetchProjectBanner();
    if(id){
      fetchProjectBanner();
    }
  }, [id , successfullyEdited]);

const handleCancelEdit =  () => {
  setEdit(false);
  setSuccessfullyEdited(!successfullyEdited);
}
const handleEditData = async (id) => {
  setEditLoading(true) 
  const formData = new FormData();
  formData.append('cardTitle', editHeading);
  formData.append('cardDescription', editDes);
  formData.append('slugName', slug);
  formData.append('image', editImage);


  // if (inputRef.current && inputRef.current.files[0]) {
  //   formData.append('icon', inputRef.current.files[0]);
  // }
  try {
    const response = await fetch(`${API_URL}auth/v1/industrie/project-discuss/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    fetchProjectBanner();
    setEdit(false);
    setEditLoading(false);
    setSuccessfullyEdited(true);
    
  } catch (error) {
    console.error('Error updating project banner:', error);
    
  }
  
 setEdit(false)
}

  return (
    <div>
      <section className="py-20 h-[27rem] group px-6 bg-gradient-to-r from-black to-gray-800">
        <div className="w-full   text-white grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">
          <div className="flex items-center gap-5 flex-col lg:items-start lg:px-20">
            {edit ? (
              <input
                type="text"
                value={editHeading}
                onChange={(e) => setEditHeading(e.target.value)}
                className="w-full text-2xl md:text-4xl font-[600] text-black text-center lg:text-start"
              />
            ) : (
              <h1 className="text-4xl text-center lg:text-start">
                {dataGet?.project?.cardTitle}
              </h1>
            )}
            {edit ? (
              <textarea
                value={editDes}
                onChange={(e) => setEditDes(e.target.value)}
                className="w-full text-lg font-[400] text-black text-center lg:text-start"
              />
            ) : (
              <p className="text-lg text-gray-300 text-center lg:text-start">
                {dataGet?.project?.cardDescription}
              </p>
            )}

            {edit && <input type="file" onChange={(e) => setEditImage(e.target.files[0])}/>}
            <ContactButton text={contactData1.button} />
          </div>
          <div className="flex  items-center justify-center">
            <img
              src={dataGet?.project?.image}
              alt="contactImage"
              className="w-1/3 mx-auto"
              
            />
          </div>
        </div>
        <div className="hidden group-hover:flex justify-end mt-4 me-5">
          {edit ? (
           editLoading ? <LoadingButton/> : (
           <div className="flex gap-4">
           <button onClick={() => handleCancelEdit(dataGet?.project?._id)} className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold">Cancel</button>
           <button onClick={() => handleEditData(dataGet?.project?._id)} className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold">Save</button>
           </div>
           )
          ) : (
            <MdModeEditOutline
            onClick={() => setEdit(!edit)}
            className="cursor-pointer text-white"
            size={25}
          />
          )}
        </div>
      </section>
    </div>
  );
};

export default IndustrieDiscuss;
