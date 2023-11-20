"use client";

import { usePathname, useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { FaDownload } from "react-icons/fa";
import { RiAlertLine, RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React, {
 
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputComponent from "@/components/InputComponent";
function CandidatureItem({data}:any) {
  const searchParams = useSearchParams();
  

  const result =data!;
  const user =data!;
 
  const statutData = [
    { name: "Brouillon", code: "0", color: "text-black" },
    { name: "Ouvert", code: "1", color: "text-green-500" },
    { name: "Fermé", code: "2", color: "text-orange-500" },
    { name: "Suspendu", code: "3", color: "text-red-500" },
  ];

  const sexeOptions = [
    {
      label: "Homme",
      value: 0,
    },
    {
      label: "Femme",
      value: 1,
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <p className="pb-2 mb-10 font-semibold border-b-2">
        Les information sur la candidature
      </p>
      <div className="flex flex-1 h-full gap-6 ">
        <div className="w-full h-full p-4 overflow-y-scroll text-sm bg-white border-[1px] border-gray-200 rounded-md scrollbar-hide md:max-w-[600px]">
          <picture>
            <img
              src={`${process.env.BASE_URL}${result.image}`}
              alt="image"
              className="object-cover w-full max-h-[310px] md:max-h-[410px]  rounded-lg"
            />
          </picture>
          <h1 className="my-4 font-bold ">{result.title}</h1>
          <div className="flex flex-col items-center p-4 mb-4 rounded-lg md:items-end bg-slate-100">
            <span
              className={`text-[14px]  text-gray-500  ${
                statutData[parseInt(result.statut)].color
              }  `}
            >
              Etat du concours :{" "}
              {statutData[parseInt(result.statut)].name}
            </span>
            <span className="text-[14px]  text-gray-500   ">
              Date : du{" "}
              {new Date(result.competition.startDateAt).toLocaleDateString(
                "fr-FR"
              )}{" "}
              au{" "}
              {new Date(result.competition.endDateAt).toLocaleDateString(
                "fr-FR"
              )}
            </span>
            <span className="text-[14px]  text-gray-500  ">
              L'age est comprise entre : {result.competition.ageMin} ans et{" "}
              {result.competition.ageMax} ans
            </span>
          </div>
          <p className="text-[14px] text-gray-500 mb-20">
            {parse(result.competition.content || "")}
          </p>
        </div>
        <div className="w-full h-full overflow-y-scroll scrollbar-hide">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="mb-2">Mes informations</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Avatar className="w-[100px] h-[100px]   mb-4">
                  <AvatarImage src={`${process.env.BASE_URL}${user.image}`} />
                  <AvatarFallback>
                    {result.firstName[0]}
                    {result.lastName[0]}
                  </AvatarFallback>
                </Avatar>{" "}
                <div className="grid items-center w-full gap-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <InputComponent
                      value={result.lastName}
                      readonly={true}
                      key={1}
                      label="Nom"
                    />
                    <InputComponent
                      value={result.firstName}
                      readonly={true}
                      key={2}
                      label="Prénom"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <InputComponent
                      value={result.email}
                      readonly={true}
                      withIcon={true}
                      key={3}
                      label="Email"
                      inputType="email"
                    />
                    <InputComponent
                      value={result.number}
                      readonly={true}
                      withIcon={true}
                      key={4}
                      label="Numero de téléphone"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <InputComponent
                      value={result.date}
                      inputType="text"
                      readonly={true}
                      key={3}
                      label="Date de naissance"
                    />
                    <InputComponent
                      value={result.sexe}
                      inputType="text"
                      readonly={true}
                      key={4}
                      label="Sexe"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <InputComponent value={result.nina} key={5} label="Numéro nina" />
                    <InputComponent
                      key={1}
                      label="Adresse complete"
                      value={result.address}
                      readonly={true}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label>Carte nina ou fiche individuelle</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                          <a
                            target="_blank"
                            href={`${process.env.BASE_URL}${result.ninaFile}`}
                            className="flex items-center justify-between flex-1 space-x-2"
                          >
                            <p className="text-sm">Télécharger </p>
                            <FaDownload className="h-12 mr-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardTitle className="mt-4 mb-2">
                Les informations a renseigné pour le concours
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
              <div className="grid gap-6 mt-4 md:grid-cols-2">
                <InputComponent
                  value={result.diplome}
                  key={7}
                  label="Diplôme de nationalité"
                />
                <InputComponent value={result.study} key={8} label="Filiere" />
                <InputComponent
                  value={result.speciality}
                  key={9}
                  label="Spécialité"
                />
                <InputComponent
                  value={result.placeOfGraduation}
                  key={10}
                  label="Lieu d’optention du diplôme"
                />
                <InputComponent
                  value={result.countryOfGraduation}
                  key={11}
                  label="Pays d’optention du diplôme"
                />
                <InputComponent
                  value={result.diplomeNumber}
                  key={12}
                  label="Numero du diplôme"
                />
              </div>
              <CardTitle className="mt-4 mb-2 text-blue-500">
                Les pieces jointes
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
              <div className="grid gap-6 mt-4 md:grid-cols-2">
                {fileFunction("Une copie d'acte de naissance","ou  jugement supplétif en tenant lieu", result.birthDateFile)}
                {fileFunction("Un extrait du casier judiciare","Datant d'au moins de trois(3) mois", result.cassierFile)}
                {fileFunction("Un certificat de bonne vie et moeurs","Un certificat de bonne vie et moeurs valide", result.certificatVie)}
                {fileFunction("Un certificat de nationalité malienne","Un certificat valide", result.certificate)}
                {fileFunction("Un certificat de visite et contre visite","Délivré par une  autorité médicale agréée", result.certificatVisite)}
                {fileFunction("Une copie certifiée conforme du diplome riquis","et son équivalence pour les diplomes étrangers", result.diplomeFile)}
              </div>

              <CardTitle className="mt-4 mb-2 text-green-500">
                Les Diplômes
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
              <div className="grid gap-6 mt-4 md:grid-cols-2">

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  function ItemUser({ label, value }: any) {
    return (
      <div className="flex justify-between w-full p-4 bg-white rounded-md">
        <p className="flex-1 font-bold text-md">{label}</p>
        <p className="font-bold text-md">{value}</p>
      </div>
    );
  }
}

export default CandidatureItem;

function fileFunction(label:String,subLabel:String, result: any) {
  return <div>
   <div className="flex flex-col">
   <Label>{label}</Label>
    <span className="text-[13px] text-gray-400">{subLabel}</span>
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
  </div>;
}

