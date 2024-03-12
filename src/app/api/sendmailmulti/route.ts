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


export async function GET(req: NextRequest) {
 
  const datas = [  {
   "userId": 1,
   "id": 1,
   "title": "delectus aut autem",
   "completed": false
 },
  ]
   return new Response(JSON.stringify(datas));
 }
 
 
  

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.json();

 

 const link = randomUUID();
   const options = {
    from: 'info@concours-fama.com',
    to:formData.data,
    subject: ` ${formData.title} `,
    html: `${formData.content}`,
  };


const data =  await transporter.sendMail(options); 
 
//console.log(formData);
 
 

 
  return new Response(
    JSON.stringify({
      
      message: `Les Emails sont envoyés avec succès`,
    })
  );
 
}
 