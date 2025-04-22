import { ItemInterface } from "../interfaces/Item";
import Details from "./Details";
import Header from "./Header";
import Item from "./Item";

export default function Column({
  type,
  initialItems,
  parentItem,
}: {
  type: string;
  initialItems: ItemInterface[];
  parentItem: ItemInterface;
}) {
  const items: ItemInterface[] = initialItems.filter((i) =>
    parentItem.childIds.includes(i.id)
  );
  console.log(items);
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      {type === "LIST" && <Header type={"COLUMN"} title={parentItem.name} />}
      {type === "LIST" ? (
        <>
          {items.map((item: ItemInterface) => (
            <>
              <Item key={item.id} item={item} />
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
