import React from 'react';

import { useCallback, useEffect, useState } from "react";
import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Item from "./Item";
import ColumnHeader from "./ColumnHeader";
import { ItemType } from "@/data/ItemTypes";
import { SortingOptions } from "@/data/SortingOptions";

export default function Column({
  initialItems,
  parentItem,
  highlighted,
  selected,
  shouldPulse,
  path,
  selectHandler,
}: {
  initialItems: ItemInterface[];
  parentItem: ItemInterface;
  highlighted: number[];
  selected: number;
  shouldPulse: number;
  path: string;
  selectHandler: (id: number) => void;
}) {
  const [items, setItems] = useState<ItemInterface[]>();
  const [option, setOption] = useState(SortingOptions.NAME);

  const calculateFolderSize = useCallback(
    (folder: ItemInterface) => {
      let totalSize = 0;

      for (const i of folder.childIds) {
        const item = initialItems.find((data) => data.id === i);
        if (item?.type === ItemType.Folder) {
          totalSize += calculateFolderSize(item);
        } else {
          totalSize += item?.size == null ? 0 : item.size;
        }
      }

      return totalSize;
    },
    [initialItems]
  );

  const isSizeNull = useCallback(
    (item: ItemInterface) => {
      if (item.size == null) {
        return calculateFolderSize(item);
      } else {
        return item.size;
      }
    },
    [calculateFolderSize]
  );

  const handleSetOptions = (option: string) => {
    const items: ItemInterface[] = initialItems.filter((i) =>
      parentItem.childIds.includes(i.id)
    );
    if (option == SortingOptions.NAME) {
      items.sort((a, b) => a.name.localeCompare(b.name));
      setOption(SortingOptions.NAME);
    } else if (option == SortingOptions.SIZE) {
      items.sort((a, b) => isSizeNull(b) - isSizeNull(a));
      setOption(SortingOptions.SIZE);
    } else if (option == SortingOptions.CREATED) {
      items.sort((a, b) => b.created.getTime() - a.created.getTime());
      setOption(SortingOptions.CREATED);
    }
    setItems(items);
  };

  useEffect(() => {
    const items: ItemInterface[] = initialItems.filter((i) =>
      parentItem.childIds.includes(i.id)
    );
    setItems(items)
  }, [initialItems, parentItem.childIds])

  return (
    <div className="h-full w-[300px] border-r border-r-[#777777] bg-[##00000005]">
      {parentItem.type === ItemType.Folder && (
        <ColumnHeader
          title={parentItem.name}
          option={option}
          handleSetOptions={handleSetOptions}
        />
      )}
      {parentItem.type === ItemType.Folder ? (
        <div className="py-2 px-1">
          {items?.map((item: ItemInterface) => (
            <Item
              key={item.id}
              id={item.id}
              item={item}
              highlighted={highlighted.includes(item.id)}
              shouldPulse={shouldPulse}
              selected={selected == item.id}
              selectHandler={selectHandler}
            />
          ))}
        </div>
      ) : (
        <div className="p-5">
          <Details item={parentItem} path={path} />
        </div>
      )}
    </div>
  );
}
