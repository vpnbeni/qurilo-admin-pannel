import Image from "next/image";
import Link from "next/link";

const ItServicesCard = ({ title, image, link }) => {
  return (
    <Link href={link} className="relative lg:w-[21%] md:w-[40%] w-[90%] h-[22rem] rounded-md overflow-hidden cursor-pointer transition-transform duration-500 ease-linear hover:-translate-y-3 group">
      <Image fill={true} src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-linear" />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80"></div>
      <h2 className="text-2xl font-semibold text-white mt-9 px-6 absolute z-10">{title}</h2>
      <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-black before:opacity-0 before:transition-opacity before:duration-100 before:ease-linear group-hover:before:opacity-90"></div>
    </Link>
  );
};

export default ItServicesCard;
