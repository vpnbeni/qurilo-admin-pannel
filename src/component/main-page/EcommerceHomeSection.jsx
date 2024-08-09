import ViewButton from "@/components/buttons/ViewButton";
import EcommerceCard from "@/components/cards/EcommerceCard";
import Title2 from "@/components/Heading/Title2";
import Link from "next/link";
import React, { useRef, useState } from "react";

const EcommerceHomeSection = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const scrollView = useRef(null);
  const visibleCards = showMore ? data.cardsData : data.cardsData.slice(0, 3);
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
        <div className="flex flex-col items-start lg:flex-row justify-between">
          <Title2
            heading={data.heading}
            subheading={data.subheading}
            className={"text-black"}
          />

          <Link
            href={"/e-commerce"}
            className="pl-6 md:pl-14 lg:pr-20 text-black cursor-pointer rounded-sm max-w-max font-[400]  group flex flex-col gap-[1px] capitalize"
          >
            View All
            <span className="group-hover:w-full w-0 h-[1px] bg-black rounded-sm transition-all ease-in-out duration-200"></span>
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 py-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-10 px-6 lg:px-12 lg:gap-10 lg:gap-y-16 xl:gap-10 xl:gap-y-16">
          {visibleCards.map((card, i) => (
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
