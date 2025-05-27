import React from "react";

import { useCallback, useEffect, useState } from "react";
import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Item from "./Item";
import ColumnHeader from "./ColumnHeader";
import { ItemType } from "@/data/ItemTypes";
import { SortingOptions } from "@/data/SortingOptions";
import { useQuery } from "react-query";

export default function Column({
  shouldPulse,
  highlighted,
  selected,
  path,
  selectHandler,
}: {
  shouldPulse: string;
  path: string;
  highlighted: string[];
  selected: string;
  selectHandler: (item: ItemInterface) => void;
}) {
  const [items, setItems] = useState<ItemInterface[]>();
  const [option, setOption] = useState(SortingOptions.NAME);

  const { data, status } = useQuery(["items", path], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/folder?path=${path}`
    );
    return res.json();
  });

  if (status === "loading") {
    return <div className="p-5">Loading...</div>;
  }

  if (status === "error" || !data?.folder) {
    return <div className="p-5">Something went wrong or folder not found.</div>;
  }

  const paths = path.split("/");
  const title = paths.length === 1 ? "~" : paths[paths.length - 1];

  // const calculateFolderSize = useCallback(
  //   (folder: ItemInterface) => {
  //     let totalSize = 0;

  //     for (const i of folder.childIds) {
  //       const item = initialItems.find((data) => data.id === i);
  //       if (item?.type === ItemType.Folder) {
  //         totalSize += calculateFolderSize(item);
  //       } else {
  //         totalSize += item?.size == null ? 0 : item.size;
  //       }
  //     }

  //     return totalSize;
  //   },
  //   [initialItems]
  // );

  // const isSizeNull = useCallback(
  //   (item: ItemInterface) => {
  //     if (item.size == null) {
  //       return calculateFolderSize(item);
  //     } else {
  //       return item.size;
  //     }
  //   },
  //   [calculateFolderSize]
  // );

  // const handleSetOptions = (option: string) => {
  //   const items: ItemInterface[] = initialItems.filter((i) =>
  //     parentItem.childIds.includes(i.id)
  //   );
  //   if (option == SortingOptions.NAME) {
  //     items.sort((a, b) => a.name.localeCompare(b.name));
  //     setOption(SortingOptions.NAME);
  //   } else if (option == SortingOptions.SIZE) {
  //     items.sort((a, b) => isSizeNull(b) - isSizeNull(a));
  //     setOption(SortingOptions.SIZE);
  //   } else if (option == SortingOptions.CREATED) {
  //     items.sort((a, b) => b.created.getTime() - a.created.getTime());
  //     setOption(SortingOptions.CREATED);
  //   }
  //   setItems(items);
  // };

  const handleSetOptions = (option: string) => {
    console.log(option);
  };

  return (
    <div className="h-full w-[300px] border-r border-r-[#777777] bg-[##00000005]">
      {data.folder.type === ItemType.Folder.toString() && (
        <ColumnHeader
          title={title}
          option={option}
          handleSetOptions={handleSetOptions}
        />
      )}
      {data.folder.type === ItemType.Folder.toString() ? (
        <div className="py-2 px-1">
          {data.content.map((item: ItemInterface) => (
            <Item
              key={item.id}
              item={item}
              highlighted={highlighted.includes(item.path)}
              shouldPulse={shouldPulse}
              selected={selected == item.path}
              selectHandler={selectHandler}
            />
          ))}
        </div>
      ) : (
        <div className="p-5">
          <Details item={data.folder} path={path} />
        </div>
      )}
    </div>
  );
}
