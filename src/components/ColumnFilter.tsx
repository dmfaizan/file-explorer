import { SortingOptions } from "@/data/SortingOptions";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ColumnFilter({
  option,
  handleSetOptions,
}: {
  option: string;
  handleSetOptions: (option: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {option} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={option == SortingOptions.NAME}
          onCheckedChange={() => handleSetOptions(SortingOptions.NAME)}
        >
          Name
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={option == SortingOptions.SIZE}
          onCheckedChange={() => handleSetOptions(SortingOptions.SIZE)}
        >
          Size
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={option == SortingOptions.CREATED}
          onCheckedChange={() => handleSetOptions(SortingOptions.CREATED)}
        >
          Created
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
