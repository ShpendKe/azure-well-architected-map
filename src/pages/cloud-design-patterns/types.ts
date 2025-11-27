export interface Recommendation {
  id: string;
  pillar: "reliability" | "security" | "cost" | "operational" | "performance";
  link: string;
}

export interface Pattern {
  name: string;
  link: string;
  summary: string;
  reliability: string[]; // array of recommendation IDs
  security: string[];
  cost: string[];
  operational: string[];
  performance: string[];
  remarks: string;
}
