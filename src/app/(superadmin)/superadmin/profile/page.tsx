"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  import {
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    PhoneIcon,
    InformationCircleIcon,
  } from "@heroicons/react/24/solid";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import InputComponent from '@/components/InputComponent';
import { Label } from '@/components/ui/label';
import ButtonComponent from '@/components/ButtonComponent';
function page() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [placeBirthDate, setPlaceBirthDate] = useState("");
    const [adress, setAdress] = useState("");
    const [date, setDate] = useState(new Date(Date.now()));
    const [sexe, setSexe] = useState("Homme");
    const [password, setPassword] = useState("");
    const [passwordVeirfy, setPasswordVerify] = useState("");
  

    const createUser = async () => {
        //dayjs(date).format("DD/MM/YYYY")
        let birthDate = date;
    
        const res = await fetch(`/api/superadmin/author`, {
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            number,
            sexe,
            adress,
            
            password,
            type: "create",
          }),
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        console.log(data);
        if (data.message) {
          alert(data.message)
          /*  modal.onOpen(); */
       
        //  showDialogClick.current.click();
        }
      };
    
  
  return (
    <div className="grid w-full h-full place-items-center">
         <Card className="max-w-[400px]  md:max-w-[500px]">
          
          <CardHeader>
            <div className="flex items-center mb-4 space-x-4">
              <CardTitle>Inscription</CardTitle>
            </div>
            <CardDescription className="">
           <p> Votre inscription sur cette plateforme vous donne le privilège de candidater aux différents concours organisés par la DNAJ. </p>
           <p>
           Donc rassurez-vous de remplir correctement le formulaire d'inscription ci-dessous  avec les informations fiables. En particulier votre adresse mail fournie doit être correcte et accessible permettant de vous contacter en cas de besoin.
           </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid items-center w-full gap-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={lastName}
                    handleChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={1}
                    label="Nom"
                  />
                  <InputComponent
                    value={firstName}
                    handleChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={2}
                    label="Prénom"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={email}
                    handleChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    Icon={EnvelopeIcon}
                    withIcon={true}
                    key={3}
                    label="Email"
                    inputType="email"
                  />
                  <InputComponent
                    value={number}
                    handleChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Numero de téléphone"
                  />
                   <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Sexe</Label>
                    <Select
                      defaultValue={sexe}
                      onValueChange={(e) => setSexe(e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sexe" />
                        <SelectContent position="popper">
                          <SelectItem value="Homme">Homme</SelectItem>
                          <SelectItem value="Femme">Femme</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </div>
                  <InputComponent
                    value={adress}
                    handleChange={(e) => {
                      setAdress(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Adresse physique"
                  />
                </div>

               
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={password}
                    handleChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={6}
                    label="Mot de passe"
                    inputType="password"
                  />
                  <InputComponent
                    value={passwordVeirfy}
                    handleChange={(e) => {
                      setPasswordVerify(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={7}
                    inputType="password"
                    label="Confirmer le mot de passe"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ButtonComponent
            handleClick={createUser}
              key={8}
              label="Créer le compte"
              full={true}
              className="self-end w-full mt-4 md:w-[200px]"
            />
          </CardFooter>
        </Card>
    </div>
  )
}

export default page