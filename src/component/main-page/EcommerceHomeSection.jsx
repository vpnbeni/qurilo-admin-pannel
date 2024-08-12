import ViewButton from "@/component/buttons/ViewButton";
import EcommerceCard from "@/component/cards/MainEcommerceCard";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "@/api/commonApi";
import { MdEdit } from "react-icons/md";

const EcommerceHomeSection = () => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mainHeading, setMainHeading] = useState(null);
  const [description, setDescription] = useState(null);
  const scrollView = useRef(null);
  const visibleCards = showMore ? data?.cardData : data?.cardData?.slice(0, 3);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/home-page/qurilo/eco-solutions`
      );
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  const handleViewMore = () => {
    setShowMore(true);
  };

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <div className="flex flex-col gap-10 py-10">
        {edit ? (
          <div className="flex flex-col gap-2 w-[50vw] mx-auto">
            <input
              type="text"
              className="p-2 m-2 w-full text-black"
              name="mainHeading"
              id="mainHeading"
              value={mainHeading}
              onChange={(e) => e.target.value}
            />
            <textarea
              type="text"
              className="p-2 m-2 w-full text-black"
              name="description"
              id="description"
              onChange={(e) => e.target.value}
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
        ) : (
          <div className="flex flex-col items-start lg:flex-row justify-between relative group">
            <Title2
              heading={data?.mainHeading}
              subheading={data?.description}
              className={"text-black"}
            />

            <Link
              href={"/e-commerce"}
              className="pl-6 md:pl-14 lg:pr-20 text-black cursor-pointer rounded-sm max-w-max font-[400]  group flex flex-col gap-[1px] capitalize"
            >
              View All
              <span className="group-hover:w-full w-0 h-[1px] bg-black rounded-sm transition-all ease-in-out duration-200"></span>
            </Link>
            <div
              className={` text-black group-hover:block hidden cursor-pointer `}
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <MdEdit className="cursor-pointer text-black" size={26} />
            </div>
          </div>
        )}

        <div className="w-full grid grid-cols-1 py-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-10 px-6 lg:px-12 lg:gap-10 lg:gap-y-16 xl:gap-10 xl:gap-y-16">
          {visibleCards?.map((card, i) => (
            <EcommerceCard card={card} key={i} index={i} />
          ))}
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
    </section>
  );
};

export default EcommerceHomeSection;
