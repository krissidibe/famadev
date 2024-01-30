import bcrypt from "bcryptjs";
import fs from "fs";
import { renameSync } from "fs";
import { stat, mkdir, writeFile,rename } from "fs/promises";
import path, { join } from "path";
import { NextRequest, NextResponse } from "next/server";

function greet():string { //the function returns a string 
  return "Hello World" 
} 

export  async function storeImageRename(idCompetition:string,refCandidature:string,newFolder:string): Promise<void>{
  
   const file = join(process.cwd(), `public/files/${idCompetition}/${refCandidature}`);
   const fileNew = join(process.cwd(), `public/files/${idCompetition}/${newFolder}`);
   if(fileNew){
    const fileRename = rename(file,fileNew)
   }




    console.log("======");
    console.log(refCandidature);
    console.log(newFolder); 
   // console.log(fileRename);
    console.log("======");
    
}

   
 
   
    
    

export  async function storeImageNormal(fileBlob:Blob | null): Promise<string>{
   
  let filename ="";
  const file = fileBlob;

if (!file) {
  console.log("File notxx");
  
  return  "File not" ;
}
console.log("File yes");
//rename(  const uploadDir = join(process.cwd(), `public/files/${idCompetition}`, refCandidature))
const buffer = Buffer.from(await file.arrayBuffer());
      //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
      const relativeUploadDir = `/${"files" }/`;
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}${path.extname(file.name)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      return `/${"files"}/${filename}`;
      

   
    
    
}




export default async function storeImage(fileBlob:Blob | null,idCompetition:string,refCandidature:string,relativeUploadDirName:string): Promise<string>{
   
    let filename ="";
    const file = fileBlob;

  if (!file) {
    return  "File not" ;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const relativeUploadDir = `/${"files" }/`;
 // const relativeUploadDirName = "kris2";
  
  if (!fs.existsSync(join(process.cwd(), `public/files/${idCompetition}`, refCandidature))){
   fs.mkdirSync(join(process.cwd(), `public/files/${idCompetition}`, refCandidature), { recursive: true });

}
        const uploadDir = join(process.cwd(), `public/files/${idCompetition}`, refCandidature);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        filename = `${relativeUploadDirName}${path.extname(file.name)}`
         /*  filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}${path.extname(file.name)}`; */
        await writeFile(`${uploadDir}/${filename}`, buffer);
        return `/files/${idCompetition}/${refCandidature}/${filename}`;
        

     
      
      
}



export  async function storeImageCreateTemp( idCompetition:string,refCandidature:string) {
   
 
  if (!fs.existsSync(join(process.cwd(), `public/files/${idCompetition}`, refCandidature))){
    fs.mkdirSync(join(process.cwd(), `public/files/${idCompetition}`, refCandidature), { recursive: true });
 
 }
    
    
}



/* 

import bcrypt from "bcryptjs";
import fs from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import { NextRequest, NextResponse } from "next/server";

function greet():string { //the function returns a string 
  return "Hello World" 
} 

export default async function storeImage(fileBlob:Blob | null,idCompetition:string): Promise<string>{
   
    let filename ="";
    const file = fileBlob;

  if (!file) {
    return  "File not" ;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const relativeUploadDir = `/${"files" }/`;
  const relativeUploadDirName = "kris";
  
  if (!fs.existsSync(join(process.cwd(), `public/files/${idCompetition}`, relativeUploadDirName))){
   fs.mkdirSync(join(process.cwd(), `public/files/${idCompetition}`, relativeUploadDirName), { recursive: true });

}
        const uploadDir = join(process.cwd(), `public/files/${idCompetition}`, relativeUploadDirName);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}${path.extname(file.name)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        return `/files/${idCompetition}/${relativeUploadDirName}/${filename}`;
        

     
      
      
}
*/