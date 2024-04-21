import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faChartLine, faFileCircleCheck, faFileCircleQuestion, faGears, faHouse } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

const getPathName = (path) => {
    switch (path) {
        case '/home':
            return 'الرئيسية'
        case '/tests':
            return 'الاختبارات'
        case '/analytics':
            return 'تحليل البيانات'
        case '/treatmentplans':
            return 'الخطط العلاجية'
        case '/timeplans':
            return 'الخطط الزمنية'
        case '/settings':
            return 'الاعدادات'
        default:
            return 'الرئيسية'
    }
}

const Divider = () => {
    return (
        <div className='w-full h-px bg-neutral-200'></div>
    )
}

const SideBarElement = ({ title, icon, active, onClick }) => {
    const location = useLocation();
    const currentPath = getPathName(location.pathname);
    return (
        <div onClick={onClick} className={clsx('flex px-[20px] relative gap-2 w-[calc(100%-35px)] h-10 rounded-lg cursor-pointer  flex-row-reverse items-center duration-300',
            currentPath === title && 'bg-blue-100 before:h-[22px] before:rounded before:bg-blue-600 before:w-[4px] before:absolute before:right-1',
            currentPath !== title && 'hover:bg-blue-50')}>
            <FontAwesomeIcon className='font-semibold text-[16px] text-neutral-600' icon={icon} />
            <span className='text-[14px] font-semibold text-neutral-600 truncate'>{title}</span>
        </div>
    )
}

function SideBar() {
    const navigate = useNavigate();
    return (
        <section className='flex flex-col py-4 justify-between  h-[calc(100%-70px)] w-[200px] border border-y-0 fixed top-16 right-0'>
            <div className='flex flex-col items-center gap-2'>
                <SideBarElement onClick={() => navigate("/home")} title='الرئيسية' icon={faHouse} />
                <SideBarElement onClick={() => navigate("/tests")} title='الاختبارات' icon={faFileCircleQuestion} />
                <SideBarElement onClick={() => navigate("/analytics")} title='تحليل البيانات' icon={faChartLine} />
                <SideBarElement onClick={() => navigate("/treatmentplans")} title='الخطط العلاجية' icon={faFileCircleCheck} />
                <SideBarElement onClick={() => navigate("/timeplans")} title='الخطط الزمنية' icon={faCalendarDays} />
            </div>

            <div className='block'>
                <Divider />
                <div className='flex justify-center py-3'>
                    <SideBarElement onClick={() => navigate("/settings")} title='الاعدادات' icon={faGears} />
                </div>
            </div>

        </section>
    )
}

export default SideBar