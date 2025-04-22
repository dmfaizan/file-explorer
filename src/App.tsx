import { useState } from "react";

import Column from "./components/Column";
import { initialItems } from "./data/Items";
import { ItemInterface } from "./interfaces/Item";
import ExplorerHeader from "./components/ExplorerHeader";

function App() {
  const [selectedItemIDs, setSelectedItemIDs] = useState([0]);

  // Function to find the parent of an item
  const findParentId = (childId: number) => {
    for (const item of initialItems) {
      if (item.childIds.includes(childId)) {
        return item.id;
      }
    }
    return null;
  };

  // Function to get the path from root to an item
  const getPathToItem = (itemId: number) => {
    const path = [];
    let currentId: number | null = itemId;

    // Add the current item to the path
    path.unshift(currentId);

    // Keep going up until we reach the root (id: 0)
    while (currentId !== 0) {
      currentId = findParentId(currentId);
      if (currentId === null) break;
      path.unshift(currentId);
    }

    return path;
  };

  const handleSelectItemID = (id: number) => {
    if (selectedItemIDs.includes(id)) {
      return;
    }

    // If the selected item is already in the path, we need to trim the path
    if (selectedItemIDs.includes(id)) {
      const index = selectedItemIDs.indexOf(id);
      setSelectedItemIDs(selectedItemIDs.slice(0, index + 1));
      return;
    }

    // Find the parent of the new selection
    const parentId = findParentId(id);

    if (parentId !== null) {
      // Check if the parent is in our currently selected path
      if (selectedItemIDs.includes(parentId)) {
        // Find the position of the parent in our path
        const parentIndex = selectedItemIDs.indexOf(parentId);

        // Create a new path up to and including the parent, then add the new selection
        const newSelectedIds = [
          ...selectedItemIDs.slice(0, parentIndex + 1),
          id,
        ];
        setSelectedItemIDs(newSelectedIds);
      } else {
        // If the parent isn't in our current path, we need to build a path to this item
        const newPath = getPathToItem(id);
        setSelectedItemIDs(newPath);
      }
    } else {
      // If no parent (should be just the root), reset to just this item
      setSelectedItemIDs([id]);
    }
  };

  const selectedItems = initialItems.filter((i) => selectedItemIDs.includes(i.id));

  // Sort the selected items according to their order in selectedItemIDs
  // to ensure columns appear in the correct order
  selectedItems.sort((a, b) => {
    return selectedItemIDs.indexOf(a.id) - selectedItemIDs.indexOf(b.id);
  });

  const latestTitle = selectedItems.find(
    (i) => i.id === findParentId(selectedItems.length - 1)
  )?.name;

  const currentlySelected = selectedItems[selectedItems.length - 1].id

  return (
    // https://stackoverflow.com/a/75094583
    <div className="h-screen w-full bg-blue-200 overflow-x-hidden">
      <ExplorerHeader title={latestTitle ? latestTitle : "Root"} />
      <div className="h-full w-full flex flex-row bg-red-200 overflow-scroll [&>div]:flex-shrink-0">
        {selectedItems.map((item: ItemInterface) => (
          <Column
            key={item.id}
            initialItems={initialItems}
            parentItem={item}
            highlighted={selectedItemIDs}
            selected={currentlySelected}
            selectHandler={handleSelectItemID}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
