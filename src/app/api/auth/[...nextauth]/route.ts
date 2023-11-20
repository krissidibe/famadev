import NextAuth from "next-auth/next";
import { z } from 'zod'; 
import { authOptions } from "@/lib/authOption";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }