import { Inter } from "next/font/google";
//import React,{useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "../../../components/MenuComponent";
import SideBarUser from "../../../components/SideBarUser";
import ModalInfo from "../../../components/ModalInfo";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; 
import Image from "next/image";
/* const inter = Inter({ subsets: ["latin"] });
 */
export const metadata = {
  title: "FAMA | Concours",
  description: "Défense et des anciens Combattants MDAC",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
   if(session?.user.role != "USER"){
    redirect("/")
  }  
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="flex flex-1 w-full h-screen">
        <ModalInfo title="Alert" body="kris" />

        <div className="hidden md:block">
          <SideBarUser />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] p-4 relative bg-[#0C4304]  text-white flex shadow-xl items-center justify-end">
         {/*  <Image
            src="/images/logo2.png"
            alt="me"
            className="absolute md:left-10 left-24"
            width="250"
            height="250"
          /> */}
 



          <div className="flex-col flex-1 hidden text-sm text-center md:flex">
            <p>Ministère de la Défense et des Anciens Combattants</p>
            <p>UÉtat-major Général des Armées</p>
          </div>
            <MenuComponent />
            <div className="items-center justify-center hidden md:flex">
              <p className="mr-4 text-sm">
           
                {session?.user?.email}{" "}
              </p>

              <Avatar>
                <AvatarImage
                  src={`${process.env.BASE_URL}${session?.user?.image}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="h-full p-4 overflow-y-scroll md:p-10 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
