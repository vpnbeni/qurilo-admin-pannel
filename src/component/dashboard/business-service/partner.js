import React, { useEffect, useState } from "react";
import WhyChooseUsCard from "@/component/cards/WhyChooseUsCard";
import { MdModeEditOutline } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";
import AddBenefitModal from "@/component/modals/AddBenefitModal";
import { FiPlus } from "react-icons/fi";

const Partner = ({ id }) => {
  const [edit, setEdit] = useState(false);
  const [benefitData, setBenefitData] = useState(null);
  const [editMainHeading, setEditMainHeading] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchBenefits = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/business/benefit-card/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch benefit cards");
      }
      const data = await response.json();
      setBenefitData(data.data);
      setEditMainHeading(data.data.mainHeading);
      setEditDescription(data.data.description);
    } catch (error) {
      console.error("Error fetching benefit cards:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBenefits();
    }
  }, [id]);

  const handleEdit = async () => {
    setUpdateLoading(true);
    const dataSend = {
      mainHeading: editMainHeading,
      description: editDescription,
      slugName: id
    };

    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/benefit-card`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSend),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update benefit card");
      }
      await response.json();
      fetchBenefits();
      setEdit(!edit);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="relative px-6 group py-10 flex flex-col gap-8 lg:px-20 lg:py-20 lg:flex-row lg:gap-10 xl:gap-20">
          <div className="flex flex-col gap-5 lg:w-1/2">
            {edit ? (
              <>
                <input
                  type="text"
                  value={editMainHeading}
                  onChange={(e) => setEditMainHeading(e.target.value)}
                  className="w-full text-2xl font-[600] text-black border-[1px] border-gray-600 text-center lg:text-start"
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={5}
                  className="w-full text-[18px] font-[400] text-black border-[1px] border-gray-600 text-center lg:text-start"
                />
              </>
            ) : (
              <>
                <h2 className="text-black text-2xl lg:text-4xl 2xl:text-5xl capitalize font-[600] text-center lg:text-start">
                  {benefitData?.mainHeading}
                </h2>
                <p className="text-center text-[18px] 2xl:text-xl font-[400] mt-2 lg:text-start">
                  {benefitData?.description}
                </p>
              </>
            )}

            <div className="hidden group-hover:flex justify-end mt-4 me-5">
              {edit ? (
                updateLoading ? (
                  <LoadingButton />
                ) : (
                  <div
                    onClick={handleEdit}
                    className="cursor-pointer bg-green-800 text-lg font-normal text-white  border-[1px] rounded-md px-3 py-1"
                  >
                    Save
                  </div>
                )
              ) : (
                <MdModeEditOutline
                  onClick={() => setEdit(!edit)}
                  className="cursor-pointer"
                  size={25}
                />
              )}
            </div>
            
          </div>

          <div className="w-full  flex  flex-col gap-5 lg:w-1/2 lg:gap-10 ">
          <div className="absolute flex justify-end relative">
          <button
              onClick={() => setShowAddModal(true)}
              className=" bg-green-600 hidden mb-3 group-hover:block absolute  rounded-md px-3 py-2 w-max mx-auto text-white"
            >
              <FiPlus />
            </button>
            </div>
            <div className="lg:h-[30rem] lg:overflow-y-auto">
            {benefitData?.benefitcard?.map((card, i) => (
              <WhyChooseUsCard card={card} id={id} key={i} editId={editId}
              setEditId={setEditId}
              fetchBenefits={fetchBenefits} />
            ))}
            </div>
          </div>
        </div>
      </section>
      {showAddModal && (
        <AddBenefitModal
          id={id}
          onClose={() => setShowAddModal(false)}
          fetchBenefits={fetchBenefits}
        />
      )}
    </div>
  );
};

export default Partner;













// import React, { useEffect, useState } from "react";
// import WhyChooseUsCard from "@/component/cards/WhyChooseUsCard";
// import { WhyChooseUsData } from "@/component/assets/business";
// import { MdModeEditOutline } from "react-icons/md";
// import { API_URL } from "@/api/commonApi";
// import LoadingButton from "@/component/buttons/LoadingButton";

// const Partner = ({id}) => {
//   const [edit, setEdit] = useState(false);

//   const [editTitle, setEditTitle] = useState(WhyChooseUsData.title);
//   const [editDes, setEditDes] = useState(WhyChooseUsData.des);
//   const [benefitData , setBenefitData] = useState(null)
//   const [editMainHeading , setEditMainHeading] = useState('')
//   const [editDescription , setEditDescription] = useState('')
//   const [updateLoading, setUpdateLoading] = useState(false);


//   const fetchBenefits = async () => {
//     const response = await fetch(`${API_URL}auth/v1/business/benefit-card/${id}`);
//     const data = await response.json();
//     console.log(data)
//     setBenefitData(data.data);
//     setEditMainHeading(data.data.mainHeading);
//     setEditDescription(data.data.description);
//   };

//   useEffect(() => {
//     if(id){
//       fetchBenefits();
//     }
    
//   }, [id]);


// const handleEdit = async () => {
//   setUpdateLoading(true);
//   const dataSend = {
//     mainHeading: editMainHeading,
//     description: editDescription,
//     slugName: id
//   }

//   try {
//     const response = await fetch(
//       `${API_URL}auth/v1/business/benefit-card`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataSend),
//       }
//     );
//     const data = await response.json();
    
//     fetchBenefits();
//     setEdit(!edit);
//     setUpdateLoading(false);
//   } catch (error) {
//     console.log(error)
//   }

// }


//   return (
//     <div>
//       <section>
//         <div className="px-6 group py-10 flex flex-col gap-8 lg:px-20 lg:py-20 lg:flex-row lg:gap-10 xl:gap-20">
//           <div className="flex flex-col gap-5 lg:w-1/2">
//             {edit ? (
//               <>
//                 <input
//                   type="text"
//                   value={editMainHeading}
//                   onChange={(e) => setEditMainHeading(e.target.value)}
//                   className="w-full text-2xl font-[600] text-black border-[1px] border-gray-600  text-center lg:text-start"
//                 />

//                 <textarea
//                   value={editDescription}
//                   onChange={(e) => setEditDescription(e.target.value)}
//                   rows={5}
//                   className="w-full text-[18px] font-[400] text-black border-[1px] border-gray-600  text-center lg:text-start"
//                 />
//               </>
//             ) : (
//               <>
//                 <h2 className="text-black text-2xl lg:text-4xl 2xl:text-5xl capitalize font-[600] text-center lg:text-start">
//                   {" "}
//                   {benefitData?.mainHeading}{" "}
//                 </h2>
//                 <p className="text-center text-[18px] 2xl:text-xl font-[400] mt-2 lg:text-start">
//                   {benefitData?.description}
//                 </p>
//               </>
//             )}

//             <div className="hidden group-hover:flex justify-end mt-4 me-5">
//               {edit ? (
//                updateLoading ? <LoadingButton/>  : <div onClick={handleEdit} className="cursor-pointer border-green-800 text-lg font-normal hover:bg-green-800 hover:text-white text-green-600 border-[1px] rounded-md px-3 py-1">
//                   Save
//                 </div>
//               ) : (
//                 <MdModeEditOutline
//                   onClick={() => {
//                     setEdit(!edit)
                    
//                   }}
//                   className="cursor-pointer text-green-600"
//                   size={25}
//                 />
//               )}
//             </div>
//             <button  className="bg-green-600 rounded-md px-3 py-2 w-max mx-auto text-white">Add </button>
//           </div>
          
//           <div className="w-full flex flex-col gap-5 lg:w-1/2 lg:gap-10 lg:h-[30rem] lg:overflow-y-auto">
//             {benefitData?.benefitcard?.map((card, i) => (
//               <WhyChooseUsCard card={card} key={i} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Partner;
