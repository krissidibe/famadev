import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DNAJ | SUPERADMIN",
  description: "Direction nationale de l'administration de la justice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  session:any
}) {
  
  return (
    <html lang="en">
      <body>
     {/*    <div className="h-screen overflow-hidden"><Provider><ToasterContext />{children}</Provider></div> */}
      
        <div className="h-screen overflow-hidden"><Provider><ToasterContext />{children}</Provider></div>
      
      </body>
    </html>
  );
}