"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
export const dynamic = "force-dynamic"

function AddRole() {

  const [data, setData] = useState<{
    name:string,
    content:string,
  }>({
    name:"",
    content:""
  })

  const handleChange = (key:string,value:unknown)=>{
     const newData = {
      ...data,
      [key]:value
     }

     setData(x=> x= newData)
  }

  const router = useRouter()
  const createRole = async (e:any) => {
    e.preventDefault()
    
   
    const res = await fetch(`/api/superadmin/role`, {
      body: JSON.stringify({
        name:data.name,
        content:data.content,
      }),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const dataNew = await res.json();
    console.log(dataNew);
    setData({
      name:"",
      content:""
    })
if(dataNew.id != ""){
  
  router.refresh()

}
  
  };






  return (
    
    <form >
<Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" >Ajouter</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Role</DialogTitle>
          <DialogDescription>
          Seuls les administrateurs associés à ce role verront les données des concours associées a ce role
           </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              name='name'
              value={data.name}
              onChange={(e)=>{
                handleChange(e.target.name,e.target.value)
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="username"
              name='content'
              value={data.content}
              onChange={(e)=>{
                handleChange(e.target.name,e.target.value)
              }}
              className="col-span-3"
            />
          </div>
        </div>
       {data.name.length > 2 && data.content.length > 2 && <DialogFooter>
          
          <Button
          onClick={createRole}
          type="button">Enregistré</Button>
           <DialogClose />
        </DialogFooter>}
      </DialogContent>
    </Dialog>
         
    </form>
  )
}

export default AddRole