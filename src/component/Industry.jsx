import LearnMoreButton from "@/component/buttons/LearnMoreButton";
import Link from "next/link";
import React from "react";

export default function Industry({ data }) {
  return (
    <>
      {data.map((ele) => {
        return (
          <div
            key={ele._id}
            className="max-w-screen-xl mx-auto px-5 bg-white "
          >
            <div className="flex flex-col items-left lg:ml-16">
              <h2 className="font-semibold text-2xl text-left font-sans md:text-3xl text-black mb-4 md:mt-0 mt-8">
                {ele.mainHeading}
              </h2>
            </div>
            <div className="grid max-w-xl mx-auto">
              <div className="py-3 mb-4">
                <p className="font-medium font-sans mb-6 dark:text-gray-400 mt-3">
                  {ele.description}
                </p>
                {ele.point.map((heading, index) => {
                  return (
                    <div key={index} className="border-b-[1px] border-gray-400 pb-4 mt-2">
                      <h3 className="font-medium">
                        {heading}
                      </h3>
                    </div>
                  );
                })}
              </div>
              {ele.link && (
                <Link href={ele.link} target="_blank">
                  <LearnMoreButton />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
