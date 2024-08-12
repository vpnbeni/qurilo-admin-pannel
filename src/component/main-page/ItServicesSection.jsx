import { useState, useEffect, useRef } from "react";
import ItServicesCard from "@/component/cards/MainItServicesCard";
import ViewButton from "@/component/buttons/ViewButton";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";

const ItServicesSection = () => {
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const scrollView = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ch19jv3t-8000.inc1.devtunnels.ms/auth/v1/home-page/qurilo/it-solutions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching IT services data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = () => {
    setShowMore(true);
  };

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };

  const cardsToShow = showMore ? data?.cardData : data?.cardData.slice(0, 4);

  return (
    <section className="bg-gradient-to-r from-black to-gray-900 py-10">
      <div className="flex flex-col items-start lg:flex-row justify-between">
        <Title2
          heading={data?.mainHeading}
          subheading={data?.description}
          className={"text-white"}
        />

        <Link href={`/${data?.link}`} className="pl-6 md:pl-14 lg:pr-20 text-[#DCDCDC] cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize">
          View All
          <span className="group-hover:w-full w-0 h-[1px] bg-white rounded-sm transition-all ease-in-out duration-200"></span>
        </Link>
      </div>

      <div
        ref={scrollView}
        className="flex flex-wrap gap-8 justify-center mt-9"
      >
        {cardsToShow?.map((item) => (
          <ItServicesCard
            key={item._id}
            title={item.cardTitle}
            image={item.image}
            link={item.slugLink}
          />
        ))}
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
    </section>
  );
};

export default ItServicesSection;
