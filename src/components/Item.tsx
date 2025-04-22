import { ItemInterface } from "../interfaces/Item";

export default function Item({ item }: { item: ItemInterface }) {
  return (
    <div>
      <span>{item.name}</span>
    </div>
  );
}
