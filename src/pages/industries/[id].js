import Banner from '@/component/dashboard/industries/banner'
import DigitalSolution from '@/component/dashboard/industries/digital-solution'
import ProjectMind from '@/component/dashboard/industries/project-mind'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { faqData, Testimaonials } from '@/component/assets/business'
import HealthCare from '@/component/dashboard/industries/HealthCareIndustrie'
import BannerIndustries from '@/component/dashboard/industries/BannerIndustries'
import IndustriesDiscuss from '@/component/dashboard/industries/IndustriesDiscuss'
import ProjectMindIndustries from '@/component/dashboard/industries/ProjectMindIndustries'
import DigitalSolutionIndustries from '@/component/dashboard/industries/DigitalSolutionIndustries'
import { buildMindData } from '@/component/assets/development'
import BuildMind from '@/component/dashboard/development-service/build-mind'
import Faq from '@/component/common/faq';


const Industries = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id, "inmdusyfdshbk")
  const pageName='industrie'
  return (
    <div>

      {/* industrie page */}
      <BannerIndustries id={id} />
      <HealthCare id={id} />
      <IndustriesDiscuss id={id} />
      <DigitalSolutionIndustries id={id} />
      <BuildMind data={buildMindData} page="industrie" id={id} />
      <Faq pageName={pageName} id={id} />

      {/* <ProjectMindIndustries id={id} /> */}

    </div>
  )
}

export default Industries
