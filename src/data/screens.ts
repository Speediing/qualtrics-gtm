import type { JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gmail"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = { id: "web", host: "example.com", label: "Public web" };
const page = {
  id: "page",
  host: "qualtrics-grokbot.vercel.app",
  label: "Account page",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "meeting-deck": {
    m1: {
      pill: "Opening the meeting notes",
      host: "granola.app",
      path: "/notes/example-account",
      title: "Example account meeting",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Marking a note for the recap",
      host: "granola.app",
      path: "/notes/example-account",
      title: "Example account meeting",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Updating the draft deck",
      host: "figma.com",
      path: "/file/example-account-recap",
      title: "Illustrative meeting recap",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Deck parked for review",
      host: "figma.com",
      path: "/file/example-account-recap",
      title: "Illustrative meeting recap",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
  },
  "answer-research": {
    m1: {
      pill: "Opening the customer question",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m2: {
      pill: "Checking approved sources",
      host: "docs.google.com",
      path: "/document/d/approved-answer",
      title: "Approved answer sources",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m3: {
      pill: "Drafting the sourced answer",
      host: "docs.google.com",
      path: "/document/d/approved-answer",
      title: "Sourced answer draft",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m4: {
      pill: "Draft parked for review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
  },
  "account-outreach": {
    m1: {
      pill: "Opening public sources",
      host: "example.com",
      path: "/public-sources",
      title: "Example account public sources",
      site: "research",
      tabs: [web, docs, linkedin, gmail],
    },
    m2: {
      pill: "Building the account brief",
      host: "example.com",
      path: "/public-sources",
      title: "Example account public sources",
      site: "research",
      tabs: [web, docs, linkedin, gmail],
    },
    m3: {
      pill: "Writing outreach drafts",
      host: "docs.google.com",
      path: "/document/d/example-account-brief",
      title: "Illustrative account brief",
      site: "gdoc",
      tabs: [web, docs, linkedin, gmail],
    },
    m4: {
      pill: "Draft page parked for review",
      host: "qualtrics-grokbot.vercel.app",
      path: "/example-account",
      title: "Illustrative account page",
      site: "page",
      tabs: [web, docs, page, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
