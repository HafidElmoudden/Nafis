import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AwardIcon from "assets/icons/navbar/award-icon";
import HomeIcon from "assets/icons/navbar/home-icon";
import Input from "components/Input";
import { Breadcrumb, BreadcrumbItem } from "components/breadcrumb";
import { Dropdown, DropdownItem } from "components/dropdown";
import { useTheme } from "components/theme-context";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "utils";
// @ts-ignore
import { ReactComponent as SearchIcon } from "assets/icons/search-icon.svg";
import { questionsTableColumns } from "components/table/tables-columns/add-skill-page/add-skills-table-columns";
import QuestionsDataPlaceholder from "components/table/data/add-skill-page/questions-data-placeholder";
import { QuestionDataTable } from "components/table/questions-data-table";

interface Grade {
    id: number;
    name: string;
}

function AddSkillPage() {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [selectedGrades, setSelectedGrades] = useState<DropdownItem[]>([]);
    const [currentGrade, setCurrentGrade] = useState<DropdownItem | null>(null);

    const handleGradeSelect = (grade: DropdownItem) => {
        setCurrentGrade(grade);
    };

    const addGrade = () => {
        if (
            currentGrade &&
            !selectedGrades.some((grade) => grade.id === currentGrade.id)
        ) {
            setSelectedGrades([...selectedGrades, currentGrade]);
            setCurrentGrade(null);
        }
    };

    const removeGrade = (gradeId: number | string) => {
        setSelectedGrades(
            selectedGrades.filter((grade) => grade.id !== gradeId)
        );
    };
    return (
        <div className="w-full min-h-screen flex flex-col p-8 gap-8 ">
            <header className="flex flex-col gap-[10px] w-full">
                <Breadcrumb>
                    <BreadcrumbItem title={"الرئيسية"} icon={HomeIcon} />
                    <BreadcrumbItem title={"المهارات"} />
                    <BreadcrumbItem title={"اضافة مهارة"} />
                </Breadcrumb>
            </header>
            <section className="flex flex-col">
                <div className="flex flex-row-reverse w-full h-[93px] justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold text-[#101828]">
                            اضافة مهارة
                        </p>
                        <p className="text-[#475467]">
                            .يمكنك اضافة مهارات و مخزون الاسئلة الخاصة بها هنا
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button
                            variant="default"
                            className={cn(
                                theme.skillsPage.createSkillButtonBg,
                                theme.skillsPage.createSkillButtonBgHover
                            )}
                        >
                            حفظ مهارة
                        </Button>
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            الغاء
                        </Button>
                    </div>
                </div>
                <div className="bg-[#EAECF0] w-full h-px" />
                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex flex-row-reverse justify-end gap-8">
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Label>اسم المهارة</Label>
                            <Input
                                placeholder="ادخل اسم مهارة مميزة"
                                className="w-full"
                                icon={<AwardIcon color="#667085" />}
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Label>اسم المادة</Label>
                            <Dropdown
                                items={[
                                    { id: 1, name: "العلوم" },
                                    { id: 2, name: "الرياضيات" },
                                    { id: 3, name: "القراءة" },
                                ]}
                                onSelect={function (item: any): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row-reverse justify-end gap-8">
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Label>الصف</Label>
                            <div className="flex flex-row-reverse gap-2">
                                <Dropdown
                                    items={[
                                        { id: 1, name: "العلوم" },
                                        { id: 2, name: "الرياضيات" },
                                        { id: 3, name: "القراءة" },
                                    ]}
                                    onSelect={handleGradeSelect}
                                    value={currentGrade || undefined}
                                />
                                <Button variant={"outline"} onClick={addGrade}>
                                    اضافة
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Label>الصفوف المضافة</Label>
                            <div className="flex flex-row-reverse flex-wrap min-h-[55px] bg-white gap-2 border border-accent-100 shadow-sm rounded-lg px-[14px] py-[10px]">
                                {selectedGrades.map((grade: DropdownItem) => (
                                    <Badge
                                        key={grade.id}
                                        className="bg-[#EFF8FF] text-[#175CD3] flex flex-row-reverse h-fit gap-1.5"
                                    >
                                        <X
                                            className="size-4 hover:text-red-500"
                                            onClick={() =>
                                                removeGrade(grade.id)
                                            }
                                        />
                                        {grade.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col">
                <div className="flex flex-row-reverse w-full h-[93px] justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-bold text-[#101828]">
                            الاسئلة
                        </p>
                        <p className="text-[#475467]">
                            .قم بدعم مخزون المهارة باضافة المزيد من الاسئلة
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button
                            variant="default"
                            className={cn(
                                theme.skillsPage.createSkillButtonBg,
                                theme.skillsPage.createSkillButtonBgHover
                            )}
                        >
                            اضافة سؤال
                        </Button>
                    </div>
                </div>
                <div className="bg-[#EAECF0] w-full h-px" />
                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex flex-row-reverse">
                        <Input
                            placeholder="ابحث عن سؤال"
                            className="w-96"
                            icon={<SearchIcon />}
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <QuestionDataTable data={QuestionsDataPlaceholder} columns={questionsTableColumns}/>
                </div>
            </section>
        </div>
    );
}

export default AddSkillPage;
