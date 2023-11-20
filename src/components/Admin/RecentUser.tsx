import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentUser({ datas }: { datas: any[] }) {
  return (
    <div className="h-[400px] space-y-8 overflow-y-scroll">
      {datas.map((item) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            
            <AvatarImage src={`${process.env.BASE_URL}${item.image}`} />
            <AvatarFallback>
            {item.lastName[0]} {item.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.lastName} {item.firstName}</p>
            <p className="text-sm text-muted-foreground">
              {item.email}
            </p>
          </div>
          <div className="ml-auto text-sm">{item.number}</div>
        </div>
      ))}
    </div>
  );
}
