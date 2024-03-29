
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
    const datasPrisma = await prisma.results.findMany({
      where: {
        roleId : searchParams.get("roleId")!.toString() ,
      },
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
    fileImage = await storeImageNormal(file);
  } catch (error) {
    fileImage = "bad";
  }



 const datasPrisma = await prisma.results.create({
  data:{
    title:formData.get("title")!.toString(),
    content:formData.get("content")?.toString(),
    public:true,
    roleId:formData.get("roleId")!.toString(),
    authorId:user!.id,
    files:fileImage
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

let imageUpdate = formData.get("imageUpdate");

 



if (imageUpdate === "true") {
  const file = formData.get("file") as Blob | null;

  try {
    fileImage = await storeImageNormal(file);
  } catch (error) {
    fileImage = "bad";
  }
}







 const datasPrisma = await prisma.results.update({

  where:{
    id:formData.get("id")!.toString(),
  },
  data:{
    title:formData.get("title")!.toString(),
    content:formData.get("content")?.toString(),
    public:true,
    roleId:formData.get("roleId")!.toString(),
    files:fileImage
  }
}) 
return new Response(
  JSON.stringify({ user: datasPrisma, message: "Le concours est modifier" })
);

}




export async function DELETE(req: NextRequest, res: NextResponse) {
   
  const data = await prisma.results.delete({
    where: {
      id: req.nextUrl.searchParams.get("id")?.toString(),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est supprimer" })
  );
}
