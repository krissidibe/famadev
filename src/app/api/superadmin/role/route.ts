import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
export async function GET(req: NextRequest, res: NextResponse) {

     
  const roles = await prisma.roles.findMany({}) 
        
        return new Response(JSON.stringify(roles));
  }








export async function POST(req: NextRequest, res: NextResponse) {
const {name,content} = await req.json()
 

 const role = await prisma.roles.create({
data:{
  name:name,
content:content
}
}) 
    
    return new Response(JSON.stringify(role));
  }