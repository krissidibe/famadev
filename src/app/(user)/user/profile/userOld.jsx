"use client";
import fs from "fs";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import InputComponent from "../../../../components/InputComponent";
import InputSelectComponent from "../../../../components/InputSelectComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
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

  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };
  const createUser = async (e) => {
 
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("sexe", sexe);
    formData.append("birthDate", birthDate);
    formData.append("numberNina", numberNina);
    formData.append("address", address);
    formData.append("certificate", certificate);

    formData.append("imageUpdate",data.image != image);

 
    const datas = Object.fromEntries(formData);
    const res = await fetch(`/api/user/author`, {
      body: formData,

      method: "PATCH",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    if (dataNew.user) {
      setShowModal((x) => (x = true));
      setMessage(dataNew.message);
      /*  setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setEmail(data.user.email);
      setNumber(data.user.number);
      setNumberNina(data.user.nina);
      setBirthDate(new Date(data.user.birthDate));
      setSexe(data.user.sexe); */
    }
  };

  // @ts-ignore
  const [image, setImage] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [sexe, setSexe] = useState("");
  const [certificate, setCertificate] = useState("");
  const [address, setAddress] = useState("");

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
    setCertificate(data.certificate ?? "");
    setNumberNina(data.nina ?? "");
    setBirthDate(new Date(data.birthDate));
    setIsLoading((x) => (x = false));
    setSexe(data.sexe);
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
      {showModal && (
        <ModalComponent
          rightButtonLabel="Retour"
          rightButtonAction={() => setShowModal((x) => (x = false))}
          content={message}
          title={"Message"}
        />
      )}

      <form
        encType="multipart/form-data"
        onSubmit={createUser}
        method="post"
        className="flex flex-col w-full h-full p-6 overflow-y-scroll bg-gray-100 rounded-lg shadow-sm "
      >
        <h1 className="text-[24px] flex justify-between border-black  ">
          <span> Informations à renseigné</span>
         
        </h1>

       
        <div className="mt-2 mb-4 border-b border-solid  max-w-[320px]"></div>

        <p className="text-[14px] text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
          tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
          dignissim tortor, eu elementum arcu dictum non
        </p>

        <div className="flex flex-col cursor-pointer md:flex-row md:items-center md:space-x-8 ">
          <picture
            onClick={() => {
              imageRef.current.click();
            }}
            className="self-center w-32 h-32 my-4 bg-white rounded-full shadow-md md:self-start"
          >
        
              {image.length > 5 && image != data.image ? (
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
        )}
          </picture>

          <div className="flex flex-col space-y-2 md:maw-w-[200px] mb-2">
            <input
              className="block w-full p-2 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              ref={imageRef}
              onChange={(e) => {
                if (!e.target.files[0].type.startsWith("image/")) return;
                setImage(e.target.files[0]);
              }}
            />

            <p className="text-[12px] pt-2 text-gray-500">
              {"Max 1mo format (jpg,png)"}
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-1 space-x-0 md:space-x-8 md:flex-row ">
          <div className="flex flex-col w-full space-y-4 md:space-y-4 md:w-1/2">
            <InputComponent
              value={firstName}
              handleChange={(e) => {
                setFirstName(e.target.value);
              }}
              key={1}
              label="Nom"
            />
            <InputComponent
              value={lastName}
              handleChange={(e) => {
                setLastName(e.target.value);
              }}
              key={1}
              label="Prénom"
            />
            <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-4 ">
              <div className="flex flex-col w-full">
                {/* fff */}
                <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
                  Date naissance
                </p>
                <div className="flex w-full card justify-content-center">
                  <Calendar
                    value={birthDate}
                    className="w-full"
                    onChange={(e) => setBirthDate(e.value)}
                  />
                </div>
              </div>
 
              <InputSelectComponent
                options={sexeOptions}
                value={sexe}
                handleChange={(e) => {
                  setSexe(parseInt(e.target.value));
                }}
                Icon={InformationCircleIcon}
                withIcon={true}
                key={5}
                label="Sexe"
                className="w-2/3"
              />
            </div>
          </div>
          <div className="flex flex-col w-full space-y-4 md:space-y-4 md:w-1/2">
            <InputComponent
              key={1}
              label="Numéro nina"
              value={numberNina}
              handleChange={(e) => {
                setNumberNina(e.target.value);
              }}
            />
            <InputComponent key={10} label="Certificat de nationalité" value={certificate}  handleChange={(e) => {
                  setCertificate(e.target.value);
                }}   />

            <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-2 ">
              <InputComponent
                value={number}
                handleChange={(e) => {
                  setNumber(e.target.value);
                }}
                key={1}
                label="Numero du téléphone"
              />
              <InputComponent key={1} label="Adresse complete" value={address}  handleChange={(e) => {
                  setAddress(e.target.value);
                }} 
                  />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 md:w-[230px] items-end  space-x-4">
          <ButtonComponent
            type="submit"
            key={4}
            label="Enregistré"
            className="w-[130px]  "
            // handleClick={() => setVisible((x) => (x = !x))}
            full={true}
          />
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
