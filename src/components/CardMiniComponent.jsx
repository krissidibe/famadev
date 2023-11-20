import React from 'react'

const CardMiniComponent = ({
    label,
    number,
    Icon
}) => {
  return (
    <div className="w-[166px] space-y-2 rounded-md shadow-xl  p-4 h-[150px] bg-white flex flex-col items-center justify-center">
       <Icon className={`w-8 h-8 self-start ml-1  text-blue-500 transition-all ease-in-out  `}/>
        <p>{label}</p>
        <p className="self-start ml-1">{number}</p>
    </div>
  )
}

export default CardMiniComponent