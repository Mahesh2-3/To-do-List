import React from 'react'

const navbar = () => {
  return (
    <div className='bg-[#acbbff] h-[50px] flex w-full justify-around items-center text-blue-900'>
        <div className='font-bold text-[26px] cursor-pointer hover:underline underline-offset-8'>iTask</div>
        <ul className='flex gap-5 items-center'>
            <li className='cursor-pointer font-semibold text-[16px] hover:underline underline-offset-4'>Home</li>
            <li className='cursor-pointer font-semibold text-[16px] hover:underline underline-offset-4'>Your Tasks</li>
        </ul>
    </div>
  )
}

export default navbar