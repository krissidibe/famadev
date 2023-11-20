



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
  } from "@/components/ui/alert-dialog";
  




import React from 'react'

function AlertModalResponse({refModal = null, title ="",message ="",handleClick=()=>{} }) {
  return (
    <AlertDialog>
    <AlertDialogTrigger ref={refModal}>
     
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
      <div className="flex space-x-2" > 
     <p> Message :</p> <p className={`${title == "Impossible" ? "text-red-500" : "text-green-500"}`}>{title}</p>
      </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
         {message}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        
        <AlertDialogAction
          onClick={handleClick}
        >
          {"OK"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default AlertModalResponse