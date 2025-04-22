import { useState } from "react";

import Column from "./components/Column";
import Header from "./components/Header";
import { initialItems } from "./data/Items";
import { ItemInterface } from "./interfaces/Item";

function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState([initialItems[0]]);
  return (
    <div className="h-screen w-full bg-blue-200">
      <Header type={"EXPLORER"} title={"Documents"} />
      <div className="h-full w-full flex flex-row bg-red-200">
        {selectedItem.map((item: ItemInterface) => (
          <Column
            key={item.id}
            type={"LIST"}
            initialItems={items}
            parentItem={item}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
