import { getServerSession } from "next-auth";
import CardMiniComponent from "../../../components/CardMiniComponent";
import DataUserCandidatureComponent from "../../../components/DataUserCandidatureComponent";
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {prisma} from '@/utils/prisma'
import { authOptions } from "@/lib/authOption";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 

export const dynamic = "force-dynamic"
async function Home() {
   const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BASE_URL}/api/user/candidature?email=${session?.user?.email}`,{cache:"no-store"})  
  
  const data: any = await res.json();  
  const competitionOpen =  await fetch(`${process.env.BASE_URL}/api/user/competition?count=${1}`,{cache:"no-store"})  
  
  const competitionOpenData: any[] = await competitionOpen.json();  
  const competitionClose =  await fetch(`${process.env.BASE_URL}/api/user/competition?count=${2}`,{cache:"no-store"})  
  
  const competitionCloseData: any[] = await competitionClose.json();  
  
 
  return (
    <div className="flex flex-col">
      <div className="flex pb-10 space-x-4 overflow-y-scroll ">
 
        <CardMiniComponent
          key={1}
          number={competitionOpenData?.length ?? ""}
          label={"Concours ouverts"}
          Icon={BookOpenIcon}
        />
        <CardMiniComponent
          key={2}
          number={competitionCloseData?.length ?? ""}
          label={"Concours fermés"}
          Icon={AcademicCapIcon}
        />
        <CardMiniComponent
          key={3}
          number={data?.candidatures?.length ?? ""}
          label={"Mes candidatures"}
          Icon={AcademicCapIcon}
        />
      </div>

      <div className="pb-2 border-b-2">
        
        <p>Liste des candidatures</p>
      </div>

   
   {data?.candidatures?.length >0  &&   <DataUserCandidatureComponent datas={data}  />  }
   {data?.candidatures?.length <=0 &&  <div className="w-full p-4 mt-10 text-center border rounded-md">
    Il n'y a aucun enregistrement à afficher
   </div>  }
       
   
      
    </div>
  );
}

export default Home;
 
