import React, { useRef, useState } from "react";
import DevelopmentCard from "@/component/cards/MainDevelopmetCard";
import ViewButton from "@/component/buttons/ViewButton";
import Title2 from "@/component/headings/Title2";
import Link from "next/link";

const DevelopmentSection = ({ ref, data }) => {
  const [showMore, setShowMore] = useState(false);
  const scrollView = useRef(null);
  const visibleCards = showMore ? data.list : data.list.slice(0, 6);
  const handleViewMore = () => {
    setShowMore(true);
  };

  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="development"
      className="bg-gradient-to-r from-black to-gray-800 py-10"
    >
      <div className="flex flex-col items-start lg:flex-row justify-between">
        <Title2
          heading={data.heading}
          subheading={data.subheading}
          className={"text-white"}
        />

        <Link href={"/development"} className="pl-6 md:pl-14 lg:pr-20 text-[#DCDCDC] cursor-pointer rounded-sm max-w-max font-[400]  group flex flex-col gap-[1px] capitalize">View All
        <span className="group-hover:w-full w-0 h-[1px] bg-white rounded-sm transition-all ease-in-out duration-200" ></span>
        </Link>

      </div>

      <div className="w-full grid grid-cols-1 py-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-20 px-12 lg:gap-10 lg:gap-y-16 xl:gap-16   xl:gap-y-20">
        {visibleCards.map((card, i) => (
          <DevelopmentCard card={card} key={i} index={i} />
        ))}
      </div>
      <div ref={scrollView} className="flex justify-center mt-12">
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

export default DevelopmentSection;
