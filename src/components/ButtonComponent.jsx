
"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


const ButtonComponent = ({label ,full = false ,href = "", handleClick = ()=>{}, className = "", type="button"}) => {
//       
  if(href != ""){
    return (
   
      <Link href={href ?? ""}  legacyBehavior>
            <Button  variant={"outline"} type={type}  onClick={handleClick}     >
             {label} </Button>
      </Link>
     )
  }else{
    return (
   
      
      <Button  className={`p-2 px-4   w-full rounded-md ${full ? "bg-[#024010] border-2 hover:bg-[#267438]   text-white" : "border-blue-100 border-2 text-blue-100"} ${className}`}     type={type}  onClick={handleClick}   >{label}</Button>
     
     )
  }
}

export default ButtonComponent
/* 

<div className={`  w-full  ${className}`}   legacyBehavior>
       

<button type={type}  onClick={handleClick} className={`p-2 px-4  h-[50px] w-full rounded-md ${full ? "bg-blue-500 border-none text-white" : "border-blue-500 border-2 text-blue-500"} ${className}`} >
   {label} </button> 
</div> */










