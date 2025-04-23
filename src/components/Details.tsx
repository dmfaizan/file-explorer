import { ItemInterface } from "../interfaces/Item";

export default function Details({
  item,
  path,
}: {
  item: ItemInterface;
  path: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200/10 p-5 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="h-[80px] w-[80px] rounded-md bg-white" />
        <span className="font-bold">{item.name}</span>
      </div>
      {/* https://stackoverflow.com/a/77664947 -> Wrapping text */}
      <div className="w-full flex flex-col items-start justify-center break-all">
        <span>Type: {item.type}</span>
        <span>Size: {item.size}</span>
        <span>Path: {path}</span>
        <span>Created: {item.created}</span>
      </div>
    </div>
  );
}
