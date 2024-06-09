import useSession from "hooks/useSession";
import React from "react";
import teacherImage from "assets/teacher.svg";
import moderatorImage from "assets/moderator.svg";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import InputSection from "components/settings/input-section";
import { useForm } from "react-hook-form";
import { addSchool } from "api/services/SchoolServices";
import { useNavigate } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import { changeUserType } from "api/services/UserServices";
import { Dropdown } from "components/settings/input-container";

type UserType = "teacher" | "moderator" | null;

type UserTypeCardProps = {
    title: string;
    type: UserType;
    actualUserType: UserType;
    description: string;
    image: string;
    userTypeHandler: (type: UserType) => void;
};

const UserTypeCard = ({
    title,
    actualUserType,
    type,
    description,
    userTypeHandler,
    image,
}: UserTypeCardProps) => {
    console.log("Rendering UserTypeCard", actualUserType, type);

    return (
        <div
            className={clsx(
                "flex flex-row-reverse bg-white p-4 rounded-md border-2 cursor-pointer gap-4 justify-center",
                actualUserType === type ? "border-blue-600" : "border-gray-300"
            )}
            onClick={() => userTypeHandler(type)}
        >
            <img
                src={image}
                alt={title}
                className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <div className="flex flex-col justify-center">
                <div className="text-xl font-bold">{title}</div>
                <div>{description}</div>
            </div>
        </div>
    );
};

const OnboardingFirstStep = ({
    session,
    userType,
    userTypeHandler,
}: {
    session: any;
    userType: UserType;
    userTypeHandler: (type: UserType) => void;
}) => {
    console.log("OnboardingFirstStep", session, userType);

    return (
        <>
            <div className="text-xl">
                👋 مرحبا بك{" "}
                <span className="font-bold">
                    {session?.user?.user_metadata?.full_name}
                </span>
            </div>
            <div className="text-xl">
                لإكمال عملية انشاء الحساب، سنقوم ببعض الخطوات الإضافية
            </div>
            <br />
            <br />
            <div className="text-xl">: المرجو تحديد نوع الحساب</div>
            <br />
            <br />
            <div className="flex items-center justify-center gap-8">
                <UserTypeCard
                    title="معلم"
                    actualUserType={userType}
                    type="teacher"
                    description="يمكنك إضافة وإدارة الطلاب والاختبارات"
                    image={teacherImage}
                    userTypeHandler={userTypeHandler}
                />
                <UserTypeCard
                    title="مدير"
                    actualUserType={userType}
                    type="moderator"
                    description="يمكنك إدارة المعلمين والاختبارات والتقارير"
                    image={moderatorImage}
                    userTypeHandler={userTypeHandler}
                />
            </div>
        </>
    );
};

const OnboardingSecondStep = ({
    session,
    userType,
    onSubmit,
    register
}: {
    session: any;
    userType: UserType;
    onSubmit: any;
    register: any;
}) => {

    return (
        <div>
            <p className="text-xl">الخطوة الثانية: أدخل المعلومات الخاصة بالمدرسة</p>
            <br />
            <br />
            <div className="flex flex-col gap-4">
                <InputSection
                    label="الرقم الوزاري"
                    type="text"
                    id="school_code"
                    placeholder="123456"
                    register={register}
                />
                <InputSection
                    label="اسم المدرسة"
                    type="text"
                    id="school_name"
                    placeholder="ثانوية الفلاح الأهلية"
                    register={register}
                />
                <InputSection
                    label="الادارة التعليمية"
                    type="text"
                    id="educational_administration"
                    placeholder="إدارة التعليم بمنطقة القصيم"
                    register={register}
                />
                <InputSection
                    label="مكتب التعليم"
                    type="text"
                    id="educational_office"
                    placeholder="مكتب تعليم الفضيلة"
                    register={register}
                />
                <InputSection
                    label="مدير المدرسة"
                    type="text"
                    id="school_principal"
                    placeholder="محمد الفلاني"
                    register={register}
                />
                <InputSection
                    label="السنة الدراسية"
                    type="text"
                    id="academic_year"
                    placeholder="1443-1444"
                    register={register}
                />
                {/* <InputSection
                    label="الفصل الدراسي"
                    type="text"
                    id="semester"
                    placeholder="الفصل الدراسي الأول"
                    register={register}
                /> */}
                <Dropdown
                    id='semester'
                    label="الفصل الدراسي"
                    icon={null}
                    containerStyle={null}
                    register={register}
                    comboBoxData={[
                        { value: "first_semester", label: "الفصل الدراسي الأول" },
                        { value: "second_semester", label: "الفصل الدراسي الثاني" },
                        { value: "third_semester", label: "الفصل الدراسي الثالث" }
                    ]}
                />
                <InputSection
                    label="درجة نافس السابقة"
                    type="number"
                    id="previous_nafis_grade"
                    placeholder="أدخل درجة نافس السابقة"
                    register={register}
                />
            </div>
        </div>
    );
};

const OnboardingThirdStep = ({
    session,
    userType,
    onSubmit,
    register
}: {
    session: any;
    userType: UserType;
    onSubmit: any;
    register: any;
}) => {

    return (
        <div>
            <p className="text-xl">.الخطوة الثالثة: أدخل عدد الفصول في المدرسة</p>
            <br />
            <br />
            <div className="flex flex-col gap-4">
                <InputSection
                    label="عدد فصول الصف الثالث"
                    type="number"
                    id="num_third_class"
                    register={register}
                />
                <InputSection
                    label="عدد فصول الصف السادس"
                    type="number"
                    id="num_sixth_class"
                    register={register}
                />
                <InputSection
                    label="عدد فصول الصف الثالث المتوسط"
                    type="number"
                    id="num_third_mid_class"
                    register={register}
                />
            </div>
        </div>
    );
};

function OnboardingPage() {
    const [userType, setUserType] = React.useState<UserType>(null);
    const [currentStep, setCurrentStep] = React.useState<number>(1);
    const session: any = useSession();
    const navigate = useNavigate();

    const userTypeHandler = (type: UserType) => {
        console.log("UserType selected", type);
        setUserType(type);
    };

    const { handleSubmit, register } = useForm();

    const onSubmit = async (data: any) => {
        if (userType === "moderator" && currentStep === 3) {
            const schoolResponse = await addSchool(data, session.user.id);
            const { error: schoolError } = schoolResponse as { error: PostgrestError | null; };
            const userTypeResponse = await changeUserType(session.user.id, userType);
            const { error: userTypeError } = userTypeResponse as { error: PostgrestError | null; };
            if (!schoolError && !userTypeError) {
                navigate("/home");
            }
        }
    };

    const steps = [
        <OnboardingFirstStep
            key="step1"
            session={session}
            userType={userType}
            userTypeHandler={userTypeHandler}
        />,
        <OnboardingSecondStep
            session={session}
            userType={userType}
            onSubmit={onSubmit}
            register={register}
            key="step2"
        />,
        <OnboardingThirdStep
            session={session}
            userType={userType}
            onSubmit={onSubmit}
            register={register}
            key="step3"
        />,
    ];

    const goToNextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
    };

    const goToPreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    return (
        <div className="w-screen h-screen pr-24 pt-12">
            <div>
                {steps[currentStep - 1]}
            </div>
            <br />
            <br />
            <div className="flex items-center justify-center gap-8">
                <Button
                    variant="secondary"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                >
                    السابق
                </Button>
                {currentStep < 3 ? (
                    <Button variant="default" onClick={goToNextStep}>
                        التالي
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        onClick={handleSubmit(onSubmit)}
                        form="secondStepForm"
                    >
                        التالي
                    </Button>
                )}
            </div>
        </div>
    );
}

export default OnboardingPage;
