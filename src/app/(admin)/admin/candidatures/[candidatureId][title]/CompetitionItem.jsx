"use client";
import React, { useState } from "react";
import ButtonComponent from "../../../../../../components/ButtonComponent";
import InputComponent from "../../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiFillPicture } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { redirect, useRouter } from "next/navigation";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function EditorComponent({ value, handleChange }) {
  return (
    <div className="bg-[#F8F9FA] min-h-[500px]  mb-6 p-2 shadow-lg">
      <Editor
        editorState={value}
        onEditorStateChange={(newState) => {
          handleChange(newState);
        }}
      />
    </div>
  );
}
function CompetitionItem({ params, data }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [image, setImageUrl] = useState("image");
  const [title, setTitle] = useState(data.title);
  const [ageMax, setAgeMax] = useState(data.ageMax);
  const [ageMin, setAgeMin] = useState(data.ageMin);

  const [content, setContent] = useState(
    EditorState.createWithContent(convertFromHTML(data.content))
  );

  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];
  const [statut, setStatutSelect] = useState(statutData[data.statut]);
  const [startDateAt, setStartDateAt] = useState(data.startDateAt);
  const [endDateAt, setEndDateAt] = useState(data.endDateAt);

  const updateData = async (e) => {
    e.preventDefault();
    /*  alert(content.getCurrentContent())
    return */
    const valueContent = convertToHTML(content.getCurrentContent());
    const res = await fetch(`/api/admin/competition`, {
      body: JSON.stringify({
        image,
        title,
        ageMax,
        ageMin,
        valueContent,
        startDateAt,
        endDateAt,
        statut,
        id: params.competitionId,
      }),
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
    });

    const data = await res.json();
    if (data.user) {
      alert("le concours est modifier");
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();

    /*  alert(content.getCurrentContent())
    return */
    const valueContent = convertToHTML(content.getCurrentContent());
    const res = await fetch(
      `/api/admin/competition?id=${params.competitionId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.user) {
      alert("le concours est supprimer");
      router.replace("/admin/competitions");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">


      <div className="flex-1 w-full h-full bg-slate">

       Action:
       <li>liste des candidature</li>
       <li>validée les candidats</li>
       <li>Exporter la liste en format excel</li>
      </div>
    </div>
  );
}

export default CompetitionItem;
