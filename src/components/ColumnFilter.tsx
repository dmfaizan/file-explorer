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
  setOption,
}: {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
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
          checked={option == "Name"}
          onCheckedChange={() => setOption("Name")}
        >
          Name
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={option == "Size"}
          onCheckedChange={() => setOption("Size")}
        >
          Size
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={option == "Created"}
          onCheckedChange={() => setOption("Created")}
        >
          Created
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
