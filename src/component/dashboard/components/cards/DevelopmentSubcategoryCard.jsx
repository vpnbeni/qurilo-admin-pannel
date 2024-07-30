import Image from "next/image";
import React from "react";

export default function DevelopmentSubcategoryCard({ image, title, des }) {
  return (
    <>
      <div data-aos="fade-up" class="p-7 rounded-xl bg-white hover:bg-second shadow-md hover:shadow-lg hover:border-primary-500   border-[1px]">
        {image&&<Image width={50} height={50} src={image} alt={title}  />}
        <h3 class="md:text-xl text-black  font-bold font-sans mt-2 mb-7">
          {title}

          <p className="border-[1px] mt-5 border-primary-500 "></p>
        </h3>

        <p class="leading-7 text-black/90 mb-6 dark:text-gray-400">
          {des}
        </p>
      </div>
    </>
  );
}
