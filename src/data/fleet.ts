import type { JobId } from "./types";

export type FleetNode = {
  id: string;
  name: string;
  blurb: string;
  computer: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  rep?: boolean;
};

export const FLEET: FleetNode[] = [
  {
    id: "sales-rep",
    name: "Every sales rep",
    blurb: "Reviews every draft and decides what gets sent.",
    computer: "The rep stays in control",
    color: "#e8f7f7",
    mark: "SR",
    rep: true,
  },
  {
    id: "call-follow-up-agent",
    name: "Call Follow-up Agent",
    blurb: "Follows a live meeting and updates the open deck.",
    computer: "Own computer: meeting notes and deck",
    jobId: "meeting-deck",
    color: "#04c9ce",
    mark: "CF",
  },
  {
    id: "product-answer-agent",
    name: "Product Answer Agent",
    blurb: "Checks approved product and internal sources before drafting.",
    computer: "Own computer: docs and inbox",
    jobId: "answer-research",
    color: "#0768dd",
    mark: "PA",
  },
  {
    id: "account-research-agent",
    name: "Account Research Agent",
    blurb: "Researches an account and prepares outreach for review.",
    computer: "Own computer: browser and drafts",
    jobId: "account-outreach",
    color: "#a54af4",
    mark: "AR",
  },
];
