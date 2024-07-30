import Banner from '@/component/dashboard/industries/banner'
import DigitalSolution from '@/component/dashboard/industries/digital-solution'
import Healthcare from '@/component/dashboard/industries/healthcare'
import IndustriesDiscuss from '@/component/dashboard/industries/industries-discuss'
import ProjectMind from '@/component/dashboard/industries/project-mind'
import { useRouter } from 'next/router'
import React from 'react'

const Industries = () => {
    const router = useRouter()
  const { id } = router.query
  return (
    <div>
        <Banner id={id} />
        <Healthcare id={id} />
        <IndustriesDiscuss id={id} />
        <DigitalSolution id={id} />
        <ProjectMind id={id} />

    </div>
  )
}

export default Industries
