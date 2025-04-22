import React from "react";
import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Header from "./Header";
import Item from "./Item";

export default function Column({
  initialItems,
  parentItem,
  selectHandler,
}: {
  initialItems: ItemInterface[];
  parentItem: ItemInterface;
  selectHandler: (id: number) => void;
}) {
  const items: ItemInterface[] = initialItems.filter((i) =>
    parentItem.childIds.includes(i.id)
  );
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      {parentItem.type === "Folder" && (
        <Header type={"COLUMN"} title={parentItem.name} />
      )}
      {parentItem.type === "Folder" ? (
        <>
          {items.map((item: ItemInterface) => (
            <React.Fragment key={item.id}>
              <Item id={item.id} item={item} selectHandler={selectHandler} />
            </React.Fragment>
          ))}
        </>
      ) : (
        <div>
          <Details />
        </div>
      )}
    </div>
  );
}
