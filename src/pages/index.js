import Banner from "@/component/dashboard/it-service/banner";
import CloudExpertise from "@/component/dashboard/it-service/cloudExpertise";
import { buildMindData } from '@/component/assets/development'
import BuildMind from '@/component/dashboard/development-service/build-mind'


import CloudService from "@/component/dashboard/it-service/cloudService";
import CloudWork from "@/component/dashboard/it-service/cloudWork";
// import Faq from "../../component/common/faq";
import Testemonial from "@/component/dashboard/it-service/testemonial";
import UnlockGrowth from "@/component/dashboard/it-service/unlockGrowth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  heroSectionData,
  cloudServicesData,
  cloudTechnologeisData,
  faqData,
  midBannerData1,
} from "@/component/assets/itServices";
import Review from "@/component/common/review";
import { Testimaonials } from "@/component/assets/business";
import { API_URL } from "@/api/commonApi";
import HeroSection from "@/component/main-page/HeroSection";
import BusinessSection from "@/component/main-page/BusinessSection";
import DevelopmentSection from "@/component/main-page/DevelopmentSection";

const MainPage = () => {
  const router = useRouter();
  var { id } = router.query;
  console.log(id, "slug name");
  return (
    <>

    
    {/* it solution page */}
      <HeroSection id={id} />
      {/* <BusinessSection  id={id} /> */}
      {/* <DevelopmentSection  id={id} /> */}
      {/* <CloudWork  id={id} /> */}
      {/* <BuildMind  id={id} /> */}

    </>
  );
};

export default MainPage;
