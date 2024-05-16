function InputSection({ label, subLabel, type, placeholder, id, icon, register, notInput, children }) {
  return (
    <div className='flex w-full flex-row-reverse'>
      <div className='flex flex-col items-end w-[250px]'>
        <label className='block text-sm  font-semibold text-black w-36' htmlFor={id}>{label}</label>
        {subLabel && <span className='text-sm text-muted-foreground'>{subLabel}</span>}
      </div>
      {!notInput &&
        <div className='focus-within:outline w-[400px] h-10 focus-within:outline-primary focus-within:border-transparent flex flex-row-reverse bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
          {icon &&
            <div className='flex items-center px-3'>
              {icon}
            </div>}
          <input type={type} id={id} placeholder={placeholder} className='h-full w-full text-primary-900  bg-transparent py-[12px] px-[16px] border-none outline-none box-border'
            {...(register && register(id))}
          />
          
        </div>
      }
      {children}
    </div>
  )
}

export default InputSection