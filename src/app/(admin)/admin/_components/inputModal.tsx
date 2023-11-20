"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextCursorInput } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface elementProps   {
  id:string,
  value:string,
  name:string,
  type:string

}
export default function InputModal({handleSave}:{handleSave:(e:any) => void}) {
  const [elementRequired, setElementRequired] = useState<elementProps>(
    {
      id:uuidv4(),
      value:"",
      name:""
      ,type:"input"
    
    });
  return (
   <form action="" >

<Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full flex justify-start"
          variant="ghost"
          size={"sm"}
        >
          <TextCursorInput className="w-4 h-4 mr-2" />
           Texte
         
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Champ texte</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi placeat odit quia doloremque 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              name="name"
              value={elementRequired.name}
              onChange={(e)=>{
                setElementRequired({
                  ...elementRequired,

                  name: e.target.value,
                });
                ( {})
              }}
              defaultValue=""
              className="col-span-3"
            />
          </div>
         
         
         
        </div>
        <DialogFooter>
        <DialogClose asChild>
      
          <Button
          onClick={()=>{

            handleSave(elementRequired)
          }}
          type="submit">Enregistré</Button>
    </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
   </form>
  );
}
