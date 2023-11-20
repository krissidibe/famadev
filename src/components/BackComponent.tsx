"use client"
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
function BackComponent({className=""}) {
    const router  = useRouter()

  return (
    <CardTitle className={`flex items-center space-x-2 text-sm cursor-pointer  ${className}`} onClick={()=>{
        router.back()
      }}> <BiArrowBack />   <span>Retour</span> </CardTitle>
  )
}

export default BackComponent