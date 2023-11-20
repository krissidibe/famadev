"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
/* import ExperienceProModel from './ExperienceProModel';
 */

// Create styles
const styles = StyleSheet.create({
  page: { backgroundColor: "white" },
  section: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginHorizontal: 20,
    marginTop:5,
    color: "black",
  },
});

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
const MyDocument = ({ data }) => (
  /* 
      <Image
          src="/images/logo2.png"
          alt="me"
          className="absolute left-10 top-10"
          width="290"
          height="290"
        />

        <div className="absolute flex-col flex-1 text-sm text-center text-white right-10 top-10 md:flex">
          <p>REPUBLIQUE DU MALI</p>
          <p>Un Peuple - Un But - Une Foi</p>
        </div>
  */
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Image
          src="/images/logo2n.png"
          style={{ height: 60, objectFit: "contain" }}
        />
        <View
          style={{
            fontSize: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text>REPUBLIQUE DU MALI</Text>
          <Text>Un Peuple - Un But - Une Foi</Text>
        </View>
      </View>
      
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          padding: 5,
          marginLeft: 15,
          paddingHorizontal:10,
          marginTop:7,
          
          marginBottom:0,
          marginHorizontal:"auto",
          color:"#FFFFFF",
          backgroundColor:"#00000067",
          borderRadius:5
          
        }}
      >
        RÉCÉPISSÉ DE DÉPÔT DE CANDIDATURE
      
      </Text>
      <Text
        style={{
          fontSize: 12,
          
          padding: 5,
          marginLeft: 15,
          paddingHorizontal:10,
          marginTop:7,
          
          marginBottom:12,
          marginHorizontal:"auto",
          color:"#FFFFFF",
          backgroundColor:"#00000057",
          borderRadius:5,
          maxLines:1,
          
          
        }}
      >
     {  data?.competition.title}
        
      
      </Text>

      <View style={styles.section}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
            marginBottom: 6,
          }}
        >
          {InfoInput("N° ENREGISTREMENT", data?.numeroRef)}
          {InfoInput(
            "Date du dépôt",
            `${dayjs(data?.createdAt).format("DD/MM/YYYY")}`
          )}
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
            marginTop: 4,
            marginBottom:5,
           
          }}
        >
          {InfoInput(
            "Statut de candidature",
            ` ${statutOptions[parseInt(data?.statut ?? 0)].label} `
          )}
        </View>

        <View
          style={{
            marginBottom: "10px",
            marginTop: "5px",
            paddingBottom: "5px",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px", padding:10,
            width:"100%",
            marginHorizontal:"auto",
           borderRadius:5
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              marginTop: 10,
              
            }}
          >
            {InfoInput("Nom", data?.lastName)}
          <View style={{ width:"50%"}}>
          {InfoInput("Prénom", data?.firstName)}
          </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              marginTop: 10,
              
            }}
          >
             {InfoInput("Email", data?.email)}
             <View style={{ width:"50%"}}>
          
          {InfoInput("Téléphone", data?.number)}
          </View>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              marginTop: 10,
              
            }}
          >
            {InfoInput(
            "Date de naissance",
            dayjs(data?.birthDate).format("DD/MM/YYYY")
          )}

<View style={{ width:"50%"}}>
           
          {InfoInput("Lieu de naissance", data?.placeBirthDate)}
          </View>
          </View>
        

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              marginTop: 10,
              
            }}
          >
           {InfoInput("Sexe", data?.sexe)}
           <View style={{ width:"50%"}}>
           
          {InfoInput("Adresse de domiciliation", data?.address)}
          </View>
          </View>
         
          
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              marginTop: 10,
              
            }}
          >
           
           <View style={{ width:"50%"}}>
           
           {InfoInput("NINA", data?.nina)}
          </View>
          </View>
    
        </View>

        <View
          style={{
            marginBottom: "6px",
            paddingBottom: "5px",
           
          }}
        >
          <Text style={{ marginTop: "10px" }}>
          Informations à propos du concours

          </Text>
        </View>
        <View
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            padding:10,
            borderRadius:5,
            height:"160px",
            display:"flex",
            justifyContent:'space-between'
          }}
        >
          {InfoInput("Diplôme de nationalité", data?.diplome)}
          {InfoInput("Filiere", data?.study)}
          {InfoInput("Spécialité", data?.speciality)}
          {InfoInput("Lieu d’optention du diplôme", data?.placeOfGraduation)}
          {InfoInput("Pays d’optention du diplôme", data?.countryOfGraduation)}
          {InfoInput("Numero du diplôme", data?.diplomeNumber)}
          { data?.orderOfMagistrates !=""
                && ( 
                  InfoInput("Ordre Judiciaire / Ordre Administratif", data?.orderOfMagistrates == "0" ? "Ordre admnistratif" : "Ordre judiciaire")
                  
                 )
                }
        </View>
        <View
          style={{
            marginBottom: "6px",
            paddingBottom: "5px",
           
          }}
        >
          <Text style={{ marginTop: "10px" }}>
          Les pieces jointes

          </Text>
        </View>
         
        <View
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            padding:10,
            borderRadius:5,
            height:"240px",
            display:"flex",
            justifyContent:'space-between'
          }}
        >
          
          {InfoInputFile("La copie d'acte de naissance", data?.birthDateFile)}
          {InfoInputFile("L'extrait du casier judiciaire", data?.cassierFile)}
          {InfoInputFile(
            "Le certificat de bonne vie et moeurs",
            data?.certificatVie
          )}
          {InfoInputFile(
            "Le certificat de nationalité malienne",
            data?.certificate
          )}
          {InfoInputFile(
            "Le certificat de visite et contre visite",
            data?.certificatVisite
          )}
          {InfoInputFile(
            "Le copie certifiée conforme du diplome requis",
            data?.diplomeFile
          )}
          {InfoInputFile(
            "L'équivalence du diplômes requis pour les diplômes étrangers",
            data?.equivalenceFile
          )}
          {InfoInputFile("La copie de la carte nina ou la fiche individuelle", data?.ninaFile)}
          {InfoInputFile(
            "La copie de la pièce d’identité",
            data?.infoCardFile
          )}
          {InfoInputFile("La demande manuscrite timbrée", data?.demandeFile)}
        </View>

       {/*  <View style={{}}>
          {data?.def.toString().includes("files/") &&
            InfoInputFile("DEF", data?.def)}
          {data?.bac.toString().includes("files/") &&
            InfoInputFile("BAC", data?.bac)}
          {data?.licence.toString().includes("files/") &&
            InfoInputFile("LICENCE", data?.licence)}
          {data?.maitrise.toString().includes("files/") &&
            InfoInputFile("MAITRISE", data?.maitrise)}
          {data?.master1.toString().includes("files/") &&
            InfoInputFile("MASTER1", data?.master1)}
          {data?.master2.toString().includes("files/") &&
            InfoInputFile("MASTER2", data?.master2)}
        </View> */}
      </View>
    </Page>
  </Document>
);

function InfoInput(label, value) {
  return (
    <View
      style={{
       
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "",
        alignItems:"flex-center"
      }}
    >
      <Text style={{fontWeight:"black" ,fontSize:12}} >{label} :    </Text>
      <Text style={{fontWeight:"thin" ,fontSize:12,color:"#1b1b1b"}} >{value}</Text>
    </View>
  );
}
function InfoInputFile(label, value = false) {
  return (
    <View
      style={{
        marginBottom: "10px",
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{label} :</Text>
      <Text>{value.toString().includes("files/") ? "Oui" : "Non"}</Text>
    </View>
  );
}

function _buildExperienceItem(e) {
  return (
    <View style={{ marginBottom: "10px " }}>
      <Text style={{ fontWeight: "bold", fontSize: "18px" }}>
        {e.firstName}{" "}
      </Text>
      <Text style={{ fontWeight: "semibold" }}>{e.company} </Text>
      <Text style={{ opacity: "0.8" }}>{e.period} </Text>
      <Text>{e.content} </Text>
    </View>
  );
}

function UserPdf({ data, className = "" }) {
  const [isClient, setIsClient] = useState(false);
  const [textUrl, setTextUrl] = useState("");

  const [datas, setDatas] = useState(data);
  const generatePdfDocument = async (documentData, fileName, data) => {
    const blob = await pdf(
      <MyDocument data={datas} title="My PDF" pdfDocumentData={documentData} />
    ).toBlob();
    saveAs(blob, datas?.numeroRef);
  };
  useEffect(() => {
    setIsClient(true);

    if (isClient) {
    }
  }, [isClient]);
  return (
    <div>
     {/*  {isClient && (
        <PDFViewer width="100%" height="1000px">
          <MyDocument data={datas} />
        </PDFViewer>
      )} */}
      {isClient && (
        <div>
          {/*  <MyDocument /> */}
          <button
            className={`border-2 rounded-sm ${className}`}
            onClick={(e) => {
              e.stopPropagation()
              generatePdfDocument(data)
            }}
          >
            Télécharger le récépissé
          </button>
        </div>
      )}
    </div>
  );
}
export default UserPdf;
