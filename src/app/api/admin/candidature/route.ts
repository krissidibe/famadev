import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("id") != null) {
    const data = await prisma.candidature.findFirst({
      where: {
        id: parseInt(searchParams.get("id")!) ?? "",
      },
    });
    return new Response(JSON.stringify(data));
  }
  return new Response(JSON.stringify("Data"));
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  const { id, statut, message,motif, admin, updatedAt } = await req.json();
 
  const data = await prisma.candidature.update({
    where: {
      id: id,
    },
    data: {
      statut: statut,
      message: message,
      motif: motif,
      updatedAt: updatedAt,
      admin: admin,
     
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "La candidature est modifier" })
  );

  return new Response(
    JSON.stringify({ user: data, message: "Le concours est créer" })
  );
}
