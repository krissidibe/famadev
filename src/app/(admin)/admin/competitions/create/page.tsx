"use client"
import { CalendarIcon, PictureInPictureIcon, PlusCircleIcon } from 'lucide-react';
import React, { useRef, useState } from 'react'
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from "date-fns"
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function CompetitionCreatePage() {
  const [image, setImage] = useState<any>(null);
  const imageRef = useRef(null);
  const [startDateAt, setStartDateAt] = useState(null);
  const [endDateAt, setEndDateAt] = useState(null);
  const [date, setDate] = React.useState<Date>()
  const [content, setContent] = useState(EditorState?.createEmpty());
  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
 
})

 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    {
      ssr: false,
    }
  );
  function EditorComponent({value, handleChange }  :{value:EditorState,handleChange:EditorProps}) {
    return (
      <div className="bg-[#F8F9FA] min-h-[500px]  mb-6 p-2 shadow-lg">
        <Editor
          editorState={value}
          onEditorStateChange={(newState) => {
          //  handleChange(newState);
          }}
        />
      </div>
    );
  }
  return (
<Form {...form}>
 

   
    <form  onSubmit={form.handleSubmit(onSubmit)}  className="flex w-full  justify-center flex-col">

{/*       <p className="mb-2 text-lg font-bold">Phtoto de couverture</p> */}
      <picture
        onClick={() => {
        //  imageRef.current.click();
        }}
        className="w-[570px] xl:w-[670px] self-center cursor-pointer h-[400px] mb-6 bg-white flex  justify-center border items-center border-dashed do rounded-lg "
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="image"
            className="object-contain w-full h-full rounded-lg"
          />
        ) : (
          <PictureInPictureIcon className="w-12 h-12" />
        )}
      </picture>

      <div className=" grid xl:grid-cols-2 grid-cols-1 gap-4 ">
      <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="flex flex-col space-y-2 mt-2">
              <Label htmlFor="framework">Statut</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Brouillon</SelectItem> 
                  <SelectItem value="1">Ouvert</SelectItem> 
                  <SelectItem value="2">Fermé</SelectItem> 
                  <SelectItem value="3">Suspendu</SelectItem> 
                   
                </SelectContent>
              </Select>
            </div>
         
        
         <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age minimum</FormLabel>
              <FormControl>
                <Input placeholder="Age minimum" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age maximum</FormLabel>
              <FormControl>
                <Input placeholder="Age maximum" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
           <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " mt-3 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Date debut</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " mt-3 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Date fin</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

      </div>

      

      <p className="text-[14px] text-gray-500 mt-8">
        <EditorComponent value={content} handleChange={(v) => setContent(v)} />
      </p>

<div className="border-t pt-4 pb-[350px]">
 <div className='w-full flex justify-between'>
 <h3 className='font-semibold' >Les element a fournir pour le concours</h3>

 <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button size={"sm"}>
  Ajouter
  <PlusCircleIcon className="w-4 h-4 ml-2" />
 </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Elements</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="bottom" onValueChange={()=>{}}>
          <DropdownMenuRadioItem className='cursor-pointer' onClick={()=>{
            alert("")
          }}  value="">Champ de type text</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='cursor-pointer' onClick={()=>{
            alert("")
          }}  value="">Champ de type numero</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='cursor-pointer' onClick={()=>{
            alert("")
          }}  value="">Champ de fichier</DropdownMenuRadioItem>
          
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

 </div>
</div>

      
    </form>
    </Form>
  )
}


export default CompetitionCreatePage