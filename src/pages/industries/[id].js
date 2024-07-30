import Banner from '@/component/dashboard/industries/banner'
import DigitalSolution from '@/component/dashboard/industries/digital-solution'
import Healthcare from '@/component/dashboard/industries/healthcare'
import ProjectMind from '@/component/dashboard/industries/project-mind'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { faqData, Testimaonials } from '@/component/assets/business'
import HealthCare from '@/component/dashboard/business-service/HealthCare'
import BannerIndustries from '@/component/dashboard/business-service/BannerIndustries'
import IndustriesDiscuss from '@/component/dashboard/business-service/IndustriesDiscuss'
import ProjectMindIndustries from '@/component/dashboard/business-service/ProjectMindIndustries'
import DigitalSolutionIndustries from '@/component/dashboard/business-service/DigitalSolutionIndustries'


const Industries = () => {
    const router = useRouter()
  const { id } = router.query
  return (
    <div>
        
{/* industrie page */}
<BannerIndustries id={id} />
<HealthCare id={id} />
<IndustriesDiscuss id={id} />
<ProjectMindIndustries id={id} />
<DigitalSolutionIndustries id={id} />

    </div>
  )
}

export default Industries
