
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/api/commonApi";
import HeroSection from "@/component/main-page/HeroSection";
import BusinessSection from "@/component/main-page/BusinessSection";
import EcommerceHomeSection from "@/component/main-page/EcommerceHomeSection";
import DevelopmentSection from "@/component/main-page/DevelopmentSection";
import ItServicesSection from "@/component/main-page/ItServicesSection";

const MainPage = () => {
  const alert = (message) => toast(message);
  
  const router = useRouter();
  var { id } = router.query;
  console.log(id, "slug name");
  return (
    <>
    <ToastContainer/>

      <HeroSection id={id} alert={alert} />
      
      <DevelopmentSection  id={id} alert={alert}/>
      <BusinessSection  id={id} alert={alert}/>
      <EcommerceHomeSection  id={id} alert={alert} />
      <ItServicesSection  id={id} alert={alert} />
    </>
  );
};

export default MainPage;
