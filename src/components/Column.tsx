import Details from "./Details";
import Header from "./Header";
import Item from "./Item";

export default function Column({ type }: { type: string }) {
  return (
    <div className="h-full w-[300px] border-r bg-green-200">
      {type === "LIST" && <Header type={"COLUMN"} title={"Column"} />}
      {type === "LIST" ? (
        <div>
          <Item />
          <Item />
          <Item />
        </div>
      ) : (
        <div>
          <Details />
        </div>
      )}
    </div>
  );
}
