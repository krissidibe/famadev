import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import storeImage from "@/utils/addImageHelper";
import { useSession } from "next-auth/react";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
 
  if (searchParams.get("id") == null) {
    const datasPrisma = await prisma.results.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          title: "desc",
        },
      ],
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
  }

  if (
    searchParams.get("id") != null  
   
  ) {
    const datasPrisma = await prisma.results.findFirst({
      where: {
        id: searchParams.get("id")?.toString() ?? "",
      },
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
    return NextResponse.json(datasPrisma);
  }

  const datasPrisma = await prisma.candidature.findMany({
    where: {
      competitionId: searchParams.get("id")?.toString(),
    },
    orderBy: [
      {
        lastName: "desc",
      },
    ],
    include: { author: { include: { candidatures: {} } } },
  });

  //  console.log(searchParams.get("name"));
  return new Response(JSON.stringify(datasPrisma));
}

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
 //console.log(formData.get("uid")!.toString());
 const user = await prisma.user.findFirst({
  where: {
    id: formData.get("uid")!.toString(),
  },
});
 

 
 let fileImage = formData.get("file")?.toString();

  let imageUpdate = formData.get("imageUpdate");

   
    const file = formData.get("file") as Blob | null;

    try {
      fileImage = await storeImage(file);
    } catch (error) {
      fileImage = "bad";
    }
  

 
   const datasPrisma = await prisma.results.create({
    data:{
      title:formData.get("title")!.toString(),
      content:formData.get("content")?.toString(),
      public:true,
      authorId:user!.id,
      files:fileImage
    }
  }) 
  return new Response(
    JSON.stringify({ user: datasPrisma, message: "Le concours est modifier" })
  );
 
}

 