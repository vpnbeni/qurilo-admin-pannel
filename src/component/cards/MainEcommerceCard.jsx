import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CiShoppingTag } from "react-icons/ci";

const EcommerceCard = ({ card }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Link href={card.slugLink}>
      <div
        className="group overflow-hidden rounded-[1rem] p-2"
        onMouseEnter={toggleVisibility}
        onMouseLeave={toggleVisibility}
      >
        <div
          className="relative w-full h-[25rem] overflow-hidden rounded-[1rem] flex items-end justify-start text-white cursor-pointer transition-transform duration-300 ease-in-out py-4 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(106,106,106,0) 50%, rgba(255,248,248,0) 100%) ,url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            {visible ? (
              <svg
                className="absolute -top-[4px] -right-10 z-10 w-32"
                fill="#558bdc"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80.3 68"
              >
                <path
                  d="M5.35,16S15,18.89,15.7,30.47C16.39,41.52,10.48,67.08,46.48,65a13.49,13.49,0,0,1,10.69,4.21C60,72.17,62,76.19,62,84H85.65V16.72Z"
                  transform="translate(-5.35 -16)"
                />
              </svg>
            ) : (
              <svg
                className="absolute -top-[4px] -right-10 z-10 w-32"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80.3 68"
              >
                <path
                  d="M5.35,16S15,18.89,15.7,30.47C16.39,41.52,10.48,67.08,46.48,65a13.49,13.49,0,0,1,10.69,4.21C60,72.17,62,76.19,62,84H85.65V16.72Z"
                  transform="translate(-5.35 -16)"
                />
              </svg>
            )}

            <span className="w-12 h-12 group-hover:w-11 group-hover:h-11 bg-gray-800 group-hover:bg-white/0 flex items-center p-1 justify-center text-white rounded-xl absolute top-2 right-2 z-20 transition-all ease-in-out duration-300">
              <HiOutlineExternalLink size={25} />
            </span>
          </div>
        <div className="flex flex-col translate-y-[75%] gap-[20px] px-6 pb-4   group-hover:bg-gradient-to-t from-black to-white/0 w-full group-hover:rounded-b-[1rem] group-hover:translate-y-0 transition-all ease-in-out duration-300">
          <h3 className="text-2xl tracking-wide font-semibold">
            {card.cardTitle}
          </h3>
          <ul>
            {card.point?.map((item, i) => (
              <li className="text-base flex items-center gap-2" key={i}>
                <CiShoppingTag className="text-white" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default EcommerceCard;
