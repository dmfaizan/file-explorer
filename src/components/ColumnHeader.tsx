import ColumnFilter from "./ColumnFilter";

export default function ColumnHeader({
  title,
  option,
  setOption,
}: {
  title: string;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="p-2 h-[50px] w-full flex flex-row items-center justify-start border-b gap-2 bg-purple-200">
      <span className="font-semibold">{title}</span>
      <ColumnFilter option={option} setOption={setOption} />
    </div>
  );
}
