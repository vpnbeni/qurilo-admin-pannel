import React from "react";
import { FaCheck } from "react-icons/fa6";
import ExploreMoreButton from "../buttons/ExploreMoreButton";
import Link from "next/link";
import Image from "next/image";

const DevelopmentCard = ({ card }) => {
  return (
    <div data-aos="fade-up" className="card w-full h-[20rem]">
      <div className="content w-full h-full">
        <div className="back h-full w-full ">
          <div
            className="back-content w-full h-full flex items-end justify-start px-4 pb-5"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(106,106,106,0) 50%, rgba(255,248,248,0) 100%) ,url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay flex text-white items-center gap-2">
              <Image  src={card.icon} alt={card.title} className="h-8 w-8" width={32} height={32} />
              <h3 className="text-xl text- font-semibold">{card.title}</h3>
            </div>
          </div>
        </div>
        <div className="front w-full h-full bg-white text-black py-6 px-8" >
          <div className=" flex flex-col items-start justify-between w-full h-full">
            <div className="flex flex-col  gap-3">
              <h3 className="text-xl xl:text-2xl  font-semibold capitalize">
                {card.title}
              </h3>
              <p className="w-32 h-[2px] bg-primary-500"></p>
            </div>
            <ul className="flex flex-col gap-2">
              {card.description?.map((des, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 font-semibold lg:text-base text-[14px]"
                >
                  <FaCheck />
                  {des}
                </li>
              ))}
            </ul>
            <div className="w-full">
             <Link href={card.link} target="_blank"><ExploreMoreButton /></Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentCard;
