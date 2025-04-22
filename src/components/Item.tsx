import { ItemInterface } from "../interfaces/Item";

export default function Item({
  item,
  id,
  selectHandler,
}: {
  item: ItemInterface;
  id: number;
  selectHandler: (id: number) => void;
}) {
  return (
    <div onClick={() => selectHandler(id)} className="bg-blue-200 hover:brightness-90">
      <span>{item.name}</span>
    </div>
  );
}
