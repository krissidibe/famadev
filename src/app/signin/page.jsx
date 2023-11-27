"use client";
import Image from "next/image";
import InputComponent from "../../components/InputComponent";
import InputDateComponent from "../../components/InputDateComponent";
import InputSelectComponent from "../../components/InputSelectComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
export default function Signin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [placeBirthDate, setPlaceBirthDate] = useState("");
  const [adress, setAdress] = useState("");
  const [date, setDate] = useState();

  const showDialogClick = useRef(null);
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
  const [sexe, setSexe] = useState("Homme");
  const [password, setPassword] = useState("");
  const [passwordVeirfy, setPasswordVerify] = useState("");

  const modal = useModalInfoStore();
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");
  const router = useRouter();
  const createUser = async () => {
    
    //dayjs(date).format("DD/MM/YYYY")

    if (firstName.length <= 1 ||
      lastName.length <= 1 ||
      email.length <= 1 ||
      number.length <= 1 ||
      placeBirthDate.length <= 1 ||
      
      date == undefined ||
      sexe.length <= 1 ||
      password.length < 6 ||
      passwordVeirfy.length < 6 ) {
      
      setModalTitle("Impossible");
      setModalData("Veuillez remplir les champs (minimum 2 characters) et le mot de passe (minimum 6 characters)");
      showDialogClick.current.click();

      return
    }

    if (password !=  passwordVeirfy  ) {
      
      setModalTitle("Impossible");
      setModalData("Les mots de passe sont incorrects");
      showDialogClick.current.click();

      return
    }
    let birthDate = date;

    const res = await fetch(`/api/user/author`, {
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        number,
        sexe,
        birthDate,
        placeBirthDate,
        adress,
        password,
        type: "create",
      }),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      /*  modal.onOpen(); */
      setModalTitle(data.user == null ? "Impossible": "Le compte est créé");
      setModalData(data.message);
      showDialogClick.current.click();
    }
  };

  return (
    <div className="flex flex-1 w-screen h-screen bg-black ">
      <div className="flex flex-col items-center w-full h-full p-10 overflow-y-scroll md:w-full bg-gray-50">
        <AlertModalResponse
          title={modalTitle}
          refModal={showDialogClick}
          message={modalData}
          handleClick={() => {
          
            if(modalTitle == "Le compte est créé"){

            // router.refresh();
             router.back();
            }
          }}
        />
        <div className="md:w-full mt-10 mb-10 flex-col md:flex-row  border-b-[15px] pb-4 border-b-[#024010]  justify-between   items-center flex  space-y-2">
        <Image
            src="/images/top_concours.png"
            alt="me"
            className=""
            width="400"
            height="400"
          />
          
          <div className="text-xs leading-5 text-center md:text-base">
           <p>Ministère de la Défense et des Anciens Combattants</p>
           <p>État-major Général des Armées</p>
           </div>
        </div>

        <Card className="max-w-full ">
          <CardTitle
            className="px-4 mt-4 text-sm cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            Retour
          </CardTitle>
          <CardHeader>
            <div className="flex items-center mb-4 space-x-4">
              <CardTitle>Inscription</CardTitle>
            </div>
            <CardDescription className="">
           <p> Votre inscription sur cette plateforme vous donne le privilège de candidater aux différents concours organisés par la DDTIA. </p>
           <p>
           Donc rassurez-vous de remplir correctement le formulaire d'inscription ci-dessous  avec les informations fiables. En particulier votre adresse mail fournie doit être correcte et accessible permettant de vous contacter en cas de besoin.
           </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid items-center w-full gap-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={lastName}
                    handleChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={1}
                    label="Nom"
                    required="*"
                  />
                  <InputComponent
                    value={firstName}
                    handleChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={2}
                    label="Prénom"
                    required="*"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={email}
                    handleChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    Icon={EnvelopeIcon}
                    withIcon={true}
                    key={3}
                    label="Email"
                    required="*"
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
                    required="*"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={date}
                    handleChange={(e) => {
                      setDate(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    inputType="date"
                    label="Date de Naissance"
                    required="*"
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
                    required="*"
                  />

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name"><span>Sexe</span>  <span className="text-red-500">*</span>   </Label>
                    <Select
                      defaultValue={sexe}
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
                    value={adress}
                    handleChange={(e) => {
                      setAdress(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Adresse de domiciliation"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={password}
                    handleChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={6}
                    label="Mot de passe"
                    required="*"
                    inputType="password"
                  />
                  <InputComponent
                    value={passwordVeirfy}
                    handleChange={(e) => {
                      setPasswordVerify(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={7}
                    inputType="password"
                    required="*"
                    label="Confirmer le mot de passe"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ButtonComponent
              handleClick={createUser}
              key={8}
              label="Créer le compte"
              full={true}
              className="self-end w-full mt-4 md:w-[200px]"
            />
          </CardFooter>
        </Card>
      </div>
      
    {/*   <div className="relative flex flex-col items-center justify-between hidden w-1/2 h-full md:block bg-red-50">
      <Image
              src="/images/logo2.png"
              alt="me"
              className="absolute top-0 left-10 top-10"
              width="290"
              height="290"
            />
        
        <Image
          className="object-cover w-full h-full"
          // loader={myLoader}
          src="/images/meilleure-universite-africaine1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div> */}
 
     {/*  <div className="flex flex-col items-center justify-between hidden w-1/2 h-full md:block bg-red-50">
        <Image
          className="object-cover w-full h-full"
          // loader={myLoader}
          src="/images/meilleure-universite-africaine.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div> */}
    </div>
  );
}
