import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
 
import path, { join } from "path";
import {  writeFile } from "fs/promises";
 

/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
export async function GET(req: NextRequest) {
  const datas = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut User",
      completed: true,
    },
    {
      userId: 1,
      id: 2,
      title: "User ut nam facilis et officia qui",
      completed: true,
    },
  ];
  return new Response(JSON.stringify(datas));
}


