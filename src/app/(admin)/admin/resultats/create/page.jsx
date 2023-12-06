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
  
function CreateResult() {


  const [visible, setVisible] = useState(false);
  const [file, setfile] = useState(null);
  const [title, setTitle] = useState("");
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
    formData.append("uid",session.user.id);
 
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
      //  if (!e.target.files[0].type.startsWith("image/")) return;
      console.log(e.target.files[0]);
      setfile(x =>  x = e.target.files[0]);
      }}
      />

    {/*   <div className="flex w-full gap-4 my-4">
        <div className="flex flex-col w-full">
          <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
            Public
          </p>
          <Dropdown
            value={statut}
            onChange={(e) => setStatutSelect(e.value)}
            options={statutData}
            optionLabel="name"
            placeholder="Type de statut"
            className="w-full md:w-14rem"
          />
        </div>
      
      </div> */}
      
 
   
 
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

export default CreateResult;
