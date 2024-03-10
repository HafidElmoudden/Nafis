import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBarElement = ({ title, icon }) => {
    return (
        <div className='flex items-center justify-center w-full h-16'>
        {/* <div className='w-6 h-6'> */}
            <FontAwesomeIcon icon={icon} />
        {/* </div> */}
        <span className='text-[12px] font-semibold text-neutral-600'>{title}</span>
        </div>
    )
}

function SideBar() {
  return (
    <section className='min-h-screen w-[200px] border shadow-sm fixed right-0'>
        <SideBarElement title='الرئيسية' icon='house' />
    </section>
  )
}

export default SideBar