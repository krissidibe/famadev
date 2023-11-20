"use client";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import ModalInfo from "@/components/ModalInfo";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
export default function ApplyItem(data, competitionId) {
  const { data: session, status } = useSession();
  const [lastName, setLastName] = useState(data.data.data.lastName);
  const [firstName, setFirstName] = useState(data.data.data.firstName);
  const [date, setDate] = useState(
    dayjs(data.data.birthDate).format("DD/MM/YYYY")
  );

  const router = useSearchParams();

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
  const [certificate, setCertificate] = useState(data.data.data.certificate);
  const [diplome, setDiplome] = useState("");
  const [diplomeNumber, setDiplomeNumber] = useState("");
  const [placeOfGraduation, setPlaceOfGraduation] = useState("");
  const [countryOfGraduation, setCountryOfGraduation] = useState("");
  const [study, setStudy] = useState("");
  const [speciality, setSpeciality] = useState("");

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const dataAttach= JSON.parse(`${router.get("fileAttach")}`);
  const defRef = useRef(null);
  const [defFile, setDefFile] = useState("");
  const getUser = async () => {};
  useEffect(() => {
    if (status == "loading") {
    }

    (function () {
      getUser();
    });

    return () => {};
  }, []);

  const createApply = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("sexe", sexe);
    formData.append("nina", nina);
    formData.append("certificate", certificate);
    formData.append("diplome", diplome);
    formData.append("diplomeNumber", diplomeNumber);
    formData.append("placeOfGraduation", placeOfGraduation);
    formData.append("countryOfGraduation", countryOfGraduation);
    formData.append("study", study);
    formData.append("speciality", speciality);
    
    formData.append("uid", session?.user?.email);
    formData.append("competitionId", data.data.competitionId);
    
    formData.append("defFile", defFile);
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
    const res = await fetch(`/api/user/candidature`, {
  
       
      body :formData,
      method: "POST",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    setModalData((x) => (x = dataNew.message));
    if (dataNew) {
      modal.onOpen();
    }
  };

  return (
    <form
      onSubmit={createApply}
      encType="multipart/form-data"
      className="flex flex-col w-full h-full p-6 overflow-y-scroll bg-gray-100 rounded-lg shadow-xl md:max-w-7xl "
    >
      <ModalInfo title="Alert" body={modalData} />

      <h1 className="text-[24px] flex justify-between border-black  ">
        <span> Informations a renseigné </span>
      </h1>

      <div className="mt-2 mb-4 border-b border-solid  max-w-[320px]"></div>

      <p className="text-[14px] text-gray-500 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
        tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
        dignissim tortor, eu elementum arcu dictum non
      </p>
      <div className="flex flex-col flex-1 space-x-0 md:space-x-8 md:flex-row ">
        <div className="flex flex-col w-full space-y-4 md:space-y-4 md:w-1/2">
          <InputComponent
            value={lastName}
            inputType="text"
            readonly={true}
            key={1}
            label="Nom"
          />
          <InputComponent
            value={firstName}
            inputType="text"
            readonly={true}
            key={2}
            label="Prénom"
          />
          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-4 ">
            <InputComponent
              value={date}
              inputType="text"
              readonly={true}
              key={3}
              label="Date de naissance"
            />
            <InputComponent
              value={sexe}
              inputType="text"
              readonly={true}
              key={4}
              label="Sexe"
            />
          </div>
          <InputComponent value={nina} key={5} label="Numéro nina" />
          <InputComponent
            value={certificate}
            key={6}
            label="Certificat de nationalité"
          />

          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-4 ">
            <InputComponent
              value={diplome}
              handleChange={(e) => setDiplome((x) => (x = e.target.value))}
              key={7}
              label="Diplôme de nationalité"
            />
            <InputComponent
              value={study}
              handleChange={(e) => setStudy((x) => (x = e.target.value))}
              key={8}
              label="Filiere"
            />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-4 md:space-y-4 md:w-1/2">
          <InputComponent
            value={speciality}
            handleChange={(e) => setSpeciality((x) => (x = e.target.value))}
            key={9}
            label="Spécialité"
          />
          <InputComponent
            value={placeOfGraduation}
            handleChange={(e) =>
              setPlaceOfGraduation((x) => (x = e.target.value))
            }
            key={10}
            label="Lieu d’optention du diplôme"
          />
          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-2 ">
            <InputComponent
              value={countryOfGraduation}
              handleChange={(e) =>
                setCountryOfGraduation((x) => (x = e.target.value))
              }
              key={11}
              label="Pays d’optention du diplôme"
            />
            <InputComponent
              value={diplomeNumber}
              handleChange={(e) =>
                setDiplomeNumber((x) => (x = e.target.value))
              }
              key={12}
              label="Numero du diplôme"
            />
          </div>
          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-4 ">
            <div className={`w-full`}>
              <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
                {"Def"}
              </p>
              <div className="w-full relative border-[1px] p-2 border-solid border-gray-300 flex items-center bg-white h-[50px] rounded-md ">
                <input
                 
                  type="file"
                  onChange={(e) => {
                   
                    setDefFile(e.target.files[0]);
                  }}
                  className={`w-full h-full rounded-md  outline-none `}
                />
              </div>
            </div>
            {/*  <InputComponent key={13} label="Def" /> */}
            <InputComponent key={14} label="Bac" />
          </div>
          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:w-full md:space-x-4 ">
            <InputComponent key={1} label="Licence" />
            <InputComponent key={1} label="Master" />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end mt-4 space-x-4 md:self-end md:w-1/2">
        <ButtonComponent
          key={4}
          label="Retour"
          className="w-[130px]  border-green-500 text-green-500 "
          full={false}
        />
        <ButtonComponent
          key={4}
          label="Postuler"
          className="w-[130px]  "
          type="submit"
          full={true}
        />
      </div>
    </form>
  );
}
