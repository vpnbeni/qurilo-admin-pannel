import DevelopmentBanner from '@/component/dashboard/development-service/banner'
import BuildMind from '@/component/dashboard/development-service/build-mind'
import Developmentdiscuss from '@/component/dashboard/development-service/development-discuss'
import Developmentprocess from '@/component/dashboard/development-service/development-process'
import DomainExpertise from '@/component/dashboard/development-service/domain-expertise'
import DevelopmentServiceCard from '@/component/dashboard/development-service/service-card'
import Technologycard from '@/component/dashboard/development-service/technology-card'
import { useRouter } from 'next/router'
import React from 'react'
import { buildMindData } from '@/component/assets/development'
import { developmentProcessData , technologiesData , domainExpertiseData } from '@/component/assets/development'

import Faq from '@/component/common/faq';
import Review from '@/component/common/review'
import { faqData, Testimaonials } from '@/component/assets/business'


const DevelopmentPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
        <DevelopmentBanner  id={id} />
        <DevelopmentServiceCard id={id} />
        {/* <BuildMind data={buildMindData} type="noImg" id={id} /> */}
         <Developmentprocess data= {developmentProcessData} id={id} />
        <Technologycard data={technologiesData} id={id} />
        
        <Developmentdiscuss data={buildMindData} type="img" id={id} />
        <DomainExpertise data={domainExpertiseData} id={id} /> 
        {/* <Faq faqData={faqData} id={id} /> */}
      {/* <Review Testimaonials={Testimaonials} id={id} /> */}

     
    </div>
  )
}

export default DevelopmentPage