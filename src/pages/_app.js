import Sidebar from "@/component/layout/sidebar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isOpen,setIsOpen]=useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <div className="flex justify-end"> */}
      <div className={`mt-20 ms-20  ${!isOpen?"w-[90%]":"w-[80%]"}`}>    
        <Component {...pageProps} />
        </div>
      {/* </div> */}
    </div>
  )
}