"use client"

import ButtonComponent from '@/components/ButtonComponent'
import InputComponent from '@/components/InputComponent'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Form() {
    const router = useRouter()
    const [name, setName] = useState("")
    const handleSubmit =  async (e:any)=>{
        e.preventDefault();
if(name.length <=3){
    return
}
        const res = await fetch(`/api/superadmin/posttype`, {
            body: JSON.stringify({
              name:name,
              
            }),
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
          });
          const dataNew = await res.json();
          console.log(dataNew);
          setName("")
      if(dataNew.id != ""){
        
        router.refresh()
      
      }
    }
  return (
    <form onSubmit={handleSubmit} className='flex w-full gap-4 mb-4'>
        <InputComponent label="Nom"
        value={name}
        handleChange={(e)=>setName(e.target.value)}
        />
        <ButtonComponent
                  key={8}
                  label="Ajouter"
                  full={true}
                  type="submit"
                  className="self-end w-full mt-4 md:w-[200px]"
                />
        

    </form>
  )
}

export default Form