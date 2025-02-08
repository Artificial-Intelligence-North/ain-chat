import { useEffect, useState } from "react";
import { Model } from "./api/Model";
import { Chat } from "./components/Chat";
import { ModelSelect } from "./components/ModelSelect";
import { listModels } from "./api/listModels";
import { createTheme, MantineProvider, Container } from "@mantine/core";

// core styles are required for all packages
import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

import "./App.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("dolphin3:latest");

  useEffect(() => {
    listModels().then((response) => {
      const modelsResponse = response.data;
      setModels(modelsResponse.models);
    });
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Container>
        <ModelSelect
          models={models}
          onModelChange={(model) => setSelectedModel(model)}
        />
        <Chat model={selectedModel} />
      </Container>
    </MantineProvider>
  );
}

export default App;
