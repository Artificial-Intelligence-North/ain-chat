import { Model } from "../../api/Model";
import { Input } from "@mantine/core";

interface ModelSelectProps {
  models: Model[];
  onModelChange?: (model: string) => void;
}

export function ModelSelect({ models, onModelChange }: ModelSelectProps) {
  return (
    <Input
      component="select"
      onChange={(event) => {
        const model = event.target.value;
        if (onModelChange) {
          onModelChange(model);
        }
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
    </Input>
  );
}

export default ModelSelect;
