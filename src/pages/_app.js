import Sidebar from "@/component/layout/sidebar";
import "@/styles/globals.css";
import { useState } from "react";
import bgImg from '@/component/assets/image/bgImg.jpg'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [isOpen,setIsOpen]=useState(false);

  return (
    
    <div className="flex justify-between w-full bg-cover  bg-center min-h-screen " style={{ backgroundImage: `url(${bgImg.src})` }}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <div className="flex justify-end"> */}
      <div className={`mt-20 ms-20  absolute right-10  ${!isOpen?"w-[90%]":"w-[80%]"}`}>    
        <Component {...pageProps} />
        </div>
      {/* </div> */}
    </div>
   
  )
}