import axios from "axios";
import { Model } from "./Model";

// TODO: move to settings or config file maybe
const apiBaseUrl = "http://localhost:11434";

export type ListModelsResponse = {
  models: Model[];
};

export const listModels = async () =>
  axios.get<ListModelsResponse>(`${apiBaseUrl}/api/tags`, {
    adapter: "fetch",
  });
