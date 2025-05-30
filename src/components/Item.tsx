import React from "react";

import { ItemType } from "@/data/ItemTypes";
import { ItemInterface } from "../interfaces/Item";
import { Folder, File } from "lucide-react";

export default function Item({
  item,
  highlighted,
  shouldPulse,
  selected,
  isAdding,
  selectHandler,
}: {
  item: ItemInterface;
  highlighted: boolean;
  shouldPulse: string;
  selected: boolean;
  isAdding: boolean;
  selectHandler: (item: ItemInterface) => void;
}) {
  return (
    <div
      onClick={() => selectHandler(item)}
      className={`h-12 flex flex-row items-center justify-start ${
        selected && !isAdding ? "bg-[#0000FF]" : highlighted ? "bg-gray-200/20" : ""
      } rounded-sm px-[12px] py-[8px] gap-2 hover:brightness-90`}
    >
      {item.type == ItemType.Folder ? (
        // <div
        //   className={`${
        //     shouldPulse == item.path ? "pulse" : ""
        //   } h-[20px] w-[20px] bg-blue-500 rounded-sm`}
        // />
        <Folder className={`${shouldPulse == item.path ? "pulse" : ""} fill-blue-500 h-[20px] w-auto shrink-0`}/>
      ) : (
        // <div className="h-[20px] w-[20px] bg-blue-50 rounded-sm" />
        <File className="fill-white h-[20px]" />
      )}
      <span>{item.name}</span>
      {item.type == ItemType.Folder && <span className="ml-auto">&gt;</span>}
    </div>
  );
}
