import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url);
  const role= await prisma.roles.findFirst({
    where:{
      id: searchParams.get("id")!.toString()
    },
    include:{competition:{
      include:{candidatures:true}
    }}
  }) 
        
        return new Response(JSON.stringify(role));
  }






  