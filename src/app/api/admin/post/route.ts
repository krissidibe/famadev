
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import storeImage, { storeImageNormal } from "@/utils/addImageHelper"; 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
 
  if (searchParams.get("id") == null) {
    const datasPrisma = await prisma.post.findMany({
      where: {
        roleId: searchParams.get("roleId")?.toString(),
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          title: "desc",
        },
      ],
      include:{
        typeOfPost:true,
      }
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
  }

  if (
    searchParams.get("id") != null  
   
  ) {
    const datasPrisma = await prisma.post.findFirst({
      where: {
        id: searchParams.get("id")?.toString() ?? "",
      },
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
  
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
 let fileSize = formData.get("fileSize")?.toString();

  let imageUpdate = formData.get("imageUpdate");

  let dataFilesArrayUser:any[] =  [];
for (let index = 0; index <  parseInt(fileSize == null ? "0" : fileSize) ; index++) {
  
  //const file = formData.get(`file${index+1}`) as Blob | null;

  try {
    fileImage = await storeImageNormal(formData.get(`file${index+1}`) as Blob | null);
    dataFilesArrayUser.push(`${fileImage}`)
  } catch (error) {
    fileImage = "bad";
  }

}

 
 
   const datasPrisma = await prisma.post.create({
    data:{
      title:formData.get("title")!.toString(),
      content:formData.get("content")?.toString(),
      public:true,
      roleId:formData.get("roleId")!.toString(),
      typeOfPostId:formData.get("typeOfPostId")!.toString(),
      files:JSON.stringify(dataFilesArrayUser)
    }
  }) 
  return new Response(
    JSON.stringify({ user: datasPrisma, message: "Le concours est modifier" })
  );
 
}
export async function PATCH(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
 //console.log(formData.get("uid")!.toString());
 const user = await prisma.user.findFirst({
  where: {
    id: formData.get("uid")!.toString(),
  },
});
 

 

 
let fileImage = formData.get("file")?.toString();
let fileSize = formData.get("fileSize")?.toString();

 let imageUpdate = formData.get("imageUpdate");

 let dataFilesArrayUser:any[] =  [];




  if (imageUpdate === "true") {
    for (let index = 0; index <  parseInt(fileSize == null ? "0" : fileSize) ; index++) {
 
      //const file = formData.get(`file${index+1}`) as Blob | null;
     
      try {
        fileImage = await storeImageNormal(formData.get(`file${index+1}`) as Blob | null);
        dataFilesArrayUser.push(`${fileImage}`)
      } catch (error) {
        fileImage = "bad";
      }
     
     }
     
  }



  
  

 
   const datasPrisma = await prisma.post.update({

    where:{
      id:formData.get("id")!.toString(),
    },
    data:{
      title:formData.get("title")!.toString(),
      content:formData.get("content")?.toString(),
      public:true,
      roleId:formData.get("roleId")!.toString(),
      typeOfPostId:formData.get("typeOfPostId")!.toString(),
      files:JSON.stringify(dataFilesArrayUser)
    }
  }) 
  return new Response(
    JSON.stringify({ user: datasPrisma, message: "Le concours est modifier" })
  );
 
}

 

export async function DELETE(req: NextRequest, res: NextResponse) {
   
  const data = await prisma.post.delete({
    where: {
      id: req.nextUrl.searchParams.get("id")?.toString(),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est supprimer" })
  );
}
