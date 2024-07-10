import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "assets/icons/navbar/home-icon";
import React, { useEffect, useRef, useState } from "react";
import CalendarIcon from "assets/icons/navbar/calendar-icon";
import LifeBuoyIcon from "assets/icons/navbar/life-buoy-icon";
import PieChartIcon from "assets/icons/navbar/pie-chart-icon";
import FileIcon from "assets/icons/navbar/file-icon";
import UsersIcon from "assets/icons/navbar/users-icon";
import { motion, AnimatePresence } from "framer-motion";
import CornerDownIcon from "assets/icons/navbar/corner-down-icon";
import SettingsIcon from "assets/icons/navbar/settings-icon";
import Logo from "assets/logo.svg";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AvatarImage from "assets/default_avatar.png";
import useUser from "hooks/useUser";
import LogoutIcon from "assets/icons/navbar/logout-icon";
import {
    Tooltip as STooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "api/SupabaseClient";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useSchool } from "hooks/useSchool";
import Autoplay from 'embla-carousel-autoplay'
import useAlertDialog from "hooks/useAlertDialog";

ChartJS.register(ArcElement, Tooltip, Legend);

const getPathName = (path) => {
    switch (path) {
        case "/home":
            return "لوحة القيادة";
        case "/tests":
            return "الاختبارات";
        case "/analytics":
            return "تحليل البيانات";
        case "/treatmentplans":
            return "الخطط العلاجية";
        case "/timeplans":  
            return "الخطط الزمنية";
        case "/students":
            return "الطلاب";    
        case "/settings":
            return "الاعدادات";
        case "/individuals":
            return "الأفراد";
        default:
            return "الرئيسية";
    }
};

const Divider = (backgroundColor = "bg-neutral-200") => {
    return <div className={clsx("w-full h-px", backgroundColor)}></div>;
};

const NafisRankingCards = ({ title, value, isChart, totalSchools, idx }) => {
    const data = {
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: ["#F4EBFF", "#53B1FD"],
                circumference: 360,
                rotation: 270,
                borderWidth: 0,
                borderRadius: {
                    outerStart: 10,
                    outerEnd: 10,
                    innerStart: 10,
                    innerEnd: 10,
                },
            },
        ],
    };

    const options = {
        cutout: "80%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };
    return (
        <div className="relative flex flex-col items-end gap-2 w-[248px]  rounded-lg bg-blue-500 px-4 py-5">
            <div className="flex flex-row gap-4 items-center">
                <div className="relative w-[52px] h-[52px] ">
                    {isChart
                        ? (<Doughnut data={data} options={options} />)
                        : (<div className="flex items-center justify-center w-[52px] h-[52px] font-inter rounded-full">
                            <p className="font-inter font-medium text-white text-base">{value}<span className="text-xl font-inter font-bold">/{totalSchools}</span></p>
                        </div>)}
                    {isChart && <div className="absolute text-center text-[14px] text-white font-inter font-medium top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                        {`${value}%`}
                    </div>}
                </div>

                <div className="flex flex-col">
                    <p className="text-white text-sm font-bold text-right">{title}</p>
                </div>
            </div>

            <div className="flex w-full justify-end gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={clsx("w-[6px] h-[6px] rounded-full", idx === index ? "bg-blue-50" : "bg-blue-300")}></div>
                ))}
            </div>
        </div>
    );
};

const GradeCarousel = () => {
    const { school, loading, error } = useSchool();
    console.log("school", school)
    const percentage = school?.previous_nafis_grade ?? 0;

    const cardData = [
        { title: "درجة نافس للسنة السابقة", value: percentage, isChart: true },
        { title: "ترتيب المؤسسة على مستوى مكتب التعلم", value: 4, isChart: false },
        { title: "ترتيب  المؤسسة على مستوى الادارة التعليمية", value: 50, isChart: false },
        { title: "ترتيب  المؤسسة على مستوى المملكة", value: 105, isChart: false },
    ];

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 4000
                }),
            ]}
            dir="rtl"
            opts={{
                loop: true,
                direction: 'rtl',
            }}
            className="w-full max-w-xs"
        >
            <CarouselContent>
                {cardData.map((data, index) => (
                    <CarouselItem key={index}>
                        <NafisRankingCards idx={index} title={data.title} value={data.value} isChart={data.isChart} totalSchools={140} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

const SideBarElement = ({
    title,
    icon: IconComponent,
    onClick,
    children,
    badgeCount,
    isDot,
}) => {
    const location = useLocation();
    const currentPath = getPathName(location.pathname);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                onClick={children ? toggleDropdown : onClick}
                className={clsx(
                    "relative flex flex-row-reverse gap-2 w-[248px] h-10 px-[12px] py-[8px] rounded-md cursor-pointer items-center duration-300",
                    currentPath === title && "bg-blue-500",
                    currentPath !== title && "hover:bg-blue-400"
                )}
            >
                <div className="flex flex-row-reverse items-center w-[182px] h-[24px] gap-3">
                    {isDot && <div className="bg-blue-300 w-2 h-2 rounded-full"></div>}
                    <IconComponent className="font-normal text-[24px] text-white" />
                    <span className="text-[16px] font-normal text-white truncate">
                        {title}
                    </span>
                </div>

                {/* The badge */}
                {badgeCount ? (
                    <div className="flex items-center justify-center bg-blue-50 w-[30px] h-[22px] rounded-2xl py-[2px] px-[8px]">
                        <span className="font-inter font-medium text-xs text-center text-blue-500">
                            {badgeCount}
                        </span>
                    </div>
                ) : (
                    <div className="w-[30px] h-[22px] py-[2px] px-[8px]"></div>
                )}

                {children && (
                    <div className="flex items-center justify-center w-5 h-5">
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FontAwesomeIcon
                                className="font-semibold text-[16px] text-blue-300"
                                icon={faChevronDown}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
            <AnimatePresence>
                {isOpen && children && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-2 last:pb-2 overflow-hidden"
                    >
                        <motion.div className="px-2 flex flex-col items-center justify-center gap-2">
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SideBarDropdownElement = ({ title, icon: IconComponent, onClick }) => {
    const location = useLocation();
    const currentPath = getPathName(location.pathname);
    return (
    <div
        className={clsx("flex flex-row-reverse gap-3 w-[206px] h-[40px] text-white text-sm py-2 px-4 hover:bg-blue-400 rounded-md cursor-pointer", currentPath === title && "bg-blue-500")}
        onClick={onClick}
    >
        {IconComponent ? (
            <IconComponent className="font-normal text-[24px] text-white" />
        ) : (
            <CornerDownIcon className="font-normal text-[24px] text-white" />
        )}
        <p className="text-[16px] font-normal text-white truncate">{title}</p>
    </div>
)};


const AccountCard = () => {
    const user = useUser();
    const navigate = useNavigate();
    const { openDialog, closeDialog, AlertDialogComponent } = useAlertDialog();
    console.log("user", user);
    const handleConfirm = () => {
        supabase.auth.signOut();
        navigate("/");
        closeDialog();
    };
    return (
        <div className="flex gap-3 items-center justify-center">
            <STooltip delayDuration={300}>
                <TooltipTrigger>
                    <div onClick={openDialog}>
                        <LogoutIcon className="rotate-180" />
                    </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={10} className="">
                    تسجيل الخروج
                </TooltipContent>
            </STooltip>
            <div className="flex flex-col">
                <p className="font-semibold text-sm text-white">
                    {user?.user_metadata?.full_name}
                </p>
                <p className="font-inter text-[10px] text-blue-200">
                    {user?.user_metadata?.email}
                </p>
            </div>
            <img
                src={AvatarImage}
                alt="user"
                className="w-[40px] h-[40px] rounded-full"
            />
            <AlertDialogComponent
                title="هل انت متأكد من تسجيل الخروج؟"
                onConfirm={handleConfirm}
            />
        </div>
    );
};

function SideBar() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col bg-blue-600 justify-between h-full w-[280px] fixed right-0 overflow-hidden">
            <nav className="flex flex-col gap-4 pt-[24px] ">
                <header className="flex items-center justify-end w-[280px] h-[24px] px-6">
                    <img src={Logo} alt="logo" className="w-[70px] h-[100px]" />
                </header>
                <div className="px-6">
                    <p className="text-blue-300 text-lg">القائمة الرئيسية</p>
                </div>
                <div className="flex flex-col px-4 gap-1">
                    <SideBarElement
                        title="لوحة القيادة"
                        icon={HomeIcon}
                        onClick={() => navigate("/home")}
                    />
                    <SideBarElement
                        title="الاختبارات"
                        icon={FileIcon}
                        onClick={() => navigate("/tests")}
                    />
                    <SideBarElement
                        title="تحليل البيانات"
                        icon={PieChartIcon}
                        onClick={() => navigate("/analytics")}
                    />
                    <SideBarElement
                        title="الخطط العلاجية"
                        icon={LifeBuoyIcon}
                        onClick={() => navigate("/treatmentplans")}
                    />
                    <SideBarElement
                        title="الخطط الزمنية"
                        icon={CalendarIcon}
                        onClick={() => navigate("/timeplans")}
                    />
                    <SideBarElement
                        title="الأفراد"
                        icon={UsersIcon}
                        onClick={() => navigate("/timeplans")}
                    >
                        <SideBarDropdownElement
                            title="المعلمون"
                            onClick={() => navigate("/timeplans")}
                        />
                        <SideBarDropdownElement
                            title="الطلاب"
                            onClick={() => navigate("/students")}
                        />
                    </SideBarElement>
                </div>
            </nav>

            <footer className="flex flex-col gap-6 px-4 pb-8">
                <SideBarElement
                    title="الاعدادات"
                    icon={SettingsIcon}
                    onClick={() => navigate("/settings")}
                />
                <GradeCarousel />
                <div className="bg-[#2E90FA] h-px w-full"></div>
                <AccountCard />
            </footer>
        </section>
    );
}

export default SideBar;
