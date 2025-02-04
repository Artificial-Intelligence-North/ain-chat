export type Model = {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetails;
};

export type ModelDetails = {
  parent_model: string;
  format: string;
  family: string;
  families?: string[];
  parameter_size: string;
  quantization_level: string;
};
