import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
type Poprs={
    color?:string,
    img:string,
    alt:string,
    title:string,
    desc:string,
    handleClick?:()=>void
}
const HomeCard = ({color,img,alt,title,desc,handleClick}:Poprs) => {
    return (
        <div
            className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',color)}
            onClick={handleClick}
        >
            <div
                className='flex justify-center items-center glassmorphism size-12 rounded-[10px]'
            >
                <Image
                    src={img}
                    alt={alt}
                    width={27}
                    height={27}
                />
            </div>
            <div
                className='flex flex-col gap-2'
            >
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{desc}</p>
            </div>
        </div>
    )
}

export default HomeCard