import { Inter } from "next/font/google";
//import React,{useState} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "../../../components/MenuComponent";
import SideBarAdmin from "../../../components/SideBarAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
/* const inter = Inter({ subsets: ['latin'] })
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
  if (session?.user.role != "ADMIN") {
    redirect("/");
  }
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <body className="flex flex-1 w-full h-screen">
        <div className="hidden md:block">
          <SideBarAdmin />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] p-4 relative bg-[#0C4304] text-white flex shadow-xl items-center justify-end">
         {/*  <Image
            src="/images/logo2.png"
            alt="me"
            className="absolute md:left-10 left-24"
            width="250"
            height="250"
          /> */}

<div className="flex-col flex-1 hidden text-sm text-center md:flex">
            <p>Ministère de la Défense et des Anciens Combattants</p>
            <p>État-major Général des Armées</p>
          </div>

            <div className="flex items-center">
           
            </div>
          </div>
          <div className="flex-1 w-full h-full p-4 overflow-y-scroll md:p-10 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
