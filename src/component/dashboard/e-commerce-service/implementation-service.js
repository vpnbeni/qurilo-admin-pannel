import React, { useState, useEffect } from "react";
import EcommerceImplementationCard from "../../cards/EcommerceImplementationCard";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import { FiPlus } from "react-icons/fi";
import LoadingButton from "@/component/buttons/LoadingButton";
export default function ServicesSection({ id }) {
  const [edit, setEdit] = useState(false);
  const [serviceCardData, setServiceCardData] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainDescEdit, setMainDescEdit] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardIcon, setNewCardIcon] = useState(null);
  const [headingLoading, setHeadingLoading] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false); // State for view mode
  const [addLoading, setAddLoading]=useState(false);
  const fetchData = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}auth/v1/ecommerce/implementation-card/${id}`
      );
      const result = await res.json();
      setServiceCardData(result?.data);
      console.log(serviceCardData,"carddata") 
      setMainDescEdit(result.data.description);
      setMainImg(result.data.image);
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
  }, [id, successfullyEdited]);
  const handleCancel=()=>{
    setEdit(!edit);
    setSuccessfullyEdited(!successfullyEdited);
  }
  const handleSave = async (idd) => {
    setHeadingLoading(true);
    
    const formData = new FormData();
    formData.append("mainHeading", serviceCardData.mainHeading);
    formData.append("description", mainDescEdit);
    formData.append("slugName", id);
    if (mainImg) {
      formData.append("image", mainImg);
    }
    // console.log(formData)
    try {
      const res = await fetch(`${API_URL}auth/v1/ecommerce/implementation-card/`, {
        method: "PUT",
      
        body: formData,
      });
      if (res.ok) {
        setSuccessfullyEdited((prev) => !prev);
        setEdit(false);
        setHeadingLoading(false);
      } else {
        console.log("Error updating data");
        setEdit(false);
        setHeadingLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleAddCard = async () => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append("cardTitle", newCardTitle);
    formData.append("cardDescription", newCardDescription);
    formData.append("slugName", id);
    if (newCardIcon) {
      formData.append("icon", newCardIcon);
    }
    try {
      const res = await fetch(`${API_URL}auth/v1/ecommerce/implementation-card/`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccessfullyEdited((prev) => !prev);
        setShowModal(false);
        // Clear the input fields after successful addition
        setNewCardTitle("");
        setNewCardDescription("");
        setNewCardIcon(null);
    setAddLoading(false);

      } else {
        console.log("Failed to add new card");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="relative group my-10">
      <div className="relative md:mt-10 flex gap-4 flex-col items-center mt-6 lg:ml-10 mx-8 md:mx-16">
        {edit ? (
          <>
            <input 
              value={serviceCardData?.mainHeading || ""}
              onChange={(e) =>
                setServiceCardData((prev) => ({
                  ...prev,
                  mainHeading: e.target.value,
                }))
              }
              className="w-2/3 border-2 text-2xl font-medium border-gray-700 rounded-md px-2 py-3"
            />
            <textarea
              value={mainDescEdit}
              onChange={(e) => setMainDescEdit(e.target.value)}
              className="border-2 w-2/3 h-[200px]  border-gray-700 rounded-md px-2 py-3 mt-2"
            />
            <input type="file" className="w-2/3 "  onChange={(e) => setMainImg(e.target.files[0])}/>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-2xl font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8">
              {serviceCardData?.mainHeading}
            </h2>
            <div className="mt-5">
              <p className="text-base text-center text-desc text-body-color font-sans mx-auto md:w-3/4">
                {serviceCardData?.description}
              </p>
            </div>
            <div className="w-full flex justify-center  my-5">  
              <img src={serviceCardData?.image} alt="" />
            </div>
            
          </>
        )}
        {edit ? (
          headingLoading ? (
            <LoadingButton />
          ) : (
            <div className="flex gap-4">  
            <button
              onClick={() => handleCancel()}
              className="text-white font-bold bg-red-600 my-4 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(serviceCardData._id)}
              className="text-white font-bold bg-green-600 my-4 px-4 py-2 rounded-md"
            >
              Save
            </button>
            </div>
          )
        ) : (
          <MdEdit
            size={26}
            onClick={() => setEdit(true)}
            className="absolute right-2 bottom-0 hidden cursor-pointer my-2 group-hover:block"
          />
        )}
        <div className="absolute flex justify-end -right-20 -bottom-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 font-medium  rounded-md text-white"
        >
          <FiPlus size={20} className="mx-6 my-2" />
        </button>
      </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8 md:mt-6 md:grid-cols-2 lg:grid-cols-3 md:mx-16 mx-8">
        {serviceCardData?.cardData
          ?.slice(0, showAllCards ? serviceCardData.cardData.length : 3)
          .map((data, index) => (
            <EcommerceImplementationCard
              cardId={data._id}
              key={index}
              image={data.icon}
              title={data.cardTitle}
              des={data.cardDescription}
              setSuccessfullyEdited={setSuccessfullyEdited}
              successfullyEdited={successfullyEdited} 
              id={id}
            />
          ))}
      </div>
      {serviceCardData?.cardData?.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllCards(!showAllCards)}
            className="bg-blue text-white px-4 py-2 rounded-md"
          >
            {showAllCards ? "View Less" : "View More"}
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Card</h2>
            <input
              type="text"
              placeholder="Card Title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="border-2 w-full border-gray-700 rounded-md px-2 py-3 mb-4"
            />
            <textarea
              placeholder="Card Description"
              value={newCardDescription}
              onChange={(e) => setNewCardDescription(e.target.value)}
              className="border-2 w-full border-gray-700 rounded-md px-2 py-3 mb-4"
              rows="4"
            />
            <input
              type="file"
              onChange={(e) => setNewCardIcon(e.target.files[0])}
              className="mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              {addLoading ? (
                <LoadingButton/>
              ):(
                <div>
                 
              <button
                onClick={handleAddCard}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}