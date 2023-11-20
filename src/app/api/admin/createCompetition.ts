import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../utils/prisma";
import { data } from "autoprefixer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    statut,
    startDateAt,
    endDateAt,
    valueContent,
    image,
    ageMax,
    ageMin,
  } = req.body;
  //res.status(200).json({ name: 'John Doe' })
  try {
    const data = await prisma.competition.create({
      data: {
        image: image,
        title: title,
        content:valueContent ,
        statut: JSON.stringify(statut),
        startDateAt: new Date(startDateAt),
        endDateAt: new Date(endDateAt),
        ageMin: parseInt(ageMin),
        ageMax: parseInt(ageMax),
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
 