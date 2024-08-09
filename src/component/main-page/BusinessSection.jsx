import React, { useRef, useState } from "react";
import BusinessCards from "@/component/cards/MainBusinessCard";
import Title2 from "@/component/headings/Title2";
import ViewButton from "@/component/buttons/ViewButton";
import Link from "next/link";

const BusinessSection = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const handleViewLess = () => {
    setShowMore(false);
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };
  const visibleCards = showMore ? data.list : data.list.slice(0, 6);
  const handleViewMore = () => {
    setShowMore(true);
  };
  const scrollView = useRef(null);
  return (
    <section className="overflow-hidden">
      <div className="w-full flex flex-col gap-6 py-10 lg:gap- ">
      <div className="flex flex-col items-start lg:flex-row justify-between">
        <Title2
          heading={data.heading}
          subheading={data.subheading}
        />

        <Link href={"/business-solutions"} className="pl-6 md:pl-14 lg:pr-20 text-black cursor-pointer rounded-sm max-w-max font-[400] group flex flex-col gap-[1px] capitalize">View All
        <span className="group-hover:w-full w-0 h-[1px] bg-black rounded-sm transition-all ease-in-out duration-200" ></span>
        </Link>

      </div>

        <div
          ref={scrollView}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10"
        >
          {visibleCards.map((card, i) => (
            <BusinessCards card={card} key={i} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
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

export default BusinessSection;
