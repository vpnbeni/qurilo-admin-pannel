import Image from "next/image";



const HeroSection = ({ scrollToRef }) => {
  const handleScroll = () => {
    
    // scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    const developmentSection = document.getElementById('development');
    developmentSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={"/it_video.mp4"}
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div data-aos="zoom-in-down" className="text-center text-white p-6">
          <h1 className="text-[26px] lg:text-3xl xl:text-6xl 2xl:text-6xl w-[90%] lg:w-[60%] leading-loose mx-auto font-semibold mb-8">
            Your Vision Our Expertise: A Partnership For Success
          </h1>
          <p className="text-lg lg:texxt-xl xl:text-2xl mb-6">
            Beyond Service we Deliver Strategic Technology
          </p>
          <div className="flex justify-center">
            <ViewButton text="View Services" onClick={handleScroll} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

const ViewButton=({text,inverse,type,onClick})=>{
  return(
    <button 
    onClick={onClick}
    className={`relative flex items-center group overflow-hidden bg-white group-hover:border-0 rounded-full cursor-pointer h-14 px-8 pr-16 justify-around gap-2 ${inverse&&"border-2 border-primary-500"}
    ${type === "navbar" && "h-[2.7rem] px-[18px] pr-[3.5rem] rounded-[10000px]"}
    `}
    style={{ width: "max-content" }}
  >
    <span className={`relative z-10 text-base md:text-lg text-black font-medium group-hover:text-white
      ${type === "navbar" && "!text-base"}
      `}>{text}</span>
    <div className={`absolute right-1 z-10 flex items-center justify-center w-[50px] h-[50px] bg-primary-500 rounded-full
     ${type === "navbar" && "w-[35px] h-[35px]"}
    `}>
      <Image width={20} height={20} src={"/assets/common/icons/arrowIcon.png"} alt="Arrow Icon" className={`w-fit h-5 ${type === "navbar" && "h-4"} `} />
    </div>
    <div
      className="absolute top-0 left-0 w-full h-full bg-primary-500 transition-transform duration-300 transform scale-x-0 origin-right group-hover:scale-x-100"
    ></div>
  </button>
  )
}










