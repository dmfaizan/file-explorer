export default function ExplorerHeader({ title }: { title: string }) {
  return (
    <div className="p-4 h-[60px] w-full flex flex-row items-center justify-start border-b gap-2 bg-purple-200">
      <button className="border font-bold rounded-sm px-2">&lt;</button>
      <span className="font-semibold">{title}</span>
    </div>
  );
}
