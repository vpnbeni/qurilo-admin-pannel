import React, { useEffect, useRef, useState } from "react";
import BusinessCard from "@/component/cards/MainBusinessCard"; // Make sure the import path is correct
import Title2 from "@/component/headings/Title2";
import ViewButton from "@/component/buttons/ViewButton";
import Link from "next/link";
import { API_URL } from "@/api/commonApi";
import { MdEdit, MdAdd } from "react-icons/md"; // Import the MdAdd icon
import MainBusinessAddCardModal from "@/component/modals/MainBusinessAddCardModal"; // Import the AddCardModal component

const BusinessSection = ({alert}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollView = useRef(null);
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState(null);
  const [description, setDescription] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [link, setLink] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/business-solutions`);
      const result = await response.json();
      setData(result.data);
      setMainHeading(result.data.mainHeading);
      setDescription(result.data.description);
      setCardData(result.data.cardData);
      setLink(result.data.link);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/business-solutions/heading/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainHeading,
          description,
          link
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(updatedData.data);
        setEdit(false); // Exit edit mode after saving
        alert('Heading Updated Successfully')
        setSuccessfullyEdited(!successfullyEdited)
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [successfullyEdited]);

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };

  const visibleCards = showMore ? data?.cardData : data?.cardData.slice(0, 4);

  const handleViewMore = () => {
    setShowMore(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="overflow-hidden">
      <div className="w-full flex flex-col gap-6 py-10 lg:gap- ">
        {edit ? (
          <div className="flex flex-col gap-2 w-[50vw] mx-auto rounded-lg">
            <input
              type="text"
              className="p-2 m-2 w-full text-black border border-gray-500 rounded-lg"
              name="mainHeading"
              id="mainHeading"
              value={mainHeading}
              onChange={(e) => setMainHeading(e.target.value)}  // Updated onChange handler
            />
            <textarea
              type="text"
              className="p-2 m-2 w-full text-black border border-gray-500 rounded-lg"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}  // Updated onChange handler
            />
            <div className="text-white mx-2 flex gap-2">
              <div
                className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                {" "}
                Cancel
              </div>
              <div
                className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
                onClick={() => {
                  handleSave();
                }}
              >
                {" "}
                Save
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start lg:flex-row justify-between relative group">
            <Title2 heading={data?.mainHeading} subheading={data?.description} />
            <Link href={`/business-solutions`} className="pl-6 md:pl-14 lg:pr-20 text-black cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize">
              View All
              <span className="group-hover:w-full w-0 h-[1px] bg-black rounded-sm transition-all ease-in-out duration-200"></span>
            </Link>
            <div
              className={`absolute bottom-5 z-30 right-5 text-black    group-hover:block hidden cursor-pointer `}
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <MdEdit className="cursor-pointer text-black  " size={26} />
            </div>
          </div>
        )}

        <div ref={scrollView} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 relative">
          {visibleCards?.map((card, i) => (
            <BusinessCard card={card} key={i} index={i} successfullyEdited={successfullyEdited} setSuccessfullyEdited={setSuccessfullyEdited}  />
          ))}
          <div
            className="absolute top-0 right-0 z-30 text-black cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <MdAdd size={26} />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          {!showMore && data?.cardData.length > 3 && (
            <ViewButton text="View all topics" color="black" onClick={handleViewMore} />
          )}
          {showMore && (
            <ViewButton text="View Less" type="less" color="black" onClick={handleViewLess} />
          )}
        </div>
      </div>
      {/* Modal for adding a new card */}
      {isModalOpen && (
          <MainBusinessAddCardModal mainHeading={mainHeading}
            setIsModalOpen={setIsModalOpen} desc={true}
            setSuccessfullyEdited={setSuccessfullyEdited} page={"business-solutions"}
            successfullyEdited={successfullyEdited}
          />
        )}
    </section>
  );
};

export default BusinessSection;
