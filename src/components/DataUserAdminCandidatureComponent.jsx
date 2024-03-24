"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import ExportExcel from "./ExportExcel";
import { CustomerService } from "../Services/Candidature";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

import parse from "html-react-parser";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompetitionStore } from "@/store/useCompetitionStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" 
const statutOptions = [
  {
    label: "En attente de traitement",
    value: 0,
    color: "bg-yellow-500",
  },
  {
    label: "Valider",
    value: 1,
    color: "bg-green-500",
  },
  {
    label: "refuser",
    value: 3,
    color: "bg-red-500",
  },
];
const sexeOptions = [
  {
    label: "Homme",
    value: 0,
  },
  {
    label: "Femme",
    value: 1,
  },
];


 
export default function DataUserAdminCandidatureComponent({ datas ,inputs,files,groups}) {


const columns = [
  {
    name: "N° Enregistrement",
   selector: (row) => row.numeroRef,
    format: (row) => row.numeroRef,
   
  },
  {
    name: "Nom",
    selector: (row) => row.lastName,
    format: (row) => row.lastName.toUpperCase(),

    sortable: true,
  },
  {
    name: "Prénom",
    selector: (row) => row.firstName,
    format: (row) => row.firstName.toUpperCase(),
  },
  {
    name: "Téléphone",
    selector: (row) => row.number,

    // format: (row) => parse(row.content.substring(0,70)  || ""),
  },
  {
    name: "Genre",
    selector: (row) => row.sexe,
    cell: (row) => <div className={`p-1  rounded-md `}>{row.sexe}</div>,
    // format: (row) => parse(row.content.substring(0,70)  || ""),
  },
  {
    name: "Statut",
    selector: (row) => row.id, 
    sortable: true,
    cell: (row) => (
      <div
        className={`p-1 text-white text-[12px] px-2  rounded-md ${
          statutOptions[row.statut].color
        } `}
      >
        {statutOptions[row.statut].label}
      </div>
    ),
  },
  {
    name: "Action",
    selector: (row) => row.sexe,
    cell: (row) => <div
    
 onClick={()=>{
  router.push(`/admin/apply/${row.id}`, {
    query: { data: row },
  });
 }}
    className={` cursor-pointer rounded-md  bg-black text-white p-2 px-6`}>{"Ouvrir"}</div>,
    // format: (row) => parse(row.content.substring(0,70)  || ""),
  },
];
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [records, setRecords] = useState(datas.filter(item=> item.statut != "100" ));
  
  const paginatorLeft = <div>k</div>;
  const paginatorRight = <div>k</div>;
  const [statut, setStatut] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
 
    const newData = datas.filter(item=> item.statut != "100" ).filter((row) => {
      if (statut == "") {
        return (
          (row.numeroRef.toLowerCase().includes(dataStrore.search)) ||
          (row.lastName.toLowerCase().includes(dataStrore.search)) ||
          (row.firstName.toLowerCase().includes(dataStrore.search)) ||
          (row.number.toLowerCase().includes(dataStrore.search)) ||
          (row.sexe.toLowerCase().includes(dataStrore.search))
        );
      }

      return (
        (row.lastName.toLowerCase().includes(dataStrore.search) &&
          row.statut == statut) ||
        (row.firstName.toLowerCase().includes(dataStrore.search) &&
          row.statut == statut) ||
        (row.number.toLowerCase().includes(dataStrore.search) &&
          row.statut == statut) ||
        (row.sexe.toLowerCase().includes(dataStrore.search) &&
          row.statut == statut)
      );
    });
    
    setRecords(newData);
    CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  }, []);

  function handleFilter(e,statut) {
    dataStrore.setSearch(e.trim())
 
    const newData = datas.filter(item=> item.statut != "100" ).filter((row) => {
      if (statut == "") {
        return (
          (row.numeroRef.toLowerCase().includes(e.trim())) ||
          (row.lastName.toLowerCase().includes(e.trim())) ||
          (row.firstName.toLowerCase().includes(e.trim())) ||
          (row.number.toLowerCase().includes(e.trim())) ||
          (row.sexe.toLowerCase().includes(e.trim()))
        );
      }

      return (
        (row.lastName.toLowerCase().includes(e.trim()) &&
          row.statut == statut) ||
        (row.firstName.toLowerCase().includes(e.trim()) &&
          row.statut == statut) ||
        (row.number.toLowerCase().includes(e.trim()) &&
          row.statut == statut) ||
        (row.sexe.toLowerCase().includes(e.trim()) &&
          row.statut == statut)
      );
    });
    
    setRecords(newData);
  }
  /*   <div className="hidden md:block" >   <DataUserCandidatureComponent isMobileScreen={false} /></div>
  <div className="md:hidden" >   <DataUserCandidatureComponent isMobileScreen={true} /></div> */
  const dataStrore = useCompetitionStore()
  return (
    <div>

     





      <div className="hidden md:block">
        {" "}
        
        <div className="flex items-center gap-4">
          <Input className="my-4" value={dataStrore.search} onChange={(e) =>handleFilter(e.target.value.toLowerCase(),statut)} />
          <div className="flex flex-col space-y-1.5 w-[300px]">
            
            <Select defaultValue={statut} onValueChange={(e) => {
              setStatut(e);
              
           handleFilter("",e)
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Sexe" />
                <SelectContent position="popper">
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="0">En attente de traitement</SelectItem>
                  <SelectItem value="1">Valider</SelectItem>
                  <SelectItem value="2">refuser</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <ExportExcel datas={records} inputs={inputs}  files={files} groups={groups} />

          <ModalEmail/>
           
        </div>
        <DataTable
          pagination
          subHeader
          subHeaderAlign="right"
          subHeaderWrap
          striped
          fixedHeader={true}
          noHeader={false}
          highlightOnHover
          className="border-2 rounded"
          columns={columns}
          data={records}
          onRowClicked={(row) => {
            const user = {
              firstName: row.author.firstName,
              lastName: row.author.lastName,
              birthDate: row.author.birthDate,
              sexe: row.author.sexe,
              email: row.author.email,
              number: row.author.number,
              nina: row.author.nina,
              image: row.author.image,
            };

            //    alert(JSON.stringify(user));
            //  return
            /*        router.replace(`/user/candidatures/${row.id}`,{
              query: { data: row },
            }) */
            router.push(`/admin/apply/${row.id}`, {
              query: { data: row },
            });
          }}
        />
      </div>
    </div>
  );

  function ModalEmail() {

    const [file, setFile] = useState(null)

   const [allMail, setAllMail] = useState(records.map((e)=> (e.email)))
   const [allMailFile, setAllMailFile] = useState([])
   const [messageData, setMessageData] = useState({
    title: "",
    content: "",
   })
    return <AlertDialog>
      <AlertDialogTrigger className="w-[300px]"  asChild>
        <Button variant="outline">Envoyer un email</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Votre message</AlertDialogTitle>
       
        </AlertDialogHeader>
       <p>Nombre d'email :  {file == null ? allMail.length : allMailFile.length - 1 }</p>
   
      <div className="flex gap-4">
         <Input type="file" onChange={ async (e) =>
        {

        setFile(e.target.files[0])
 
        // const workbook = XLSX.read(e.target.files[0],{type: 'buffer'});

         const workbook = new ExcelJS.Workbook();
      // const values =   await workbook.xlsx.load(e.target.files[0]);
         /* const worksheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[worksheetName];
         const data = XLSX.utils.sheet_to_json(worksheet); */
         await workbook.xlsx.load(e.target.files[0])
         .then(() => {
             const worksheet = workbook.getWorksheet(1);
            
             // rest of the code goes here
             const json = [];

worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
    const rowObject = {};

    row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
       if(colNumber ==6){
        rowObject[`col${colNumber}`] = cell.value["text"] == null ? cell.value : cell.value["text"];
       }
    });

    json.push(rowObject);
     
    setAllMailFile(json.map((e)=> (e.col6)))
});
console.log(json);
         })
         .catch((error) => {
             console.log('Error: ', error);
         });
        
        }
        } />
      {file != null &&  <Button onClick={()=>{
        setFile(null)
      }}>Annuler</Button>}
      </div>
        <Input placeholder="Titre de l'email" value={messageData.title} onChange={(e) => setMessageData({ ...messageData, title: e.target.value })} />
          <Textarea value={messageData.content} onChange={(e) => setMessageData({ ...messageData, content: e.target.value })} className="h-[200px]" placeholder="Contenu du message" />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {allMail.length > 0  && <AlertDialogAction onClick={async () => {
            
           
            const res = await fetch(`/api/sendmailmulti`, {
              body: JSON.stringify({
                data:file == null ? allMail : allMailFile,
                title: messageData.title,
                content: messageData.content
              }),
              headers: {
                "Content-type": "application/json",
              },
              method: "POST",
            });
            const data = await res.json();
            console.log(data);
            if (res.status == 200) {
              alert(data.message)
              setFile(null)
               setMessageData((x) => (x = { title: "", content: "" }));
              setAllMailFile([])
            }
          }} >Envoyer</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>;
  }
}
