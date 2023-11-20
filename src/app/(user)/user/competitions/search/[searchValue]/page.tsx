 
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CompetitionListSearch from "./CompetitionListSearch";
import SearchComponent from "../../SearchComponent";

function Competitions({params}:{
  params:{
    searchValue: string
  }
}) {
 // const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col">
     
     <SearchComponent/>
      <div className="flex flex-col flex-wrap items-center w-full md:flex-row ">
        <h1>Resultats du recherche : {params.searchValue}</h1>
      {/* @ts-ignore */}
       
      <CompetitionListSearch  params={params} /> 
      </div>
    </div>
  );
}

export default Competitions;
