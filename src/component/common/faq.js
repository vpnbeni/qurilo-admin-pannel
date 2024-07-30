import React, { useState } from 'react'
// import { faqData } from '../assets/business';

import { IoMdAdd } from "react-icons/io";
import { HiMinus } from "react-icons/hi";
import Heading from '../headings/Heading';


const Faq = ({faqData}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div>
      <div className="my-10 lg:my-20 px-6 lg:px-20">

<div className="flex flex-col gap-5">
  <Heading heading="Frequently Asked Questions" />
  <p className="text-center text-[18px] font-[400] mt-2">Here are some questions related to software outsourcing that our clients
  frequently ask:</p>
</div>

<div className="mt-10 lg:w-[72%] md:w-[90%] w-[100%] mx-auto">
  {faqData.map((item, index) => {
    return (
      <div key={index}>
        <div
          onClick={() =>
            setActiveIndex(activeIndex === index ? null : index)
          }
          className="flex justify-between items-center md:py-7 py-3  cursor-pointer"
        >
          <h2 className="md:text-lg text-[16px] w-[90%] md:w-[96%] font-normal text-lg">
            {item.question}
          </h2>
          {activeIndex === index ? (
            <HiMinus size={25} className="text-bgColor-100 font-bold" />
          ) : (
            <IoMdAdd size={25} className="text-bgColor-100 font-bold" />
          )}
        </div>

        {activeIndex === index && (
          <div className="pb-4 font-normal text-gray-500">
            <p>{item.answer}</p>
            <ul className="mt-2">
              {item.list?.map((listItem, index) => {
                return (
                  <ul key={index} className="list-disc mx-10">
                    <li className="text-sm lg:text-base">{listItem}</li>
                  </ul>
                );
              })}
            </ul>
          </div>
        )}
        {index !== faqData.length - 1 && (
          <div className="w-[100%] h-[1px] bg-gray-300"></div>
        )}
      </div>
    );
  })}
</div>
</div>
    </div>
  )
}

export default Faq
