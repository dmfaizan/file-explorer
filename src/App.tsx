import { useState } from "react";

import Column from "./components/Column";
import Header from "./components/Header";
import { initialItems } from "./data/Items";
import { ItemInterface } from "./interfaces/Item";

function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedItemIDs, setSelectedItemIDs] = useState([0]);
  const handleSelectItemID = (id: number) => {
    setSelectedItemIDs(prevIDs => [...prevIDs, id])
  }
  const selectedItems = items.filter(i => selectedItemIDs.includes(i.id))
  
  return (
    <div className="h-screen w-full bg-blue-200">
      <Header type={"EXPLORER"} title={"Documents"} />
      <div className="h-full w-full flex flex-row bg-red-200">
        {selectedItems.map((item: ItemInterface) => (
          <Column
            key={item.id}
            initialItems={items}
            parentItem={item}
            selectHandler={handleSelectItemID}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
