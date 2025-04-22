import { ItemInterface } from "../interfaces/Item";

export default function Details({ item }: { item: ItemInterface }) {
  return (
    <div className="flex flex-col items-center justify-center bg-yellow-200 p-5 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="h-[80px] w-[80px] rounded-md bg-white" />
        <span className="font-bold">{item.name}</span>
      </div>
      <div className="w-full flex flex-col items-start justify-center">
        <span>Type: {item.type}</span>
        <span>Size: {item.size}</span>
        <span>Path: {item.path}</span>
        <span>Created: {item.created}</span>
      </div>
    </div>
  );
}
