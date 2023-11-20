"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  number: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  placeofbirthdate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  passwordconfirm: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      number: "",
      placeofbirthdate: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="flex items-center justify-center p-10 ">

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-[650px]">
     
<Card className="">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>

          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque est consectetur repellendus excepturi veritatis! Mollitia neque aliquam amet debitis in placeat at repellat rerum quis quidem beatae maxime, repudiandae temporibus.
        </CardDescription>
      </CardHeader>
      <CardContent>
         
         <div className=" grid sm:grid-cols-2 gap-4 ">
         <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numero de téléphone" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="placeofbirthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de Naissance</FormLabel>
              <FormControl>
                <Input placeholder="Lieu de Naissance" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-2">
              <Label htmlFor="framework">Sexe</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Sexe" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Homme">Homme</SelectItem> 
                  <SelectItem value="Femme">Femme</SelectItem> 
                   
                </SelectContent>
              </Select>
            </div>

            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Mot de passe" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="passwordconfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Confirmer le mot de passe" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
       
         </div>
   
        
     
       
      
   
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild >

          <Link href="/">
          Retour
          </Link>
        </Button>
       {/*  <Button asChild type="submit">Créer le compte</Button> */}
  <Button asChild type="submit">
  <Link href="/admin">
         Créer le compte
          </Link>
    </Button>  
      </CardFooter>
    </Card>
    </form>
    </Form>
     
    </div>
  )
}
