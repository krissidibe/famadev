"use client";
import fs from "fs";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import InputComponent from "../../../../components/InputComponent";
import InputSelectComponent from "../../../../components/InputSelectComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ModalComponent from "@/components/ModalComponent";
import { useSession } from "next-auth/react";
import { Calendar } from "primereact/calendar";
function UserProfile({ data }) {
 
  const router = useRouter();
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

  const imageRef = useRef(null);
  const toast = useRef < Toast > null;
  const [modalTitle, setModalTitle] = useState(""); 
  const [passwordOld, setPasswordOld] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeirfy, setPasswordVerify] = useState("");
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };
  const createUser = async (e) => {
    e.preventDefault();
    if (firstName.length <= 1 ||
      lastName.length <= 1 ||
      email.length <= 1 ||
      number.length <= 1 ||
      placeBirthDate.length <= 1 ||
      
      birthDate == undefined ||
      sexe.length <= 1  ) {
      
      setModalTitle("Impossible");
      setMessage("Veuillez remplir les champs (minimum 2 characters) et le mot de passe (minimum 6 characters)");
      showDialogClick.current.click();

      return
    }
  


    const formData = new FormData();

    formData.append("file", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("sexe", sexe);
    formData.append("birthDate", birthDate);
    formData.append("placeBirthDate", placeBirthDate);
    formData.append("numberNina", numberNina);
    formData.append("address", address);
    formData.append("ninaFile", ninaFile);

    formData.append("imageUpdate", data.image != image);

    const datas = Object.fromEntries(formData);
    const res = await fetch(`/api/user/author`, {
      body: formData,

      method: "PATCH",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    if (dataNew.user) {
      showDialogClick.current.click();
      setShowModal((x) => (x = true));
      setModalTitle("Votre profile est modifier")
      setMessage(dataNew.message);

      useRouter.refresh();
    }
  };




  const updatePasswordUser = async (e) => {
    e.preventDefault()
    if (
      
      
      password.length < 6 ||
      passwordVeirfy.length < 6 
      
      ) {
      
      setModalTitle("Impossible");
      setMessage("Veuillez remplir les champs (minimum 2 characters) et le mot de passe (minimum 6 characters)");
      showDialogClick.current.click();

      return
    }


    if (
      
      
      password  !=
      passwordVeirfy  
      
      ) {
      
      setModalTitle("Impossible");
      setMessage("Les mots de passe sont incorrects");
      showDialogClick.current.click();

      return
    }


   


    const formData = new FormData();

   
    formData.append("email", email);
    formData.append("passwordOld", passwordOld);
    formData.append("password", password);
 

    

    const datas = Object.fromEntries(formData);
    const res = await fetch(`/api/user/author`, {
      body: formData,

      method: "PUT",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    if (dataNew.user) {
      showDialogClick.current.click();
      setShowModal((x) => (x = true));
      setModalTitle(dataNew.user == "error" ? "Impossible" : "Votre mot de passe est modifier")
      setMessage(dataNew.message);

      useRouter.refresh();
    }
  };



  // @ts-ignore
  const [image, setImage] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [placeBirthDate, setPlaceBirthDate] = useState("");
  
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [sexe, setSexe] = useState("");
  const [ninaFile, setNinaFile] = useState("");
  const [address, setAddress] = useState("");
const showDialogClick = useRef(null)
  const [numberNina, setNumberNina] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const getUser = async () => {
    setImage(data.image ?? "");
    setFirstName(data.firstName ?? "");
    setLastName(data.lastName ?? "");
    setEmail(data.email ?? "");
    setNumber(data.number ?? "");
    setAddress(data.address ?? "");
    setNinaFile(data.ninaFile ?? "");
    setNumberNina(data.nina ?? "");
    setSexe(data.sexe ?? "");
    setPlaceBirthDate(data.placeBirthDate ?? "");
    setBirthDate( dayjs(new Date(data.birthDate)).format("YYYY-MM-DD")   );
    setIsLoading((x) => (x = false));
  };

  useEffect(() => {
    if (status == "loading") {
    }

    getUser();
    (function () {
      getUser();
    });

    return () => {};
  }, []);

  return (
    <div className="inset-0 ">
  {/*     {showModal && (
        <ModalComponent
          rightButtonLabel="Retour"
          rightButtonAction={() => setShowModal((x) => (x = false))}
          content={message}
          title={"Message"}
        />
      )} */}

<AlertModalResponse  title={modalTitle} refModal={showDialogClick} message={message} handleClick={()=>{
  if(modalTitle =="Votre profile est modifier" || modalTitle =="Votre mot de passe est modifier"){

    router.push("/user")
  }
  
  
  
  }}  />
 



      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-10 md:flex-row">
        <form
          encType="multipart/form-data"
          onSubmit={createUser}
          method="post"
          className="flex-1 "
        >
          <Card>
            <CardHeader>
              <CardTitle> Informations personnelles</CardTitle>
              <CardDescription>
              Vous pouvez modifier vos informations en mettant à jours le formulaire, puis cliquez
sur le bouton Modifier pour valider les modifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid items-center w-full gap-4">
                <div className="gap-6 md:grid-cols-2">
                  {/*   {image.length > 5 && image != data.image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="image"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <img
                src={`${process.env.BASE_URL}${image}`}
                className="object-cover w-full h-full rounded-lg"
              />
            )} */}
                  <Avatar
                    onClick={() => {
                      imageRef.current.click();
                    }}
                    className="w-[100px] h-[100px] cursor-pointer mb-4"
                  >
                    {firstName.length > 3 && image != data.image ? (
                      <AvatarImage src={URL.createObjectURL(image)} />
                    ) : (
                      <AvatarImage src={`${process.env.BASE_URL}${image}`} />
                    )}
                    <AvatarFallback>
                      {firstName[0]}
                      {lastName[0]}
                    </AvatarFallback>
                  </Avatar>{" "}
                  <InputComponent
                    refInput={imageRef}
                    handleChange={(e) => {
                      if (!e.target.files[0].type.startsWith("image/")) return;
                      setImage(e.target.files[0]);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    inputType="file"
                    key={4}
                    label="Photo de profil"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  
                  <InputComponent
                      value={lastName}
                      handleChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    key={1}
                    label="Nom"
                  />
                  <InputComponent
                 

                    value={firstName}
                    handleChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    key={1}
                    label="Prénom"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={email}
                    readonly={true}
                    Icon={EnvelopeIcon}
                    withIcon={true}
                    key={3}
                    label="Email"
                    inputType="email"
                  />
                  <InputComponent
                    value={number}
                    handleChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Numero de téléphone"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                
                <InputComponent
                    value={birthDate}
                    handleChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    inputType="date"
                    label="Date de Naissance"
                  />
                   <InputComponent
                    value={placeBirthDate}
                    handleChange={(e) => {
                      setPlaceBirthDate(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    inputType=""
                    label="Lieu de Naissance"
                  />
                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Sexe</Label>
                    <Select
                      defaultValue={data.sexe}
                      onValueChange={(e) => setSexe(e)}
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
                  <InputComponent
                    key={1}
                    label="Adresse complete"
                    value={address}
                    handleChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                

                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    key={1}
                    label="Numéro nina"
                    value={numberNina}
                    handleChange={(e) => {
                      setNumberNina(e.target.value);
                    }}
                  />

               

                  {ninaFile.length > 10 ? (
                    <div>
                      <Label>Carte nina ou fiche individuelle</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                          <a target="_blank" href={`${process.env.BASE_URL}${ninaFile}`} className="flex items-center justify-between flex-1 space-x-2">
                            <p className="text-sm">Télécharger </p>
                            <FaDownload className="h-12 mr-4" />
                          </a>
                        </div>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <div className="flex items-center cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                              <RiDeleteBin6Line className="h-12" />
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Êtes-vous absolument sûr?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action ne peut pas être annulée. Cette
                                volonté supprimer définitivement votre
                                certificat de nationalité
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => setNinaFile("")}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ) : (
                    <InputComponent
                      handleChange={(e) => {
                        setNinaFile(e.target.files[0]);
                      }}
                    
                      withIcon={true}
                      inputType="file"
                      key={4}
                      label="Carte nina ou fiche individuelle"
                    />
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <ButtonComponent
                handleClick={createUser}
                key={8}
                label="Modifier le compte"
                full={true}
                className="self-end w-full mt-4 md:w-[200px]"
              />
            </CardFooter>
          </Card>
        </form>

        <Card className="flex-1 md:w-[400px]   ">
          <CardHeader>
            <CardTitle>Modifier le mot de passe de votre compte</CardTitle>
            
          </CardHeader>
          <CardContent>
            <form    onSubmit={updatePasswordUser}>
              <div className="grid items-center w-full gap-4">
                <InputComponent
                  key={1}
                  label="Email"
                  inputType="email"
                  Icon={EnvelopeIcon}
                  withIcon={true}
                  value={data.email}
                  handleChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                />
                <InputComponent
                  key={2}
                  label="Ancien mot de passe"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  inputType="password"
                  value={passwordOld}
                  handleChange={(e) =>
                    setPasswordOld( e.target.value)
                  }
                />
                <InputComponent
                  key={2}
                  label="Nouveau mot de passe"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  inputType="password"
                  value={password}
                  handleChange={(e) =>
                    setPassword( e.target.value)
                  }
                />
                <InputComponent
                  key={2}
                  label="Confirmer le nouveau mot de passe"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  inputType="password"
                  value={passwordVeirfy}
                  handleChange={(e) =>
                    setPasswordVerify( e.target.value)
                  }
                />
                <div className="flex  justify-end md:max-w-[300px]">
                  <ButtonComponent
                    key={2}
                    type="submit"
                    label="Modifier le mot de passe"
                    full={true}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserProfile;
