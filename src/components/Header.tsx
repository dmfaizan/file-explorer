import ColumnFilter from "./ColumnFilter";

export default function Header({
  type,
  title,
  option,
  setOption
}: {
  type: string;
  title: string;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className={`${
        type === "EXPLORER" ? "p-4 h-[60px]" : "p-2 h-[50px]"
      } w-full flex flex-row items-center justify-start border-b gap-2 bg-purple-200`}
    >
      {type === "EXPLORER" && <button className="border font-bold rounded-sm px-2">&lt;</button>}
      <span className="font-semibold">{title}</span>
      {type === "COLUMN" && <ColumnFilter option={option} setOption={setOption} />}
    </div>
  );
}
