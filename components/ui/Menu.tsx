import { LucideAlignLeft } from "lucide-react";
import React from "react";

type Props = {};

export default function MainMenu(props: Props) {
  return (
    <div className="relative flex items-center gap-x-6  cursor-pointer   ">
      <div
        className="bg-black duration-300 shadow flex gap-x-4 group-hover:bg-neutral-900 h-7 items-center p-0 pl-4 transition-all "
      >
        <span className="text-[1.1em] text-white pt-1">Menu</span>
        <span className="bg-white w-7 h-7  flex justify-center items-center">
          <LucideAlignLeft className="text-gray-900 w-6 h-7 p-1" />
        </span>
      </div>
    </div>
  );
}
