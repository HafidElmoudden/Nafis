import ClassSettings from 'components/settings/class-settings'
import GeneralSettings from 'components/settings/general-settings'
import SchoolSettings from 'components/settings/school-settings'
import StudentSetting from 'components/settings/student-settings'
import TeacherSettings from 'components/settings/teacher-settings'
import { Tab, TabContent, Tabs, TabsList } from 'components/tabs'
import React from 'react'

function SettingsPage() {
  return (
    <section className='w-full h-full flex flex-col'>
      <div className="py-[30px] px-[20px]">
        <h1 className='text-2xl font-semibold tracking-tight text-right'>الاعدادات</h1>
        <div className="h-4"></div>
        <div>
          <Tabs>
            <TabsList>
              <Tab value="generalsettings" label="اعدادات عامة" />
              <Tab value="schoolsettings" label="اعدادات المدرسة" />
              <Tab value="teachersettings" label="اعدادات المعلمين" />
              <Tab value="studentsettings" label="اعدادات الطلاب" />
              <Tab value="classsettings" label="اعدادات الفصول" />
            </TabsList>
            <TabContent value="generalsettings">
              <GeneralSettings/>
            </TabContent>
            <TabContent value="schoolsettings">
              <SchoolSettings/>
            </TabContent>
            <TabContent value="teachersettings">
              <TeacherSettings/>  
            </TabContent>
            <TabContent value="studentsettings">
              <StudentSetting/>
            </TabContent>
            <TabContent value="classsettings">
              <ClassSettings/>
            </TabContent>
          </Tabs>
        </div>


      </div>
    </section>
  )
}

export default SettingsPage