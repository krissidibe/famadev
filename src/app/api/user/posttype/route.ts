import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
export async function GET(req: NextRequest, res: NextResponse) {
  const messages = await prisma.typeOfPost.findMany({
    orderBy:{
      name:"asc"
    }
  });

  return new Response(JSON.stringify(messages));
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { name } = await req.json();

  const messages = await prisma.typeOfPost.create({
    data: {
      name: name,
    },
  });

  return new Response(JSON.stringify(messages));
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const message = await prisma.typeOfPost.delete({
    where: {
      id: searchParams.get("id")!.toString(),
    },
  });

  return new Response(JSON.stringify(message));
}
