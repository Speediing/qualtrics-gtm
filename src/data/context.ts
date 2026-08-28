export type AccountContextItem = {
  label: string;
  value: string;
  detail: string;
};

export const ACCOUNT_CONTEXT: AccountContextItem[] = [
  {
    label: "Cursor seats",
    value: "810/810",
    detail: "Qualtrics has 810 of 810 Cursor seats.",
  },
  {
    label: "TARS",
    value: "Cursor SDK",
    detail: "TARS specifically needs Cursor SDK.",
  },
  {
    label: "Pixie",
    value: "Cursor Harness",
    detail: "Cursor Harness is rolling out with the Pixie engineering team.",
  },
];
