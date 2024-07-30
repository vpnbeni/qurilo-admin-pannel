import React from "react";


export default function Award({ data }) {
  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-4 mt-5">
        <div className="grid grid-cols-2 gap-2">
          {data?.map((img) => {
            return (
              <div key={img}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={img}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
