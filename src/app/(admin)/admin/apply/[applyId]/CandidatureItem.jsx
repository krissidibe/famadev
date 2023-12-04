"use client";

import React, { useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import ButtonComponent from "@/components/ButtonComponent";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import dayjs from "dayjs";
import Link from "next/link";
import { RiAlertLine } from "react-icons/ri";
import { Label } from "@radix-ui/react-label";
import { FaDownload } from "react-icons/fa";
import InputComponent from "@/components/InputComponent";
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

function CandidatureItem({ datas }) {
  const searchParams = useSearchParams();
  const data = datas;
  const dataUser = datas;

  const result = datas;
  const user = datas;
  const router = useRouter();
  const statutOptions = [
    {
      label: "En cours de validation",
      value: 0,
      color: "bg-yellow-500",
    },
    {
      label: "Validé",
      value: 1,
      color: "bg-green-500",
    },
    {
      label: "Refusé",
      value: 3,
      color: "bg-red-500",
    },
  ];

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const [statut, setStatut] = useState(data.statut);
  const [messageAdmin, setMessageAdmin] = useState(data.message);
  const showDialogClick = useRef(null);
  const updateApply = async (value) => {
    const session = await getSession()
    
     
    const res = await fetch(`/api/admin/candidature`, {
      body: JSON.stringify({
        id: result.id,
        statut: value,
        message: messageAdmin,
        updatedAt: new Date(Date.now()),
        admin: session?.user?.email,
      }),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "PATCH",
    });
    const data = await res.json();
    console.log(data);

    setModalData((x) => (x = data.message));
    if (data) {
      showDialogClick.current.click();
      //  modal.onOpen();
    }
  };

 

  return (
    <div className="flex flex-col h-full">
      <AlertModalResponse
        title="Candidature modifier"
        refModal={showDialogClick}
        message={"La candidature est modifier"}
        handleClick={() => {
          router.refresh()
          const timer = setTimeout(() => {
      
              router.back()
          }, 300);
          return () => clearTimeout(timer);
          showDialogClick.current = null
          /*  router.back({
        
          query: { name: 'Someone' }
      }, '/about'); */
        }}
      />

      <p className="pb-2 mb-10 font-semibold border-b-2">
        Les informations sur la candidature
      </p>
      <div className="flex flex-1 h-full gap-6">
        <div className="w-1/2">
          <Card className="mb-10 ">
            <CardHeader>
              <CardTitle className="mb-2">
                Les informations du candidat
              </CardTitle>
             {/*  <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <div>
                <Avatar className="w-[100px] h-[100px]   mb-4">
                  <AvatarImage src={`${process.env.BASE_URL}${user.image}`} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>{" "}
                <div className="grid items-center w-full gap-4">
                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={user.firstName}
                      readonly={true}
                      key={1}
                      label="Nom"
                    />
                    <InputComponent
                      value={user.lastName}
                      readonly={true}
                      key={2}
                      label="Prénom"
                    />
                  </div>
                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={user.email}
                      readonly={true}
                      withIcon={true}
                      key={3}
                      label="Email"
                      inputType="email"
                    />
                    <InputComponent
                      value={user.number}
                      readonly={true}
                      withIcon={true}
                      key={4}
                      label="Numero de téléphone"
                    />
                  </div>

                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={dayjs(user.birthDate).format("DD/MM/YYYY")}
                      inputType="text"
                      readonly={true}
                      key={3}
                      label="Date de naissance"
                    />
                    <InputComponent
                      value={result.placeBirthDate}
                      inputType="text"
                      readonly={true}
                      key={3}
                      label="Lieu de naissance"
                    />
                    <InputComponent
                      value={user.sexe}
                      inputType="text"
                      readonly={true}
                      key={4}
                      label="Sexe"
                    />
                    <InputComponent
                      value={user.address}
                      inputType="text"
                      readonly={true}
                      key={4}
                      label="Adresse de domiciliation"
                    />
                  </div>
                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={user.nina}
                      key={5}
                      label="Numéro nina"
                    />
                  </div>
                </div>
              </div>

              <CardTitle className="mt-4 mb-4">
                Les informations à renseigner pour le concours
              </CardTitle>

                {result.groupsRequired.length > 0 &&  
              
              <InputComponent
                    
              value={result.groupsRequired}
             
                             
                              label={"Niveau"}
                               
                              
                          
                            />
                }
            {/*   <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription> */}
              <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">
             
                 { JSON.parse(result.inputsRequired).map(item => ( 
    
    <InputComponent
                    
    value={item.value}
    name={item}
                    key={item.name}
                    label={item.name}
                   
                    
                   
                  />
 
 ))}  

 
            
               

 
              </div>

              <CardTitle className="mt-4 mb-2 text-blue-500">
                Les pieces jointes
              </CardTitle>
            {/*   <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription> */}
              
             {result.filesRequired != null && 
             <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">
              {JSON.parse(result.filesRequired).map(item=>(
                 fileFunctionCustom(
                 
                
                  item.name,
                  item.value
                )
              ))}
              </div>}
             {result.filesRequired == null &&  <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">
              {fileFunction(
                  "La copie d'acte de naissance",
                  "ou  jugement supplétif en tenant lieu",
                  result.birthDateFile
                )}
                {fileFunction(
                  "L'extrait du casier judiciaire",
                  "Datant d'au moins de trois(3) mois",
                  result.cassierFile
                )}
                {fileFunction(
                  "Le certificat de bonne vie et moeurs",
                  "Un certificat de bonne vie et moeurs valide",
                  result.certificatVie
                )}
                {fileFunction(
                  "Le certificat de nationalité malienne",
                  "Un certificat valide",
                  result.certificate
                )}
                 {fileFunction(
                  "La copie certifiée conforme du diplome requis",
                  "et son équivalence pour les diplomes étrangers",
                  result.diplomeFile
                )}
                {fileFunction(
                  "Le certificat de visite et contre visite",
                  "Délivré par une  autorité médicale agréée",
                  result.certificatVisite
                )}
                 {fileFunction(
                  "L'équivalence du diplômes requis pour les diplômes étrangers",
                  "et son équivalence pour les diplomes étrangers",
                  result.equivalenceFile
                )}
               
                {fileFunction(
                  "La copie de la carte nina ou la fiche individuelle",
                  "",
                  result.ninaFile
                )}
                  {fileFunction(
                  "La copie de la pièce d’identité",
                  "",
                  result.infoCardFile
                )}
                 {fileFunction(
                  "La demande manuscrite timbrée",
                  "",
                  result.demandeFile
                )}
              </div>}
{/* 
              <CardTitle className="mt-4 mb-2 text-green-500">
                Les Diplômes
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
              <div className="grid gap-6 pb-20 mt-4 md:grid-cols-2">
                {result.def.toString().includes("files/") &&
                  fileFunction("Def", "", result.def)}

                {result.bac.toString().includes("files/") &&
                  fileFunction("Bac", "", result.bac)}

                {result.licence.toString().includes("files/") &&
                  fileFunction("Licence", "", result.licence)}
                   {user.maitrise.toString().includes("files/")  && fileFunction(
                  "Maitrise",
                  "",
                  user.maitrise
                )}

                {result.master1.toString().includes("files/") &&
                  fileFunction("Master1", "", result.master1)}

                {result.master2.toString().includes("files/") &&
                  fileFunction("Master2", "", result.master2)}
              </div> */}
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 mb-10 ">
          <CardHeader>
            <CardTitle className="mb-2">
            Traitement de la candidature
            </CardTitle>
          {/*   <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
              tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
              Pellentesque vitae Integer tempor
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-4 mt-4 text-md text-[#50a1ef]">
            N° Enregistrement : {data.numeroRef}{" "}
            </p>
            <div className="flex justify-between my-4">
              <div>Etat de la candidature : </div>

              <div className="flex flex-col space-y-1.5">
                <Select
                  defaultValue={statut}
                  onValueChange={(e) => setStatut(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sexe" />
                    <SelectContent position="popper">
                      <SelectItem value="0">En attente de traitement</SelectItem>
                      <SelectItem value="1">Validé</SelectItem>
                      <SelectItem value="2">Refusé</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>

            <div>Motif : </div>
            <textarea
              value={messageAdmin}
              onChange={(e) => setMessageAdmin(e.target.value)}
              className="w-full p-4 my-4 border-2 h-[300px] outline-none h-1/2"
            ></textarea>
            <div className="flex flex-col space-y-4">
              <ButtonComponent
                handleClick={() => updateApply(statut)}
                className=""
                full={true}
                label={"Modifier la candidature"}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  function ItemUser({ label, value }) {
    return (
      <div className="flex justify-between w-full p-4 bg-white rounded-md">
        <p className="flex-1 font-bold text-md">{label}</p>
        <p className="font-bold text-md">{value}</p>
      </div>
    );
  }
}

export default CandidatureItem;

function fileFunctionCustom(label,  result) {
  return (
    <div key={label}   >
      <div className="flex flex-col">
        <Label className="mb-2">{label}</Label>
        {/*  { <span className="text-[13px] text-gray-400">{subLabel}</span>} */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
          <a
            target="_blank"
            href={`${process.env.BASE_URL}${result}`}
            className="flex items-center justify-between flex-1 space-x-2"
          >
            <p className="text-sm">Télécharger </p>
            <FaDownload className="h-12 mr-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
function fileFunction(label, subLabel = "", result) {
  return (
    <div key={label} className={result.length <= 15 ? "hidden" :""} >
      <div className="flex flex-col">
        <Label className="mb-2">{label}</Label>
        {/*  { <span className="text-[13px] text-gray-400">{subLabel}</span>} */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
          <a
            target="_blank"
            href={`${process.env.BASE_URL}${result}`}
            className="flex items-center justify-between flex-1 space-x-2"
          >
            <p className="text-sm">Télécharger </p>
            <FaDownload className="h-12 mr-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
