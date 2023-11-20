"use client";

import React, { useState, FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import ButtonComponent from "@/components/ButtonComponent";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import Link from "next/link";

function page() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const dataUser = searchParams.get("user");

  const result = JSON.parse(data!);
  const user = JSON.parse(dataUser!);

  const statutOptions = [
    {
      label: "En cours de validation",
      value: 0,
      color: "bg-yellow-500",
    },
    {
      label: "Valider",
      value: 1,
      color: "bg-green-500",
    },
    {
      label: "refuser",
      value: 3,
      color: "bg-red-500",
    },
  ];

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const updateApply = async (value: string) => {
   
    const res = await fetch(`/api/admin/candidature`, {
      body: JSON.stringify({
        id: result.id,
        statut: value,
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
      modal.onOpen();
    }
  };


 


  return (
    <div className="flex flex-col h-full">
       <ModalInfo title="Alert" body={modalData}  /> 
      <p className="pb-2 mb-10 font-semibold border-b-2">
        Les information sur la candidaturexx
      </p>
      <div className="flex flex-1 h-full gap-6 ">
        <div className="w-full h-full p-4 overflow-y-scroll text-sm shadow-md md:w-1/2 scrollbar-hide">
          <h1 className="my-4 font-bold ">Information personnelle</h1>



         
          <img
            src={`${process.env.BASE_URL}${user.image}`}
            
            className="w-32 h-32 mb-4 bg-white rounded-full"
          />
         
          <div className="flex flex-col pb-4 space-y-4 border-b-2">
            <div className="flex justify-between space-x-4">
              <ItemUser label={"Nom"} value={user.firstName} />
              <ItemUser label={"Prénom"} value={user.lastName} />
            </div>
            <div className="flex justify-between space-x-4">
              <ItemUser
                label={"Date de naissance"}
                value={new Date(user.birthDate).toLocaleDateString("fr-Fr")}
              />
              <ItemUser label={"Sexe"} value={user.sexe} />
            </div>

            <div className="flex justify-between space-x-4">
              <ItemUser label={"Numero du téléphone"} value={user.number} />
              <ItemUser label={"Numero nina"} value={user.nina} />
            </div>
          </div>
          <h1 className="my-4 font-bold ">Les pieces jointes</h1>
          <div className="flex space-x-4">
         <Link passHref className="w-[120px] h-[150px]  " href={`${process.env.BASE_URL}${result.def}`}>
            <div className="w-[120px] h-[150px] flex items-center justify-center border-2">
              <p className="font-bold">Def</p>
            </div>
          </Link>
          <Link passHref className="w-[120px] h-[150px]  " href={`${process.env.BASE_URL}${result.def}`}>
            <div className="w-[120px] h-[150px] flex items-center justify-center border-2">
              <p className="font-bold">Bac</p>
            </div>
          </Link>
          <Link passHref className="w-[120px] h-[150px]  " href={`${process.env.BASE_URL}${result.def}`}>
            <div className="w-[120px] h-[150px] flex items-center justify-center border-2">
              <p className="font-bold">Licence</p>
            </div>
          </Link>
         </div>
        </div>
        <div className="w-full h-full p-4 overflow-y-scroll text-sm bg-gray-100 shadow-md md:w-1/2 scrollbar-hide">
          <h1 className="my-4 font-bold ">Information de la candidature</h1>
          <div className="flex justify-between my-4">
            <div>Etat de la candidature : </div>
            <div
              className={`p-1 text-white text-[12px] px-2 rounded-md ${
                statutOptions[result.statut].color
              } `}
            >
              {statutOptions[result.statut].label}{" "}
            </div>
          </div>

          <div>Note :</div>
          <textarea className="w-full p-4 my-4 outline-none h-1/2"></textarea>
          <div className="flex flex-col space-y-4">
            <ButtonComponent
              handleClick={() => updateApply("1")}
              className=""
              full={true}
              label={"Valider la candidature"}
            />
            <ButtonComponent
              handleClick={() => updateApply("2")}
              className=""
              label={"Refuser la candidature"}
            />
            <ButtonComponent
              handleClick={() => updateApply("0")}
              className=""
              label={"Mise en attente"}
            />
          </div>
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

export default page;
