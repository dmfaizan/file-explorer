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
  console.log(items);
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      {parentItem.type === "Folder" && (
        <Header type={"COLUMN"} title={parentItem.name} />
      )}
      {parentItem.type === "Folder" ? (
        <>
          {items.map((item: ItemInterface) => (
            <>
              <Item
                key={item.id}
                id={item.id}
                item={item}
                selectHandler={selectHandler}
              />
            </>
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
