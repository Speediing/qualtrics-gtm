export type HeroJobTone = "teal" | "sky" | "cobalt" | "violet" | "lilac";

export type HeroJob = {
  id: string;
  label: string;
  mark: string;
  tone: HeroJobTone;
  account: string;
  signal: string;
  detail: string;
  result: string;
  userMessage: string;
  botMessage: string;
};

export const HERO_JOBS = [
  {
    id: "sales-outbound",
    label: "Sales Outbound",
    mark: "SO",
    tone: "violet",
    account: "Example account",
    signal: "[Illustrative verified public signal]",
    detail: "Add one relevant public account signal and link its source.",
    result: "Outreach draft ready",
    userMessage: "Draft the first note. Keep every placeholder visible.",
    botMessage: "Draft is ready with the source attached. Nothing sent.",
  },
  {
    id: "account-research",
    label: "Account Research",
    mark: "AR",
    tone: "cobalt",
    account: "Example account",
    signal: "[Illustrative account research request]",
    detail: "Review public sources and the confirmed account record.",
    result: "Account brief ready",
    userMessage: "Build the account brief from confirmed sources.",
    botMessage: "Brief is ready. Unverified items are marked as placeholders.",
  },
  {
    id: "call-follow-up",
    label: "Call Follow-up",
    mark: "CF",
    tone: "teal",
    account: "Example account",
    signal: "[Illustrative reviewed meeting note]",
    detail: "Use a reviewed summary. Do not create a customer quote.",
    result: "Follow-up draft ready",
    userMessage: "Turn the reviewed note into a short recap.",
    botMessage: "Recap is ready for review. No customer quote was added.",
  },
  {
    id: "deal-desk",
    label: "Deal Desk",
    mark: "DD",
    tone: "sky",
    account: "Example account",
    signal: "[Illustrative approval question]",
    detail: "Check the approved internal guidance and cite the source.",
    result: "Answer packet ready",
    userMessage: "Show me the approved answer and its source.",
    botMessage: "Packet is ready for review. No extra details were added.",
  },
  {
    id: "pipeline-health",
    label: "Pipeline Health",
    mark: "PH",
    tone: "cobalt",
    account: "Example account",
    signal: "[Illustrative account record review]",
    detail: "Mark missing owners and next steps without guessing.",
    result: "Review list ready",
    userMessage: "List the gaps that need a person to confirm.",
    botMessage: "Review list is ready. Each open item has a clear owner field.",
  },
  {
    id: "renewal-risk",
    label: "Renewal Risk",
    mark: "RR",
    tone: "lilac",
    account: "Example account",
    signal: "[Illustrative confirmed account signal]",
    detail: "Separate confirmed context from questions that remain open.",
    result: "Review brief ready",
    userMessage: "Summarize what is known and what is still open.",
    botMessage: "Brief is ready. Open questions stay marked for review.",
  },
  {
    id: "competitive-intel",
    label: "Competitive Intel",
    mark: "CI",
    tone: "teal",
    account: "Example account",
    signal: "[Illustrative approved comparison request]",
    detail: "Use approved source material and leave uncited claims out.",
    result: "Source pack ready",
    userMessage: "Use approved comparison language only.",
    botMessage: "Source pack is ready. Every included claim has a source.",
  },
  {
    id: "sales-chief-of-staff",
    label: "Sales Chief of Staff",
    mark: "SC",
    tone: "violet",
    account: "Example account",
    signal: "[Illustrative context request]",
    detail: "Use confirmed account notes. Leave unverified items as placeholders.",
    result: "Context brief ready",
    userMessage: "Build the context brief from confirmed notes.",
    botMessage: "Brief is ready. Unverified items stay marked as placeholders.",
  },
] as const satisfies readonly HeroJob[];

export type HeroJobId = (typeof HERO_JOBS)[number]["id"];
