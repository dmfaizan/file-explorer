import React from 'react';

import { ItemType } from "@/data/ItemTypes";
import { ItemInterface } from "../interfaces/Item";

export default function Item({
  item,
  id,
  highlighted,
  shouldPulse,
  selected,
  selectHandler,
}: {
  item: ItemInterface;
  id: number;
  highlighted: boolean;
  shouldPulse: number;
  selected: boolean;
  selectHandler: (id: number) => void;
}) {
  return (
    <div
      onClick={() => selectHandler(id)}
      className={`flex flex-row items-center justify-start ${
        selected ? "bg-[#0000FF]" : highlighted ? "bg-gray-200/20" : ""
      } rounded-sm px-[12px] py-[8px] gap-2 hover:brightness-90`}
    >
      {item.type == ItemType.Folder ? (
        <div
          className={`${
            shouldPulse == id ? "pulse" : ""
          } h-[20px] w-[20px] bg-blue-500 rounded-sm`}
        />
      ) : (
        <div className="h-[20px] w-[20px] bg-blue-50 rounded-sm" />
      )}
      <span>{item.name}</span>
      {item.type == ItemType.Folder && <span className="ml-auto">&gt;</span>}
    </div>
  );
}
