import React, { useEffect, useState } from "react";
import ContactButton from "@/component/buttons/ContactButton";
import { useMediaQuery } from "react-responsive";
import { MdEdit } from "react-icons/md";
import { API_URL } from "@/api/commonApi";
import LoadingButton from "@/component/buttons/LoadingButton";

const Banner = ({ id }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [edit, setEdit] = useState(false);
  const [editHeading, setEditHeading] = useState("");
  const [editDes, setEditDes] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [bannerData, setBannerData] = useState(null);
  const [successfullyEdited, setSuccessfullyEdited] = useState(false);

  const fetchBannerData = async () => {
    try {
      console.log(id,'id')
      const response = await fetch(`${API_URL}auth/v1/it/banner/${id}`);
      const data = await response.json();
      setBannerData(data.banner);
      setLoading(false);

      // console.log(data,'data from banner')
    } catch (error) {}
  };

  useEffect(() => {   
    if (id) {
      fetchBannerData();
    }
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleEditClick = () => {
    // console.log("edit clicked")
    setEdit(!edit);
  };
  useEffect(() => {
    setEditHeading(bannerData?.h1);
    setEditDes(bannerData?.description);
  }, [bannerData]);
  const handleCancelClick=()=>{
    fetchBannerData();
    setEdit(false);
    
  }
  const handleSaveClick = async (idd) => {
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("h1", editHeading);
    formData.append("description", editDes);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("slugName", bannerData?.slugName);

    try {
      const response = await fetch(`${API_URL}auth/v1/it/banner/${idd}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      const result = await response.json();
      // console.log('Update successful:', result);
      setUpdateLoading(false);
      // setLoading(true);
      fetchBannerData();
      setEdit(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <section
          className="relative group bg-cover md:h-screen  bg-center py-32 w-full"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%),url(${
              isMobile ? bannerData?.image : bannerData?.image
            })`,
          }}
        >
          <div className=" right-0 md:mt-12 text-left text-white relative z-10 ">
            <div className="flex items-center relative">
              <div className="text-left md:mx-0 mx-6">
                <div className="md:mx-20">
                  {edit ? (
                    <>
                      <input
                        className="border-2 text-black w-full mb-3 border-black p-2"
                        value={editHeading}
                        onChange={(e) => setEditHeading(e.target.value)}
                      ></input>
                      <br />
                      <textarea
                        rows={5}
                        className="w-full border-2 text-black border-black p-2"
                        value={editDes}
                        onChange={(e) => setEditDes(e.target.value)}
                      ></textarea>
                      <input
                        onChange={handleImageChange}
                        type="file"
                        className="rounded-sm my-3 py-4 px-3"
                        placeholder="Choose Background Image "
                      ></input>
                    </>
                  ) : (
                    <>
                      <h1 className="md:text-5xl font-sans xl:w-[51%] w-full leading-10 text-3xl font-bold mb-6">
                        {bannerData?.h1}
                      </h1>

                      <p className="text-xl font-sans mb-12 lg:w-1/2 w-full ">
                        {bannerData?.description}
                      </p>
                    </>
                  )}
                  <ContactButton text={"Get Free Consultation"} />
                </div>
              </div>
            </div>
          </div>
          {edit ? (
            updateLoading ? (
              <div className="flex justify-end"><LoadingButton /></div>
              
            ) : (
              <div className="flex gap-2 absolute bottom-8  right-24">
                <button
                onClick={() => handleCancelClick()}
                className="bg-red-600 rounded-xl text-white px-4 py-2 font-semibold "
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveClick(bannerData?._id)}
                className="bg-green-600 rounded-xl text-white px-4 py-2 font-semibold "
              >
                Save
              </button>
              </div>
            )
          ) : (
            <MdEdit
              onClick={() => handleEditClick()}
              size={27}
              className="hidden z-50 group-hover:block absolute bottom-8 right-24 text-white cursor-pointer"
            />
          )}
        </section>
      )}
    </>
  );
};

export default Banner;
