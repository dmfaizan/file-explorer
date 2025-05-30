import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Item from "./Item";
import ColumnHeader from "./ColumnHeader";
import { ItemType } from "@/data/ItemTypes";
import { SortingOptions } from "@/data/SortingOptions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Input } from "./ui/input";

export default function Column({
  shouldPulse,
  path,
  highlighted,
  selected,
  handleSelected,
}: {
  shouldPulse: string;
  path: string;
  highlighted: string[];
  selected: string;
  handleSelected: (item: ItemInterface) => void;
}) {
  const [option, setOption] = useState(SortingOptions.NAME);
  const [add, setAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInterface>();
  const [newFolderName, setNewFolderName] = useState("");

  const newFolderRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (add) {
      newFolderRef.current?.focus();
    }
  }, [add]);

  const fetchItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/folder?path=${path}`
    );
    return res.json();
  };

  const createFolder = async ({
    name,
    path,
  }: {
    name: string;
    path: string;
  }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/folder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, path: path }),
    });

    if (!res.ok) throw new Error("Failed to create folder");

    return res.json();
  };

  const deleteItem = async ({ path }: { path: string }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/item`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: path }),
    });

    if (!res.ok) throw new Error("Failed to delete item");

    return res.json();
  };

  const { data, status } = useQuery(path, fetchItems, {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });

  const addMutation = useMutation(createFolder, {
    onSuccess: () => {
      queryClient.invalidateQueries(path);
    },
  });

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(path);
    },
  });

  if (status === "loading") {
    return (
      <div className="h-full w-[300px] border-r border-r-[#777777] bg-[##00000005]">
        <div className="p-5">Loading...</div>
      </div>
    );
  }

  if (status === "error" || !data?.folder) {
    return (
      <div className="h-full w-[300px] border-r border-r-[#777777] bg-[##00000005]">
        <div className="p-5">Something went wrong.</div>
      </div>
    );
  }

  const paths = path.split("/");
  const title = paths.length === 1 ? "~" : paths[paths.length - 1];

  const handleSetOptions = (option: string) => {
    if (option == SortingOptions.NAME) {
      setOption(SortingOptions.NAME);
    } else if (option == SortingOptions.SIZE) {
      setOption(SortingOptions.SIZE);
    } else if (option == SortingOptions.CREATED) {
      setOption(SortingOptions.CREATED);
    }
  };

  const handleDelete = (item: ItemInterface) => {
    deleteMutation.mutate({ path: item.path });
  };

  const handleNewFolder = () => {
    addMutation.mutate({ name: newFolderName, path: `${path}/${newFolderName}` });
    setAdd(false)
  };

  const handleSelectedSafe = (item: ItemInterface) => {
    setSelectedItem(item);
    handleSelected(item);
  };

  return (
    <div className="h-full w-[300px] border-r border-r-[#777777] bg-[##00000005]">
      {data.folder.type === ItemType.Folder.toString() && (
        <ColumnHeader
          title={title}
          option={option}
          currentPath={selected}
          selectedItem={selectedItem}
          setAdd={setAdd}
          handleNewFolder={handleNewFolder}
          handleDelete={handleDelete}
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
              isAdding={add}
              selectHandler={handleSelectedSafe}
            />
          ))}
          {add && (
            <div className="h-12 flex flex-row items-center justify-start gap-3 px-[6px] py-[8px] rounded-sm bg-[#0000FF]">
              <Input
                ref={newFolderRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNewFolder()
                  }
                }}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => setAdd(false)}
                className="outline-hidden"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-5">
          <Details item={data.folder} path={path} />
        </div>
      )}
    </div>
  );
}
