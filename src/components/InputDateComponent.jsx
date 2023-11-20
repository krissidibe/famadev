import { Label } from '@radix-ui/react-label';
import React from 'react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AiTwotoneCalendar } from 'react-icons/ai';
import dayjs from "dayjs";
function InputDateComponent({
  value = "",
   
  handleChange = (e) => {},
}) {
  return (
    <div className="grid w-full   items-center gap-1.5">
         <Label className="" htmlFor="email"> <span className="flex-1 text-sm font-semibold">Date de naissance</span>     </Label>
    
   <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          {value ?   dayjs("12-25-1995").format("DD/MM/YYYY")   : <span>{   dayjs("12-25-1995").format("DD/MM/YYYY") } </span>}

          <AiTwotoneCalendar className="w-4 h-4 ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          
          selected={value}
          onSelect={(e) => {
            handleChange(e)
            
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
   </div>
  )
}

export default InputDateComponent