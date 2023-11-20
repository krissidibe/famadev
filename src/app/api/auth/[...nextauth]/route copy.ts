import { prisma } from "../../../../utils/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from 'zod';
import { User } from '@prisma/client';
import { authOptions } from "../../../../lib/authOption";

const loginUserSchema = z.object({
  email: z.string().min(5, 'Password should be minimum 5 characters'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }