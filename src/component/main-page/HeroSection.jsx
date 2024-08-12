import { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/api/commonApi";
import arrowIcon from "../../../public/assets/it-services/home-page/arrowIcon.png";
import { MdEdit } from "react-icons/md";

const HeroSection = ({ scrollToRef }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [h1, setH1] = useState(null);
  const [description, setDescription] = useState(null);
  const [video, setVideo] = useState(null); // State for video

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}auth/v1/home-page/qurilo/banner`);
      const result = await res.json();
      if (result.data && result.data.length > 0) {
        setData(result.data[0]);
        setH1(result.data[0].h1);
        setDescription(result.data[0].description);
        setVideo(result.data[0].video); // Set video state
      } else {
        throw new Error(result.message || "No data available");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("h1", h1);
    formData.append("description", description);
    formData.append("video", video); // Append video to FormData
    try {
      const res = await fetch(`${API_URL}auth/v1/home-page/qurilo/banner/${data._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to update banner');
      }
      fetchData();
      setEdit(!edit);
    } catch (error) {
      setError(error.message);
      setEdit(!edit);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    const developmentSection = document.getElementById("development");
    developmentSection.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative group w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video} // Use video state
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div data-aos="zoom-in-down" className="text-center text-white p-6">
          {edit ? (
            <div className="flex flex-col gap-2 w-[50vw]">
              <textarea
                type="text"
                className="p-2 m-2 w-full text-black"
                name="h1"
                id="h1"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
              />
              <textarea
                type="text"
                className="p-2 m-2 w-full text-black"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="p-2 m-2 w-full text-black"
                name="video"
                id="video"
                value={video} // Bind video state
                onChange={(e) => setVideo(e.target.value)}
                placeholder="Enter video URL"
              />
              <div className="text-white mx-2 flex gap-2">
                <div
                  className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  {" "}
                  Cancel
                </div>
                <div
                  className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  {" "}
                  Save
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <h1 className="text-[26px] lg:text-3xl xl:text-6xl 2xl:text-6xl w-[90%] lg:w-[60%] leading-loose mx-auto font-semibold mb-8">
                {h1}
              </h1>
              <p className="text-lg lg:text-xl xl:text-2xl mb-6">
                {description}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <ViewButton text="View Services" onClick={handleScroll} />
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-5 right-5 text-white group-hover:block hidden cursor-pointer `}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <MdEdit className={`${edit ? "hidden" : ""}`} size={26} />
      </div>
    </div>
  );
};

export default HeroSection;

const ViewButton = ({ text, inverse, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center group overflow-hidden bg-white group-hover:border-0 rounded-full cursor-pointer h-14 px-8 pr-16 justify-around gap-2 ${
        inverse && "border-2 border-[#558BDC]"
      } ${
        type === "navbar" &&
        "h-[2.7rem] px-[18px] pr-[3.5rem] rounded-[10000px]"
      }`}
      style={{ width: "max-content" }}
    >
      <span
        className={`relative z-10 text-base md:text-lg text-black font-medium group-hover:text-white ${
          type === "navbar" && "!text-base"
        }`}
      >
        {text}
      </span>
      <div
        className={`absolute right-1 z-10 flex items-center justify-center w-[50px] h-[50px] bg-[#558BDC] rounded-full ${
          type === "navbar" && "w-[35px] h-[35px]"
        }`}
      >
        <Image
          width={20}
          height={20}
          src={arrowIcon}
          alt="Arrow Icon"
          className={`w-fit h-5 ${type === "navbar" && "h-4"}`}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#558BDC] transition-transform duration-300 transform scale-x-0 origin-right group-hover:scale-x-100"></div>
    </button>
  );
};
