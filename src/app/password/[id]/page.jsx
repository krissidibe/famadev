"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import ParticulesBackground from "@/components/Particules/ParticulesBackground";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useModalInfoStore } from "../../../store/useModalInfoStore";
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
import { useRouter ,useSearchParams,usePathname} from "next/navigation";
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
  const pathname = usePathname();
  const showDialogClick = useRef(null);
  const [modalTitle, setModalTitle] = useState("");
  const [password, setPassword] = useState("");
  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const [forgetPasswordOn, setForgetPasswordOn] = useState(false);
  const session = useSession();
  
  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
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
      data["passwordConfirm"].length < 6 ||
      data["password"].length < 6 
   
     ) {
      
      setModalTitle("Impossible");
      setModalData(`Veuillez remplir les champs (minimum 6 characters)`);
      showDialogClick.current.click();

      return
    }
    if (  
      data["passwordConfirm"] !=  data["password"]
   
     ) {
      
      setModalTitle("Impossible");
      setModalData(`Les mots de passe ne sont pas identiques`);
      showDialogClick.current.click();

      return
    }



    console.log( data.password);
    const res = await fetch("/api/password", {
      body: JSON.stringify({
        resetPasswordLink:pathname.replace("/password/",""),
       
        password: data.password
        
      }),
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });


    const dataNew = await res.json();
   
 
  
    if (dataNew.user != null) {
       setModalTitle("Succès");
      setModalData(dataNew.message);
      showDialogClick.current.click();

    }else{
       setModalTitle("Impossible");
      setModalData(dataNew.message);
      showDialogClick.current.click();

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
            modalTitle == "Impossible" ? null : router.push("/")
           // router.back();
          }}
        />
      <div className="flex flex-col items-center justify-between w-full h-full p-10 md:w-1/2 overscroll-y-auto ">
        <div className="md:min-w-[450px] mt-10 mb-10 justify-center w-[353px] items-center flex flex-col space-y-2">
         
          <div className="flex flex-col items-center justify-center w-full text-center ">
           

           <div className="font-normal leading-5 text-center md:font-bold">
           <p>Ministère de la Défense et des Anciens Combattants</p>
           <p>État-major Général des Armées</p>
           </div>
           <Image
            src="/images/top_concours.png"
            alt="me"
            className="mt-14"
            width="400"
            height="400"
          />
           {/*  <p className="mt-10 text-2xl  text-[#50a1ef] bg-gray-50  w-full md:w-[420px]  p-4 rounded-md shadow-md font-bold uppercase">
              Portail CONCOURS
            </p> */}
          </div>
        </div>

        <Card className="md:w-[420px] w-full mt-4">
          <ParticulesBackground />
          <CardHeader>
            <CardTitle>Modifier votre Mot de passe</CardTitle>
            <CardDescription>
              Veuillez remplir le formulaire ci-dessous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login2User}>
              <div className="grid items-center w-full gap-4">
                
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
                 <InputComponent
                  key={2}
                  label="Mot de passe de confirmation"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  value={data.passwordConfirm}
                  inputType="password"
                  handleChange={(e) =>
                    setData({ ...data, passwordConfirm: e.target.value })
                  }
                />
                <div className="flex flex-col space-y-1.5">
                  <ButtonComponent
                    key={2}
                    type="submit"
                    label="MODIFIER"
                    full={true}
                  />
                
                </div>
              </div>
            </form>
          </CardContent>
          
        </Card>
        <div className="mt-4 text-black md:hidden text-md">Comment utiliser ce site</div>
<div className="mb-0 text-black md:hidden text-md">Clique sur le lien pdf pour suivre les instructions</div>
<a className="p-1 px-2 mt-2 text-white bg-black rounded-md cursor-pointer md:hidden" target="blank" href="/images/tutos.pdf"> <p>Explication</p> </a>
        <p className="text-[12px] text-center pb-8 text-gray-500 max-w-[420px]  mt-10 mb-10">
        Cette plateforme est une propriété du Ministère de la Défense et des Anciens Combattants. Elle a pour but de faciliter aux candidats, le dépôt des dossiers de candidature
 aux concours de recrutements organisés par les differents États-majors, Directions et Services Général des Armées.
        </p>
      </div>
      <div className="relative md:flex flex-col items-center justify-center hidden w-1/2 h-full bg-[#024010] ">
       
        

<div className="mb-0 text-2xl text-white">Comment utiliser ce site   </div>
<div className="mb-10 text-white text-md">Clique sur le fichier pdf pour suivre les instructions</div>

        
        <a target="blank" href="/images/tutos.pdf">
        <Image
          src="/images/logo_fama.png?222"
          alt="me"
          className="cursor-pointer rounded-xl "
          width={300}
          height={300}
        />

        </a>
        <div className="mt-[100px] text-center text-white text-[12px]">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
       <p> Direction des Transmissions, des Télécommunications </p>
<p>et de l'Informatique des Armées  (DTTIA)</p>
        </div>

        
      </div>
      
    </div>
  );
}

export default page;
