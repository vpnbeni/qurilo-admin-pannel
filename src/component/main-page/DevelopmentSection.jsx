import React, { useRef, useState, useEffect } from "react";
import DevelopmentCard from "@/component/cards/MainDevelopmetCard";
import ViewButton from "@/component/buttons/ViewButton";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";
import { API_URL } from "@/api/commonApi";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io"; // Import the add icon
import AddCardModal from "@/component/modals/MainPageDevelopmentCardAdd"; // Import the new modal component

const DevelopmentSection = ({alert}) => {
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState(null);
  const [description, setDescription] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for modal
  const [successfullyEdited,setSuccessfullyEdited]=useState(false)
  
  const scrollView = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}auth/v1/home-page/qurilo/development-solutions`
        );
        const result = await response.json();
        setData(result.data);
        setMainHeading(result.data.mainHeading);
        setDescription(result.data.description);
        setCardData(result.data.cardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [successfullyEdited]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}auth/v1/home-page/qurilo/development-solutions/heading/${data?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mainHeading,
            description,
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setData(updatedData.data);
        alert('Heading Updated Successfully')

        setEdit(false); // Exit edit mode after saving
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

  if (loading) return <p>Loading...</p>;

  const visibleCards = showMore ? cardData : cardData.slice(0, 3);

  const handleViewMore = () => {
    setShowMore(true);
  };

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="development" className="bg-gradient-to-r from-black to-gray-800 py-10">
      {edit ? (
        <div className="flex flex-col gap-2 w-[50vw] mx-auto">
          <input
            type="text"
            className="p-2 m-2 w-full text-black"
            name="mainHeading"
            id="mainHeading"
            value={mainHeading || ""}
            onChange={(e) => setMainHeading(e.target.value)}
          />
          <textarea
            type="text"
            className="p-2 m-2 w-full text-black"
            name="description"
            id="description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="text-white mx-2 flex gap-2">
            <div
              className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </div>
            <div
              className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
              onClick={handleSave}
            >
              Save
            </div>
          </div>
        </div>
      ) : (
        <div className="flex group relative flex-col items-start lg:flex-row justify-between">
          <Title2 heading={mainHeading} subheading={description} className="text-white" />
          <Link
            href={`/${data?.link}`}
            className="pl-6 md:pl-14 lg:pr-20 text-[#DCDCDC] cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize"
          >
            View All
            <span className="group-hover:w-full w-0 h-[1px] bg-white rounded-sm transition-all ease-in-out duration-200"></span>
          </Link>
          
          <div
            className={`absolute top-5 z-30 right-5 text-white group-hover:block hidden cursor-pointer`}
            onClick={() => setEdit(!edit)}
          >
            <MdEdit className="cursor-pointer text-white" size={26} />
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-1  py-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-20 px-12 lg:gap-10 lg:gap-y-16 xl:gap-16 xl:gap-y-20 relative">
        {visibleCards.map((card, i) => (
                    <DevelopmentCard card={card} alert={alert} key={i} index={i} setSuccessfullyEdited={setSuccessfullyEdited} successfullyEdited={successfullyEdited}/>
 
        ))}
        <IoMdAdd
          size={36}
          className="text-white cursor-pointer absolute right-0 -top-16 mr-10 mt-10 "
          onClick={() => setIsAddModalOpen(true)} // Open the modal
        />
      </div>

      <div ref={scrollView} className="flex justify-center mt-12">
        {!showMore && (
          <ViewButton text="View all topics" color="white" onClick={handleViewMore} />
        )}
        {showMore && (
          <ViewButton text="View Less" type="less" color="white" onClick={handleViewLess} />
        )}
      </div>

      {/* Render AddCardModal */}
      {isAddModalOpen && (
        <AddCardModal setSuccessfullyEdited={setSuccessfullyEdited} page={"development-solutions"} successfullyEdited={successfullyEdited}   mainHeading={mainHeading}
          onClose={() => setIsAddModalOpen(false)} // Close the modal
          onSuccess={(newCard) => {
            setCardData([...cardData, newCard]); // Add the new card to the card data
          }}
        />
      )}
    </section>
  );
};

export default DevelopmentSection;
