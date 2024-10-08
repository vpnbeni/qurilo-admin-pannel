import Banner from '@/component/dashboard/e-commerce-service/banner'
import ComprehensiveSolution from '@/component/dashboard/e-commerce-service/comprehensive-solution'
import EcoDiscuss from '@/component/dashboard/e-commerce-service/eco-discuss'
import ImplementationService from '@/component/dashboard/e-commerce-service/implementation-service'
import ProjectMind from '@/component/dashboard/e-commerce-service/project-mind'
import { useRouter } from 'next/router'
import React from 'react'
import { buildMindData } from '@/component/assets/development'
import BuildMind from '@/component/dashboard/development-service/build-mind'
import Faq from '@/component/common/faq';

const Ecommerce = () => {
    const router = useRouter()
  const { id } = router.query
  const pageName='ecommerce'
  return (
    <div>
      <Banner id={id} />
      <ImplementationService id={id} />
      <EcoDiscuss id={id} />
      <ComprehensiveSolution id={id} />
      <BuildMind data={buildMindData} page={pageName} id={id} />
      <Faq pageName={pageName} id={id} />

      {/* <ProjectMind id={id} /> */}
    </div>
  )
}

export default Ecommerce