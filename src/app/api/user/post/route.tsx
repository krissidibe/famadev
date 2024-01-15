import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
 


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
 
  if (searchParams.get("id") != null) {
    const datasPrisma = await prisma.post.findFirst({
      where: {
       id:searchParams.get("id")!.toString()
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
 
 
  if (searchParams.get("id") == null) {
    const datasPrisma = await prisma.post.findMany({
      where: {
       
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
 
  
}
