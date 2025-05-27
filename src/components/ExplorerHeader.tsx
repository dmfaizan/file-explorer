export default function ExplorerHeader({
  title,
  backButtonHandler,
}: {
  title: string;
  backButtonHandler: () => void;
}) {
  return (
    <div className="p-4 h-[60px] w-full flex flex-row items-center justify-start border-b border-b-[#777777] gap-2 bg-[#38383A]">
      <button
        onClick={backButtonHandler}
        className="border font-bold rounded-sm px-2 hover:brightness-90"
      >
        &lt;
      </button>
      <span className="font-semibold">{title}</span>
    </div>
  );
}
