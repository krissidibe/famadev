import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InputComponent({
  value = "",
  label,
  className = "",
  readonly = false,
  Icon = React.Fragment,
  withIcon = false,
  obscureInput = false,
  inputType = "text",
  handleChange = (e) => {},
}) {
  return (
    <div className="grid w-full   items-center gap-1.5">
      <Label htmlFor="email"> {label}</Label>
      <Input
        readOnly={readonly}
        value={value}
        onChange={handleChange}
        type={inputType}
        id={value}
        placeholder={label}
      />
      
    </div>
  );
}

export default InputComponent;
 
{/* <div className={`w-full ${className}`}>
  <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis"></p>
  <div className="w-full relative border-[1px] border-solid border-gray-300 flex items-center bg-white h-[50px] rounded-md ">
    <input
      readOnly={readonly}
      value={value}
      onChange={handleChange}
      type={inputType}
      className={`w-full h-full rounded-md p-1 ${
        withIcon ? " pr-4 ml-10 " : "px-4"
      } outline-none `}
    />
    {Icon != null ? (
      <Icon className={`w-6 h-6 absolute ml-2 text-gray-500  `} />
    ) : (
      ""
    )}
  </div>
</div>;
 */}