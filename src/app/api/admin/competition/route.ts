import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import storeImage from "@/utils/addImageHelper";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("id") == null) {
    const datasPrisma = await prisma.competition.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          title: "desc",
        },
      ],

      include: { candidatures: { include: { competition: {} } } },
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
    return NextResponse.json(datasPrisma)
  }


  if (searchParams.get("id") != null && searchParams.get("candidature") == null) {
    const datasPrisma = await prisma.competition.findFirst({
 where:{
  id : searchParams.get("id")?.toString() ?? ""
 }

  
    });

    //  console.log(searchParams.get("name"));
    return new Response(JSON.stringify(datasPrisma));
    return NextResponse.json(datasPrisma)
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

  const file = formData.get("image") as Blob | null;

  /* 

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }
let filename ="";

 try {
  const buffer = Buffer.from(await file.arrayBuffer());
  //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const relativeUploadDir = `/uploads/`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    filename = `${file.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}${path.extname(file.name)}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);
  
 } catch (e) {
  console.error("Error while trying to upload a file\n", e);
  return NextResponse.json(
    { error: "Something went wrong." },
    { status: 500 }
  );
 }



 */
  let fileImage = "imageFile";

  try {
    fileImage = await storeImage(file);
  } catch (error) {
    fileImage = "bad";
  }

  const val = formData.get("startDateAt");
  const val2 = formData.get("endDateAt");

  /* def
bac
license
master1
master2 */
  const data = await prisma.competition.create({
    data: {
      image: fileImage,
      title: formData.get("title")?.toString() ?? "",
      content: formData.get("valueContent")?.toString(),
      statut: formData.get("statut")?.toString() ?? "0",
      letterNumber: formData.get("letterNumber")?.toString() ?? "",
      startDateAt: new Date(val ? val.toString() : Date.now()),
      endDateAt: new Date(val2 ? val2.toString() : Date.now()),
      ageMin: parseInt(formData.get("ageMin")?.toString() ?? "0"),
      ageMax: parseInt(formData.get("ageMax")?.toString() ?? "0"),

      orderOfMagistrates: formData.get("orderOfMagistrates") === "true",
      
      filesRequired : formData.get("filesRequired")?.toString(), 
      inputsRequired : formData.get("inputsRequired")?.toString(), 
      groupsRequired : formData.get("groupsRequired")?.toString(), 
     
      
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est créer" })
  );
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const val = formData.get("startDateAt");
  const val2 = formData.get("endDateAt");
  
  let fileImage = formData.get("image")?.toString();

  let imageUpdate = formData.get("imageUpdate");

  if (imageUpdate === "true") {
    const file = formData.get("image") as Blob | null;

    try {
      fileImage = await storeImage(file);
    } catch (error) {
      fileImage = "bad";
    }
  }

  const data = await prisma.competition.update({
    where: {
      id: formData.get("id")!.toString(),
    },
    data: {
      image: fileImage,
      title: formData.get("title")?.toString() ?? "",
      content: formData.get("valueContent")?.toString(),
      statut: formData.get("statut")?.toString() ?? "0",
      letterNumber: formData.get("letterNumber")?.toString() ?? "",
      startDateAt: new Date(val ? val.toString() : Date.now()),
      endDateAt: new Date(val2 ? val2.toString() : Date.now()),
      ageMin: parseInt(formData.get("ageMin")?.toString() ?? "0"),
      ageMax: parseInt(formData.get("ageMax")?.toString() ?? "0"),

      orderOfMagistrates: formData.get("orderOfMagistrates") === "true",
      filesRequired : formData.get("filesRequired")?.toString()   , 
      inputsRequired : formData.get("inputsRequired")?.toString(), 
      groupsRequired : formData.get("groupsRequired")?.toString(), 
     /*  def: formData.get("def") === "true",
      bac: formData.get("bac") === "true",
      licence: formData.get("licence") === "true",
      maitrise: formData.get("maitrise") === "true",
      master1: formData.get("master1") === "true",
      master2: formData.get("master2") === "true", */
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est modifier" })
  );
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const data = await prisma.competition.delete({
    where: {
      id: req.nextUrl.searchParams.get("id")?.toString(),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est supprimer" })
  );
}
