import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";
import bcrypt from "bcryptjs";
import formidable from "formidable";

import mime from "mime";
import path, { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { getSession } from "next-auth/react";
import storeImage, { storeImageNormal } from "@/utils/addImageHelper";
import { randomUUID } from "crypto";
import transporter from "@/emailSend";

/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
 
 
/* 
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
}) */

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.json();

 
   
  const user = await prisma.user.findFirst({
    where: {
        email: formData.email!,
    },
    
    
  });
 

  if(user == null)  return new Response(
    JSON.stringify({
      user: null,
      message: `Ce email n'existe pas`,
    })
  );
  

const link = randomUUID();
   const options = {
    from: 'info@concours-fama.com',
    to:user.email!.toString(),
    subject: `Confirmation de Réinitialisation de Votre Mot de Passe`,
    html: `Pour réinitialiser votre mot de passe veuillez cliquer sur le lien suivant ${process.env.BASE_URL}/password/${link} `,
  };


const data =  await transporter.sendMail(options); 
console.log(data);


  const dataNew = await prisma.user.update({
    where: {
        email: formData.email.toString(),
    },
    
    data: {
       resetPasswordLink:link  ,
       resetExpireAt:  new Date(dateFn.addHours(new Date(), 1))
       
       
    },
  });
  return new Response(
    JSON.stringify({
      user: dataNew,
      message: `Email de renitialisation envoyé avec succés`,
    })
  );
 
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  const formData = await req.json();
 

 
  const dataNew = await prisma.user.update({
    where: {
        resetPasswordLink: formData.resetPasswordLink!.toString(),
    },
    
    data: {
       password: await bcrypt.hash(formData.password!.toString(), 10),
       resetExpireAt: null,
       resetPasswordLink: null
       
       
    },
  });


  console.log("dataNew");
  
  if(dataNew){

    return new Response(
      JSON.stringify({
        user: dataNew,
        message: `Votre profile est modifier`,
      })
    );
  }else{
    return new Response(
      JSON.stringify({
        user: null,
        message: `Erreur de Token`,
      })
    );
  }
  
 
}
