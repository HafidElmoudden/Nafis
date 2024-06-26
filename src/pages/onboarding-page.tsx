import useSession from "hooks/useSession";
import React from "react";
import teacherImage from "assets/teacher.svg";
import moderatorImage from "assets/moderator.svg";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import InputSection from "components/input-section";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { addSchool } from "api/services/SchoolServices";
import { useNavigate } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import { changeUserType } from "api/services/UserServices";
import useUser from "hooks/useUser";
import ProgressBar from "components/onboarding/progressbar";
import CheckIcon from "assets/icons/check-icon.svg";
import DropdownSection from "components/dropdown-section";
import { useToast } from "@/components/ui/use-toast";

type UserType = "teacher" | "moderator" | null;

type UserTypeCardProps = {
  title: string;
  type: UserType;
  actualUserType: UserType;
  description: string;
  image: string;
  userTypeHandler: (type: UserType) => void;
};

type Step = {
  title: string;
  description: string;
  completed: string;
};

const initialSteps = [
  {
    title: "معلومات الحساب",
    description: "ادخل معلوماتك الشخصية",
    completed: "true",
  },
  { title: "نوع الحساب", description: "اختر نوع الحساب", completed: "current" },
  {
    title: "معلومات المدرسة",
    description: "ادخل المعلومات العامة للمؤسسة",
    completed: "false",
  },
  {
    title: "معلومات الفصول",
    description: "ادخل عدد فصول المؤسسة",
    completed: "false",
  },
];

const UserTypeCard = ({
  title,
  actualUserType,
  type,
  description,
  userTypeHandler,
  image,
}: UserTypeCardProps) => {
  const isActive = actualUserType === type;
  return (
    <div
      className={clsx(
        "relative flex flex-row-reverse w-[380px] h-[180px] p-4 rounded-lg cursor-pointer gap-2 items-center justify-center",
        isActive
          ? "outline outline-2 outline-blue-600 bg-blue-50"
          : "outline outline-1 outline-[#EAECF0] bg-white"
      )}
      onClick={() => userTypeHandler(type)}
    >
      <div
        className={clsx(
          "flex items-center justify-center absolute top-[16px] right-4 w-[16px] h-[16px] rounded-full  border-[1px]",
          isActive ? "border-blue-600 bg-blue-600" : "border-[#D0D5DD]"
        )}
      >
        {isActive && <img src={CheckIcon}></img>}
      </div>
      <img src={image} alt={title} className="w-24 h-24 mx-auto" />
      <div className="flex flex-col justify-center gap-2 w-[190px]">
        <div className="text-xl text-blue-600 font-bold">{title}</div>
        <div className="text-gray-800">{description}</div>
      </div>
    </div>
  );
};

const OnboardingFirstStep = ({
  userType,
  userTypeHandler,
  steps,
  errors,
}: {
  userType: UserType;
  userTypeHandler: (type: UserType) => void;
  steps: Step[];
  errors: FieldErrors<FieldValues>;
}) => {
  const user = useUser();
  return (
    <>
      <header className="flex flex-col justify-end gap-4 h-[80px] w-full">
        <div className="text-2xl">
          👋 مرحبا بك{" "}
          <span className="font-bold">
            {user && (user as any).user_metadata?.full_name}
          </span>
        </div>
        <div className="text-gray-600 font-normal text-xl">
          .لاكمال عملية انشاء الحساب سنقوم ببضع الخطوات الاضافية
        </div>
      </header>
      <section className="flex flex-row-reverse gap-8 pt-[50px]">
        <ProgressBar steps={steps} />
        <div className="flex flex-col">
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-col gap-[12px]">
              <p className="text-xl font-black">: الخطوة الثانية</p>
              <p className="text-lg text-gray-700 ">المرجو تحديد نوع الحساب</p>
            </div>
            <div className="flex gap-6">
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
          </div>
        </div>
      </section>
    </>
  );
};

const OnboardingSecondStep = ({
  steps,
  register,
  errors,
}: {
  steps: Step[];
  register: any;
  errors: FieldErrors<FieldValues>;
}) => {
  const user = useUser();
  return (
    <>
      <header className="flex flex-col justify-end gap-4 h-[80px] w-full">
        <div className="text-2xl">
          👋 مرحبا بك{" "}
          <span className="font-bold">
            {user && (user as any).user_metadata?.full_name}
          </span>
        </div>
        <div className="text-gray-600 font-normal text-xl">
          .لاكمال عملية انشاء الحساب سنقوم ببضع الخطوات الاضافية
        </div>
      </header>
      <section className="flex flex-row-reverse gap-8 pt-[50px]">
        <ProgressBar steps={steps} />
        <div className="flex flex-col">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[12px]">
              <p className="text-xl font-black">: الخطوة الثالثة</p>
              <p className="text-lg text-gray-700 ">
                ادخل المعلومات الخاصة بالمدرسة
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <InputSection
                label="الرقم الوزاري"
                type="text"
                id="school_code"
                placeholder="123456"
                tooltipMessage="الرقم الوزاري هو رقم الهوية الوطنية للمدرسة"
                register={register}
                registerOptions={{ required: ".المرجو تعبئة هذا الحقل" }}
                errors={errors}
              />
              <InputSection
                label="اسم المدرسة"
                type="text"
                id="school_name"
                placeholder="ثانوية الفلاح الأهلية"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <InputSection
                label="الادارة التعليمية"
                type="text"
                id="educational_administration"
                placeholder="إدارة التعليم بمنطقة القصيم"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <InputSection
                label="مكتب التعليم"
                type="text"
                id="educational_office"
                placeholder="مكتب تعليم الفضيلة"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <InputSection
                label="مدير المدرسة"
                type="text"
                id="school_principal"
                placeholder="محمد الفلاني"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <InputSection
                label="السنة الدراسية"
                type="text"
                id="academic_year"
                placeholder="1443-1444"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <DropdownSection
                id="semester"
                label="الفصل الدراسي"
                // placeholder="...اختر الفصل الدراسي"
                comboBoxData={[
                  { value: "first_semester", label: "الفصل الدراسي الأول" },
                  { value: "second_semester", label: "الفصل الدراسي الثاني" },
                  { value: "third_semester", label: "الفصل الدراسي الثالث" },
                ]}
                // tooltipMessage="الفصل الدراسي هو الفصل الدراسي الحالي"
                register={register}
                registerOptions={{ required: true }}
                errors={errors}
              />
              <InputSection
                label="درجة نافس السابقة"
                type="number"
                id="previous_nafis_grade"
                placeholder="أدخل درجة نافس السابقة"
                tooltipMessage="درجة نافس السابقة هي النسبة المئوية للنجاح في العام الدراسي السابق"
                min="0"
                max="100"
                errors={errors}
                register={register}
                registerOptions={{ required: true, min: 0, max: 100 }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const OnboardingThirdStep = ({
  steps,
  register,
  errors,
}: {
  steps: Step[];
  register: any;
  errors: FieldErrors<FieldValues>;
}) => {
  const user = useUser();
  return (
    <>
      <header className="flex flex-col justify-end gap-4 h-[80px] w-full">
        <div className="text-2xl">
          👋 مرحبا بك{" "}
          <span className="font-bold">
            {user && (user as any).user_metadata?.full_name}
          </span>
        </div>
        <div className="text-gray-600 font-normal text-xl">
          .لاكمال عملية انشاء الحساب سنقوم ببعض الخطوات الاضافية
        </div>
      </header>
      <section className="flex flex-row-reverse gap-8 pt-[50px]">
        <ProgressBar steps={steps} />
        <div className="flex flex-col">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[12px]">
              <p className="text-xl font-black">: الخطوة الرابعة</p>
              <p className="text-lg text-gray-700 ">
                ادخل عدد الفصول في المدرسة
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <InputSection
                label="عدد فصول الصف الثالث"
                type="number"
                id="num_third_class"
                register={register}
                registerOptions={{ required: true }}
              />
              <InputSection
                label="عدد فصول الصف السادس"
                type="number"
                id="num_sixth_class"
                register={register}
                registerOptions={{ required: true }}
              />
              <InputSection
                label="عدد فصول الصف الثالث المتوسط"
                type="number"
                id="num_third_mid_class"
                register={register}
                registerOptions={{ required: true }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function OnboardingPage() {
  const [userType, setUserType] = React.useState<UserType>(null);
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [progressBarSteps, setProgressBarSteps] =
    React.useState<Step[]>(initialSteps);
  const session: any = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const userTypeHandler = (type: UserType) => {
    setUserType(type);
  };

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    if (userType === "moderator" && currentStep === 3) {
      const schoolResponse = await addSchool(data, session.user.id);
      const { error: schoolError } = schoolResponse as {
        error: PostgrestError | null;
      };
      const userTypeResponse = await changeUserType(session.user.id, userType);
      const { error: userTypeError } = userTypeResponse as {
        error: PostgrestError | null;
      };
      if (!schoolError && !userTypeError) {
        navigate("/home");
      }
    }
  };

  const steps = [
    <OnboardingFirstStep
      key="step1"
      userType={userType}
      steps={progressBarSteps}
      userTypeHandler={userTypeHandler}
      errors={errors}
    />,
    <OnboardingSecondStep
      register={register}
      steps={progressBarSteps}
      key="step2"
      errors={errors}
    />,
    <OnboardingThirdStep
      register={register}
      steps={progressBarSteps}
      key="step3"
      errors={errors}
    />,
  ];

  const goToNextStep = async () => {
    if (currentStep === 1 && !userType) {
      toast({
        variant: "destructive",
        title: "!حدث خطأ",
        description: "المرجو اختيار نوع الحساب",
        duration: 5000,
      });
      return;
    }

    const isStepValid = await trigger();
    if (isStepValid) {
      setProgressBarSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        if (currentStep < newSteps.length - 1) {
          newSteps[currentStep].completed = "true";
          newSteps[currentStep + 1].completed = "current";
          setCurrentStep(currentStep + 1);
        }
        return newSteps;
      });
    } else {
      toast({
        variant: "destructive",
        title: "!حدث خطأ",
        description: "المرجو ملء جميع الحقول المطلوبة بشكل صحيح",
      });
    }
  };

  const goToPreviousStep = () => {
    if(currentStep === 1) return navigate("/");

    setProgressBarSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      if (currentStep > 0) {
        newSteps[currentStep].completed = "false";
        newSteps[currentStep - 1].completed = "current";
        setCurrentStep(currentStep - 1);
      }
      return newSteps;
    });
  };

  return (
    <div className="w-screen h-screen pr-24 pt-12">
      <div>{steps[currentStep - 1]}</div>
      <div className="pl-[57.5px] pb-4 flex gap-5">
        {currentStep < 3 ? (
          <Button
            variant="default"
            className="w-[74px]"
            color="#1570EF"
            onClick={goToNextStep}
          >
            التالي
          </Button>
        ) : (
          <Button
            variant="default"
            color="#1570EF"
            className="w-[74px]"
            onClick={handleSubmit(onSubmit)}
            form="secondStepForm"
          >
            التالي
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={goToPreviousStep}
          color="#F5FAFF"
          className="text-gray-600 w-[74px]"
        >
          السابق
        </Button>
      </div>
    </div>
  );
}

export default OnboardingPage;
