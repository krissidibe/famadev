import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import storeImage from "@/utils/addImageHelper";

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
  /*   const {
    sexe,
    nina,
    certificate,
    diplome,
    diplomeNumber,
    placeOfGraduation,
    countryOfGraduation,
    study,
    speciality,
    uid,
    competitionId,
    
  } = await req.json();

 */
  const formData = await req.formData();

  const competition = await prisma.competition.findFirst({
    where: {
      id: formData.get("competitionId")?.toString(),
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
  let birthDateFileName = "";
  let cassierFileName = "";
  let certificatVieName = "";
  let certificatVisiteName = "";
  let diplomeFileName = "";
  let equivalenceFileName = "";
  let infoCardFileName = "";
  let ninaFileName = "";
  let demandeFileName = "";

  const certificate = formData.get("certificate") as Blob | null;
  const birthDateFile = formData.get("birthDateFile") as Blob | null;
  const cassierFile = formData.get("cassierFile") as Blob | null;
  const certificatVie = formData.get("certificatVie") as Blob | null;
  const certificatVisite = formData.get("certificatVisite") as Blob | null;
  const diplomeFile = formData.get("diplomeFile") as Blob | null;
  const infoCardFile = formData.get("infoCardFile") as Blob | null;
  const demandeFile = formData.get("demandeFile") as Blob | null;
  const ninaFile = formData.get("ninaFile") as Blob | null;
  const equivalenceFile = formData.get("equivalenceFile") as Blob | null;







  

  if (
    certificate?.toString() == "" ||
    birthDateFile?.toString() == "" ||
    cassierFile?.toString() == "" ||
    certificatVie?.toString() == "" ||
    certificatVisite?.toString() == "" ||
    diplomeFile?.toString() == "" ||
    infoCardFile?.toString() == "" ||
    demandeFile?.toString() == ""
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }

  try {
    certificateName = await storeImage(certificate);
    birthDateFileName = await storeImage(birthDateFile);
    cassierFileName = await storeImage(cassierFile);
    certificatVieName = await storeImage(certificatVie);
    certificatVisiteName = await storeImage(certificatVisite);
    diplomeFileName = await storeImage(diplomeFile);
    equivalenceFileName = await storeImage(equivalenceFile);
    ninaFileName = await storeImage(ninaFile);
    infoCardFileName = await storeImage(infoCardFile);
    demandeFileName = await storeImage(demandeFile);
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }
/* 
  const defFile = formData.get("defFile") as Blob | null;
  const bacFile = formData.get("bacFile") as Blob | null;
  const licenceFile = formData.get("licenceFile") as Blob | null;
  const maitriseFile = formData.get("maitriseFile") as Blob | null;
  const master1File = formData.get("master1File") as Blob | null;
  const master2File = formData.get("master2File") as Blob | null;

  let defFileName = "";
  let bacFileName = "";
  let licenceFileName = "";
  let maitriseFileName = "";
  let master1FileName = "";
  let master2FileName = "";

  try {
    defFileName = await storeImage(defFile);
  } catch (error) {
    defFileName = "non renseigné";
  }

  try {
    bacFileName = await storeImage(bacFile);
  } catch (error) {
    bacFileName = "non renseigné";
  }

  try {
    licenceFileName = await storeImage(licenceFile);
  } catch (error) {
    licenceFileName = "non renseigné";
  }

  try {
    maitriseFileName = await storeImage(maitriseFile);
  } catch (error) {
    maitriseFileName = "non renseigné";
  }

  try {
    master1FileName = await storeImage(master1File);
  } catch (error) {
    master1FileName = "non renseigné";
  }

  try {
    master2FileName = await storeImage(master2File);
  } catch (error) {
    master2FileName = "non renseigné";
  } */

 
  if (
    certificateName == "File not" ||
    birthDateFileName == "File not" ||
    cassierFileName == "File not" ||
    certificatVieName == "File not" ||
    certificatVisiteName == "File not" ||
    diplomeFileName == "File not" ||
    infoCardFileName == "File not" ||
    demandeFileName == "File not" 
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }

  const data = await prisma.candidature.create({
    data: {
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
      birthDateFile: birthDateFileName,
      cassierFile: cassierFileName,
      certificatVie: certificatVieName,
      certificatVisite: certificatVisiteName,
      diplomeFile: diplomeFileName,
      equivalenceFile: equivalenceFileName,
      ninaFile: ninaFileName,
      infoCardFile: infoCardFileName,
      demandeFile: demandeFileName,
      orderOfMagistrates: formData.get("orderOfMagistratesType")?.toString() ?? "",
     
    },
  });

  const dataFormat = new Date(Date.now())
    .getFullYear()
    .toString()
    .substring(2, 4);

  const strNumber = competition.candidatures.length + 1;

  const finalData = await prisma.candidature.update({
    where: {
      id: data.id,
    },
    data: {
      numeroRef: `DNAJ${dataFormat}${competition.letterNumber?.toUpperCase()}${strNumber.toString().padStart(6, "0")}`,
    },
  });

  if(!finalData){
    return new Response(
      JSON.stringify({ data: "error", message: "Erreur d'envoi des données veuillez réessayer." })
    );
  }
  return new Response(
    JSON.stringify({ data: finalData, message: "La candidature est créée" })
  );
 
  /* 
   

   */
}
















export async function PUT(req: NextRequest, res: NextResponse) {
  
  const formData = await req.formData();

   console.log("item error 2");
  
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

/*   const candidatureCheck = await prisma.candidature.findFirst({
    where: {
      authorId: user?.id,
      competitionId: formData.get("competitionId")?.toString(),
    },  console.log("item error");
  }); */

  let certificateName = "";
  let birthDateFileName = "";
  let cassierFileName = "";
  let certificatVieName = "";
  let certificatVisiteName = "";
  let diplomeFileName = "";
  let equivalenceFileName = "";
  let infoCardFileName = "";
  let ninaFileName = "";
  let demandeFileName = "";
 

  const certificate = formData.get("certificate") as Blob | null;
  const birthDateFile = formData.get("birthDateFile") as Blob | null;
  const cassierFile = formData.get("cassierFile") as Blob | null;
  const certificatVie = formData.get("certificatVie") as Blob | null;
  const certificatVisite = formData.get("certificatVisite") as Blob | null;
  const diplomeFile = formData.get("diplomeFile") as Blob | null;
  const infoCardFile = formData.get("infoCardFile") as Blob | null;
  const demandeFile = formData.get("demandeFile") as Blob | null;
  const ninaFile = formData.get("ninaFile") as Blob | null;
  const equivalenceFile = formData.get("equivalenceFile") as Blob | null; 
 
  if (
    certificate?.toString() == "" ||
    birthDateFile?.toString() == "" ||
    cassierFile?.toString() == "" ||
    certificatVie?.toString() == "" ||
    certificatVisite?.toString() == "" ||
    diplomeFile?.toString() == "" ||
    infoCardFile?.toString() == "" ||
    demandeFile?.toString() == ""
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }

  try {
    certificateName = await storeImage(certificate);
    birthDateFileName = await storeImage(birthDateFile);
    cassierFileName = await storeImage(cassierFile);
    certificatVieName = await storeImage(certificatVie);
    certificatVisiteName = await storeImage(certificatVisite);
    diplomeFileName = await storeImage(diplomeFile);
    equivalenceFileName = await storeImage(equivalenceFile);
    ninaFileName = await storeImage(ninaFile);
    infoCardFileName = await storeImage(infoCardFile);
    demandeFileName = await storeImage(demandeFile);
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }
 
 
  if (
    certificateName == "File not" ||
    birthDateFileName == "File not" ||
    cassierFileName == "File not" ||
    certificatVieName == "File not" ||
    certificatVisiteName == "File not" ||
    diplomeFileName == "File not" ||
    infoCardFileName == "File not" ||
    demandeFileName == "File not" 
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Veuillez ajouter les pièces obligatoires (*)`,
      })
    );
  }  


 
  const data = await prisma.candidature.update({
    where:{
      id:parseInt(formData.get("candId")!.toString()),
      
    }
    ,
    data: {
     

     
      number: formData.get("number")?.toString() ?? ""  ,
      address: formData.get("address")?.toString() ?? ""  ,
      firstName: formData.get("firstName")?.toString() ?? ""  ,
      lastName: formData.get("lastName")?.toString() ?? ""  ,
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
      certificate: certificateName,
      birthDateFile: birthDateFileName,
      cassierFile: cassierFileName,
      certificatVie: certificatVieName,
      certificatVisite: certificatVisiteName,
      diplomeFile: diplomeFileName,
      equivalenceFile: equivalenceFileName,
      ninaFile: ninaFileName,
      infoCardFile: infoCardFileName,
      demandeFile: demandeFileName,
     
     //
     canEdit:false
    },
  });

 
  return new Response(
    JSON.stringify({ data: data, message: "La candidature est modifiée" })
  );
 
  /* 
   

   */
}
