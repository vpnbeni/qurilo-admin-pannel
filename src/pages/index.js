
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { API_URL } from "@/api/commonApi";
import HeroSection from "@/component/main-page/HeroSection";
import BusinessSection from "@/component/main-page/BusinessSection";
import EcommerceHomeSection from "@/component/main-page/EcommerceHomeSection";
import DevelopmentSection from "@/component/main-page/DevelopmentSection";
import ItServicesSection from "@/component/main-page/ItServicesSection";

const MainPage = () => {
  const router = useRouter();
  var { id } = router.query;
  console.log(id, "slug name");
  return (
    <>
      <HeroSection id={id} />
      
      <DevelopmentSection  id={id} />
      <BusinessSection  id={id} />
      <EcommerceHomeSection  id={id} />
      <ItServicesSection  id={id} />
    </>
  );
};

export default MainPage;
