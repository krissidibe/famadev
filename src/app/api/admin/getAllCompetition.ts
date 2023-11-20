import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../utils/prisma";
import { data } from "autoprefixer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  //res.status(200).json({ name: 'John Doe' })
  try {
    const data = await prisma.competition.findMany({
      
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
/* 

id        Int     @id @default(autoincrement())
image     String?
title     String
content   String? @db.LongText
statut    String
createdAt DateTime? @db.Timestamp(0) @default(now()) 
updatedAt DateTime? @db.Date

startDateAt DateTime? @db.Date
endDateAt DateTime? @db.Date */
