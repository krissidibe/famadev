import { prisma } from "../utils/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        //  const { email, password } = loginUserSchema.parse(req.body);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Veuillez saisir votre email et votre mot de passe");
        }
        /*   const user = await prisma.user.findUnique({
            where: { email },
          }); */

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error("Aucun utilisateur trouvé");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user!.password
        );

        if (!isPasswordValid) throw new Error("Mot de passe incorrect");

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      
      if(token){
    
    session.user.id = token.id  ;
    session.user.email = token.email ?? "";
    //-session.user.role = token.role ?? "";
    session.user.image = token.picture;
    session.user.role = `${token.role}`;
    session.user.adminRole = `${token.adminRole}`;
   // console.log(`session => ${JSON.stringify(session.user)}`);
   // console.log(`session => ${JSON.stringify(token.role)}`);
      }
  

      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.email = (user as User).email;
        token.role = (user as User).role;
        token.adminRole = (user as User).adminRole;
     
        console.log({ user });
      }
      return token;
    },
  },
  
  pages: {
    signIn: "/",
  },

  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60 * 1000 * 10000,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  secret: process.env.JWT_SECRET,
};
