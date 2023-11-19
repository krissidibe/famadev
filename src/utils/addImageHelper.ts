import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import { NextRequest, NextResponse } from "next/server";

function greet():string { //the function returns a string 
  return "Hello World" 
} 

export default async function storeImage(fileBlob:Blob | null): Promise<string>{
   
    let filename ="";
    const file = fileBlob;

  if (!file) {
    return  "File not" ;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
        //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
        const relativeUploadDir = `/${"files" }/`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          filename = `${file.text.toString().replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}${path.extname(file.text.toString())}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        return `/${"files"}/${filename}`;
        

     
      
      
}