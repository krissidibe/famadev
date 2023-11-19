import React from 'react'
import MititarySvg from '../../../../public/military.png';
import Image from 'next/image';
function Heroes() {
  return (
   <div className="flex items-end justify-center ">
     <div className="absolute  bottom-9  w-[300px]  sm:w-[350px] pb-0  " >
         <Image src={MititarySvg} alt="React Logo" />
    </div>
    <div className='absolute w-full h-1 bg-black'></div>
   </div>
  )
}

export default Heroes