"use client"
import ButtonComponent from '@/components/ButtonComponent'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React from 'react'

function DeleteBtn({id}:{id:string}) {
    const router = useRouter()


    return (
      <ButtonComponent
            key={4}
          handleClick={async ()=>{
            const res =  await fetch(`/api/admin/result?id=${id}`, {
                
               
              method: "DELETE",
            }) 

            const data = await res.json();

        if(data){
          router.refresh();
          router.back();

          revalidatePath("/admin/resultats");
        }
          }}
            label="Supprimer"
            className="max-w-[130px]  bg-red-500 "
           type="submit"
            full={true}
          />
    )
  return (
    
    <div
        onClick={ async ()=>  {

            const res =  await fetch(`/api/admin/post?id=${id}`, {
                
               
                method: "DELETE",
              }) 

              const data = await res.json();

          if(data){
            router.refresh();
          }
        }}
        className="p-2 text-xs text-white bg-red-700 rounded-lg opacity-100 cursor-pointer">
            Supprimer 
            
            </div>
  )
}

export default DeleteBtn