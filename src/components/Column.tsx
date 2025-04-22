import { useState } from "react";
import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Item from "./Item";
import ColumnHeader from "./ColumnHeader";

export default function Column({
  initialItems,
  parentItem,
  highlighted,
  selected,
  selectHandler,
}: {
  initialItems: ItemInterface[];
  parentItem: ItemInterface;
  highlighted: number[];
  selected: number;
  selectHandler: (id: number) => void;
}) {
  const [option, setOption] = useState("Name");
  const items: ItemInterface[] = initialItems.filter((i) =>
    parentItem.childIds.includes(i.id)
  );
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      {parentItem.type === "Folder" && (
        <ColumnHeader
          title={parentItem.name}
          option={option}
          setOption={setOption}
        />
      )}
      {parentItem.type === "Folder" ? (
        <div className="py-2 px-1">
          {items.map((item: ItemInterface) => (
            <Item
              key={item.id}
              id={item.id}
              item={item}
              highlighted={highlighted.includes(item.id)}
              selected={selected == item.id}
              selectHandler={selectHandler}
            />
          ))}
        </div>
      ) : (
        <div className="p-5">
          <Details item={parentItem} />
        </div>
      )}
    </div>
  );
}
