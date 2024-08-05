import React, { useState, useEffect } from "react";
import Heading from "@/component/headings/Heading";
import TechnologyCard from "@/component/cards/TechnologyCard";
import AddTechnologyModal from "@/component/modals/AddTechnologyModal";
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";
const Technologycard = ({ id }) => {
  const [technologyCards, setTechnologyCards] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [headingChange, setHeadingChange] = useState(false);
  const [headingValue, setHeadingValue] = useState("");
  const [subHeadingValue, setSubHeadingValue] = useState("");
  const [headingLoading, setHeadingLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (id) {
      fetchTechnologyCards();
    }
  }, [id, successfullyEdited]);
  const fetchTechnologyCards = async () => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/technology-card/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch technology cards");
      }
      const data = await response.json();
      // console.log(data,"tech data")
      setTechnologyCards(data.data);
      setHeadingValue(data.data.mainHeading);
      setSubHeadingValue(data.data.description);
    } catch (error) {
      console.error("Error fetching technology cards:", error);
    }
  };
  const handleEdit = () => {
    setHeadingChange(true);
  };
  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: headingValue,
      description: subHeadingValue,
      slugName: id,
    };
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/technology-card`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSend),
        }
      );
      const data = await response.json();
      setHeadingChange(false);
      fetchTechnologyCards();
      setHeadingLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const visibleTechnologyCards = showAll
    ? technologyCards?.cardData
    : technologyCards?.cardData?.slice(0, 3);
  return (
    <div>
      <section>
        <div className="flex group flex-col items-center px-6 lg:px-20 py-16 gap-10">
          <div className="flex relative items-center w-full flex-col justify-center gap-3">
            {headingChange ? (
              <>
                <input
                  type="text"
                  className="border-2 text-2xl font-medium border-gray-700 rounded-md px-2 py-3 w-2/3"
                  value={headingValue}
                  onChange={(e) => setHeadingValue(e.target.value)}
                />
                <textarea
                  type="text"
                  className="border-2 h-[200px]  border-gray-700 rounded-md px-2 py-3 mt-2 w-2/3"
                  value={subHeadingValue}
                  onChange={(e) => setSubHeadingValue(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
                  {technologyCards?.mainHeading}
                </h2>
                <p>{technologyCards?.description}</p>
              </>
            )}
            <div className="hidden   group-hover:flex justify-end me-5 gap-x-1">
              {headingChange ? (
                headingLoading ? (
                  <LoadingButton />
                ) : (
                    
                 
                  <div className="flex gap-2">
              <button
              onClick={() => handleHeading()}
              className="text-white font-bold bg-red-600 my-4 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleHeading()}
              className="text-white font-bold bg-green-600 my-4 px-4 py-2 rounded-md"
            >
              Save
            </button>
            </div>
                )
              ) : (     
                <MdModeEditOutline
                  onClick={handleEdit}
                  className="cursor-pointer absolute -top-10 right-0 "
                  size={25}
                />
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-md hidden group-hover:block absolute  top-0 -right-14 text-white text-lg px-3 py-2 bg-green-700"
            >
              <MdAdd />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-14">
              {visibleTechnologyCards?.map((tech, i) => (
                <TechnologyCard
                  setSuccessfullyEdited={setSuccessfullyEdited}
                  successfullyEdited={successfullyEdited}
                  key={i}
                  type="business"
                  slug={id}
                  tech={tech}
                />
              ))}
            </div>
            {technologyCards?.cardData?.length > 3 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-green-600 rounded-md px-3 py-2 text-white"
                >
                  {showAll ? "View Less" : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {showAddModal && (
        <AddTechnologyModal
        headingValue={headingValue}
        setHeadingValue={setHeadingValue}
        subHeadingValue={subHeadingValue}
        setSubHeadingValue={setSubHeadingValue}
          setShowAddModal={setShowAddModal}
          successfullyEdited={successfullyEdited}
          setSuccessfullyEdited={setSuccessfullyEdited}
          slug={id}
          type="business"
        />
      )}
    </div>
  );
};
export default Technologycard;