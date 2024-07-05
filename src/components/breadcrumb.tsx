import { ChevronLeft } from 'lucide-react'
import React from 'react'

type BreadcrumbItemProps = {
    title: string,
    icon?: any
}

export function BreadcrumbItem({ title, icon: IconComponent }: BreadcrumbItemProps) {
    return (
        <div className='flex w-full h-7 gap-3'>
            <div className='flex justify-center items-center gap-3'>
                <p className='text-[#475467] font-medium'>{title}</p>
                {IconComponent && <IconComponent color="#667085"/>}
            </div>
        </div>)
}

export function Breadcrumb({ children }: any) {
    return (
        <div className='flex flex-row-reverse w-full h-7 gap-3'>
            {
                React.Children.toArray(children).map((child, idx, arr) => {
                    if ((child as any).type.name === 'BreadcrumbItem') {
                        return <div className='flex items-center gap-3'>
                            {idx !== arr.length - 1 && <ChevronLeft className='w-5 h-5' color='#D0D5DD' />}
                            {child}
                        </div>
                    }
                })
            }
        </div>
    )
}
