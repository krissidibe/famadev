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
   import DeleteBtn from "../deleteBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function EditPost({datasType,data}) {


  const [visible, setVisible] = useState(false);
  const [file, setfile] = useState(data.files);
  const [dataId, setDataId] = useState(data.id);
  const [datas, setDatas] = useState(data.files);
  const [title, setTitle] = useState(data.title);
  const [datasTypeChoose, setDatasTypeChoose] = useState(data.typeOfPostId);
  const [content, setContent] = useState(data.content);
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


    formData.append("id", dataId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("statut", statut);
    formData.append("file", file);

    for (let index = 0; index < file.length; index++) {
      const element = file[index];

      formData.append(`file${index+1}`, element);
      
    }

    formData.append("fileSize", file.length);
    formData.append("roleId",JSON.parse(session.user.adminRole).id);
    formData.append("typeOfPostId",datasTypeChoose);
    formData.append("uid", session.user.id);
    formData.append("imageUpdate", file != datas ? true : false);
    
  
  const res =  await fetch(`/api/admin/post`, {
      body: formData,
     
      method: "PATCH",
    }) 

    const data = await res.json()
    console.log("data");
    console.log(data);
    console.log("data");
    if(data.user != null){
      
      router.refresh()
      router.push("/admin/post")
    
    }
  };

  return (
    <form onSubmit={(e)=>createData(e)} className="flex flex-col">
     
    <div className="mb-4">
            <div className="mb-2">Type de publication : </div>
            <Select
                  defaultValue={datasTypeChoose}
                  onValueChange={(e) => setDatasTypeChoose(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Motif" />
                    <SelectContent position="popper">
                      <SelectItem key={1} value={""}>----</SelectItem>
                      {datasType.map((item) => (
                        
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                      
                    </SelectContent>
                  </SelectTrigger>
                </Select>
            </div>
     
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
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
      className="h-[140px] border  rounded-md p-4 mb-10"></textarea>
    
 
 
    {JSON.parse(datas)?.length > 0 && fileFunctionCutom(`Fichier(s) ${JSON.parse(datas).length}`,file)}

      

      {datas == 0 && <input type="file" multiple name="" id="" className="my-4 mt-6"
       onChange={(e) => {
      //  if (!e.target.files[0].type.startsWith("image/")) return;
      console.log(e.target.files);
      setfile(x =>  x = e.target.files);
      }}
      />}

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
        <DeleteBtn id={dataId} />
        {!visible ? (
          <ButtonComponent
            key={4}
            label="Modifier"
            className="max-w-[130px]  "
           type="submit"
            full={true}
          />
        ) : null}
      </div>
    </form>
  );



function fileFunctionCutom(label,   result) {
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex justify-between">
        <p className="mb-2">{label}</p>
        <p className="text-red-500 cursor-pointer"
        onClick={()=>{
          setfile(x=> x = null)
          setDatas(x=> x = 0)
          
        }}
        
        >Supprimer</p>
        </div>
        {/*  { <span className="text-[13px] text-gray-400">{subLabel}</span>} */}
      </div>

      {JSON.parse(datas).length > 0 && JSON.parse(datas).map((result) => (<div className="flex items-center space-x-4">
        <div className="flex items-center flex-1 mt-2 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
          <a
            target="_blank"
            href={`${process.env.BASE_URL}${result}`}
            className="flex items-center justify-between flex-1 space-x-2"
          >
            <p className="text-sm">Télécharger </p>
         {/*    <FaDownload className="h-12 mr-4" /> */}
          </a>
        </div>
      </div>)
        
     
      )}
    </div>
  );
}
}

export default EditPost;

