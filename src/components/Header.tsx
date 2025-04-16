export default function Header({
  type,
  title,
}: {
  type: string;
  title: string;
}) {
  return (
    <div
      className={`${
        type === "EXPLORER" ? "h-[60px]" : "h-[50px]"
      } w-full border-b bg-purple-200`}
    >
      <span>{title}</span>
    </div>
  );
}
