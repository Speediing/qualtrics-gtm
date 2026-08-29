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
    id: "rep",
    name: "Every sales rep",
    blurb: "The seller reviews the work and decides what gets sent.",
    computer: "Reviews drafts before send",
    color: "#e8f7f7",
    mark: "AE",
    rep: true,
  },
  {
    id: "meeting",
    name: "Meeting agent",
    blurb: "Follows a live meeting and updates the open deck.",
    computer: "Own computer: meeting notes and deck",
    jobId: "meeting-deck",
    color: "#04c9ce",
  },
  {
    id: "inbox",
    name: "Inbox agent",
    blurb: "Checks approved product and internal sources before drafting.",
    computer: "Own computer: docs and inbox",
    jobId: "answer-research",
    color: "#0768dd",
  },
  {
    id: "outbound",
    name: "Outbound agent",
    blurb: "Researches an account and prepares outreach for review.",
    computer: "Own computer: browser and drafts",
    jobId: "account-outreach",
    color: "#a54af4",
  },
];
