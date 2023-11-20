import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
 
export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const data = await prisma.user.findMany({
   orderBy:{
    lastName :"desc"
   }
    
});
 return new Response(JSON.stringify(data));
  
}