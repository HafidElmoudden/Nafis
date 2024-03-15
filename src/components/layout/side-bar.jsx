import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays, faChartLine, faFileCircleCheck, faFileCircleQuestion, faGears, faHouse } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

const Divider = () => {
    return (
        <div className='w-full h-px bg-neutral-200'></div>
    )
}

const SideBarElement = ({ title, icon, active }) => {
    return (
        <div className={clsx('flex px-[20px] relative gap-2 w-[calc(100%-35px)] h-10 rounded-lg cursor-pointer  flex-row-reverse items-center duration-300',
            active && 'bg-blue-100 before:h-[22px] before:rounded before:bg-blue-600 before:w-[4px] before:absolute before:right-1',
            !active && 'hover:bg-blue-50')}>
            <FontAwesomeIcon className='font-semibold text-[16px] text-neutral-600' icon={icon} />
            <span className='text-[14px] font-semibold text-neutral-600 truncate'>{title}</span>
        </div>
    )
}

function SideBar() {
    return (
        <section className='flex flex-col py-4 justify-between h-[calc(100%-70px)] w-[200px] border border-y-0 fixed right-0'>
            <div className='flex flex-col items-center gap-2'>
                <SideBarElement title='الرئيسية' icon={faHouse} active />
                <SideBarElement title='الاختبارات' icon={faFileCircleQuestion} />
                <SideBarElement title='تحليل البيانات' icon={faChartLine} />
                <SideBarElement title='الخطط العلاجية' icon={faFileCircleCheck} />
                <SideBarElement title='الخطط الزمنية' icon={faCalendarDays} />
            </div>

            <div className='block'>
                <Divider />
                <div className='flex justify-center py-3'>
                    <SideBarElement title='الاعدادات' icon={faGears} />
                </div>
            </div>

        </section>
    )
}

export default SideBar