import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

 

export async function GET(req: NextRequest) {
 
 const datas = [  {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
},
 ]
  return new Response(JSON.stringify(datas));
}


 