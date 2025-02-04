import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { listModels } from "./api/listModels";

import "./App.css";
import { Model } from "./api/Model";

function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] =
    useState<string>("deepseek-r1:1.5b");

  useEffect(() => {
    listModels().then((response) => {
      const modelsResponse = response.data;
      setModels(modelsResponse.models);
    });
  }, []);

  return (
    <>
      <select
        onChange={(event) => {
          const model = event.target.value;
          console.log(model);
          setSelectedModel(model);
        }}
      >
        {models &&
          models.map(({ name, digest, model }) => {
            return (
              <option key={digest} value={model}>
                {name}
              </option>
            );
          })}
      </select>
      <Chat model={selectedModel} />
    </>
  );
}

export default App;
