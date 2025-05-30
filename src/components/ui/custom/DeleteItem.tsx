import React from "react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { TrashIcon } from "lucide-react";
import { ItemInterface } from "@/interfaces/Item";
import { ItemType } from "@/data/ItemTypes";

export default function DeleteItem({
  open,
  item,
  setOpen,
  handleDelete,
}: {
  open: boolean;
  item: ItemInterface;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (item: ItemInterface) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{item.name}</span>
            {item.type === ItemType.Folder.toString()
              ? " and remove all files / folders inside."
              : "."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => handleDelete(item)}>Yes, I'm sure</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
