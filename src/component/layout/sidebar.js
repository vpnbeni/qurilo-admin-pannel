// components/Sidebar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdHomeRepairService, MdClose, MdOutlineContactPage } from 'react-icons/md';
import Image from 'next/image';
import { CiMenuBurger } from "react-icons/ci";
import { SiCreativecommons } from "react-icons/si";
import { RiCustomerService2Fill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import { CiHome } from "react-icons/ci";
import { useRouter } from "next/router";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMainPageOpen, setIsMainPageOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const pagePush = useRouter();

  const pathname = usePathname();
  const toggleProjectsDropdown = () => {
    setIsOpen(true);
    setIsProjectsOpen(!isProjectsOpen);
    if (isMainPageOpen) {
      setIsMainPageOpen(false);
    }
  };
  const toggleMainPageDropdown = () => {
    setIsOpen(true);
    setIsMainPageOpen(!isMainPageOpen);
    if (isProjectsOpen) {
      setIsProjectsOpen(false);
    }
  };
  const handleCloseSidebar = () => {
    setIsOpen(!isOpen); 
  };
  return (
    <div className={`z-50 bg-[#521950] rounded-r-[15px] h-screen p-5 text-white flex flex-col fixed top-0 left-0 transition-width duration-300 ease-in-out ${isOpen ? "w-[16%]" : "w-[4%] pt-10"}`}>
      <div className={`mb-8`}>
        {isClient && (
          isOpen ? (
            <Image src='/qurilo.png' width={100} height={100} alt="Logo" className="ml-5 cursor-pointer" onClick={() => pagePush.push(`/`)} />
          ) : (
            <Image src='/qurilo.png' width={120} height={120} alt="Logo" className="cursor-pointer" onClick={() => pagePush.push(`/`)} />
          )
        )}
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="text-lg flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1 ">
            <LuLayoutDashboard />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-lg flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1  ">
          <CiHome />
            {isOpen && <span>Home Page</span>}
          </Link>
        </li>
        <li>
          <Link href="/customers" className="text-lg flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1 ">
            <RiCustomerService2Fill />
            {isOpen && <span>Customers</span>}
          </Link>
        </li>
        <li>
          <button onClick={toggleProjectsDropdown} className={`text-lg w-full text-left flex items-center  hover:bg-[#b275f5] rounded-md  gap-2`}>
            <span className="flex items-center  hover:bg-[#b275f5] rounded-md p-1 gap-2">
              <MdHomeRepairService />
              {isOpen && <span>Services</span>}
            </span>
            {isProjectsOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          <ul className={`ml-4 mt-2 space-y-2 overflow-hidden transition-max-height duration-300 ease-in-out  ${isProjectsOpen ? 'min-h-34' : 'max-h-0'}` }>
            <li>
              <Link href="/it-solutions" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md  p-1">
                {isOpen && <span>IT-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/business-solutions/" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md  p-1">
                {isOpen && <span>Business-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/development-solutions/" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md  p-1 ">
                {isOpen && <span>Development-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/industries/" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md  p-1 ">
                {isOpen && <span>Industries</span>}
              </Link>
            </li>
            <li>
              <Link href="/e-commerce-service/" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md  p-1 ">
                {isOpen && <span>E-Commerce</span>}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={toggleMainPageDropdown} className={`text-lg w-full text-left flex items-center  hover:bg-[#b275f5] rounded-md  gap-2`}>
            <span className="flex items-center  hover:bg-[#b275f5] rounded-md p-1 gap-2">
              <MdHomeRepairService />
              {isOpen && <span>Main page</span>}
            </span>
            {isMainPageOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          <ul className={`ml-4 mt-2 space-y-2 overflow-hidden transition-max-height duration-300 ease-in-out ${isMainPageOpen ? 'min-h-40' : 'max-h-0'}`}>
            <li>
              <Link href="/it-solutions/it-main" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1 ">
                {isOpen && <span>IT-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/business-solutions/business-main" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1 ">
                {isOpen && <span>Business-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/development-solutions/development-main" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1  ">
                {isOpen && <span>Development-services</span>}
              </Link>
            </li>
            <li>
              <Link href="/industries/industries-main" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1  ">
                {isOpen && <span>Industries</span>}
              </Link>
            </li>
            <li>
              <Link href="/e-commerce-service/e-commerce-main" className="text-sm flex gap-2 items-center  hover:bg-[#b275f5] rounded-md p-1  ">
                {isOpen && <span>E-Commerce</span>}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/pages" className="text-lg flex gap-2 items-center  hover:bg-[#b275f5] p-1 rounded-md  -mt-2">
            <MdOutlineContactPage />
            {isOpen && <span>Page</span>}
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-lg flex gap-2 items-center  hover:bg-[#b275f5] p-1 rounded-md ">
            <SiCreativecommons />
            {isOpen && <span>Common Page</span>}
          </Link>
        </li>
      </ul>
      <div className='absolute -right-5 text-black'>
        <button onClick={handleCloseSidebar} className="">
          {isOpen ? <MdClose /> : <CiMenuBurger />}
        </button>
      </div>
    </div>
  );
};
export default Sidebar;