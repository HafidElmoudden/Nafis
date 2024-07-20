import { Button } from "@/components/ui/button";
import HomeIcon from "assets/icons/navbar/home-icon";
import clsx from "clsx";
import { Breadcrumb, BreadcrumbItem } from "components/breadcrumb";
import { DataTable } from "components/table/data-table";
import { useTheme } from "components/theme-context";
import React from "react";
import { cn } from "utils";
import SkillsPlaceholder from "components/table/data/skills-page/skills-data-placeholder";
import { columns } from "components/table/tables-columns/skills-page/skills-table-columns";
import { useNavigate } from "react-router-dom";

function SkillsPage() {
    const { theme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col p-8 gap-8 ">
            <header className="flex flex-col gap-[10px] w-full">
                <Breadcrumb>
                    <BreadcrumbItem title={"الرئيسية"} icon={HomeIcon} />
                    <BreadcrumbItem title={"المهارات"} />
                </Breadcrumb>

                <div className="flex flex-row-reverse w-full h-[93px] justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold text-[#101828]">
                            المهارات
                        </p>
                        <p className="text-[#475467]">
                            .يمكنك ادارة المهارات و أسئلة الاختبارات هنا
                        </p>
                    </div>
                    <Button
                        variant="default"
                        className={cn(theme.skillsPage.createSkillButtonBg, theme.skillsPage.createSkillButtonBgHover)}
                        onClick={() => navigate("/add-skill")}
                    >
                        اضافة مهارة
                    </Button>
                </div>
                <div className="bg-[#EAECF0] w-full h-px" />
            </header>
            <DataTable data={SkillsPlaceholder} columns={columns} />
        </div>
    );
}

export default SkillsPage;
