
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
 