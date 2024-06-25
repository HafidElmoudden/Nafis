import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import InputSection from "../input-section";
import Divider from "components/divider";
import { useForm } from "react-hook-form";
import { getSchoolInformationsForModerator } from "api/services/SchoolServices";
import { supabase } from "api/SupabaseClient";
import useSession from "hooks/useSession";
import { useAtom } from 'jotai'
import { schoolDataAtom } from "atoms/schoolAtom";
import useUser from "hooks/useUser";

function SchoolSettings() {
  const [schoolData, setSchoolData] = useAtom(schoolDataAtom);
  
  const { register, handleSubmit, setValue } = useForm();

  const user = useUser();
  const onSubmit = (data) => console.log(data);

  const resetInputs = () => {
    Object.keys(schoolData).forEach((key) => {
      setValue(key, schoolData[key]);
    });
    setValue("nafis_coordinator", user.user_metadata.full_name);
  };

  useEffect(() => {
    if (user) {
      getSchoolInformationsForModerator(user.id).then((response) => {
        if (response.data) {
          setSchoolData(response.data);
          Object.keys(response.data).forEach((key) => {
            setValue(key, response.data[key]);
          });
          setValue("nafis_coordinator", user.user_metadata.full_name);
        }
      });
    }
  }, [user, setValue]);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row-reverse justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">اعدادات المدرسة</h1>
            <span className="text-sm text-muted-foreground">
              .في هذا القسم يمكنك تعديل المعلومات الخاصة بالمدرسة
            </span>
          </div>
          <div className="space-x-4">
            <Button variant="secondary" onClick={resetInputs}>
              حذف التغييرات
            </Button>
            <Button type="submit">حفظ</Button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col w-full items-end">
          <InputSection
            label="الرقم الوزاري"
            type="text"
            defaultValue={schoolData?.school_code}
            id="school_code"
            register={register}
          />
          <Divider />
          <InputSection
            label="اسم المدرسة"
            type="text"
            defaultValue={schoolData?.school_name}
            id="school_name"
            register={register}
          />
          <Divider />
          <InputSection
            label="الادارة التعليمية"
            type="text"
            defaultValue={schoolData?.educational_administration}
            id="educational_administration"
            register={register}
          />
          <Divider />
          <InputSection
            label="مكتب التعليم"
            type="text"
            defaultValue={schoolData?.educational_office}
            id="educational_office"
            register={register}
          />
          <Divider />
          <InputSection
            label="مدير المدرسة"
            type="text"
            defaultValue={schoolData?.school_principal}
            id="school_principal"
            register={register}
          />
          <Divider />
          <InputSection
            label="مسؤول نافس"
            type="text"
            defaultValue={user?.user_metadata.full_name}
            id="nafis_coordinator"
            register={register}
          />
          <Divider />
          <InputSection
            label="السنة الدراسية"
            type="text"
            defaultValue={schoolData?.academic_year}
            id="academic_year"
            register={register}
          />
          <Divider />
          <InputSection
            label="الفصل الدراسي"
            type="text"
            defaultValue={schoolData?.semester}
            id="semester"
            register={register}
          />
          <Divider />
          <InputSection
            label="درجة نافس السابقة"
            type="number"
            defaultValue={schoolData?.previous_nafis_grade}
            id="previous_nafis_grade"
            register={register}
            registerOptions={{ required: true }}
          />
        </div>
      </form>
    </section>
  );
}

export default SchoolSettings;
