import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentUser } from "@/components/Admin/RecentUser";
import CardMiniComponent from "@/components/CardMiniComponent";
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
/* const inter = Inter({ subsets: ["latin"] }); */
export const dynamic = "force-dynamic"
const Home = async () => {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BASE_URL}/api/admin/user`, {
    cache: "no-store",
  });
  const data: any[] = await res.json();
 
  const competitionBrouillon = await fetch(
    `${process.env.BASE_URL}/api/user/competition?count=${0}&id=${JSON.parse(session?.user.adminRole ?? "").id}`,
    { cache: "no-store" }
  );
  const competitionBrouillonData: any[] = await competitionBrouillon.json();

  const competitionOpen = await fetch(
    `${process.env.BASE_URL}/api/user/competition?count=${1}&id=${JSON.parse(session?.user.adminRole ?? "").id}`,
    { cache: "no-store" }
  );
  const competitionOpenData: any[] = await competitionOpen.json();

  const competitionClose = await fetch(
    `${process.env.BASE_URL}/api/user/competition?count=${2}&id=${JSON.parse(session?.user.adminRole ?? "").id}`,
    { cache: "no-store" }
  );

  const competitionCloseData: any[] = await competitionClose.json();

  const competitionSus = await fetch(
    `${process.env.BASE_URL}/api/user/competition?count=${3}&id=${JSON.parse(session?.user.adminRole ?? "").id}`,
    { cache: "no-store" }
  );

  const competitionSusData: any[] = await competitionSus.json();

  return (
    <div className="flex">
     
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 space-y-3">
           <ItemInfoCompetiton nombre={competitionBrouillonData.length.toString()} label="Concours en mode brouillon" />
           <ItemInfoCompetiton nombre={competitionOpenData.length.toString()} label="Concours ouverts" />
           <ItemInfoCompetiton nombre={competitionCloseData.length.toString()} label="Concours fermés" />
           <ItemInfoCompetiton nombre={competitionSusData.length.toString()} label="Concours suspendus" />
 
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>
              Nombre d’utilisateurs {data.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUser datas={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Home;
function ItemInfoCompetiton({label,nombre}:{label:string,nombre:string}) {
  return <div className="relative flex flex-row items-center justify-between p-4 border rounded-lg">
    <div className="space-y-0.5 flex flex-col w-full">
      <div className="text-base">{label}</div>
      <div className="flex self-end justify-end flex-1 w-full ">{nombre}</div>
    </div>

  </div>;
}

