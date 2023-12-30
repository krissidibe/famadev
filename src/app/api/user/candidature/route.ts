import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import storeImage, { storeImageRename } from "@/utils/addImageHelper";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("email") && searchParams.get("id") == null) {
    const data = await prisma.user.findUnique({
      where: {
        email: searchParams.get("email")?.toString(),
      },

      include: { candidatures: { include: { competition: {} } } },
    });
    if (!data) {
      return NextResponse.json({
        data: data,
        message: "Aucun utilisateur trouvé",
      });
    }
    return NextResponse.json(data);
  }

  if (searchParams.get("email") && searchParams.get("id") != "") {
    let idInt = searchParams.get("id");
    const data = await prisma.candidature.findFirst({
      where: {
        email: searchParams.get("email")?.toString(),
        id: parseInt(idInt!),
      },

      include: { competition: {} },
    });
    if (!data) {
      return NextResponse.json({
        data: null,
        message: "Aucun candidature trouvé",
      });
    }

    return NextResponse.json(data);
  }

  return NextResponse.json("Error");
}

export async function POST(req: NextRequest, res: NextResponse) {
 
  const formData = await req.formData();

  

  const competition = await prisma.competition.findFirst({
    where: {
      id: formData.get("competitionId")!.toString(),
    },
    include :{ candidatures:true }
   
  });


 


  if (!competition) {
    return new Response(
      JSON.stringify({ data: "", message: "Competition non trouvé" })
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: formData.get("uid")?.toString(),
    },
  });

  
  if (!user) {
    return new Response(
      JSON.stringify({ data: "", message: `Utilisateur non trouvé` })
    );
  }

  const candidatureCheck = await prisma.candidature.findFirst({
    where: {
      authorId: user?.id,
      competitionId: formData.get("competitionId")?.toString(),
    },
  });
  if (candidatureCheck) {
    return new Response(
      JSON.stringify({
        data: candidatureCheck.id,
        message: "Vous avez déjà postulé",
      })
    );
  }

  let certificateName = "";
 

  const dataFilesArray = formData.get("dataFilesArray")!.toString();
  const dataInputsArray = formData.get("dataInputsArray")!.toString();
  const selectDataGroups = formData.get("selectDataGroups")!.toString();
  let dataFilesArrayConvert:any[] =  JSON.parse(dataFilesArray)  
  let dataFilesArrayUser:any[] =  [];
  let dataInputsArrayUser:any[] =  JSON.parse(dataInputsArray);
 //const val = await storeImage( formData.get("l")  as Blob | null)


 for await (const item of dataFilesArrayConvert) {
  

  if(item.value.length <=2){
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }
 
  
}

   



const dataFormat = new Date(Date.now())
.getFullYear()
.toString()
.substring(2, 4);

const candidatureCount =  await prisma.candidature.findMany({
  where:{
     competitionId: competition!.id,
    NOT:{
      statut: "100"
    }
  }
})

//const strNumber = competition.candidatures.length + 1;
const strNumber = candidatureCount.length + 1;

 
 

  const data = await prisma.candidature.create({
    data: {
      numeroRef: `${competition.letterNumber?.toUpperCase()}-${dataFormat}-${strNumber.toString().padStart(6, "0")}`,
      title: "title",
      statut: "0",
      content: "",
      certificat: "",

      email: user?.email ?? "",
      image: user?.image ?? "",
      number: user?.number ?? "",
      address: user?.address ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      fatherName: user?.fatherName ?? "",
      motherName: user?.motherName ?? "",
      birthDate: user?.birthDate ?? "",
      placeBirthDate: user?.placeBirthDate ?? "",
      sexe: user?.sexe ?? "",
      nina: user?.nina ?? "",
      diplome: formData.get("diplome")?.toString() ?? "",
      diplomeNumber: formData.get("diplomeNumber")?.toString() ?? "",
      placeOfGraduation: formData.get("placeOfGraduation")?.toString() ?? "",
      countryOfGraduation:
        formData.get("countryOfGraduation")?.toString() ?? "",
      study: formData.get("study")?.toString() ?? "",
      speciality: formData.get("speciality")?.toString() ?? "",
      authorId: user?.id,
      competitionId: formData.get("competitionId")?.toString() ?? "",
      //file
      certificate: certificateName,
     
      orderOfMagistrates: formData.get("orderOfMagistratesType")?.toString() ?? "",
      filesRequired: JSON.stringify(dataFilesArrayUser),
      inputsRequired: JSON.stringify(dataInputsArrayUser),
      groupsRequired:selectDataGroups
     
    },
  });


 
  for await (const item of dataFilesArrayConvert) {
  

    if(item.value.length <=2){
      return new Response(
        JSON.stringify({
          data: "error",
          message: `Veuillez ajouter les pièces obligatoires (*)`,
        })
      );
    }
   
    dataFilesArrayUser.push({  type : item.type, name:item.name, id:item.id,value: await storeImage( formData.get(item.id)  as Blob | null,formData.get("competitionId")!.toString(),data.numeroRef!.toString(),item.name)})
  }


  const dataNew = await prisma.candidature.update({
    where:{
      id: data.id,
      
    }
    ,
    data: {
     
     
      filesRequired: JSON.stringify(dataFilesArrayUser),
     
  
     
     
    
    },
  });

  

  if(!data){
    return new Response(
      JSON.stringify({ data: "error", message: "Erreur d'envoi des données veuillez réessayer." })
    );
  }
  return new Response(
    JSON.stringify({ data: data, message: "La candidature est créée" })
  );
 

   

   
}
















export async function PUT(req: NextRequest, res: NextResponse) {
  
  const formData = await req.formData();



  const user = await prisma.user.findFirst({
    where: {
      email: formData.get("email")?.toString(),
    },
  });
  if (!user) {
    return new Response(
      JSON.stringify({ data: "error", message: `Utilisateur non trouvé` })
    );
  }
    

  
  const dataFilesArray = formData.get("dataFilesArray")!.toString();
  const dataInputsArray = formData.get("dataInputsArray")!.toString();
  const selectDataGroups = formData.get("selectDataGroups")!.toString();

 
  let dataFilesArrayConvert:any[] =  JSON.parse(dataFilesArray)  

 
  let dataFilesArrayUser:any[] =  [];
  

  let dataInputsArrayUser:any[] =  JSON.parse(dataInputsArray);

 

  


/* return new Response(
  JSON.stringify({ data: "error", message: `error ${user}` })
); */

const competition = await prisma.competition.findFirst({
  where: {
    id: formData.get("competitionId")!.toString(),
  },
  include :{ candidatures:true }
 
});



const dataFormat = new Date(Date.now())
  .getFullYear()
  .toString()
  .substring(2, 4);

const candidatureCount =  await prisma.candidature.findMany({
    where:{
      competitionId: competition!.id,
      NOT:{
        statut: "100"
      }
    }
  })

//const strNumber = competition.candidatures.length + 1;
const strNumber = candidatureCount.length + 1;
console.log(competition!.letterNumber);
console.log(competition);
console.log(competition!.letterNumber);

 
  const data = await prisma.candidature.update({
    where:{
      id:parseInt(formData.get("candId")!.toString()),
      
    }
    ,
    data: {
     
      statut: "0",
      numeroRef: `${competition!.letterNumber?.toUpperCase()}-${dataFormat}-${strNumber.toString().padStart(6, "0")}`,
 
      number: formData.get("number")?.toString() ?? ""  ,
      address: formData.get("address")?.toString() ?? ""  ,
      firstName: formData.get("firstName")?.toString() ?? ""  ,
      lastName: formData.get("lastName")?.toString() ?? ""  ,
      fatherName: user?.fatherName ?? "",
      motherName: user?.motherName ?? "",
      birthDate: new Date( formData.get("birthDate")!.toString() ),
      placeBirthDate: formData.get("placeBirthDate")?.toString() ?? ""  ,
      sexe: formData.get("sexe")?.toString() ?? ""  ,
      nina: formData.get("nina")?.toString() ?? ""  ,

      diplome: formData.get("diplome")?.toString() ?? ""  ,
      study: formData.get("study")?.toString() ?? ""  ,
      speciality: formData.get("speciality")?.toString() ?? ""  ,
      placeOfGraduation: formData.get("placeOfGraduation")?.toString() ?? ""  ,
      countryOfGraduation: formData.get("countryOfGraduation")?.toString() ?? ""  ,
      diplomeNumber: formData.get("diplomeNumber")?.toString() ?? ""  ,
      orderOfMagistrates: formData.get("orderOfMagistrates")?.toString() ?? ""  ,
     
      //file
      filesRequired: JSON.stringify(dataFilesArrayUser),
      inputsRequired: JSON.stringify(dataInputsArrayUser),
      groupsRequired:selectDataGroups,
     
     
     //
     canEdit:false
    },
  });


 
  storeImageRename(competition!.id,`${data.id}`,data.numeroRef!)



  for await (const item of dataFilesArrayConvert) {
  

    if(typeof item.value == "string"){
   
      dataFilesArrayUser.push({  type : item.type, name:item.name, id:item.id,value:item.value.replace(data.id,data.numeroRef!)})
    }  else{
   
      dataFilesArrayUser.push({  type : item.type, name:item.name, id:item.id,value: await storeImage( formData.get(item.id)  as Blob | null,competition!.id,`${data.numeroRef}`,item.name)})
    }
   
  }

 

  const dataNew = await prisma.candidature.update({
    where:{
      id: data.id,
      
    }
    ,
    data: { 
     
      filesRequired: JSON.stringify(dataFilesArrayUser), 
    
    },
  });
 

 

  
  return new Response(
    JSON.stringify({ data: data, message: "La candidature est modifiée" })
  );
 
  /* 
   

   */
}
