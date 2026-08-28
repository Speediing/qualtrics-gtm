import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  computer: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "team",
    name: "Qualtrics GTM",
    blurb: "The team reviews the work and decides what gets sent.",
    computer: "Human approval",
    color: "#e8f7f7",
    mark: "QX",
    seat: true,
  },
  {
    id: "nova",
    name: "Nova",
    blurb: "Follows a live meeting and updates the open deck.",
    computer: "Own computer: notes and deck",
    jobId: "meeting-deck",
    color: "#04c9ce",
  },
  {
    id: "scout",
    name: "Scout",
    blurb: "Checks approved product and internal sources before drafting.",
    computer: "Own computer: docs and inbox",
    jobId: "answer-research",
    color: "#0768dd",
  },
  {
    id: "echo",
    name: "Echo",
    blurb: "Researches an account and prepares outreach for review.",
    computer: "Own computer: browser and drafts",
    jobId: "account-outreach",
    color: "#a54af4",
  },
];
