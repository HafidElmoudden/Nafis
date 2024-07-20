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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldValues, useForm } from "react-hook-form";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
// @ts-ignore
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
// @ts-ignore
import { ReactComponent as BoldIcon } from "assets/icons/editor/bold-icon.svg";
// @ts-ignore
import { ReactComponent as ItalicIcon } from "assets/icons/editor/italic-icon.svg";
// @ts-ignore
import { ReactComponent as LinkIcon } from "assets/icons/editor/link-icon.svg";
// @ts-ignore
import { ReactComponent as OrderedListIcon } from "assets/icons/editor/ordered-list-icon.svg";
// @ts-ignore
import { ReactComponent as UnorderedListIcon } from "assets/icons/editor/unordered-list-icon.svg";
// @ts-ignore
import { ReactComponent as FileUploadIcon } from "assets/icons/file-upload-icon.svg";
// @ts-ignore
import { ReactComponent as PenIcon } from "assets/icons/pen-icon.svg";
// @ts-ignore
import { ReactComponent as TrashIcon } from "assets/icons/trash-icon.svg";

interface Grade {
    id: number;
    name: string;
}

function AddSkillPage() {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [selectedGrades, setSelectedGrades] = useState<DropdownItem[]>([]);
    const [currentGrade, setCurrentGrade] = useState<DropdownItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedImage, setUploadedImage] = useState(null);

    const removeUploadedImage = () => {
        setUploadedImage(null);
    };

    const handleFileUpload = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as any);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKeyCommand = (command: any, editorState: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const onTab = (e: any) => {
        const maxDepth = 4;
        setEditorState(RichUtils.onTab(e, editorState, maxDepth));
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const toggleBlockType = (blockType: any) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const saveEditorState = () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const rawContentStateJson = JSON.stringify(rawContentState);
    };

    const promptForLink = () => {
        const url = prompt("Enter a URL");
        if (url) {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                "LINK",
                "MUTABLE",
                { url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
            });
            setEditorState(
                RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                )
            );
        }
    };

    const removeLink = () => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        reset();
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

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

    const onSubmit = (data: FieldValues) => {
        console.log("Submitted data: ", data);
        closeDialog();
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
                            onClick={openDialog}
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
                    <QuestionDataTable
                        data={QuestionsDataPlaceholder}
                        columns={questionsTableColumns}
                    />
                </div>
            </section>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            اضافة سؤال
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#475467] text-base">
                            .يمكنك إرفاق وسائط للسؤال، وسيتم تبديل ترتيب
                            الاختيارات
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <section className="flex flex-col">
                        <div className="flex flex-col gap-2">
                            <Label>السؤال</Label>
                            <div className="border rounded p-3 mb-2 text-base min-h-6 shadow-sm focus-within:border-blue-600 transition focus-within:shadow-custom-blue-shadow">
                                <Editor
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    handleKeyCommand={handleKeyCommand}
                                    onTab={onTab}
                                    placeholder="ادخل سؤال أو مسألة"
                                    textAlignment="right"
                                />
                                <div className="flex gap-3 items-center">
                                    <BoldIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleInlineStyle("BOLD")
                                        }
                                    />
                                    <ItalicIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleInlineStyle("ITALIC")
                                        }
                                    />
                                    <LinkIcon
                                        className="cursor-pointer"
                                        onClick={promptForLink}
                                    />
                                    <OrderedListIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleBlockType("ordered-list-item")
                                        }
                                    />
                                    <UnorderedListIcon
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleBlockType(
                                                "unordered-list-item"
                                            )
                                        }
                                    />
                                    <button
                                        className="text-[#98A2B3]"
                                        onClick={() =>
                                            toggleInlineStyle("UNDERLINE")
                                        }
                                    >
                                        <u>U</u>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-3">
                            <Label>الصورة المرفقة (اختياري)</Label>
                            {uploadedImage ? (
                                <div className="relative">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        className="h-[228px] rounded-lg"
                                    />
                                    <div className="flex flex-row-reverse gap-3 absolute top-2 left-2">
                                        {/* <div className="flex items-center justify-center bg-yellow-300 rounded-lg size-9 cursor-pointer">
                                            <PenIcon className="text-yellow-600" />
                                        </div> */}
                                        <div
                                            className="flex items-center justify-center bg-yellow-300 rounded-lg size-9 cursor-pointer"
                                            onClick={removeUploadedImage}
                                        >
                                            <TrashIcon className="text-yellow-600" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex flex-col items-center overflow-hidden justify-center gap-3 h-[126px] border border-dashed border-[#EAECF0] rounded-xl">
                                    <FileUploadIcon />
                                    <div className="flex flex-col items-center justify-center gap-1.5">
                                        <label className="text-[#475467] text-sm cursor-pointer">
                                            <span className="font-bold text-yellow-700 text-sm">
                                                انقر للتحميل
                                            </span>{" "}
                                            أو اسحب و افلت
                                        </label>
                                        <p className="text-xs text-[#475467]">
                                            SVG أو PNG أو JPG أو GIF (بحد أقصى
                                            800 × 400 بكسل)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/svg+xml, image/png, image/jpeg, image/gif"
                                        //@ts-ignore
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-4 pt-3">
                                <div className="flex flex-row-reverse gap-3">
                                    <div className="flex flex-1 flex-col gap-2.5">
                                        <Label>الخيار الأول</Label>
                                        <Input placeholder="ادخل الخيار الأول" />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2.5">
                                        <Label className="text-green-700"><span className="text-green-400">(الخيار الصحيح) </span>الخيار الثاني</Label>
                                        <Input placeholder="ادخل الخيار الصحيح" />
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse gap-3">
                                    <div className="flex flex-1 flex-col gap-2.5">
                                        <Label>الخيار الثالث</Label>
                                        <Input placeholder="ادخل الخيار الثالت" />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2.5">
                                        <Label>الخيار الرابع</Label>
                                        <Input placeholder="ادخل الخيار الرابع" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <AlertDialogFooter className="justify-start sm:justify-start ">
                        <AlertDialogAction
                            onClick={handleSubmit(onSubmit)}
                            className="bg-yellow-600 hover:bg-yellow-600/90"
                        >
                            اضافة سؤال
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={closeDialog}>
                            الغاء
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default AddSkillPage;
