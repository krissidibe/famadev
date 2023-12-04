"use client"
import React, { useMemo } from "react";   
import ExcelJS from "exceljs";
import dayjs from "dayjs";
function ExportExcel({datas} ) {
   
  const exportFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Candidatures");
    sheet.properties.defaultRowHeight = 20;
    sheet.columns = [
     /*  {
        header: "Id",
        key: "id",
        width: 40,
      }, */

      {
        header: "N° ENREGISTREMENT",
        key: "id",
        width: 50,
      },
     
      {
        header: "PRENOM",
        key: "firstName",
        width: 40,
      },
      {
        header: "NOM",
        key: "lastName",
        width: 40,
      },
      {
        header: "SEXE",
        key: "sexe",
        width: 40,
      },
      {
        header: "DATE DE NAISSANCE",
        key: "birthDate",
        width: 50,
      },
      {
        header: "LIEU DE NAISSANCE",
        key: "placeBirthDate",
        width: 50,
      },
      {
        header: "Information",
        key: "diplome",
        width: 50,
      },
      {
        header: "NIVEAU",
        key: "study",
        width: 50,
      },


      {
        header: "CONTACT",
        key: "number",
        width: 40,
      },
      
     
      {
        header: "DATE DEPOT",
        key: "createdAt",
        width: 50,
      },

      
      {
        header: "DATE DE TRAITEMENT",
        key: "updatedAt",
        width: 50,
      },
     
      {
        header: "TRAITE PAR",
        key: "admin",
        width: 40,
      },
      

      
      {
        header: "STATUT",
        key: "statut",
        width: 40,
      },
      {
        header: "MOTIF",
        key: "message",
        width: 40,
      },
    
    ];

    const statutOptions = [
      {
        label: "En attente de traitement",
        value: 0,
        color: "bg-yellow-500",
      },
      {
        label: "Valider", 
        value: 1,
        color: "bg-green-500"
      },
      {
        label: "refuser",
        value: 3,
        color: "bg-red-500"
      },
    ];
    const sexeOptions = [{
      label :"Homme",value:0,
    },
    {
      label :"Femme",value:1,
    }
    ]
    const orderOptions = [ "Ordre admnistratif","Ordre Judiciaire"]


    datas.map((item) => {
      const arrayInfo =  JSON.parse(item.inputsRequired).map(i=>(i.name +" : " +i.value))
      sheet.addRow({
     
        lastName: item.lastName,
        firstName: item.firstName,
        sexe: item.sexe,
        birthDate:  dayjs(item.birthDate).format("DD/MM/YYYY") ,
        placeBirthDate: item.placeBirthDate,
        diplome:arrayInfo,
        study: item.groupsRequired,
        id: dayjs(item.createdAt).format("DD/MM/YYYY") ,
        createdAt: dayjs(item.createdAt).format("DD/MM/YYYY") ,
        id: item.numeroRef,
        number: item.number,
        statut: statutOptions[item.statut].label,
        message: item.message,
        admin: item.admin,
       
        updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY") ,
      });
    });
    workbook.xlsx.writeBuffer().then(data=>{
      const blob = new Blob([data],{
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = "download.xlsx"
      anchor.click()
      window.URL.revokeObjectURL(url)
    })
  };


  return (
   
      <div onClick={exportFile}   className="w-[300px] p-2 border-[1px] rounded-sm  cursor-pointer ">
        Exporter la liste 
      </div>

      
  );
}

export default ExportExcel;
