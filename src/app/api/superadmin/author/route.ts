import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import formidable from "formidable";

import mime from "mime";
import path, { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { getSession } from "next-auth/react";
import storeImage from "@/utils/addImageHelper";

/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if(searchParams.get("id")){
    const data = await prisma.user.findFirst({
      where:{
        id:searchParams.get("id")?.toString(),
      }
      
    });
   
    return new Response(JSON.stringify(data));
  }
  const datas = await prisma.user.findMany({
    where:{
      role:"ADMIN"
    },
    orderBy:{
      lastName:"asc"
    }
  });
 
  return new Response(JSON.stringify(datas));
}

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    birthDate,
    placeBirthDate,
    adress,
    role,
    password,
    type,
  } = await req.json();

  if (type == "create") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
          
        },
      });
      if (user != null)
        return new Response(
          JSON.stringify({ user: null, message: "L'email existe déjà" })
        );

      const passwordCryp = await bcrypt.hash(password, 10);
      const data = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          number,
          sexe,
          birthDate: new Date(Date.now()),
          role:"ADMIN",
          adminRole:role,
          address: adress,
          password: passwordCryp,
        },
      });
      return new Response(
        JSON.stringify({ user: data, message: "Votre compte est créer" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  }
  if (type == "user") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user == null)
        return new Response(
          JSON.stringify({ user: null, message: "Erreur de récupération" })
        );

      return new Response(
        JSON.stringify({ user: user, message: "Votre compte est créer" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  } else {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (data == null)
        return new Response(
          JSON.stringify({
            user: null,
            message: "L'email n'existe pas veuillez créer votre compte",
          })
        );

      const isPasswordValid = await bcrypt.compare(password, data.password);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ user: null, message: "password incorrect" })
        );
      }

      return new Response(JSON.stringify({ user: data, message: "succes" }));
    } catch (error) {
      return new Response(JSON.stringify({ error: "error" }));
      /*       res.status(500).json(error); */
    }
  }
}
/* 
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
}) */

export async function PATCH(req: NextRequest, res: NextResponse) {
    
  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    password,
    role,
    adress,
     
  } = await req.json();
  const data = await prisma.user.findFirst({
    where: {
      AND: [{ email: email }, { role: "ADMIN" }],
    },
  });

  if (data == null)
    return new Response(
      JSON.stringify({
        user: data,
        message: "L'email n'existe pas veuillez créer votre compte",
      })
    );

 

    const passwordCryp = await bcrypt.hash(password, 10);

  const dataUpdate = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
          firstName,
          lastName,
          email,
          number,
          sexe,
          role,
          address: adress,
          password: passwordCryp,
    },
  });
  return new Response(
    JSON.stringify({
      user: dataUpdate,
      message: `Votre profile est modifier`,
    })
  );
}
