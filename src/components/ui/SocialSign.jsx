import React from 'react'

export default function SocialSign({image, title}) {
    return (
        <a href="" className='flex items-center w-full bg-[#202024] hover:bg-[#3d3d42]  p-[5px] rounded-[40px]'>
            <img src={image} alt="" className='w-[40px] h-[40px] object-cover rounded-full' />
            <p className='text-white w-full text-center'>{title}</p>
        </a>
    )
}
