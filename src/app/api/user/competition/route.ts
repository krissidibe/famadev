import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

 

if (searchParams.get("count") != null) {
let statutNum =  searchParams.get("count");
  const datasPrisma = await prisma.competition.findMany({
    where: {
      statut: {
        in: [statutNum ?? ""],
      },
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


  if (searchParams.get("id") == null) {
    const datasPrisma = await prisma.competition.findMany({
      where: {
        statut: {
          in: ["1", "2","3"],
        },
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


  const data = await prisma.competition.findFirst({
    where: {
      id: searchParams.get("id")?.toString(),
    },
  });
  return new Response(JSON.stringify({ data: data, message: "complet" }));
}
export async function POST(req: NextRequest, res: NextResponse) {
  /* const {
    title,
    statut,
    startDateAt,
    endDateAt,
    valueContent,
    image,
    ageMax,
    ageMin,
  } = await req.json();
 */

  const data = await prisma.candidature.create({
    data: {
      title: "title",
      statut: "statut",
      firstName: "firstName",
      lastName: "lastName",
      birthDate: new Date(Date.now()),
      sexe: "sexe",
      nina: "nina",
      certificat: "certificat",
      diplome: "diplome",
      diplomeNumber: "diplomeNumber",
      placeOfGraduation: "placeOfGraduation",
      countryOfGraduation: "countryOfGraduation",
      study: "study",
      speciality: "speciality",
      authorId: "cli4xt2bo00006wyl3gs6tr2q",
      competitionId: "cli5lzbmi00046w5lae3ts4yy",
    },
  });
  return new Response(
    JSON.stringify({ data: data, message: "La candidature est créer" })
  );
}
