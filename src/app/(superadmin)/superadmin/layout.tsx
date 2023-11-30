import { Inter } from "next/font/google";
//import React,{useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "@/components/MenuComponent";
import SideBarSuperAdmin from "@/components/SideBarSuperAdmin";
import ModalInfo from "@/components/ModalInfo";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
/* const inter = Inter({ subsets: ["latin"] });
 */
export const metadata = {
  title: "FAMA | Concours",
  description: "Direction nationale de l'administration de la justice",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
   if(session?.user.role != "SUPERADMIN"){
   // redirect("/")
  }  
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <body className="flex flex-1 w-full h-screen">
        <ModalInfo title="Alert" body="kris" />

        <div className="hidden md:block">
          <SideBarSuperAdmin />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] p-4 relative bg-[#3582ca]  text-white flex shadow-xl items-center justify-end">
        {/*   <Image
            src="/images/logo2.png"
            alt="me"
            className="absolute md:left-10 left-24"
            width="250"
            height="250"
          />
 */}
          <div className="flex-col flex-1 hidden text-sm text-center md:flex">
            <p>REPUBLIQUE DU MALI</p>
            <p>Un Peuple - Un But - Une Foi</p>
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
