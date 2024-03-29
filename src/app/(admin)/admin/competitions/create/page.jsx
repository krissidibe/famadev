"use client";
import React, { useState, useRef } from "react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiFillPicture } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { convertToHTML } from "draft-convert";
import { v4 as uuidv4 } from "uuid";
import { Switch } from "@/components/ui/switch";
import { redirect, useRouter } from "next/navigation";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
import { DeleteIcon, EditIcon, PlusCircleIcon, PlusIcon, SaveIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function EditorComponent({ value, handleChange }) {
  return (
    <div className="bg-[#F8F9FA] min-h-[500px]  mb-6 p-2 shadow-lg">
      <Editor
        editorState={value}
        onEditorStateChange={(newState) => {
          handleChange(newState);
        }}
      />
    </div>
  );
}
const CreateCompetition = ()=> { 
  const { data: session, status } = useSession()


  const adminRole  = JSON.parse(session?.user.adminRole)
  const [visible, setVisible] = useState(true);
  
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [letterNumber, setLetterNumber] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [statut, setStatutSelect] = useState({ name: "Brouillon", code: "0" });
  const [startDateAt, setStartDateAt] = useState(null);
  const [endDateAt, setEndDateAt] = useState(null);
  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];
  const router = useRouter();
  const [orderOfMagistrates, setOrderOfMagistrates] = useState(false);
  const [def, setDef] = useState(false);
  const [bac, setBac] = useState(false);
  const [inputsRequired, setInputsRequired] = useState([]);
  const [groupsRequired, setGroupsRequired] = useState([]); 
  const [groupsRequiredParent, setGroupsRequiredParent] = useState([]); 
  const [groupNameRequiredParent, setGroupNameRequiredParent] = useState("");
  const [groupNameRequiredParentElement, setGroupNameRequiredParentElement] = useState(null);
  const [groupNameRequired, setGroupNameRequired] = useState("");
  const [filesRequired, setFilesRequired] = useState([]);
  const [fileNameRequired, setFileNameRequired] = useState("");
  const [inputNameRequired, setInputNameRequired] = useState("");
  const [curentFileItem, setCurentFileItem] = useState();
  const [curentInputItem, setCurentInputItem] = useState();
  const [curentGroupItem, setCurentGroupItem] = useState();
  const [licence, setLicence] = useState(false);
  const [maitrise, setMaitrise] = useState(false);
  const [master1, setMaster1] = useState(false);
  const [master2, setMaster2] = useState(false);
  const showDialogClick = useRef(null);
  const [message, setMessage] = useState("");


  let interval;
  const launchTimer = () => {
    interval = setTimeout(() => {
      showDialogClick.current.click();
      setTitleModal((x) => (x = "Impossible"));
      setModalData(
        (x) =>
          (x =
            "Problème de connexion internet veuillez réessayer ultérieurement")
      );
      setVisible((x) => (x = true));
    }, 60000);
  };
  const createData = async (e) => {
    e.preventDefault();
 
    launchTimer();
    

    setVisible((x) => (x = false));
    
    const valueContent = convertToHTML(content.getCurrentContent());

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("ageMax", ageMax);
    formData.append("letterNumber", letterNumber);
    formData.append("ageMin", ageMin);
    formData.append("valueContent", valueContent);
    formData.append("startDateAt", startDateAt);
    formData.append("endDateAt", endDateAt);
    formData.append("statut", statut.code);
    formData.append("adminRoleId", adminRole.id);

    formData.append("orderOfMagistrates", orderOfMagistrates);
    formData.append("filesRequired", JSON.stringify(filesRequired));
    formData.append("inputsRequired", JSON.stringify(inputsRequired));
    formData.append("groupsRequired", JSON.stringify(groupsRequired));
    formData.append("groupsRequiredParent", JSON.stringify(groupsRequiredParent));
    formData.append("def", def);
    formData.append("bac", bac);
    formData.append("licence", licence);
    formData.append("maitrise", maitrise);
    formData.append("master1", master1);
    formData.append("master2", master2);
 

    const res = await fetch(`/api/admin/competition`, {
      body: formData,

      method: "POST",
    });
    const data = await res.json();

    if (res.status == 200) {
      showDialogClick.current.click();
      setMessage("Concours ajouté avec succès !");
    }
    /* 
       redirect("/admin") */
  };

  if (status !== "authenticated") {
    return <p>Error</p>
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => createData(e)}
      className="flex flex-col"
    >
     
      <AlertModalResponse
        title=""
        refModal={showDialogClick}
        message={message}
        handleClick={() => {
          router.refresh();
          router.push("/admin/competitions");
        }}
      />
       
      <p className="mb-2 text-lg font-bold">Phtoto de couverture</p> 
      <picture
        onClick={() => {
          imageRef.current.click();
        }}
        className="w-[870px] cursor-pointer h-[400px] mb-6 bg-white flex  justify-center border items-center border-dashed do rounded-lg "
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="image"
            className="object-contain w-full h-full rounded-lg"
          />
        ) : (
        <>
          <Image
          src="/images/logo_fama.png?33"
          alt="me"
          className="cursor-pointer rounded-xl "
          width={320}
          height={320}
        />
        </>
        )}
      </picture>

      <input
        className="hidden block w-full p-2 text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        ref={imageRef}
        onChange={(e) => {
          if (!e.target.files[0].type.startsWith("image/")) return;
          setImage(e.target.files[0]);
        }}
      />
      <InputComponent
        key={1}
        label={"Titre"}
        value={title}
        handleChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div className="flex w-full gap-4 my-4">
        <div className="flex flex-col w-full">
          <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
            Statut
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
      </div>
      <div className="flex w-full gap-4 my-2">
        <div className="flex gap-4 ">
          <InputComponent
            value={startDateAt}
            handleChange={(e) => {
              setStartDateAt(e.target.value);
            }}
            withIcon={true}
            key={4}
            inputType="datetime-local"
            label="Date debut"
          />
          <InputComponent
            value={endDateAt}
            handleChange={(e) => {
              setEndDateAt(e.target.value);
            }}
            withIcon={true}
            key={4}
            inputType="datetime-local"
            label="Date fin"
          />
        </div>
        <div className="flex gap-4 ">
          <InputComponent
            key={2}
            label={"Age minimum"}
            value={ageMin}
            inputType="number"
            handleChange={(e) => {
              setAgeMin(e.target.value);
            }}
          />
          <InputComponent
            key={3}
            label={"Age maximum"}
            value={ageMax}
            inputType="number"
            handleChange={(e) => {
              setAgeMax(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex self-end flex-col w-[380px] mt-4 space-y-4 border-2 p-4">
        <h1 className="flex items-center justify-between mb-4 font-bold text-md">
          <InputComponent
            key={3}
            label={"Lettre de référence"}
            value={letterNumber}
            inputType="text"
            handleChange={(e) => {
              setLetterNumber(e.target.value);
            }}
          />
        </h1>

        <h1 className="flex items-center justify-between font-bold text-md"></h1>

        {/*  
        <h1 className="font-bold text-md">
          Les documents a fournir pour le concours
        </h1>
    */}

        {/*  <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Def</p> <Switch checked={def}
                      onCheckedChange={(x) =>setDef(x => x=!x)}   />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Bac</p> <Switch checked={bac}
                      onCheckedChange={(x) =>setBac(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Licence</p> <Switch checked={licence}
                      onCheckedChange={(x) =>setLicence(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Maitrise</p> <Switch checked={maitrise}
                      onCheckedChange={(x) =>setMaitrise(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 1</p> <Switch checked={master1}
                      onCheckedChange={(x) =>setMaster1(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 2</p> <Switch checked={master2}
                      onCheckedChange={(x) =>setMaster2(x => x=!x)} />
        </div> */}
      </div>

      <p className="text-[14px] text-gray-500 mt-8">
        <EditorComponent value={content} handleChange={(v) => setContent(v)} />
      </p>
      <hr />
{/* {JSON.stringify(groupsRequired)} */}
      <div className="flex flex-col p-4 border rounded-md bg-white/10">
<div className="flex items-center justify-between gap-10">
<p>Type de niveau</p>
        <input type="text" value={groupNameRequiredParent}
          onChange={(e)=>{
            setGroupNameRequiredParent((x) => (x = e.target.value));
          }}
              className="h-[45px] flex-1 border-2 p-4" />
        <button 
        type="button"
    onClick={()=>{


      if (groupNameRequiredParentElement) {
        const nextShapes = groupsRequiredParent.map((shape) => {
          if (shape.id != groupNameRequiredParentElement.id) {
            // No change
            return shape;
          } else {
            // Return a new circle 50px below
            return {
              ...shape,
              name: groupNameRequiredParent,
              
            };
          }
        });
        // Re-render with the new array
        setGroupsRequiredParent(nextShapes);
        setGroupNameRequiredParent((x) => (x = ""));
        setGroupNameRequiredParentElement((x) => (x = null));
        return;
      }






      setGroupsRequiredParent((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: groupNameRequiredParent,
          value:""
         
        },
      ]);

       setGroupNameRequiredParent((x) => (x = ""));
      setGroupNameRequiredParentElement((x) => (x = null));
    }}
        className="p-2 bg-white border rounded-md cursor-pointer">{groupNameRequiredParentElement ? "Modifier" : "Ajouter"}</button>
</div>
        <div className="flex gap-4 pt-6 mt-4 border-t border-black">

      {groupsRequiredParent.map(item =>(
        <div onClick={()=>{
          setGroupNameRequiredParent(x=> x = item.name)
          setGroupNameRequiredParentElement(x=> x = item)
        }} className={`flex gap-4 p-3 rounded-md cursor-pointer ${groupNameRequiredParentElement == item ? "bg-green-200" :"bg-zinc-200"}  `}>
          <p className="font-bold">{item.name}</p> <div className="flex items-center gap-2 ml-10">
            <DeleteIcon
            onClick={()=>{
              setGroupsRequiredParent((current) =>
                current.filter((fruit) => fruit.id !== item.id)
              );
              

              setGroupsRequired((current) =>
              current.filter((fruit) => fruit.parentElement !== item.id)
            );

            setTimeout(() => {
              setGroupNameRequiredParentElement(x=> x = null)
            }, 500);

            }}
            className="cursor-pointer "/>
            <EditIcon className="w-5 h-5 cursor-pointer"/>
          </div>
        </div>
      ))}
        </div>
       {groupNameRequiredParentElement != null && 
        <div className="flex gap-4 pt-6 mt-4 border-t border-black">

        <div className="flex flex-col self-end w-full p-4 mt-4 mb-4 space-y-2 border-2">
        <div className="flex items-end justify-between mb-4 font-bold text-md">
          <InputComponent
            key={219}
            label={"Nom du champ"}
            value={groupNameRequired}
            inputType="text"
            handleChange={(e) => {
              setGroupNameRequired((x) => (x = e.target.value));
            }}
          />

          <div className="flex flex-row items-end justify-end flex-1 mb-1">
            <div
              onClick={(e) => {
                if (curentGroupItem) {
                  const nextShapes = groupsRequired.map((shape) => {
                    if (shape.id != curentGroupItem.id) {
                      // No change
                      return shape;
                    } else {
                      // Return a new circle 50px below
                      return {
                        ...shape,
                        name: groupNameRequired,
                        
                      };
                    }
                  });
                  // Re-render with the new array
                  setGroupsRequired(nextShapes);
                  setGroupNameRequired((x) => (x = ""));
                  setCurentGroupItem((x) => (x = null));
                  return;
                }

                setGroupsRequired((prev) => [
                  ...prev,
                  {
                    id: uuidv4(),
                    name: groupNameRequired,
                    parentElement: groupNameRequiredParentElement.id,
                    type: "select",
                    children: [],
                  },
                ]);
                setGroupNameRequired((x) => (x = ""));
              }}
              className="self-end p-2 ml-2 text-xs text-white bg-green-500 rounded-sm"
            >
              {curentGroupItem ? "Modifier" : "Ajouter"}{" "}
            </div>
            {curentGroupItem   && (
              <div
                onClick={() => {
                  setGroupNameRequired((x) => (x = ""));
                  setCurentGroupItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            )}
          </div>
        </div>

 

        {groupsRequired.map((item) => 


<Accordion key={item.id}  type="single" collapsible>
  
{item.parentElement == groupNameRequiredParentElement?.id && <AccordionItem value="item-1">
    <AccordionTrigger className="">
      <div
      onClick={()=>{
        setCurentGroupItem((x) => (x = item));
      }}
      className="flex items-center justify-center w-full p-2 border">
            <p className="flex-1 text-left">{item.name}</p> 
            <div className="flex items-center justify-center">
              <PlusCircleIcon
                className="z-50 cursor-pointer"
                onClick={(e) => {
                 e.stopPropagation()

                 const childrenArray = item.children;
                
                 childrenArray.push({
                  id: uuidv4(),
                  name: "",
                  value: "",
                  type: "text",
                  isCheck : false
                  
                })
              
              

//                  setCurentGroupItem((x) => (x = item));
         
 
                  if (item) {
                    const nextShapes = groupsRequired.map((shape) => {
                      if (shape.id != item.id) {
                        // No change
                        return shape;
                      } else {
                        // Return a new circle 50px below
                        return {
                          ...shape,
                         children: childrenArray
                          
                        };
                      }
                    });
                    // Re-render with the new array
                    setGroupsRequired(nextShapes);
                   // setSubGroupsRequired(x=> x = [])
                  //  setGroupNameRequired((x) => (x = ""));
                  //  setCurentGroupItem((x) => (x = null));
                  console.log(nextShapes);
                    return;
                  }


                  
        

                  
                  
                }}
              />

              <div
                onClick={() => {
                  setGroupNameRequired((x) => (x = item.name));
                  setCurentGroupItem((x) => (x = item));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-blue-500 rounded-sm"
              >
                Modifier
              </div>

              <div
                onClick={() => {
                  setGroupsRequired((current) =>
                    current.filter((fruit) => fruit.id !== item.id)
                  );

                  setGroupNameRequired((x) => (x = ""));
                  setCurentGroupItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            </div>{" "}
          </div></AccordionTrigger>
    <AccordionContent asChild >
     
   
    {item?.children.map(itemSub=>(
       <div key={itemSub.id} className="flex items-center justify-center gap-3 px-2 py-1">
       
       <Input value={itemSub.name}
       onChange={(e)=>{
        console.log(e.target.value);
        const childrenArray = item.children ;
 
        /*   return {
                        ...shape,
                        name: inputNameRequired,
                      };
                       */
   
        if (item) {
          const subNewValue = childrenArray.map((shape) => {
            if (shape.id != itemSub.id) {
              // No change
              return shape;
            } else {
              // Return a new circle 50px below
              return {
                ...shape,
                name: e.target.value,
                
              };
            }
          });


          const nextShapes = groupsRequired.map((shape) => {
            if (shape.id != item.id) {
              // No change
              return shape;
            } else {
              // Return a new circle 50px below
              return {
                ...shape,
               children: subNewValue
                
              };
            }
          });
          // Re-render with the new array
          setGroupsRequired(nextShapes);
        
      
        
          return;
        }
   
  
   
          
       }}
       />
       <SaveIcon className="cursor-pointer" />
       <DeleteIcon
       onClick={()=>{

        const childrenArray = item.children ;
 
      const arrayNew =   childrenArray.filter((fruit) => fruit.id !== itemSub.id)
 

 
         if (item) {
           const nextShapes = groupsRequired.map((shape) => {
             if (shape.id != item.id) {
               // No change
               return shape;
             } else {
               // Return a new circle 50px below
               return {
                 ...shape,
                children: arrayNew
                 
               };
             }
           });
           // Re-render with the new array
           setGroupsRequired(nextShapes);
       
         
           return;
         }
      
       }}
       className="text-red-500 cursor-pointer hover:text-red-700" />
       
       </div>
    ))}  
    </AccordionContent>
  </AccordionItem>}

</Accordion>
         
        )}
      </div>
        </div>
       }
      </div>
      
 
      
    

      <hr />

      <p className="mt-4 font-bold ">Les champs</p>
      <div className="flex flex-col self-end w-full p-4 mt-4 mb-4 space-y-2 border-2">
        <div className="flex items-end justify-between mb-4 font-bold text-md">
          <InputComponent
            key={129}
            label={"Nom du champ"}
            value={inputNameRequired}
            inputType="text"
            handleChange={(e) => {
              setInputNameRequired((x) => (x = e.target.value));
            }}
          />

          <div className="flex flex-row items-end justify-end flex-1 mb-1">
            <div
              onClick={(e) => {
                if (curentInputItem) {
                  const nextShapes = inputsRequired.map((shape) => {
                    if (shape.id != curentInputItem.id) {
                      // No change
                      return shape;
                    } else {
                      // Return a new circle 50px below
                      return {
                        ...shape,
                        name: inputNameRequired,
                      };
                    }
                  });
                  // Re-render with the new array
                  setInputsRequired(nextShapes);
                  setInputNameRequired((x) => (x = ""));
                  setCurentInputItem((x) => (x = null));
                  return;
                }

                setInputsRequired((prev) => [
                  ...prev,
                  {
                    id: uuidv4(),
                    value: "",
                    name: inputNameRequired,
                    type: "input",
                    isCheck : false
                  },
                ]);
                setInputNameRequired((x) => (x = ""));
              }}
              className="self-end p-2 ml-2 text-xs text-white bg-green-500 rounded-sm"
            >
              {curentInputItem ? "Modifier" : "Ajouter"}{" "}
            </div>
            {curentInputItem && (
              <div
                onClick={() => {
                  setInputNameRequired((x) => (x = ""));
                  setCurentInputItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            )}
          </div>
        </div>

        {inputsRequired.map((item) => (
          <div key={item.id} className="flex items-center justify-center p-2 border">
            {" "}
            <p className="flex-1">{item.name}</p>{" "}
            <div className="flex">
              <div
                onClick={() => {
                  setInputNameRequired((x) => (x = item.name));
                  setCurentInputItem((x) => (x = item));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-blue-500 rounded-sm"
              >
                Modifier
              </div>

              <div
                onClick={() => {
                  setInputsRequired((current) =>
                    current.filter((fruit) => fruit.id !== item.id)
                  );

                  setInputNameRequired((x) => (x = ""));
                  setCurentInputItem((x) => (x = null));
                }}
                className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm"
              >
                X
              </div>
            </div>{" "}
          </div>
        ))}
      </div>

      {/* Piece */}
      <hr />
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

        {filesRequired.map((item) => (
          <div key={item.id} className="flex items-center justify-center p-2 border">
            {" "}
            <p className="flex-1">{item.name}</p>{" "}
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
      </div>
      <div className="flex items-end justify-end w-full my-4">
        {visible ? (
          <ButtonComponent
            key={4}
            label="Enregistrer"
            className="max-w-[130px]  "
            type="submit"
            full={true}
          />
        ) : 
        <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <p className="animate-pulse text-dark ">Envoi en cours...</p>
                </div>
        }
      </div>
    </form>
  );
}

export default CreateCompetition;
