import React, { useState } from "react";

import ColumnFilter from "./ColumnFilter";
import { TrashIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import DeleteItem from "./ui/custom/DeleteItem";
import { ItemInterface } from "@/interfaces/Item";

export default function ColumnHeader({
  title,
  option,
  currentPath,
  selectedItem,
  setAdd,
  handleDelete,
  handleNewFolder,
  handleSetOptions,
}: {
  title: string;
  option: string;
  currentPath: string;
  selectedItem: ItemInterface | undefined;
  setAdd: any;
  handleDelete: (item: ItemInterface) => void;
  handleNewFolder: (path: string, name: string) => void;
  handleSetOptions: (option: string) => void;
}) {
  const [open, setOpen] = useState(false)
  const handleDeleteSafe = (item: ItemInterface) => {
    handleDelete(item)
    setOpen(false)
  }
  return (
    <div className="p-2 h-[50px] w-full flex flex-row items-center justify-start border-b border-b-[#777777] gap-2 bg-[#38383A]">
      <span className="font-semibold">{title}</span>
      <div className="flex flex-row items-center justify-center ml-auto">
        <Button onClick={() => setAdd(true)} variant="ghost">
          <PlusCircleIcon />
        </Button>
        {selectedItem?.path === currentPath ? (
          <DeleteItem open={open} item={selectedItem} setOpen={setOpen} handleDelete={handleDeleteSafe} />
        ) : (
          <Button disabled variant="ghost">
            <TrashIcon />
          </Button>
        )}
        <ColumnFilter option={option} handleSetOptions={handleSetOptions} />
      </div>
    </div>
  );
}
