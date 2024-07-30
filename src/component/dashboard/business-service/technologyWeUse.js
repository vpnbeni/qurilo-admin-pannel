
import React, { useState, useEffect } from "react";
import Heading from "@/component/headings/Heading";
import TechnologyCard from "@/component/cards/TechnologyCard";
import AddTechnologyModal from "@/component/modals/AddTechnologyModal";
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";

const TechnologyWeUse = ({ id }) => {
  const [technologyCards, setTechnologyCards] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [headingChange, setHeadingChange] = useState(false);
  const [headingValue, setHeadingValue] = useState("");
  const [subHeadingValue, setSubHeadingValue] = useState("");
  const [headingLoading, setHeadingLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTechnologyCards();
    }
  }, [id, successfullyEdited]);

  const fetchTechnologyCards = async () => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/technology-card/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch technology cards");
      }
      const data = await response.json();
      setTechnologyCards(data.data);
      setHeadingValue(data.data.mainHeading);
      setSubHeadingValue(data.data.description);
    } catch (error) {
      console.error("Error fetching technology cards:", error);
    }
  };

  const handleEdit = () => {
    setHeadingChange(true);
  };

  const handleHeading = async () => {
    setHeadingLoading(true);
    const dataSend = {
      mainHeading: headingValue,
      description: subHeadingValue,
      slugName: id,
    };
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/technology-card`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSend),
        }
      );
      const data = await response.json();
      setHeadingChange(false);
      fetchTechnologyCards();
      setHeadingLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const visibleTechnologyCards = showAll
    ? technologyCards?.technologyCard
    : technologyCards?.technologyCard?.slice(0, 3);

  return (
    <div>
      <section>
        <div className="flex group flex-col items-center px-6 lg:px-20 py-16 gap-10">
          <div className="flex relative items-center w-full flex-col justify-center gap-3">
            {headingChange ? (
              <>
                <input
                  type="text"
                  className="border-[1px] text-3xl rounded-sm font-medium text-center p-2 border-gray-900 w-3/4"
                  value={headingValue}
                  onChange={(e) => setHeadingValue(e.target.value)}
                />
                <textarea
                  type="text"
                  className="border-[1px] rounded-sm  text-center p-2  border-gray-900 w-3/4"
                  value={subHeadingValue}
                  onChange={(e) => setSubHeadingValue(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
                  {technologyCards?.mainHeading}
                </h2>
                <p>{technologyCards?.description}</p>
              </>
            )}

            <div className="hidden absolute right-0 bottom-8 group-hover:flex justify-end me-5 gap-x-1">
              {headingChange ? (
                headingLoading ? (
                  <LoadingButton />
                ) : (
                  <div
                    onClick={handleHeading}
                    className="cursor-pointer border-green-800 text-lg font-normal hover:bg-green-800 hover:text-white text-green-600 border-[1px] rounded-md px-3 py-1"
                  >
                    Save
                  </div>
                )
              ) : (
                <MdModeEditOutline
                  onClick={handleEdit}
                  className="cursor-pointer"
                  size={25}
                />
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-md hidden group-hover:block absolute  top-10 -right-14 text-white text-lg px-3 py-2 bg-green-700"
            >
              <MdAdd />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-14">
              {visibleTechnologyCards?.map((tech, i) => (
                <TechnologyCard
                  setSuccessfullyEdited={setSuccessfullyEdited}
                  successfullyEdited={successfullyEdited}
                  key={i}
                  type="business"
                  slug={id}
                  tech={tech}
                />
              ))}
            </div>

            {technologyCards?.technologyCard?.length > 3 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-green-600 rounded-md px-3 py-2 text-white"
                >
                  {showAll ? "View Less" : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {showAddModal && (
        <AddTechnologyModal
          setShowAddModal={setShowAddModal}
          slug={id}
          type="business"
          SetSuccessfullyEdited={setSuccessfullyEdited}
          successfullyEdited={successfullyEdited}
        />
      )}
    </div>
  );
};

export default TechnologyWeUse;












// import React, { useState, useEffect } from "react";
// import Heading from "@/component/headings/Heading";
// import TechnologyCard from "@/component/cards/TechnologyCard";
// import AddTechnologyModal from "@/component/modals/AddTechnologyModal";
// import { MdAdd, MdModeEditOutline } from "react-icons/md";
// import { API_URL } from "@/api/commonApi";
// import LoadingButton from "@/component/buttons/LoadingButton";

// const TechnologyWeUse = ({ id }) => {
//   const [technologyCards, setTechnologyCards] = useState(null);
//   const [successfullyEdited, setSuccessfullyEdited] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [headingChange, setHeadingChange] = useState(false);
//   const [headingValue, setHeadingValue] = useState("");
//   const [subHeadingValue, setSubHeadingValue] = useState("");
//   const [headingLoading, setHeadingLoading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       fetchTechnologyCards();
//     }
//   }, [id, successfullyEdited]);

//   const fetchTechnologyCards = async () => {
//     try {
//       const response = await fetch(
//         `${API_URL}auth/v1/business/technology-card/${id}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch technology cards");
//       }
//       const data = await response.json();
//       setTechnologyCards(data.data);
//       setHeadingValue(data.data.mainHeading);
//       setSubHeadingValue(data.data.description);
//       console.log(technologyCards);
//     } catch (error) {
//       console.error("Error fetching technology cards:", error);
//     }
//   };

//   const handleEdit = () => {
//     setHeadingChange(true);
//   };

//   const handleHeading = async () => {
//     setHeadingLoading(true);
//     const dataSend = {
//       mainHeading: headingValue,
//       description: subHeadingValue,
//       slugName: id,
//     };
//     try {
//       const response = await fetch(
//         `${API_URL}auth/v1/business/technology-card`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataSend),
//         }
//       );
//       const data = await response.json();
//       setHeadingChange(false);
//       fetchTechnologyCards();
//       setHeadingLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <section>
//         <div className="flex group flex-col items-center px-6 lg:px-20 py-16 gap-10">
//           {/* <Heading fetchTechnologyCards={fetchTechnologyCards} heading={technologyCards?.mainHeading} id={id}  subheading={technologyCards?.description}/> */}
//           <div className="flex items-center flex-col justify-center gap-3">
//             {headingChange ? (
//               <>
//                 <input
//                   type="text"
//                   className="outline-none bg-gray-200 p-2 border-b border-solid border-gray-400 w-full"
//                   value={headingValue}
//                   onChange={(e) => setHeadingValue(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   className="outline-none bg-gray-200 p-2 border-b border-solid border-gray-400 w-full"
//                   value={subHeadingValue}
//                   onChange={(e) => setSubHeadingValue(e.target.value)}
//                 ></input>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-black text-2xl lg:text-4xl capitalize font-[600] text-center">
//                   {technologyCards?.mainHeading}
//                 </h2>
//                 <p>{technologyCards?.description}</p>
//               </>
//             )}

//             <div className="hidden group-hover:flex justify-end me-5 gap-x-1">
//               {headingChange ? (
//                 headingLoading ? (
//                   <LoadingButton />
//                 ) : (
//                   <div
//                     onClick={handleHeading}
//                     className="cursor-pointer border-green-800 text-lg font-normal hover:bg-green-800 hover:text-white text-green-600 border-[1px] rounded-md px-3 py-1"
//                   >
//                     Save
//                   </div>
//                 )
//               ) : (
//                 <MdModeEditOutline
//                   onClick={handleEdit}
//                   className="cursor-pointer text-green-600"
//                   size={25}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="rounded-md hidden group-hover:block absolute left-[63rem] top-10 text-white text-lg px-3 py-2 bg-green-700"
//             >
//               <MdAdd />
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-14">
//               {technologyCards?.technologyCard?.map((tech, i) => (
//                 <TechnologyCard
//                   successfullyEdited={setSuccessfullyEdited}
//                   key={i}
//                   slug={id}
//                   tech={tech}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       {showAddModal && (
//         <AddTechnologyModal
//           setShowAddModal={setShowAddModal}
//           slug={id}
//           successfullyEdited={setSuccessfullyEdited}
//         />
//       )}
//     </div>
//   );
// };

// export default TechnologyWeUse;
