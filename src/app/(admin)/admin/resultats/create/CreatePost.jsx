"use client"
import React, { useState } from "react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { EditorState,ContentState, convertFromRaw,convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiFillPicture } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";
import { Calendar ,CalendarChangeEvent} from "primereact/calendar";
import { convertToHTML } from 'draft-convert';
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
   
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CreatePost( ) {


  const [visible, setVisible] = useState(false);
  const [file, setfile] = useState(null);
  const [title, setTitle] = useState("");
  const [datasTypeChoose, setDatasTypeChoose] = useState("");
  const [content, setContent] = useState("");
  const { data: session, status } = useSession()
  const [statut, setStatutSelect] = useState( { name: "Non", code: "0" },);
 const router = useRouter()
  const statutData = [
    { name: "Non", code: "0" },
    { name: "Oui", code: "1" },
    
  ];

  const createData = async (e) => {
    
 
   
    e.preventDefault()
 
  
    const formData = new FormData();


    formData.append("title", title);
    formData.append("content", content);
    formData.append("statut", statut);
    formData.append("file", file);
    formData.append("roleId",JSON.parse(session.user.adminRole).id);
    formData.append("typeOfPostId",datasTypeChoose);
    formData.append("uid", session.user.id);
 
  
  const res =  await fetch(`/api/admin/result`, {
      body: formData,
     
      method: "POST",
    }) 

    const data = await res.json()
    console.log("data");
    console.log(data);
    console.log("data");
    if(data.user != null){
      
      router.refresh()
      router.push("/admin/resultats")
    
    }
  };

  return (
    <form onSubmit={(e)=>createData(e)} className="flex flex-col">
     
    
     
      <InputComponent
       key={1}
 
        label={"Titre"}
        value={title}
        handleChange={(e) => {
          setTitle(e.target.value);
        }}
      />
<p className="mt-4 mb-1">Description</p>
      <textarea
      onChange={(e) => {
        setContent(e.target.value);
      }}
      className="h-[140px] border  rounded-md p-4"></textarea>
    
      <input type="file" name="" id="" className="my-4 mt-6"
       onChange={(e) => {
      
      console.log(e.target.files[0]);
      setfile(x =>  x = e.target.files[0]);
      }}
      />

 
      
 
   
 
      <div className="flex items-end justify-end w-full my-4">
        {!visible ? (
          <ButtonComponent
            key={4}
            label="Enregistré"
            className="max-w-[130px]  "
           type="submit"
            full={true}
          />
        ) : null}
      </div>
    </form>
  );
}

export default CreatePost;
