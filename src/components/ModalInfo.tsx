"use client";
import React from "react";

import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ButtonComponent from "./ButtonComponent";
import {useModalInfoStore} from '../store/useModalInfoStore'
interface ModalProps {
/*   isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void; */
  title: string;
  body: string;
/*   footer: React.ReactElement;
  actionLabel: string;
  disabled?: boolean; */
}

const ModalInfo: React.FC<ModalProps> = ({
/*   isOpen,
  onClose,
  onSubmit, */
  title,
  body,
/*   footer,
  actionLabel,
  disabled, */
}) => {
  const handleSubmit = () => {};
  const handleClose = () => {};


  const useModalInfo = useModalInfoStore();
  
  if(useModalInfo.isOpen)
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-2/3 h-auto p-4 mx-auto my-6 bg-white rounded-sm md:w-[400px]   md:h-auto">
          {/* Title */}
          <div className="flex justify-between pb-2 border-b-2">
            <p>{title}</p>
            <XCircleIcon
              className="w-6 text-gray-500 cursor-pointer"
              onClick={useModalInfo.onClose}
            />
          </div>

          {/* Content */}
          <div className="my-4 text-sm">
            {body}
          </div>
          {/* Footer */}

          <div className="flex items-end w-full flex-end ">
            <div className="flex-1" ></div>
            <ButtonComponent
            className="w-[100px] self-end h-[40px]"
              label={"Ok"}
              full={true}
              handleClick={useModalInfo.onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
  else return (<div></div> )
};

export default ModalInfo;
