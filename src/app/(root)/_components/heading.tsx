"use client"
import { Button } from '@/components/ui/button'
import { ArrowRight, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Heading() {
  return (
    <div className='max-w-3xl space-y-4 sm:pt-20'>
        <h1  className='text-3xl font-bold sm:text-4xl md:text-5xl'>
           
        Bienvenue dans l'espace concours d'entrée 
            <span className="underline ml-2" >Fama</span>
        </h1>
        <div className='flex items-center justify-center '>
        <h3 className="max-w-xl text-sm text-center ">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi obcaecati repellendus magnam, repellat earum illum voluptates accusantium voluptatem ipsum illo laborum. Velit officia illum cumque ex et libero nisi dicta!
      
        </h3>
        </div>

       <div className='flex justify-center gap-3'>
       <Button asChild >
          <Link href="/register" >
          S'inscrire 
            <User2 className='w-4 h-4 ml-2' /></Link>
        </Button>
        <Button asChild>
        <Link href="/login" >
         
            Connexion
            
            <ArrowRight className='w-4 h-4 ml-2' />
            </Link>
        </Button>
       </div>
    </div>
  )
}

export default Heading

