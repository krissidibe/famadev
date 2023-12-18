import { NextRequest, NextResponse } from "next/server";
 
import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import storeImage, { storeImageNormal } from "@/utils/addImageHelper";
 
export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const file = formData.get("image") as Blob | null;

   
  let fileImage = "imageFile";

  try {
    fileImage = await storeImageNormal(file);
  } catch (error) {
    fileImage = "/images/logo_fama.png";
  }

    
  return new Response(
    JSON.stringify({ user: fileImage })
  );
}
 