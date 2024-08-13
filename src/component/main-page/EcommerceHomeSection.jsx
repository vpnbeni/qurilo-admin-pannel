import React, { useEffect, useRef, useState } from "react";
import ViewButton from "@/component/buttons/ViewButton";
import EcommerceCard from "@/component/cards/MainEcommerceCard";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";
import { API_URL } from "@/api/commonApi";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import AddCardModal from "@/component/modals/MainPageDevelopmentCardAdd"; // Import the new modal component

const EcommerceHomeSection = () => {
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mainHeading, setMainHeading] = useState(null);
  const [description, setDescription] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for modal
  const [successfullyEdited,setSuccessfullyEdited]=useState(false)

  // const [showAddCardModal, setShowAddCardModal] = useState(false);

  
  const scrollView = useRef(null);

  useEffect(() => {
    console.log(successfullyEdited,'successfullyEdited')
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/eco-solutions`);
        const result = await response.json();
        setData(result.data);
        setMainHeading(result.data.mainHeading);
        setDescription(result.data.description);
        setCardData(result.data.cardData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [successfullyEdited]);
  
  const visibleCards = showMore ? cardData : cardData.slice(0, 3);
  const handleViewMore = () => {
    setShowMore(true);

  };

  const handleViewLess = () => {
    setShowMore(false);

    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/eco-solutions/heading/${data?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mainHeading,
          description,
          link: data?.link,
        }),
      });
      if (response.ok) {
        fetchData(); // Refresh data after saving
        setEdit(false);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAddCard = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/eco-solutions/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      if (response.ok) {
        fetchData(); // Refresh data after adding
        setShowAddCardModal(false);
        setNewCard({ cardTitle: "", image: "", point: [""] });
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };



  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="flex flex-col gap-10 py-10">
        {edit ? (
          <div className="flex flex-col gap-2 w-[50vw] mx-auto">
            <input
              type="text"
              className="p-2 m-2 w-full text-black border border-gray-500 rounded-lg"
              name="mainHeading"
              id="mainHeading"
              value={mainHeading}
              onChange={(e) => setMainHeading(e.target.value)}
            />
            <textarea
              className="p-2 m-2 w-full text-black border border-gray-500 rounded-lg"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-white mx-2 flex gap-2">
              <div
                className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
                onClick={() => setEdit(false)}
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
          <div className="flex flex-col items-start lg:flex-row justify-between relative group">
            <Title2
              heading={data?.mainHeading}
              subheading={data?.description}
              className={"text-black"}
            />
            <Link
              href={"/e-commerce"}
              className="pl-6 md:pl-14 lg:pr-20 text-black cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize"
            >
              View All
              <span className="group-hover:w-full w-0 h-[1px] bg-black rounded-sm transition-all ease-in-out duration-200"></span>
            </Link>
            <div
              className="absolute bottom-5 right-5 text-black group-hover:block hidden cursor-pointer"
              onClick={() => setEdit(true)}
            >
              <MdEdit size={26} />
            </div>
            
          </div>
        )}
        <div className="w-full relative grid grid-cols-1 py-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-10 px-6 lg:px-12 lg:gap-10 lg:gap-y-16 xl:gap-10 xl:gap-y-16">
          {visibleCards?.map((card, i) => (
            <EcommerceCard
              card={card}
              key={i} index={i} setSuccessfullyEdited={setSuccessfullyEdited} successfullyEdited={successfullyEdited}
              
            />
          ))}
          <div
              className="absolute top-0 right-5 z-50  text-black  cursor-pointer"
              onClick={() => setIsAddModalOpen(true)} // Open the modal
            >
              <IoMdAdd  size={26} />
            </div>
        </div>
        <div ref={scrollView} className="flex justify-center mt-12">
          {!showMore && (
            <ViewButton
              text="View all topics"
              color="black"
              onClick={handleViewMore}
            />
          )}
          {showMore && (
            <ViewButton
              text="View Less"
              type="less"
              color="black"
              onClick={handleViewLess}
            />
          )}
        </div>
      </div>
      {/* Render AddCardModal */}
      {isAddModalOpen && (
        <AddCardModal setSuccessfullyEdited={setSuccessfullyEdited} page={"eco-solutions"} successfullyEdited={successfullyEdited}   mainHeading={mainHeading} icon={"noicon"}
          onClose={() => setIsAddModalOpen(false)} // Close the modal
          onSuccess={(newCard) => {
            setCardData([...cardData, newCard]); // Add the new card to the card data
          }}
        />
      )}
    </section>
  );
};

export default EcommerceHomeSection;
