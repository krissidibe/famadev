"use client"
import React, { useMemo } from "react";   
import ExcelJS from "exceljs";
import dayjs from "dayjs";
function ExportExcel({datas,inputs,files,groups} ) {
  
   
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
        header: "Nom & prénom du père",
        key: "fatherName",
        width: 40,
      },
      {
        header: "Nom & prénom de la mère",
        key: "motherName",
        width: 40,
      },
      {
        header: "EMAIL",
        key: "email",
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
        header: "COMMENTAIRE",
        key: "message",
        width: 40,
      },
      {
        header: "MOTIF DU REJET",
        key: "motif",
        width: 40,
      },
    
    ];

    
    sheet.columns = sheet.columns.concat(inputs.map((item) => ({ header: item?.name, key: item?.id.replaceAll("-",""), width: 50, })));
    sheet.columns = sheet.columns.concat(files.map((item) => ({ header: item?.name, key: item?.id.replaceAll("-",""), width: 50, })));
    sheet.columns = sheet.columns.concat(groups.map((item) => ({ header: item?.name, key: item?.id.replaceAll("-",""), width: 50, })));
    /*       inputs.map((item) => ({
        header: item?.name,
        key: item?.name,
        width: 50,
      })); */
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
    

    

    datas.map((item) => {
      const arrayInfo =  JSON.parse(item?.inputsRequired).map(i=>(i.name +" : " +i.value))
     
     
       
      const newLocal = {
        lastName: item?.lastName,
        firstName: item?.firstName,
        fatherName: item?.fatherName,
        motherName: item?.motherName,
        sexe: item?.sexe,
        email: item?.email,
        birthDate: dayjs(item?.birthDate).format("DD/MM/YYYY"),
        placeBirthDate: item?.placeBirthDate,
       
        
        id: dayjs(item?.createdAt).format("DD/MM/YYYY"),
        createdAt: dayjs(item?.createdAt).format("DD/MM/YYYYTHH:mm"),
        id: item?.numeroRef,
        number: item?.number,
        statut: statutOptions[item?.statut].label,
        message: item?.message,
        motif: item?.motif,
        admin: item?.admin,
        updatedAt: dayjs(item?.updatedAt).format("DD/MM/YYYY"),
      };


      
      const arrayInfoTest =  JSON.parse(item?.inputsRequired).map(item=>( { [item?.id.replaceAll("-","")]: item?.value}))
     /*  const  test2 = arrayInfoTest
      const  test = { "9bb6ae27f81a4e6a832f154538637000": item?.lastName}
      console.log("======");
      console.log(groups);
      */ //console.log(arrayInfoTest.length)
    //  console.log(Object.assign(newLocal,arrayInfoTest));
  
      arrayInfoTest.forEach(element => {
        Object.assign(newLocal,element)
      });


      function nameStateFile(params) {
        let value = ""

        switch (params) {
       
          case 1:
            value =    "Incorrect(e)"
            break;
          case 2:
            value =  "Correct(e)"
            break;
        
          default:

       
            value =  "non vérifié"
           
            break;
        }

        return value
        
      }


      if(JSON.parse(item?.filesRequired)){
        const arrayInfoTest2 =  JSON.parse(item?.filesRequired).map(item=>( { [item?.id.replaceAll("-","")]: nameStateFile(item?.fileState)}))
        arrayInfoTest2.forEach(element2 => {
          Object.assign(newLocal,element2)
        });
      }else{
        const arrayInfoTest2 = []
        arrayInfoTest2.forEach(element2 => {
          Object.assign(newLocal,element2)
        });
      }

    
      
    if(JSON.parse(item?.groupsRequired)){
      const arrayInfoTest3 =  JSON.parse(item?.groupsRequired).map(item=>( { [item?.id?.replaceAll("-","")]: item?.value ?? "Non defini"}))
      arrayInfoTest3.forEach(element3 => {
        Object.assign(newLocal,element3)
      });
    }else{
      const arrayInfoTest3 = []
      arrayInfoTest3.forEach(element3 => {
        Object.assign(newLocal,element3)
      });
    }


  
      
     
      console.log(newLocal)
      console.log("======");
      sheet.addRow(newLocal);

      
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
