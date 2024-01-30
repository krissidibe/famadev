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
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CreatePost({datasType}) {


  const [visible, setVisible] = useState(false);
  const [file, setfile] = useState(null);
  const [filesRequired, setFilesRequired] = useState([]);
  const [fileNameRequired, setFileNameRequired] = useState("");
  const [inputNameRequired, setInputNameRequired] = useState("");
  const [curentFileItem, setCurentFileItem] = useState();
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

  const handleChangeFileRequired = (item,e) => {
    
    
    const nextShapes = dataFiles.map(shape => {
      if (shape.id != item.id) {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          value:   e.files[0],
        };
      }
    });
    // Re-render with the new array
    setDataFiles(nextShapes);
 
    
  };

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
 
  
  const res =  await fetch(`/api/admin/post`, {
      body: formData,
     
      method: "POST",
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
      
 {JSON.stringify(filesRequired)}

      <p className="mt-4 font-bold ">Les pièces à fournir</p>
      <div className="flex flex-col self-end w-full p-4 mt-4 space-y-2 border-2">
        <div className="flex items-end justify-between mb-4 font-bold text-md">
          <InputComponent
            key={10}
            label={"Les pièces à fournir"}
            value={fileNameRequired}
            inputType="text"
            handleChange={(e) => {
              setFileNameRequired((x) => (x = e.target.value));
            }}
          />

          <div className="flex flex-row items-end justify-end flex-1 mb-1">
            <div
              onClick={(e) => {
                if (curentFileItem) {
                  const nextShapes = filesRequired.map((shape) => {
                    if (shape.id != curentFileItem.id) {
                      // No change
                      return shape;
                    } else {
                      // Return a new circle 50px below
                      return {
                        ...shape,
                        name: fileNameRequired,
                      };
                    }
                  });
                  // Re-render with the new array
                  setFilesRequired(nextShapes);
                  setFileNameRequired((x) => (x = ""));
                  setCurentFileItem((x) => (x = null));
                  return;
                }

                setFilesRequired((prev) => [
                  ...prev,
                  {
                    id: uuidv4(),
                    value: "",
                    name: fileNameRequired,
                    type: "file",
                    isCheck : false
                  },
                ]);
                setFileNameRequired((x) => (x = ""));
              }}
              className="self-end p-2 ml-2 text-xs text-white bg-green-500 rounded-sm"
            >
              {curentFileItem ? "Modifier" : "Ajouter"}{" "}
            </div>
            {curentFileItem && (
              <div
                onClick={() => {
                  setFileNameRequired((x) => (x = ""));
                  setCurentFileItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            )}
          </div>
        </div>

    {/*     {JSON.stringify(filesRequired)}

        {filesRequired.map((item) => (
          <div key={item.id} className="flex items-center justify-center p-2 border">
            {" "}
            <p className="flex-1">{item.name}</p>
            <InputComponent
label={item.value == "File not" && item.name}
                
                name = {item.name}
                handleChange={(e) => {
                  handleChangeFileRequired(item,e.target);
                }}
                key={item.name}
                inputType="file" 
              
                
              />
            <div className="flex">
              <div
                onClick={() => {
                  setFileNameRequired((x) => (x = item.name));
                  setCurentFileItem((x) => (x = item));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-blue-500 rounded-sm"
              >
                Modifier
              </div>

              <div
                onClick={() => {
                  setFilesRequired((current) =>
                    current.filter((fruit) => fruit.id !== item.id)
                  );

                  setFileNameRequired((x) => (x = ""));
                  setCurentFileItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            </div>{" "}
          </div>
        ))} */}
      </div>

      {filesRequired.map((item) => (
          <div key={item.id} className="flex items-center justify-center p-2 pl-4 border">
            {" "}
            <p className="flex-1">{item.name}</p>{" "}

            <input type="file" />
            <div className="flex">
              <div
                onClick={() => {
                  setFileNameRequired((x) => (x = item.name));
                  setCurentFileItem((x) => (x = item));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-blue-500 rounded-sm"
              >
                Modifier
              </div>

              <div
                onClick={() => {
                  setFilesRequired((current) =>
                    current.filter((fruit) => fruit.id !== item.id)
                  );

                  setFileNameRequired((x) => (x = ""));
                  setCurentFileItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            </div>{" "}
          </div>
        ))}
   
 
      <div className="flex items-end justify-end w-full my-4">
        {!visible ? (
          <ButtonComponent
            key={4}
            label="Enregistrer"
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
