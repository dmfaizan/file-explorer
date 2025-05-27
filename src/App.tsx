import React, { useEffect } from "react";
import { useState } from "react";

import Column from "./components/Column";
import ExplorerHeader from "./components/ExplorerHeader";
import { ThemeProvider } from "./components/ThemeProvider";
import { ItemInterface } from "./interfaces/Item";

function App() {
  const [currentPath, setCurrentPath] = useState("~");
  const [paths, setPaths] = useState<string[]>([]);
  const [shouldPulse, setShouldPulse] = useState("");

  useEffect(() => {
    const pathParts = currentPath.split("/");
    const newPaths =
      pathParts.length === 1
        ? [pathParts[0]]
        : pathParts.map((_, i) => pathParts.slice(0, i + 1).join("/"));
    setPaths(newPaths);
  }, [currentPath]);

  const handleSetCurrentPath = (item: ItemInterface) => {
    if (currentPath == item.path) {
      return;
    }
    setCurrentPath(item.path);
    setShouldPulse("");
  };

  const handleBackButton = () => {
    if (currentPath == "~") {
      return;
    } else {
      let newPath = currentPath.split("/");
      newPath.pop();
      setCurrentPath(newPath.join("/"));
      setShouldPulse(newPath.join("/"));
    }
  };

  const latestTitle = paths[paths.length - 1];

  return (
    // https://stackoverflow.com/a/75094583
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full bg-black overflow-x-hidden text-white">
        <ExplorerHeader
          title={latestTitle ? latestTitle : "Root"}
          backButtonHandler={handleBackButton}
        />
        <div className="h-full w-full flex flex-row overflow-scroll [&>div]:flex-shrink-0">
          {paths.map((path: string) => (
            <Column
              key={path}
              shouldPulse={shouldPulse}
              highlighted={paths}
              path={path}
              selected={currentPath}
              selectHandler={handleSetCurrentPath}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
