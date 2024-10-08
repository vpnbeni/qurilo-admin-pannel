import Banner from "@/component/dashboard/it-service/banner";
import CloudExpertise from "@/component/dashboard/it-service/cloudExpertise";
import { buildMindData } from '@/component/assets/development'
import BuildMind from '@/component/dashboard/development-service/build-mind'


import CloudService from "@/component/dashboard/it-service/cloudService";
import CloudWork from "@/component/dashboard/it-service/cloudWork";
import Faq from "../../component/common/faq";
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

const Page = () => {
  const router = useRouter();
  var { id } = router.query;
  console.log(id)
  const pageName='it'
  return (
    <>

    
    {/* it solution page */}
      <Banner id={id} />
      <CloudService  id={id} />
      <CloudExpertise midBannerData={midBannerData1} type="img" id={id} />
      <CloudWork data={cloudTechnologeisData} id={id} />
      <BuildMind data={buildMindData} page="it" id={id} />

      {/* <UnlockGrowth midBannerData={midBannerData1} type="noImg" id={id} /> */}
      {/* <Faq pageName={pageName} id={id} /> */}
      <Review Testimaonials={Testimaonials} id={id} />
    </>
  );
};

export default Page;
