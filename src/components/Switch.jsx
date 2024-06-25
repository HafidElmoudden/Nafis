import React, { useEffect } from 'react';
import { Switch as SwitchComponent } from "@/components/ui/switch";

function Switch({ label, id, register, multiple = false, multipleId, setValue }) {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleChange = (value) => {
        setIsChecked(value);
    };

    useEffect(() => {
        setValue(`${multipleId}.${id}`, isChecked);
    }, [isChecked]);
    return (
        <div className='flex w-full flex-row-reverse'>
            <div className='flex w-full items-center justify-between'>
                <SwitchComponent
                    onCheckedChange={handleChange}
                    isChecked={isChecked}
                    className={"bg-green-100"} />
                <label htmlFor={id} className='font-semibold ml-2'>{label}</label>
            </div>
        </div>
    );
}

export default Switch;
