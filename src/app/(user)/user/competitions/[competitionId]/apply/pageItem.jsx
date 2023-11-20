"use client";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import ModalInfo from "@/components/ModalInfo";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import { getServerSession } from "next-auth";
import { useSearchParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { FaDownload } from "react-icons/fa";
import { RiAlertLine, RiDeleteBin6Line } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import BackComponent from "@/components/BackComponent";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
export default function ApplyItem(data, competitionId, fileAttach,filesRequired) {
  const { data: session, status } = useSession();
  const [lastName, setLastName] = useState(data.data.data.lastName);
  const [firstName, setFirstName] = useState(data.data.data.firstName);

  const [image, setImage] = useState(data.data.data.image);
  const [birthDatePlace, setBirthDatePlace] = useState(
    data.data.data.placeBirthDate
  );

  const [email, setEmail] = useState(data.data.data.email);
  const [number, setNumber] = useState(data.data.data.number);
  const [address, setAddress] = useState(data.data.data.address);

  const [numberNina, setNumberNina] = useState(data.data.data.numberNina);
  const showDialogClick = useRef(null);
  const [date, setDate] = useState(
    dayjs(data.data.data.birthDate).format("DD/MM/YYYY")
  );

  const router = useSearchParams();
  const routerPaht = useRouter();

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
  const [sexe, setSexe] = useState(sexeOptions[0].label);
  const [nina, setNina] = useState(data.data.data.nina ?? "");
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

  const [diplome, setDiplome] = useState("");
  const [diplomeNumber, setDiplomeNumber] = useState("");
  const [placeOfGraduation, setPlaceOfGraduation] = useState("");
  const [countryOfGraduation, setCountryOfGraduation] = useState("");
  const [study, setStudy] = useState("");
  const [speciality, setSpeciality] = useState("");

  const modal = useModalInfoStore();
  const [titleModal, setTitleModal] = useState("");
  const [modalData, setModalData] = useState("");
  const dataAttach = JSON.parse(`${router.get("fileAttach")}`);
 
  const defRef = useRef(null);
  const [defFile, setDefFile] = useState("");
  const [bacFile, setBacFile] = useState("");
  const [licenceFile, setLicenceFile] = useState("");
  const [maitriseFile, setMaitriseFile] = useState("");
  const [master1File, setMaster1File] = useState("");
  const [master2File, setMaster2File] = useState("");


  const [dataFiles, setDataFiles] = useState(JSON.parse(JSON.parse(JSON.stringify(data.data.filesRequired))));



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



  const [isLoading, setIsLoading] = useState(true);

  const [orderOfMagistratesType, setOrderOfMagistratesType] = useState("");
  const getUser = async () => {};
  useEffect(() => {
    if (status == "loading") {
    }

    (function () {
      getUser();
    });

    return () => {};
  }, []);

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
    }, 60000);
  };

  const createApply = async (e) => {
    e.preventDefault();

    
  

    launchTimer();

    setIsLoading((x) => (x = false));

   
    if (orderOfMagistratesCheck == true) {
      if (orderOfMagistratesType == "") {
        clearInterval(interval);

        showDialogClick.current.click();
        setTitleModal((x) => (x = "Impossible"));
        setModalData(
          (x) => (x = "Veuillez renseigner les champs obligatoires (*)")
        );
      }
    }

    if (diplome == "" || study == "" || speciality == "") {
      showDialogClick.current.click();
      clearInterval(interval);

      setTitleModal((x) => (x = "Impossible"));
      setModalData(
        (x) => (x = "Veuillez renseigner les champs obligatoires (*)")
      );

      return;
    }

    const formData = new FormData();

    dataFiles.map((item =>

      formData.append(item.id, item.value)
      
      
      ))

   
      formData.append("dataFilesArray", JSON.stringify(dataFiles));
    formData.append("sexe", sexe);
    formData.append("nina", nina);
    formData.append("certificate", certificate);
    formData.append("diplome", diplome);
    formData.append("diplomeNumber", diplomeNumber);
    formData.append("placeOfGraduation", placeOfGraduation);
    formData.append("countryOfGraduation", countryOfGraduation);
    formData.append("study", study);
    formData.append("speciality", speciality);

    formData.append("uid", data.data.data.email);
    formData.append("competitionId", data.data.competitionId);

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
    formData.append("orderOfMagistratesType", orderOfMagistratesType);

  


   
  //  formData.append("dataFiles",  new File([dataFiles[0].value], "filename",{type:"image/jpg"}));
  //  formData.append("dataFiles", JSON.stringify(dataFiles));

    //Diplome
    /* formData.append("defFile", defFile);
    formData.append("bacFile", bacFile);
    formData.append("licenceFile", licenceFile);
    formData.append("maitriseFile", maitriseFile);
    formData.append("master1File", master1File);
    formData.append("master2File", master2File); */

    /* 
    body: JSON.stringify({
        sexe,
        nina,
        certificate,
        diplome,
        diplomeNumber,
        placeOfGraduation,
        countryOfGraduation,
        study,
        speciality,
        uid: session?.user?.email,
        competitionId: data.data.competitionId,
      }), */

      const url = data.filesRequired != null ? "candidature" : "candidatureold"
    const res = await fetch(`/api/user/${url}`, {
      body: formData,
      method: "POST",
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
      showDialogClick.current.click();
      clearInterval(interval);
    }
  };
  const orderOfMagistratesCheck = data.data.fileAttach.orderOfMagistrates;
  const defCheck = data.data.fileAttach.def;
  const bacCheck = data.data.fileAttach.bac;
  const licenceCheck = data.data.fileAttach.licence;
  const maitriseCheck = data.data.fileAttach.maitrise;
  const master1Check = data.data.fileAttach.master1;
  const master2Check = data.data.fileAttach.master2;

  return (
    <>
      <AlertModalResponse
        title={titleModal}
        refModal={showDialogClick}
        message={modalData}
        handleClick={() => {

          clearInterval(interval);

         
          setIsLoading((x) => (x = true));

          if (
            modalData == "La candidature est créée" ||
            modalData == "Vous avez déjà postulé"
          ) {
            routerPaht.refresh();

            const timer = setTimeout(() => {
              routerPaht.push("/user/candidatures");
            }, 300);
          }
        }}
      />

      <div className="flex flex-col md:flex-row md:space-x-10">
        
        <Card className="flex-1 mb-10  md:max-w-[500px]">
          <CardHeader>
            <CardTitle className="mb-2">Mes informations</CardTitle>
            <CardDescription>
              Avant de postuler, rassurez vous que vos informations personnelles
              ci-dessous sont correctes sinon vous pouvez les modifier en
              cliquant sur le bouton " Modifier le compte" en bas du formulaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Avatar className="w-[100px] h-[100px]   mb-4">
                <AvatarImage src={`${process.env.BASE_URL}${image}`} />
                <AvatarFallback>
                  {firstName[0]}
                  {lastName[0]}
                </AvatarFallback>
              </Avatar>{" "}
              <div className="grid items-center w-full gap-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={lastName}
                    readonly={true}
                    key={1}
                    label="Nom"
                  />
                  <InputComponent
                    value={firstName}
                    readonly={true}
                    key={2}
                    label="Prénom"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={email}
                    readonly={true}
                    withIcon={true}
                    key={3}
                    label="Email"
                    inputType="email"
                  />
                  <InputComponent
                    value={number}
                    readonly={true}
                    withIcon={true}
                    key={4}
                    label="Numero de téléphone"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={date}
                    inputType="text"
                    readonly={true}
                    key={5}
                    label="Date de naissance"
                  />
                  <InputComponent
                    value={birthDatePlace}
                    inputType="text"
                    readonly={true}
                    key={6}
                    label="Lieu de naissance"
                  />
                  <InputComponent
                    value={data.data.data.sexe}
                    inputType="text"
                    readonly={true}
                    key={7}
                    label="Sexe"
                  />
                  <InputComponent
                    value={data.data.data.address}
                    inputType="text"
                    readonly={true}
                    key={8}
                    label="Adresse physique"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent value={nina} key={9} label="Numéro nina" />
                  {/*    
                {ninaFile.length > 10  ? (
                  <div>
                    <Label>Carte nina ou fiche individuelle</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                        <a
                          target="_blank"
                          href={`${process.env.BASE_URL}${ninaFile}`}
                          className="flex items-center justify-between flex-1 space-x-2"
                        >
                          <p className="text-sm">Télécharger </p>
                          <FaDownload className="h-12 mr-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label>Carte nina ou fiche individuelle</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center flex-1   justify-end p-4 h-[38px] border-[1px] rounded-sm">
                        <div
                          target="_blank"
                          className="flex items-center justify-between flex-1 space-x-2 text-red-500"
                        >
                          <p className="text-sm">Non renseigné </p>
                          <RiAlertLine className="h-12 mr-4 " />
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ButtonComponent
              href={"/user/profile"}
              key={8}
              label="Modifier le compte"
              full={true}
              className="self-end w-full mt-8 md:w-[200px]"
            />
          </CardFooter>
        </Card>
        <form
          onSubmit={createApply}
          encType="multipart/form-data"
          className="flex-1 mb-10 "
        >

     
          <Card>
            <CardHeader className="mb-4">
              <CardTitle>
                Les informations à renseigner pour le concours
              </CardTitle>
              <CardDescription>
                Veuillez renseigner correctement le formulaire ci-dessous avec
                les informations fiables car elles feront objet de vérification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid items-center w-full gap-4">
                <div className="grid gap-6 min-[1720px]:grid-cols-2">
                  <InputComponent
                    value={diplome}
                    handleChange={(e) =>
                      setDiplome((x) => (x = e.target.value))
                    }
                    key={10}
                    label="Diplôme"
                    required="*"
                  />
                  <InputComponent
                    value={study}
                    handleChange={(e) => setStudy((x) => (x = e.target.value))}
                    key={11}
                    label="Filiere"
                    required="*"
                  />
                </div>
                <div className="grid gap-6 min-[1720px]:grid-cols-2">
                  <InputComponent
                    value={speciality}
                    handleChange={(e) =>
                      setSpeciality((x) => (x = e.target.value))
                    }
                    key={12}
                    label="Spécialité"
                    required="*"
                  />
                  <InputComponent
                    value={placeOfGraduation}
                    handleChange={(e) =>
                      setPlaceOfGraduation((x) => (x = e.target.value))
                    }
                    key={10}
                    label="Lieu d’optention du diplôme"
                  />
                </div>
                <div className="grid gap-6 min-[1720px]:grid-cols-2">
                  <InputComponent
                    value={countryOfGraduation}
                    handleChange={(e) =>
                      setCountryOfGraduation((x) => (x = e.target.value))
                    }
                    key={13}
                    label="Pays d’optention du diplôme"
                  />
                  <InputComponent
                    value={diplomeNumber}
                    handleChange={(e) =>
                      setDiplomeNumber((x) => (x = e.target.value))
                    }
                    key={14}
                    label="Numero du diplôme"
                  />

                  {orderOfMagistratesCheck && (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">
                        <div className="flex space-x-2">
                          <p>Ordre Judiciaire / Ordre Administratif </p>{" "}
                          <p className="text-red-500">*</p>
                        </div>
                      </Label>
                      <Select
                        // defaultValue={orderOfMagistratesType}
                        onValueChange={(e) => setOrderOfMagistratesType(e)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--------" />
                          <SelectContent position="popper">
                            <SelectItem value="">--------</SelectItem>
                            <SelectItem value="0">
                              Ordre admnistratif
                            </SelectItem>
                            <SelectItem value="1">Ordre judiciaire</SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="py-4 mt-4 mb-4 border-t-2 border-black">
                  <CardTitle className="mb-2 text-blue-500">
                    Les pieces jointes
                  </CardTitle>
                  <CardDescription>
                    Veuillez joindre ou téléverser les pièces demandées
                    ci-dessous. Rassurez vous de fournir les copies légalisées
                    ou originales. les formats autorisés sont les images
                    (jpeg,jpg, png, gif,...) ou PDF. La taille maximum autorisée
                    pour les fichiers est de 5 Mega octets.
                  </CardDescription>
                </div>
{/* 
data.data.filesRequired
*/}
 
 
{JSON.stringify(dataFiles)}

               {data.data.filesRequired.length !=0 &&  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                
               <div className="grid gap-6 min-[1720px]:grid-cols-2">

               {JSON.parse(JSON.parse(JSON.stringify(data.data.filesRequired))).map(item => ( 
   
   <InputComponent
   checkFileIcon={item.type != "file"}
   name = {item.name}
   handleChange={(e) => {
     handleChangeFileRequired(item,e.target);
   }}
   key={21}
   inputType="file"
   required="*"
   label={item.name}
  // subLabel="Une copie d'acte de naissance ou  jugement supplétif en tenant lieu"
 />
))}
               
                   </div>
                </div>}
               {data.data.filesRequired.length ==0 &&  <div className="grid gap-6 min-[1720px]:grid-cols-2">
                  <InputComponent
                    checkFileIcon={birthDateFile != ""}
                    handleChange={(e) => {
                      setBirthDateFile(e.target.files[0]);
                    }}
                    key={21}
                    inputType="file"
                    required="*"
                    label="Une copie d'acte de naissance"
                    subLabel="Une copie d'acte de naissance ou  jugement supplétif en tenant lieu"
                  />

                  <InputComponent
                    checkFileIcon={cassierFile != ""}
                    handleChange={(e) => {
                      setCassierFile(e.target.files[0]);
                    }}
                    key={22}
                    inputType="file"
                    required="*"
                    label=" Un extrait du casier judiciaire"
                    subLabel="Datant d'au moins de trois(3) mois"
                  />

                  <InputComponent
                    checkFileIcon={certificatVie != ""}
                    handleChange={(e) => {
                      setCertificatVie(e.target.files[0]);
                    }}
                    key={23}
                    inputType="file"
                    required="*"
                    label="Un certificat de bonne vie et moeurs"
                    subLabel="Un certificat de bonne vie et moeurs valide"
                  />

                  <InputComponent
                    checkFileIcon={certificate != ""}
                    handleChange={(e) => {
                      setCertificate(e.target.files[0]);
                    }}
                    key={24}
                    inputType="file"
                    required="*"
                    label="Un certificat de nationalité malienne"
                    subLabel="Un certificat valide"
                  />

                  <InputComponent
                    checkFileIcon={diplomeFile != ""}
                    handleChange={(e) => {
                      setDiplomeFile(e.target.files[0]);
                    }}
                    key={25}
                    inputType="file"
                    required="*"
                    label="Une copie certifiée conforme du diplome requis"
                    subLabel="-"
                  />
                  <InputComponent
                    checkFileIcon={certificatVisite != ""}
                    handleChange={(e) => {
                      setCertificatVisite(e.target.files[0]);
                    }}
                    key={26}
                    inputType="file"
                    required="*"
                    label="Un certificat de visite et contre visite "
                    subLabel="Délivré par une  autorité médicale agréée"
                  />

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

                  <InputComponent
                    checkFileIcon={infoCardFile != ""}
                    handleChange={(e) => {
                      setInfoCardFile(e.target.files[0]);
                    }}
                    key={29}
                    inputType="file"
                    required="*"
                    label="Une copie de la pièce d’identité en cours de validité"
                    subLabel=""
                  />

                  <InputComponent
                    checkFileIcon={ninaFile != ""}
                    handleChange={(e) => {
                      setNinaFile(e.target.files[0]);
                    }}
                    key={28}
                    inputType="file"
                    label="Une copie de la carte nina ou la fiche individuelle"
                    subLabel="-"
                  />

                  <InputComponent
                    checkFileIcon={demandeFile != ""}
                    handleChange={(e) => {
                      setDemandeFile(e.target.files[0]);
                    }}
                    key={30}
                    inputType="file"
                    required="*"
                    label="Une demande manuscrite timbrée"
                    subLabel="Timbrée à 200 F"
                  />
                </div>}

                {/*     <div className="py-4 mt-4 mb-4 border-t-2 border-black ">
                <CardTitle className="mb-2 text-green-500 ">
                  Les Diplômes
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  at tincidunt neque. Pellentesque vitae commodo justo. Integer
                  tempor Pellentesque vitae Integer tempor
                </CardDescription>
              </div> */}

                {/*   <div className="grid gap-6 md:grid-cols-2">

                {defCheck == true &&  ( <InputComponent
                  checkFileIcon={defFile != ""}
                  handleChange={(e) => {
                    setDefFile(e.target.files[0]);
                  }}
                  key={101}
                  inputType="file"
                  label="DEF"
                />)  }
                {bacCheck == true &&  ( <InputComponent
                  checkFileIcon={bacFile != ""}
                  handleChange={(e) => {
                    setBacFile(e.target.files[0]);
                  }}
                  key={102}
                  inputType="file"
                  label="Bac"
                />)  }
                {licenceCheck == true &&  ( <InputComponent
                  checkFileIcon={licenceFile != ""}
                  handleChange={(e) => {
                    setLicenceFile(e.target.files[0]);
                  }}
                  key={103}
                  inputType="file"
                  label="Licence"
                />)  }
                {maitriseCheck == true &&  ( <InputComponent
                  checkFileIcon={maitriseFile != ""}
                  handleChange={(e) => {
                    setMaitriseFile(e.target.files[0]);
                  }}
                  key={109}
                  inputType="file"
                  label="Maitrise"
                />)  }
                {master1Check == true &&  ( <InputComponent
                  checkFileIcon={master1File != ""}
                  handleChange={(e) => {
                    setMaster1File(e.target.files[0]);
                  }}
                  key={104}
                  inputType="file"
                  label="Master 1"
                />)  }
                {master2Check == true &&  ( <InputComponent
                  checkFileIcon={master2File != ""}
                  handleChange={(e) => {
                    setMaster2File(e.target.files[0]);
                  }}
                  key={105}
                  inputType="file"
                  label="Master 2"
                />)  }
                
              </div>
 */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              {isLoading ? (
                <ButtonComponent
                  key={8}
                  label="Postuler"
                  full={true}
                  type="submit"
                  className="self-end w-full mt-4 md:w-[200px]"
                />
              ) : (
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
              )}
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
