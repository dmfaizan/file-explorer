import Column from "./components/Column";
import Header from "./components/Header";

function App() {
  return (
    <div className="h-screen w-full bg-blue-200">
      <Header type={"EXPLORER"} title={"Documents"} />
      <div className="h-full w-full flex flex-row bg-red-200">
        <Column type={"LIST"} />
        <Column type={"LIST"} />
        <Column type={"DETAILS"} />
      </div>
    </div>
  );
}

export default App;
