import Header from "./Header";
import Item from "./Item";

export default function Column() {
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      <Header type={"COLUMN"} title={"Column"} />
      <div>
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
