import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import { SessionProvider } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FAMA | CONCOURS",
  description: "Défense et des anciens Combattants MDAC",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
 
}) {

  const session = await getServerSession(authOptions)
  
  return (
    
    <html lang="en">
      <body>
     {/*    <div className="h-screen overflow-hidden"><Provider><ToasterContext />{children}</Provider></div> */}
      
        <div className="h-screen overflow-hidden"><Provider session={session}><ToasterContext />{children}</Provider></div>
      
      </body>
    </html>
  );
}