import { API_URL } from '@/api/commonApi'
import Faq from '@/component/common/faq'
import Review from '@/component/common/review'
import Bannersection from '@/component/dashboard/business-service/banner'
import ManagementService from '@/component/dashboard/business-service/managementService'
import Partner from '@/component/dashboard/business-service/partner'
import Projectbanner from '@/component/dashboard/business-service/projectbanner'
import ProjectMind from '@/component/dashboard/business-service/projectMind'
import ServicesCard from '@/component/dashboard/business-service/servicesCard'
import TechnologyWeUse from '@/component/dashboard/business-service/technologyWeUse'
// import Image from 'next/image'
import { useRouter } from 'next/router'


export default function Page() {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
    <div className='border-2 p-4 mr-4'>


    <Bannersection id={id} /> 
    <ServicesCard id={id} />
    <ManagementService id={id} />
    <TechnologyWeUse id={id} />
    <Projectbanner id={id} />
    <Partner id={id} /> 
    <ProjectMind id={id} />
    {/* <Faq faqData={faqData} id={id} /> */}
    {/* <Review Testimaonials={Testimaonials} id={id} /> */}
    </div>
    </>
  )
}
