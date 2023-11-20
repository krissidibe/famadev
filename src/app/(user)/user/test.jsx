import React from "react";

Test.layout = "Default";
function Test() {
  return (
    <div className="flex flex-col   w-screen h-screen   text-white bg-[#18191A]  ">
      <div className="flex   w-full h-14   bg-[#252526] border-b   "></div>

      <div className="flex w-full h-full gap-6 p-6">
        <div className="flex-1 h-full  bg-[#18191A  rounded-md overflow-y-scroll ">
          <div className="flex-1    bg-[#252526]  rounded-md overflow-y-scroll  p-4 ">
            <div className="flex justify-between gap-2 mb-4 border-b-2 h-14 border-b-gray-100 ">
              <p className="flex items-center justify-center flex-1 hover:bg-[#525354] cursor-pointer rounded-lg">
                Stories
              </p>
              <p className="flex items-center justify-center flex-1 hover:bg-[#525354] cursor-pointer rounded-lg">
                Reels
              </p>
            </div>
            <div className="flex">
              <div className="w-[140px] h-[200px] rounded-md bg-slate-50"></div>
            </div>
          </div>
        </div>
        <div className="flex min-w-[300px] h-full  bg-[#252526] rounded-md">
          s
        </div>
      </div>
    </div>
  );
}

export default Test;
