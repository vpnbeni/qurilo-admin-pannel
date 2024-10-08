import ContactButton from "@/component/buttons/ContactButton";
import React, { useEffect, useState } from "react";
import contactImage from "../../../../public/businessImages/midBanner.png";
import animateImg1 from "../../../../public/businessImages/0000001.png";
import animateImg2 from "../../../../public/businessImages/0000002.png";
import animateImg3 from "../../../../public/businessImages/0000003.png";
import { MdModeEditOutline } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import Image from "next/image";
import LoadingButton from "@/component/buttons/LoadingButton";

const IndustriesDiscuss = ({ midBannerData, type, id }) => {
  const [editHeading, setEditHeading] = useState("");
  const [editDes, setEditDes] = useState("");
  const [edit, setEdit] = useState(false);
  const [cloudExpertise, setCloudExpertise] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  var slugName = id;

  const fetchCloudExpertise = async () => {
    try {
      setUpdateLoading(false);
      const response = await fetch(
        `${API_URL}auth/v1/it/project-discuss/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Cloud Expertise");
      }
      const data = await response.json();
      setCloudExpertise(data?.data?.project);
      setLoading(false);
      setEditHeading(data?.data?.project?.cardTitle);
      setEditDes(data?.data?.project?.cardDescription);
      // console.log(data)
    } catch (error) {
      console.error("Error fetching Cloud Expertise:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCloudExpertise();
    }
  }, [id]);

  const handleEditData = async (id) => {
    setUpdateLoading(true);
    // console.log(id)
    const formData = new FormData();
    formData.append("cardTitle", editHeading);
    formData.append("cardDescription", editDes);
    formData.append("slugName", slugName);
    formData.append("image", editImage);
    try {
      const response = await fetch(
        `${API_URL}auth/v1/it/project-discuss/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log('Updated project banner:', data);
      setEdit(false);

      fetchCloudExpertise();
    } catch (error) {
      console.error("Error updating project banner:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="py-20 relative  group px-6 bg-gradient-to-r from-black to-gray-800">
          <div className="w-full  text-white grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">
            <div className="flex items-center gap-5 flex-col lg:items-start lg:px-20">
              {edit ? (
                <input
                  type="text"
                  value={editHeading}
                  onChange={(e) => setEditHeading(e.target.value)}
                  className="w-full text-2xl md:text-4xl font-[600] text-black text-center lg:text-start"
                />
              ) : (
                <h1 className="text-4xl text-center lg:text-start">
                  {editHeading}
                </h1>
              )}
              {edit ? (
                <textarea
                rows={2}
                  value={editDes}
                  onChange={(e) => setEditDes(e.target.value)}
                  className="w-full text-lg font-[400] text-black text-center lg:text-start"
                />
              ) : (
                <p className="text-lg text-gray-300 text-center lg:text-start">
                  {editDes}
                </p>
              )}
              {edit && (
                <input
                  type="file"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              )}

              <ContactButton text={midBannerData.button} />
            </div>
            {type === "img" ? (
              <div className="flex  items-center justify-center">
                <img
                  src={cloudExpertise?.image}
                
                  alt="contactImage"
                  className="w-1/2 mx-auto"
                />
              </div>
            ) : (
              <div className="flex items-center flex-wrap md:flex-nowrap gap-x-2 justify-center ">
                <div className="relative">
                  {" "}
                  <img className="animate-spin-slow " {...animateImg1} />{" "}
                  <div className="absolute left-[1.5rem] top-[3rem]">
                    <p className="text-center">2500+</p>{" "}
                    <p className="text-center w-[99%] font-medium text-gray-200 text-sm">
                      satisfied customers
                    </p>
                  </div>{" "}
                </div>
                <div className="relative">
                  {" "}
                  <img className="animate-spin-slow " {...animateImg2} />{" "}
                  <div className="absolute left-[1.5rem] top-[3rem]">
                    <p className="text-center">2500+</p>{" "}
                    <p className="text-center w-[99%] font-medium text-gray-200 text-sm">
                      satisfied customers
                    </p>
                  </div>{" "}
                </div>
                <div className="relative">
                  {" "}
                  <img className="animate-spin-slow " {...animateImg3} />{" "}
                  <div className="absolute left-[1.5rem] top-[3rem]">
                    <p className="text-center">2500+</p>{" "}
                    <p className="text-center w-[99%] font-medium text-gray-200 text-sm">
                      satisfied customers
                    </p>
                  </div>{" "}
                </div>
              </div>
            )}
          </div>
          <div className="hidden absolute right-0 group-hover:flex justify-end mt-4 me-5">
            {edit ? (
              updateLoading ? (
                <LoadingButton />
              ) : (
                <button
                  onClick={() => handleEditData(cloudExpertise?._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
                >
                  Save
                </button>
              )
            ) : (
              <MdModeEditOutline
                onClick={() => setEdit(!edit)}
                className="cursor-pointer text-white"
                size={25}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default IndustriesDiscuss;
