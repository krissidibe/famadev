"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function AdminProfileComponent({ data }: { data: any }) {

	const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center max-w-xs p-6 rounded-md shadow-md sm:px-12 dark:bg-gray-900 dark:text-gray-100">
      <Avatar className="w-[100px] h-[100px] cursor-pointer mb-4">
        <AvatarImage src={`${process.env.BASE_URL}${data.image}`} />
        <AvatarFallback>
          {data.firstName[0]}
          {data.lastName[0]}
        </AvatarFallback>
      </Avatar>{" "}
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="font-semibold text-md sm:text-xl">
            {data.firstName} {data.lastName}
          </h2>
          <p className="px-2 pb-4 text-xs sm:text-base dark:text-gray-400">
            {data.email}
          </p>

		<Button onClick={()=>{
			router.push(`/superadmin/profile/${data.id}`)
		}} className="pt-2" >Modifier</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileComponent;
