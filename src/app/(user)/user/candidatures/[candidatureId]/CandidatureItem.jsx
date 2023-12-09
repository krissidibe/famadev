"use client";

import { usePathname,useRouter, useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import UserPdf from "@/components/PDF/UserPdf";
import UserPdfNew from "@/components/PDF/UserPdfNew";
import { FaDownload } from "react-icons/fa";
import { RiAlertLine, RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
import React, { FormEvent, useRef, useState,useEffect } from "react";
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
import BackComponent from "@/components/BackComponent";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "@/components/ButtonComponent";
function CandidatureItem({ data }) {
  const searchParams = useSearchParams();

  const result = data.competition;
  const user = data;

  const statutData = [
    { name: "Brouillon", code: "0", color: "text-black" },
    { name: "Ouvert", code: "1", color: "text-green-500" },
    { name: "Fermé", code: "2", color: "text-orange-500" },
    { name: "Suspendu", code: "3", color: "text-red-500" },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const statutOptions = [
    {
      label: "En attente de traitement",
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
  const routerPaht = useRouter();
  const showDialogClick = useRef(null);
  const [titleModal, setTitleModal] = useState("");
  const [modalData, setModalData] = useState("");
 
  const [dataUser, setDataUser] = useState({
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    number: user.number,
    birthDate: user.birthDate,
    placeBirthDate: user.placeBirthDate,
    sexe: user.sexe,
    address: user.address,
    nina: user.nina,

    diplome: user.diplome,
    study: user.study,
    speciality: user.speciality,
    placeOfGraduation: user.placeOfGraduation,
    countryOfGraduation: user.countryOfGraduation,
    diplomeNumber: user.diplomeNumber,
    orderOfMagistrates: user.orderOfMagistrates,
  });

  const [ninaFile, setNinaFile] = useState("");
  const [infoCardFile, setInfoCardFile] = useState("");
  const [demandeFile, setDemandeFile] = useState("");

  const [certificate, setCertificate] = useState("");
  const [birthDateFile, setBirthDateFile] = useState("");
  const [cassierFile, setCassierFile] = useState("");
  const [certificatVie, setCertificatVie] = useState("");
  const [certificatVisite, setCertificatVisite] = useState("");
  const [diplomeFile, setDiplomeFile] = useState("");
  const [equivalenceFile, setEquivalenceFile] = useState("");

  const [dataFiles, setDataFiles] = useState(JSON.parse(JSON.parse(JSON.stringify(data.filesRequired))));
  const [dataInputs, setDataInputs] = useState(JSON.parse(JSON.parse(JSON.stringify(data.inputsRequired))));
  const [selectDataGroups, setSelectDataGroups] =  useState(data.groupsRequired);

  const inputs = data.inputsRequired;
useEffect(() => {
  
 
 setDataInputs(JSON.parse(inputs))

  return () => {
    
  }
}, [])


const handleChangeInputRequired = (item,e) => {
   
    
  const nextShapes = dataInputs.map(shape => {
    if (shape.id != item.id) {
      // No change
      return shape;
    } else {
      // Return a new circle 50px below
      return {
        ...shape,
        type:"input",
        value: e,
      };
    }
  });
  // Re-render with the new array
  setDataInputs(nextShapes); 

  return;
  
};

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

  const [editFile, setEditFile] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);


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
      setIsLoading((x) => (x = true));
    }, 10000);
  };

  const updateApply = async (e) => {

    e.preventDefault();

    launchTimer();
    setIsLoading(x => x = false)
if(!checkEdit){
return
}
    
 
if (
      
    
  dataUser.orderOfMagistrates=="" && data.competition.orderOfMagistrates == true  
  ) {
 
    clearInterval(interval);

    showDialogClick.current.click();

  setTitleModal((x) => (x = "Impossible"));
  setModalData((x) => (x = "Veuillez renseigner les champs obligatoires (*)xx"));

  return;
}

    if (
      
      dataUser.lastName.length <= 1 || 
      dataUser.firstName.length <= 1 || 
      dataUser.number.length <= 1 || 
      dataUser.birthDate.length <= 1 || 
      dataUser.placeBirthDate.length <= 1 || 
      dataUser.sexe.length <= 1 || 
      dataUser.address.length <= 1 || 
  
      dataUser.diplome.length <= 1 || 
      dataUser.study.length <= 1 || 
      dataUser.speciality.length <= 1
      ) {
     
        clearInterval(interval);

        showDialogClick.current.click();

      setTitleModal((x) => (x = "Impossible"));
      setModalData((x) => (x = "Veuillez renseigner les champs obligatoires (*)"));
   
      return;
    }


    const formData = new FormData();
    formData.append("candId", data.id);
    formData.append("lastName", dataUser.lastName);
    formData.append("firstName", dataUser.firstName);
    formData.append("email", dataUser.email);
    formData.append("number", dataUser.number);
    formData.append("birthDate", dataUser.birthDate);
    formData.append("placeBirthDate", dataUser.placeBirthDate);
    formData.append("sexe", dataUser.sexe);
    formData.append("address", dataUser.address);
    formData.append("nina", dataUser.nina);

    formData.append("diplome", dataUser.diplome);
    formData.append("study", dataUser.study);
    formData.append("speciality", dataUser.speciality);
    formData.append("placeOfGraduation", dataUser.placeOfGraduation);
    formData.append("countryOfGraduation", dataUser.countryOfGraduation);
    formData.append("diplomeNumber", dataUser.diplomeNumber);
    formData.append("orderOfMagistrates", dataUser.orderOfMagistrates);


    formData.append("certificate", certificate);
    formData.append("birthDateFile", birthDateFile);
    formData.append("cassierFile", cassierFile);
    formData.append("certificatVie", certificatVie);
    formData.append("certificatVisite", certificatVisite);
    formData.append("diplomeFile", diplomeFile);
    formData.append("equivalenceFile", equivalenceFile);
    formData.append("ninaFile", ninaFile);
    formData.append("infoCardFile", infoCardFile);
    formData.append("demandeFile", demandeFile);

    
    dataFiles.map((item =>

      formData.append(item.id, item.value)
      
      
      ))

   
      formData.append("dataFilesArray", JSON.stringify(dataFiles));

    const res = await fetch(`/api/user/candidature`, {
      body: formData,
      method: "PUT",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    setModalData((x) => (x = dataNew.message));

    if (dataNew) {
      setTitleModal(
        (x) =>
          (x =
            dataNew.data == "error"
              ? "Impossible"
              : "Candidature enregistrée avec succès")
      );
      clearInterval(interval);

      showDialogClick.current.click();
    }
  };

  return (
    <form onSubmit={updateApply} className="flex flex-col h-full">
      <AlertModalResponse
        title={titleModal}
        refModal={showDialogClick}
        message={modalData}
    


        handleClick={() => {
          setIsLoading(x => x = true)
          clearInterval(interval);
            if( modalData == "La candidature est modifiée"){
              routerPaht.refresh();
     
              const timer = setTimeout(() => {
      
                 
                routerPaht.push("/user/candidatures");
            }, 300);
            }
                
              
            
        }}
      />
      <BackComponent className="mt-2 mb-4" />
   <div className="flex">
   
   
 
  {<UserPdfNew data={data} className="p-4 text-white bg-green-500" />}
  
{/*  {(data.canEdit  || (data.statut == 0 && new Date(data.competition.endDateAt) > new Date(Date.now()))) &&   <div onClick={()=>{
   setEditFile(x=> x =!x)
   setCheckEdit(data.canEdit ? true : editFile ? false : true)
   }} className="p-4 px-6 text-white bg-blue-500 border-2 rounded-sm cursor-pointer"> {editFile == false ? "Modifier" :"Annuler"}  </div>} */}
   </div>
     {/*  {checkEdit == true && (
        <div className="p-4 border-[1px] border-green-500 flex justify-between  shadow-md rounded-md my-4">
          <div>Vous pouvez modifier les informations de la candidature</div>
          <RiAlertLine className="w-6 h-6 text-green-500" />
        </div>
      )} */}
      <p className="pb-2 mt-4 mb-10 font-semibold border-b-2">
        Informations à propos de votre candidature
      </p>
      <div className="flex flex-col gap-6 md:flex-row ">
        <div className="w-full h-full p-4 overflow-y-scroll text-sm bg-white border-[1px] border-gray-200 rounded-md scrollbar-hide md:max-w-[600px]">
          <div className="flex justify-between pb-4 mb-4 border-b-2">
            <p className="font-semibold mb-4 text-md text-[#50a1ef]">
              N° ENREGISTREMENT : {data.numeroRef}{" "}
            </p>
          </div>
          <div className="flex justify-between pb-4 mb-4 border-b-2">
            <p className="font-semibold text-md ">
              Statut de votre candidature :{" "}
            </p>
            <p
              className={`text-sm font-semibold text-white p-2 rounded ${
                statutOptions[data.statut].color
              }`}
            >
              {" "}
              {statutOptions[data.statut].label}{" "}
            </p>
          </div>
          <div className="w-full h-full p-4 my-4  text-sm bg-white border-[1px] border-gray-200 rounded-md scrollbar-hide md:max-w-[600px]">
            <div className="flex justify-between">
              <p className="font-semibold text-md ">
                Message de l'administrateur{" "}
              </p>
              <RiAlertLine className="w-6 h-6 text-orange-500" />
            </div>
            <div className="p-4 my-4 border-t-2">{data.message}</div>
          </div>
          <div className="w-full h-full p-4  text-sm bg-white border-[1px] border-gray-200 rounded-md scrollbar-hide md:max-w-[600px]">
            <picture>
              <img
                src={`${process.env.BASE_URL}${result.image}`}
                alt="image"
                className="object-contain w-full max-h-[310px] border md:max-h-[410px]  rounded-lg"
              />
            </picture>

            <h1 className="my-4 font-bold ">{result.title}</h1>
            <div className="flex flex-col items-center p-4 mb-4 rounded-lg md:items-end bg-slate-100">
              <span
                className={`text-[14px]  text-gray-500  ${
                  statutData[result.statut].color
                }  `}
              >
                Etat du concours : {statutData[result.statut].name}
              </span>
              <span className="text-[14px]  text-gray-500   ">
                Date : du{" "}
                {new Date(result.startDateAt).toLocaleDateString("fr-FR")} au{" "}
                {new Date(result.endDateAt).toLocaleDateString("fr-FR")}
              </span>
              <span className="text-[14px]  text-gray-500  ">
                L'age est comprise entre : {result.ageMin} ans et{" "}
                {result.ageMax} ans
              </span>
            </div>
            <p className="text-[14px] text-gray-500 mb-20">
              {parse(result.content.toString().substring(0, 400) + "..." || "")}
            </p>
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll scrollbar-hide">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="mb-2">Mes informations</CardTitle>
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
                    {dataUser.firstName[0]}
                    {dataUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>{" "}

                
               
                <div className="grid items-center w-full gap-4">
                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={dataUser.lastName}
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, lastName: e.target.value })
                      }
                      readonly={!checkEdit}
                      key={1}
                      label="Nom"
                      required={`${checkEdit ? "*" : ""}`}
                    />
                    <InputComponent
                      value={dataUser.firstName}
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, firstName: e.target.value })
                      }
                      readonly={!checkEdit}
                      key={2}
                      label="Prénom"
                      required={`${checkEdit ? "*" : ""}`}
                    />
                  </div>
                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      value={dataUser.email}
                      readonly={true}
                      withIcon={true}
                      key={3}
                      label="Email"
                      inputType="email"
                      required={`${checkEdit ? "*" : ""}`}
                    />
                    <InputComponent
                      value={dataUser.number}
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, number: e.target.value })
                      }
                      readonly={!checkEdit}
                      withIcon={true}
                      key={4}
                      label="Numero de téléphone"
                      required={`${checkEdit ? "*" : ""}`}
                    />
                  </div>

                  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                    <InputComponent
                      //  value={     dayjs(dataUser.birthDate).format("DD/MM/YYYY")  }
                      value={dayjs(dataUser.birthDate).format("YYYY-MM-DD")}
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, birthDate: e.target.value })
                      }
                      readonly={!checkEdit}
                      inputType="date"
                      key={5}
                      label="Date de naissance"
                      required={`${checkEdit ? "*" : ""}`}
                    />
                    <InputComponent
                      value={dataUser.placeBirthDate}
                      inputType="text"
                      handleChange={(e) =>
                        setDataUser({
                          ...dataUser,
                          placeBirthDate: e.target.value,
                        })
                      }
                      readonly={!checkEdit}
                      key={6}
                      label="Lieu de naissance"
                      required={`${checkEdit ? "*" : ""}`}
                    />

                    {checkEdit ? (
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">
                          <span>Sexe</span>{" "}
                          <span className="text-red-500">*</span>{" "}
                        </Label>
                        <Select
                          defaultValue={dataUser.sexe}
                          onValueChange={(e) =>
                            setDataUser({ ...dataUser, sexe: e })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sexe" />
                            <SelectContent position="popper">
                              <SelectItem value="Homme">Homme</SelectItem>
                              <SelectItem value="Femme">Femme</SelectItem>
                            </SelectContent>
                          </SelectTrigger>
                        </Select>
                      </div>
                    ) : (
                      <InputComponent
                        value={dataUser.sexe}
                        inputType="text"
                        readonly={true}
                        key={7}
                        label="Sexe"
                      />
                    )}

                    <InputComponent
                      key={8}
                      label="Adresse de domiciliation"
                      value={dataUser.address}
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, address: e.target.value })
                      }
                      readonly={!checkEdit}
                      required={`${checkEdit ? "*" : ""}`}
                    />
                    <InputComponent
                      value={dataUser.nina}
                      key={9}
                      label="Numéro nina"
                      handleChange={(e) =>
                        setDataUser({ ...dataUser, nina: e.target.value })
                      }
                      readonly={!checkEdit}
                    />

                    {/*   <div>
                      <Label>Carte nina ou fiche individuelle</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                          <a
                            target="_blank"
                            href={`${process.env.BASE_URL}${user.ninaFile}`}
                            className="flex items-center justify-between flex-1 space-x-2"
                          >
                            <p className="text-sm">Télécharger </p>
                            <FaDownload className="h-12 mr-4" />
                          </a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <CardTitle className="mt-4 mb-4">
                Informations à propos du concours
              </CardTitle>

              {selectDataGroups.length > 0 &&  
              
              <InputComponent
                    
              value={selectDataGroups}
              name={"Niveau"}
                             
                              label={"Niveau"}
                              required={`${checkEdit ? "*" : ""}`}
                              
                              handleChange={(e) => {
                                if(!checkEdit){
                                  return;
                                }
                                setSelectDataGroups(x=> x =e.target.value);
                              }}
                            />
                }
              
              <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">
              {dataInputs.length > 0 && dataInputs.map(item => ( 
    
    <InputComponent
                    
    value={item.value}
    name={item}
                    key={item.name}
                    label={item.name}
                    required={`${checkEdit ? "*" : ""}`}
                    
                    handleChange={(e) => {
                      if(!checkEdit){
                        return;
                      }
                      handleChangeInputRequired(item,e.target.value);
                    }}
                  />
 
 ))}
               {/*  <InputComponent
                    value={dataUser.diplome}
                  handleChange={(e) =>
                    setDataUser({ ...dataUser, diplome: e.target.value })
                  }
                  readonly={!checkEdit}
                  key={47}
                  label="Diplôme"
                   
                />
               */}
              </div>
              <CardTitle className="mt-4 mb-2 text-blue-500">
                Les pieces jointes
              </CardTitle>
              {/*   <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription> */}

 

              {data.filesRequired != null && <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">

             {dataFiles.map(item=>(
               checkEdit ? ( <InputComponent
                checkFileIcon={birthDateFile != ""}
                name = {item.name}
                handleChange={(e) => {
                  handleChangeFileRequired(item,e.target);
                }}
                key={item.name}
                inputType="file"
                required="*"
                label={item.name}
                
              />) : fileFunctionCutom(
               item.name,
               
               item.value
              ) 
             ))}
              

              </div>  }
             
            {data.filesRequired == null &&   <div className="grid gap-6 mt-4 min-[1720px]:grid-cols-2">
{checkEdit ? ( <InputComponent
                    checkFileIcon={birthDateFile != ""}
                    handleChange={(e) => {
                      setBirthDateFile(e.target.files[0]);
                    }}
                    key={21}
                    inputType="file"
                    required="*"
                    label="Une copie d'acte de naissance"
                    
                  />) : fileFunction(
                    "La copie d'acte de naissance",
                    "ou  jugement supplétif en tenant lieu",
                    user.birthDateFile
                  ) }
              

                


                { checkEdit ?   <InputComponent
                    checkFileIcon={cassierFile != ""}
                    handleChange={(e) => {
                      setCassierFile(e.target.files[0]);
                    }}
                    key={22}
                    inputType="file"
                    required="*"
                    label=" Un extrait du casier judiciaire"
                    
                  />  :fileFunction(
                  "L'extrait du casier judiciaire",
                  "Datant d'au moins de trois(3) mois",
                  user.cassierFile
                )}


                {checkEdit ? <InputComponent
                    checkFileIcon={certificatVie != ""}
                    handleChange={(e) => {
                      setCertificatVie(e.target.files[0]);
                    }}
                    key={23}
                    inputType="file"
                    required="*"
                    label="Un certificat de bonne vie et moeurs"
                   
                  />
 : fileFunction(
                  "Le certificat de bonne vie et moeurs",
                  "Un certificat de bonne vie et moeurs valide",
                  user.certificatVie
                )}
                {checkEdit ? 
                  <InputComponent
                  checkFileIcon={certificate != ""}
                  handleChange={(e) => {
                    setCertificate(e.target.files[0]);
                  }}
                  key={24}
                  inputType="file"
                  required="*"
                  label="Un certificat de nationalité malienne"
                  
                />
                : fileFunction(
                  "Le certificat de nationalité malienne",
                  "Un certificat valide",
                  user.certificate
                )}
                {
                checkEdit ?   <InputComponent
                checkFileIcon={diplomeFile != ""}
                handleChange={(e) => {
                  setDiplomeFile(e.target.files[0]);
                }}
                key={25}
                inputType="file"
                required="*"
                label="Une copie certifiée conforme du diplome requis"
                subLabel=""
              /> :
                fileFunction(
                  "La copie certifiée conforme du diplome requis",
                  "et son équivalence pour les diplomes étrangers",
                  user.diplomeFile
                )}


                {checkEdit ?  <InputComponent
                    checkFileIcon={certificatVisite != ""}
                    handleChange={(e) => {
                      setCertificatVisite(e.target.files[0]);
                    }}
                    key={26}
                    inputType="file"
                    required="*"
                    label="Un certificat de visite et contre visite "
                    
                  /> 
                  : fileFunction(
                  "Le certificat de visite et contre visite",
                  "Délivré par une  autorité médicale agréée",
                  user.certificatVisite
                )}
                {checkEdit ? 
                <InputComponent
                checkFileIcon={equivalenceFile != ""}
                handleChange={(e) => {
                  setEquivalenceFile(e.target.files[0]);
                }}
                key={27}
                inputType="file"
                label="L'équivalence du diplômes requis pour les diplômes étrangers"
                subLabel=""
              />
                : fileFunction(
                  "L'équivalence du diplômes requis pour les diplômes étrangers",
                  "et son équivalence pour les diplomes étrangers",
                  user.equivalenceFile
                )}

                {checkEdit ?  <InputComponent
                    checkFileIcon={infoCardFile != ""}
                    handleChange={(e) => {
                      setInfoCardFile(e.target.files[0]);
                    }}
                    key={29}
                    inputType="file"
                    required="*"
                    label="Une copie de la pièce d’identité en cours de validité"
                    subLabel=""
                  />  : fileFunction(
                  "La copie de la carte nina ou la fiche individuelle",
                  "",
                  user.ninaFile
                )}
                {checkEdit ?  <InputComponent
                    checkFileIcon={ninaFile != ""}
                    handleChange={(e) => {
                      setNinaFile(e.target.files[0]);
                    }}
                    key={28}
                    inputType="file"
                    label="Une copie de la carte nina ou la fiche individuelle"
                    
                  /> : fileFunction(
                  "La copie de la pièce d’identité",
                  "",
                  user.infoCardFile
                )}
                {
                checkEdit ?
                <InputComponent
                checkFileIcon={demandeFile != ""}
                handleChange={(e) => {
                  setDemandeFile(e.target.files[0]);
                }}
                key={30}
                inputType="file"
                required="*"
                label="Une demande manuscrite timbrée"
                
              />
                :
                fileFunction(
                  "La demande manuscrite timbrée",
                  "",
                  user.demandeFile
                )}
              </div>}
              {/* 
              <CardTitle className="mt-4 mb-10 text-green-500">
                Les Diplômes
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                at tincidunt neque. Pellentesque vitae commodo justo. Integer
                tempor Pellentesque vitae Integer tempor
              </CardDescription>
              <div className="grid gap-6 mt-4 md:grid-cols-2">
              {user.def.toString().includes("files/")     && fileFunction(
                  "Def",
                  "",
                  user.def
                )}
              
              {user.bac.toString().includes("files/")  && fileFunction(
                  "Bac",
                  "",
                  user.bac
                )}
              
              {user.licence.toString().includes("files/")  && fileFunction(
                  "Licence",
                  "",
                  user.licence
                )}
              
              {user.maitrise.toString().includes("files/")  && fileFunction(
                  "Maitrise",
                  "",
                  user.maitrise
                )}
              
              {user.master1.toString().includes("files/")  && fileFunction(
                  "Master1",
                  "",
                  user.master1
                )}
              
              {user.master2.toString().includes("files/")  && fileFunction(
                  "Master2",
                  "",
                  user.master2
                )}
              
                
                
              </div> */}
            </CardContent>
           {checkEdit &&   <CardFooter className="flex justify-end">

{isLoading ?               <ButtonComponent
                key={8}
                label="Modifier"
                full={true}
                type="submit"
                className="self-end w-full mt-4 md:w-[200px]"
              /> : 
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
            </CardFooter>}
          </Card>
        </div>
      </div>
    </form>
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


function fileFunctionCutom(label,   result) {
  return (
    <div className="">
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
    <div className={result?.length <= 15 ? "hidden" : ""}>
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
