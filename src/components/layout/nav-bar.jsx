import Logo from 'components/Logo'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { cn } from 'utils'
import AvatarImage from 'assets/default_avatar.png'
import { supabase } from 'api/SupabaseClient'

function NavBar() {
  const [userData, setUserData] = React.useState(null);
  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        console.log(data);
        setUserData(data.session.user)
      }
    }
    getUserSession()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-[10px] h-16 bg-white shadow-sm">
      <div className='h-full w-full flex justify-between items-center flex-row-reverse'>
        <div className='h-auto w-16 flex  items-center justify-center object-cover'>
          <Logo />
        </div>

        <div className='flex items-center justify-center w-auto h-full'>
          <div className='flex flex-col items-center justify-center w-24 h-full border rounded-r-none rounded-3xl'>
            <span className='text-center text-neutral-600 text-[12px] font-semibold'>درجة مهاراتي</span>
            <span className='text-gray-400 text-[12px] font-medium'>100/100</span>
          </div>
          <div className='flex flex-col items-center justify-center w-24 h-full border border-l-0 rounded-l-none rounded-3xl'>
            <span className='text-center text-neutral-600 text-[12px] font-semibold'>درجة نافس</span>
            <span className='text-gray-400 text-[12px] font-medium'>100/100</span>
          </div>
        </div>

        <div className='flex items-center justify-center pl-7 w-auto h-full gap-3'>
          <div className='flex flex-col  justify-center w-auto h-full text-right'>
            <span className='text-right text-neutral-600 text-[13px] font-bold uppercase'>{userData?.user_metadata?.full_name}</span>
            <span className='text-right text-gray-400 text-[12px] font-medium'>{userData?.user_metadata?.email}</span>
          </div>
          <div>
            <img src={AvatarImage} alt="user" className='w-9 h-9 rounded-full' />
          </div>
        </div>

      </div>
    </nav>
  )
}

export default NavBar