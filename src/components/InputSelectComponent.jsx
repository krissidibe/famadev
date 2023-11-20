import React from "react";

function InputSelectComponent({ value = "",options=[] , label, className = "",readonly=false, Icon = React.Fragment,withIcon= false, obscureInput = false, inputType= "text",  handleChange =(e)=>{}}) {
  
 
  
  return (
    <div className={`w-full ${className}`}>
      <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
        {label}
      </p>
      <div className="w-full relative border-[1px] border-solid border-gray-300 flex items-center bg-white h-[50px] rounded-md ">
    <select name="" id="" onChange={handleChange} className="w-full h-full pr-2 rounded">
      {options.map((item)=>(<option className="px-4" value={item.value} >
        {item.label}
      </option>))}
    </select>
{/*       <input readonly={readonly} value={value} onChange={handleChange} type={inputType}    className={`w-full h-full rounded-md p-1 ${withIcon  ? " pr-4 ml-10 " : "px-4"} outline-none `} />
      { Icon != null ? <Icon className={`w-6 h-6 absolute ml-2 text-gray-500  `} /> : ""} */}
      </div>
    </div>
  );
}

export default InputSelectComponent;
import { HomeIcon,BookOpenIcon,UserIcon,AcademicCapIcon,ArrowLeftIcon ,XCircleIcon} from '@heroicons/react/24/solid'