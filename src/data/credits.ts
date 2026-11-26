export interface ModelCredit {
  id: string;
  name: string;
  author: string;
  sourceUrl: string;
  license: string;
}

// Model author credits list. Empty by default; populated when real GLBs are added.
export const MODEL_CREDITS: ModelCredit[] = [];
