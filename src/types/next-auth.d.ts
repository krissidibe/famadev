import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"
import type {User} from "next-auth"
declare module "next-auth" {
 
  interface Session {
    user: User & {
      id: UserId
      role: string
      
    }
  }
}