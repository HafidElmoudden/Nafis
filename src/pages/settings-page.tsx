import { Tab, TabContent, Tabs, TabsList } from 'components/tabs'
import React from 'react'

function SettingsPage() {
  return (
    <section className='w-full h-full flex flex-col'>
      <div className="py-[30px] px-[20px]">
        <h1 className='text-2xl font-semibold tracking-tight text-right'>الاعدادات</h1>
        {/* <div className="h-4"></div> */}
        <div>
          <Tabs>
            <TabsList>
              <Tab value="test1" label="تجربة 1" />
              <Tab value="test2" label="تجربة 2" />
              <Tab value="test3" label="تجربة 3" />
            </TabsList>
            <TabContent value="test1">تجربة 1</TabContent>
            <TabContent value="test2">تجربة 2</TabContent>
            <TabContent value="test3">تجربة 3</TabContent>
          </Tabs>
        </div>


      </div>
    </section>
  )
}

export default SettingsPage