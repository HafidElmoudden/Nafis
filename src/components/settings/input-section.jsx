import { Combobox } from 'components/combobox'
import Divider from 'components/divider'
import { UserIcon } from 'lucide-react'
import React from 'react'

const frameworks = [
    {
      value: "next.sdfjs",
      label: "Next.qsdfjs",
    },
    {
      value: "sveltekqsdfit",
      label: "SvelteKit",
    },
    {
      value: "nuxqsdft.js",
      label: "Nuxtsssqs.js",
    },
    {
      value: "reqsdfmix",
      label: "Remix",
    },
    {
      value: "astsqdfqsro",
      label: "Astqqqro",
    },
  ]

function InputSection({ label, type, id, icon, register, comboBoxData = frameworks }) {
    return (
        <div className='flex items-center gap-28 w-full flex-row-reverse'>
            <label className='block text-sm font-semibold text-black w-36' htmlFor={id}>{label}</label>
            <div className='focus-within:outline w-[400px] h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                {icon &&
                    <div className='flex items-center px-3'>
                        {icon}
                    </div>}
                <input type={type} id={id} className='h-full w-full text-primary-900  bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
                    {...(register && register(id))}
                />
                
            </div>
        </div>
    )
}

export default InputSection