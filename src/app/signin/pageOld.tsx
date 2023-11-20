"use client";
import Image from "next/image";
import InputComponent from "../../components/InputComponent";
import InputSelectComponent from "../../components/InputSelectComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Link from "next/link";
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
import { useState } from "react";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
export default function Signin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
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
  const [sexe, setSexe] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeirfy, setPasswordVerify] = useState("");

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const router = useRouter();
  const createUser = async () => {
    const res = await fetch(`/api/user/author`, {
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        number,
        sexe,
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
      modal.onOpen();
      setModalData(data.message);
    }
  };

  return (
    <div className="flex flex-1 w-screen h-screen bg-black ">
      <ModalInfo title="Alert" body={modalData} />
      <div className="flex flex-col items-center justify-between w-full h-full p-10 overflow-y-scroll md:w-1/2 bg-gray-50">
        <div className="md:min-w-[450px] w-[353px] items-center flex space-x-2">
          <Image
            src="/images/logo.png"
            alt="me"
            className=" left-20"
            width="64"
            height="64"
          />
          <p>DNAJ</p>
        </div>
        <Link
          href="/"
          className="text-[14px] md:min-w-[450px] w-[353px] mt-6 mr-4"
        >
          {"<-"} Retour
        </Link>
        <div className="md:min-w-[380px] max-w-[353px] flex-1 mt-2  justify-center space-y-2 ">
          <p className="text-[24px]">Inscription</p>
          <p className="text-[11px] text-gray-500 max-w-[520px] text-left border-t-2 pt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
            Pellentesque vitae Integer tempor
          </p>
          <div className="h-4"></div>
          <InputComponent
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
            Icon={UserIcon}
            withIcon={true}
            key={1}
            label="Nom"
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
          />
          <InputComponent
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
            Icon={EnvelopeIcon}
            withIcon={true}
            key={3}
            label="Email"
            inputType="email"
          />

          <div className="flex flex-col w-full space-y-2 md:space-x-4 md:space-y-0 md:flex-row">
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

       {/*      <Select onValueChange={(e) =>{  setSexe(e);}} defaultValue={"0"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sexe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Homme</SelectItem>
                <SelectItem value="1">Femme</SelectItem>
              </SelectContent>
            </Select>
{sexe} */}
            <InputSelectComponent
              options={sexeOptions}
              value={sexe}
              handleChange={(e) => {
                setSexe(e.target.value);
              }}
              Icon={InformationCircleIcon}
              withIcon={true}
              key={5}
              label="Sexe"
              className="w-2/3"
            />
          </div>
          <InputComponent
            value={password}
            handleChange={(e) => {
              setPassword(e.target.value);
            }}
            Icon={LockClosedIcon}
            withIcon={true}
            key={6}
            label="Mot de passe"
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
            label="Confirmer le mot de passe"
          />
          <div className="flex w-full mt-8 space-x-4">
            <div className="w-full"></div>
            <ButtonComponent
              handleClick={createUser}
              key={8}
              label="Créer le compte"
              full={true}
              className="w-1/2 mt-4"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between hidden w-1/2 h-full md:block bg-red-50">
        <Image
          className="object-cover w-full h-full"
          // loader={myLoader}
          src="/images/meilleure-universite-africaine.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
