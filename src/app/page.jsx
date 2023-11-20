"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import ParticulesBackground from "@/components/Particules/ParticulesBackground";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useModalInfoStore } from "../store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
function page() {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const showDialogClick = useRef(null);
  const [modalTitle, setModalTitle] = useState("");
  const [password, setPassword] = useState("");
  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const session = useSession();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {

    if (session.data?.user) {
      router.push(`/${session.data?.user.role.toString().toLowerCase()}`);
    }
    /* if (session?.status === "authenticated") {
      //  router.push("/user");
    } */
  });

  const login2User = async (e) => {
    e.preventDefault();


    if (  
      data["email"].length < 10 ||
      data["password"].length < 6 
    /*   data["email"].length <= 2 ||  
      data["password"].length < 6    */
     ) {
      
      setModalTitle("Impossible");
      setModalData(`Veuillez remplir les champs (minimum 2 characters) et le mot de passe (minimum 6 characters)`);
      showDialogClick.current.click();

      return
    }

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
       toast.success("Connecté avec succès");
        
        if (session.data?.user) {
          router.push(`/${session.data?.user.role.toString().toLowerCase()}`);
        }
      }
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/author/user", {
      body: JSON.stringify({
        email,
        password,
        firstName: "firstName",
        lastName: "lastName",
        number: "number",
        sexe: "sexe",
        type: "type",
      }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await res.json();

    if (!data.user) {
      modal.onOpen();
      setModalData(data.message);
    } else {
      e.preventDefault();

      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Connecté avec succès");
        }
      });

      console.log(data.user);
      // sessionStorage.setItem("user", JSON.stringify(data.user));
      // router.push("/user");

      return;
    }
  };
  return (
    <div className="flex flex-1 w-screen h-screen overflow-y-scroll">
      {/* <ModalInfo title="Alert" body={modalData} /> */}
      <AlertModalResponse
          title={modalTitle}
          refModal={showDialogClick}
          message={modalData}
          handleClick={() => {
            modalTitle == "Impossible" ? null : router.back()
           // router.back();
          }}
        />
      <div className="flex flex-col items-center justify-between w-full h-full p-10 md:w-1/2 overscroll-y-auto ">
        <div className="md:min-w-[450px] mt-10 mb-10 justify-center w-[353px] items-center flex flex-col space-y-2">
          <Image
            src="/images/logo.png"
            alt="me"
            className=" left-20"
            width="64"
            height="64"
          />
          <div className="flex flex-col items-center justify-center w-full text-center ">
            <p className="font-bold underline ">DNAJ</p>

            <p>Direction nationale de l'administration de la justice </p>
            <p className="mt-10 text-2xl  text-[#50a1ef] bg-gray-50  w-full md:w-[420px]  p-4 rounded-md shadow-md font-bold uppercase">
              Portail CONCOURS
            </p>
          </div>
        </div>

        <Card className="md:w-[420px] w-full mt-4">
          <ParticulesBackground />
          <CardHeader>
            <CardTitle>Connectez-vous à votre compte</CardTitle>
            <CardDescription>
              Pour déposer ou suivre votre candidature , veuillez vous connecter
              avec vos identifiants email et mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login2User}>
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
                  label="Mot de passe"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  value={data.password}
                  inputType="password"
                  handleChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <div className="flex flex-col space-y-1.5">
                  <ButtonComponent
                    key={2}
                    type="submit"
                    label="SE CONNECTER"
                    full={true}
                  />
                  <ButtonComponent
                    key={1}
                    label="S'INSCRIRE"
                    href={"/signin"}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Label>Mot de passe oublier ?</Label>
          </CardFooter>
        </Card>
        <div className="mt-4 text-black md:hidden text-md">Comment utiliser ce site</div>
<div className="mb-0 text-black md:hidden text-md">Clique sur le lien pdf pour suivre les instructions</div>
<a className="p-1 px-2 mt-2 text-white bg-black rounded-md cursor-pointer md:hidden" target="blank" href="/images/tuto.pdf"> <p>Explication</p> </a>
        <p className="text-[12px] pb-8 text-gray-500 max-w-[420px] text-justify mt-10 mb-10">
          Cette plateforme est une propriété du Ministère de la Justice et des
          Droits de l'homme du Mali. Elle a pour but de faciliter aux candidats,
          le dépôt des dossiers de candidature aux concours organisés par la
          Direction Nationale de l'Administration de la Justice sans besoin de
          se déplacer. Cependant , Toute fraude volontaire ou involontaire sur
          ce site peut faire l'objet de poursuite judiciaire.
        </p>
      </div>
      <div className="relative md:flex flex-col items-center justify-center hidden w-1/2 h-full bg-[#274472] ">
        <Image
          src="/images/logo2.png"
          alt="me"
          className="absolute left-10 top-10"
          width="290"
          height="290"
        />

        <div className="absolute flex-col flex-1 text-sm text-center text-white right-10 top-10 md:flex">
          <p>REPUBLIQUE DU MALI</p>
          <p>Un Peuple - Un But - Une Foi</p>
        </div>

<div className="mb-0 text-2xl text-white">Comment utiliser ce site   </div>
<div className="mb-10 text-white text-md">Clique sur le fichier pdf pour suivre les instructions</div>

        <div className="absolute flex-col flex-1 max-w-lg space-y-2 text-sm text-left text-white left-20 right-20 bottom-20 md:flex">
          <p className="text-lg font-bold border-b-2">PORTAIL CONCOURS</p>
          <p>
          CONTACTS : 0023 76 16 49 33 / 67 04 44 85
          </p>
        </div>
        <a target="blank" href="/images/tuto.pdf">
        <Image
          src="/images/pdfimage.jpg"
          alt="me"
          className="cursor-pointer rounded-xl "
          width={300}
          height={300}
        />

        </a>
        {/*  <Image
          className="object-cover w-full h-full"
          // loader={myLoader}
          src="/images/meilleure-universite-africaine1.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        /> */}
      </div>
      {/*  <div className="flex flex-col items-center relative justify-between hidden w-1/2 h-full md:block bg-[#274472]">
        
        <div className="w-full pl-10 pr-4 bg-[#274472] gap-10  flex-col pt-10 flex text-white h-1/2">
          <div className="flex items-center justify-between gap-6 mt-20">
            <Image
              src="/images/logo2.png"
              alt="me"
              className=""
              width="200"
              height="200"
            />

            <div className="flex-col text-sm text-center">
              <p>REPUBLIQUE DU MALI</p>
              <p>UN PEUPLE - UN BUT - UNE FOI</p>
            </div>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis cumque nulla corrupti iusto repellat nam molestias error exercitationem, reiciendis deleniti eius vel voluptatem debitis architecto ab ratione sit, aperiam ducimus!
            
          </p>
      
        </div>
        <div className="relative flex items-center justify-center w-full h-1/2">
        <Image
            className="self-center object-cover w-full "
            src="/images/aaa.png"
            //   loader={myLoader}

            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
      </div> */}
    </div>
  );
}

export default page;
