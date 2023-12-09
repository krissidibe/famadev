import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import formidable from "formidable";

import mime from "mime";
import path, { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { getSession } from "next-auth/react";
import storeImage from "@/utils/addImageHelper";

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

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    birthDate,
    placeBirthDate,
    adress,
    password,
    fatherName,
motherName,
nina,
    type,
  } = await req.json();

  if (type == "create") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user != null)
        return new Response(
          JSON.stringify({ user: null, message: "L'email existe déjà" })
        );

      const passwordCryp = await bcrypt.hash(password, 10);
      const data = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          number,
          sexe,
          birthDate: new Date(birthDate),
          placeBirthDate,
          address: adress,
          password: passwordCryp,
          fatherName:fatherName,
          motherName:motherName,
          nina:nina,
        },
      });
      return new Response(
        JSON.stringify({ user: data, message: "Votre compte est créé" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  }
  if (type == "user") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user == null)
        return new Response(
          JSON.stringify({ user: null, message: "Erreur de récupération" })
        );

      return new Response(
        JSON.stringify({ user: user, message: "Votre compte est créé" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  } else {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (data == null)
        return new Response(
          JSON.stringify({
            user: null,
            message: "L'email n'existe pas veuillez créer votre compte",
          })
        );

      const isPasswordValid = await bcrypt.compare(password, data.password);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ user: null, message: "password incorrect" })
        );
      }

      return new Response(JSON.stringify({ user: data, message: "succes" }));
    } catch (error) {
      return new Response(JSON.stringify({ error: "error" }));
      /*       res.status(500).json(error); */
    }
  }
}
/* 
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
}) */

export async function PATCH(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const file = formData.get("file") as Blob | null;
  const ninaFile = formData.get("ninaFile") as Blob | null;

  let fileImage = "";
  let ninaFileName = "";

  try {
    fileImage = await storeImage(file);
  } catch (error) {
    fileImage = formData.get("file")?.toString() ?? "";
  }

  try {
    ninaFileName = await storeImage(ninaFile);
  } catch (error) {
    ninaFileName = formData.get("ninaFile")?.toString() ?? "";
  }

  const val = formData.get("birthDate");
  const dataNew = await prisma.user.update({
    where: {
      email: formData.get("email")?.toString(),
    },
    
    data: {
      firstName: formData.get("firstName")?.toString(),
      lastName: formData.get("lastName")?.toString(),
      sexe: formData.get("sexe")?.toString(),
      birthDate: new Date(val ? val.toString() : Date.now()),
      placeBirthDate: formData.get("placeBirthDate")?.toString() ?? "",
      nina: formData.get("numberNina")?.toString(),
      number: formData.get("number")?.toString(),
      address: formData.get("address")?.toString(),
      fatherName: formData.get("fatherName")?.toString(),
      motherName: formData.get("motherName")?.toString(),
      ninaFile: ninaFileName,
      image: fileImage,
    },
  });
  return new Response(
    JSON.stringify({
      user: dataNew,
      message: `Votre profile est modifier`,
    })
  );

  // saveFile(formData.get("file"))
  return new Response(
    JSON.stringify({
      user: "dataUpdate",
      message: `Votre   `,
    })
  );

  //

  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    password,
    type,
    birthDate,
    numberNina,
    image,
  } = await req.json();
  const data = await prisma.user.findFirst({
    where: {
      AND: [{ email: email }, { role: "USER" }],
    },
  });

  if (data == null)
    return new Response(
      JSON.stringify({
        user: data,
        message: "L'email n'existe pas veuillez créer votre compte",
      })
    );

  /*     return new Response(
      JSON.stringify({
        user: {},
        message: `Votre profile est  ${numberNina}`,
      })
    ); */

  const dataUpdate = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      sexe: sexe,
      birthDate: birthDate,
      nina: numberNina,
      number: number,
    },
  });
  return new Response(
    JSON.stringify({
      user: dataUpdate,
      message: `Votre profile est modifier`,
    })
  );
}














export async function PUT(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  
 

const user = await prisma.user.findFirst({
  where: {
    AND: [{ email: formData.get("email")!.toString() }, { role: "USER" }],
  },
});



const passwordCrypCheck = await bcrypt.compare(formData.get("passwordOld")!.toString(),user!.password);

if(passwordCrypCheck == false){
  return new Response(
    JSON.stringify({
      user: "error",
      message: `Votre mot de passe ancienne est incorrect`,
    })
  )
  
}

const passwordCryp = await bcrypt.hash(formData.get("password")!.toString(), 10);

  const val = formData.get("birthDate");
  const dataNew = await prisma.user.update({
    where: {
      email: formData.get("email")?.toString(),
    },
    data: {
      password: passwordCryp,
      
    },
  });
  return new Response(
    JSON.stringify({
      user: dataNew,
      message: `Votre mot de passe est modifier`,
    })
  );

  // saveFile(formData.get("file"))
  return new Response(
    JSON.stringify({
      user: "dataUpdate",
      message: `Votre   `,
    })
  );

  //

  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    password,
    type,
    birthDate,
    numberNina,
    image,
  } = await req.json();
  const data = await prisma.user.findFirst({
    where: {
      AND: [{ email: email }, { role: "USER" }],
    },
  });

  if (data == null)
    return new Response(
      JSON.stringify({
        user: data,
        message: "L'email n'existe pas veuillez créer votre compte",
      })
    );

  /*     return new Response(
      JSON.stringify({
        user: {},
        message: `Votre profile est  ${numberNina}`,
      })
    ); */

  const dataUpdate = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      sexe: sexe,
      birthDate: birthDate,
      nina: numberNina,
      number: number,
    },
  });
  return new Response(
    JSON.stringify({
      user: dataUpdate,
      message: `Votre profile est modifier`,
    })
  );
}
