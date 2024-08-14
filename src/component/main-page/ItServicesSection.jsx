import { useState, useEffect, useRef } from "react";
import ItServicesCard from "@/component/cards/MainItServicesCard";
import ViewButton from "@/component/buttons/ViewButton";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";
import { MdEdit ,MdAdd} from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import MainBusinessAddCardModal from "@/component/modals/MainBusinessAddCardModal"; // Import the AddCardModal component

const ItServicesSection = ({alert}) => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [mainHeading, setMainHeading] =useState(null);
  const [description, setDescription] =useState(null);
  const [cardData, setCardData] =useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [link, setLink] = useState(null);


  const [showMore, setShowMore] = useState(false);
  const scrollView = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/it-solutions`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
        setMainHeading(result.data.mainHeading);
        setDescription(result.data.description);
        setLink(result.data.link);
        setCardData(result.data.cardData)
      } catch (error) {
        console.error('Error fetching IT services data:', error);
      }
    };

    fetchData();
  }, [successfullyEdited]);

  const handleViewMore = () => {
    setShowMore(true);
  };

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/it-solutions/heading/${data._id}`, {
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
  const cardsToShow = showMore ? data?.cardData : data?.cardData.slice(0, 4);

  return (
    <section className="bg-gradient-to-r from-black to-gray-900 py-10">
      {edit ? (
        <div className="flex flex-col gap-2 w-[50vw] mx-auto">
          <input
            type="text"
            className="p-2 m-2 w-full text-black"
            name="mainHeading"
            id="mainHeading"
            value={mainHeading}
            onChange={(e) => setMainHeading(e.target.value)}
          />
          <textarea
            type="text"
            className="p-2 m-2 w-full text-black"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
      ) :(
        <div className="flex flex-col items-start lg:flex-row justify-between relative group">
        <Title2
          heading={data?.mainHeading}
          subheading={data?.description}
          className={"text-white"}
        />

        <Link href={`/${data?.link}`} className="pl-6 md:pl-14 lg:pr-20 text-[#DCDCDC] cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize">
          View All
          <span className="group-hover:w-full w-0 h-[1px] bg-white rounded-sm transition-all ease-in-out duration-200"></span>
        </Link>
        <div
            className={`absolute bottom-5 z-30 right-5 text-white group-hover:block hidden cursor-pointer `}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <MdEdit className="cursor-pointer text-white" size={26} />
          </div>
      </div>
      )}
     

      <div
        ref={scrollView}
        className="flex flex-wrap gap-8 justify-center mt-9 relative"
      >
        {cardsToShow?.map((card) => (
          <ItServicesCard
            key={card._id}
            card={card}
            link={card.slugLink} successfullyEdited={successfullyEdited} setSuccessfullyEdited={setSuccessfullyEdited}
          />
        ))}
        <div
            className="absolute top-0 right-2 z-30 text-white cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <MdAdd size={26} />
          </div>
      </div>

      <div className="flex justify-center mt-12">
        {!showMore && (
          <ViewButton
            text="View all topics"
            color="white"
            onClick={handleViewMore}
          />
        )}
        {showMore && (
          <ViewButton
            text="View Less"
            type="less"
            color="white"
            onClick={handleViewLess}
          />
        )}
      </div>
      {/* Modal for adding a new card */}
      {isModalOpen && (
          <MainBusinessAddCardModal mainHeading={mainHeading}
            setIsModalOpen={setIsModalOpen} page={'it-solutions'}
            setSuccessfullyEdited={setSuccessfullyEdited}
            successfullyEdited={successfullyEdited}
          />
        )}
    </section>
  );
};

export default ItServicesSection;
