import type { Artifact, GtmJob, SlideCard } from "./types";

export const MEETING_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Illustrative output",
    title: "Meeting recap",
    body: "Example account wants a clear rollout path for [team or workflow].",
  },
  {
    n: 2,
    kicker: "Illustrative output",
    title: "Open question",
    body: "Confirm which users, tools, and approval steps belong in the first phase.",
  },
  {
    n: 3,
    kicker: "Illustrative output",
    title: "Proposed next step",
    body: "Review the draft scope with the account team and replace each placeholder.",
  },
  {
    n: 4,
    kicker: "Illustrative output",
    title: "Owners to confirm",
    body: "Add the customer role and Qualtrics role responsible for the next meeting.",
  },
];

export const ANSWER_BRIEF: Extract<Artifact, { kind: "answer-brief" }> = {
  kind: "answer-brief",
  title: "Sourced answer draft",
  request: "What can we share about [product question]?",
  status: "Illustrative output. Review before sending.",
  sources: [
    {
      source: "Approved product docs",
      finding: "Pull the current answer and link to the exact section.",
    },
    {
      source: "Internal owner note",
      finding: "Check the approved wording and any limits that need context.",
    },
    {
      source: "Account record",
      finding: "Use only the details already confirmed for Example account.",
    },
  ],
  draft: {
    to: "Account contact",
    subject: "Follow-up on [product question]",
    body: "Hi there,\n\nI checked the approved product docs and the current internal guidance. The short answer is [reviewed answer]. The source links are included below so your team can check the details.\n\nBest,",
  },
};

export const OUTREACH_PACK: Extract<Artifact, { kind: "outreach" }> = {
  kind: "outreach",
  title: "Illustrative account brief",
  account: "Example account",
  summary:
    "Replace every placeholder with verified public evidence before sending.",
  evidence: [
    {
      source: "Company news",
      finding: "Add one recent, relevant public update.",
    },
    {
      source: "Careers page",
      finding: "Add one hiring signal that connects to the proposed conversation.",
    },
  ],
  contactRole: "[Relevant role]",
  drafts: [
    {
      channel: "LinkedIn",
      body: "Hi [first name], I saw [verified public signal]. I put together a short note on how Qualtrics may help [relevant team priority]. Open to a quick look?",
    },
    {
      channel: "Email",
      subject: "[Public signal] and [team priority]",
      body: "Hi [first name],\n\nI saw [verified public signal]. It may be useful to compare notes on [team priority]. I drafted a one-page view for your team. Would a short conversation be useful?\n\nBest,",
    },
  ],
  page: {
    headline: "A short view for Example account",
    body: "Use verified public evidence, state the working hypothesis, and give the reader one clear next step.",
  },
};

export const JOBS: GtmJob[] = [
  {
    id: "meeting-deck",
    number: 1,
    agent: "Nova",
    title: "Update the deck during a live meeting",
    trigger: "a customer meeting starts",
    backgroundAction: "Nova follows the notes and updates the open deck",
    outcome:
      "The seller leaves the meeting with a reviewed recap and a draft next step.",
    storyboard: [
      {
        when: "Meeting starts",
        label: "Nova opens the meeting notes and the shared deck.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Example account meeting",
          people: [
            { initials: "AE", name: "Account lead" },
            { initials: "SE", name: "Solutions lead" },
            { initials: "CR", name: "Customer role" },
          ],
        },
      },
      {
        when: "During the meeting",
        label: "A useful note is marked for the recap.",
        scene: "notes",
        visual: {
          kind: "meeting-note",
          timestamp: "Live",
          label: "Illustrative note",
          note: "Example account wants a clear rollout path for [team or workflow].",
          signals: ["Scope", "Owner", "Next step"],
        },
      },
      {
        when: "Before the meeting ends",
        label: "Nova updates the open deck and leaves it in draft.",
        scene: "deck",
        visual: {
          kind: "deck-update",
          eyebrow: "Illustrative output",
          headline: "A clear first phase",
          product: "Scope and owners to confirm",
          status: "4 draft slides",
        },
      },
      {
        when: "Final frame",
        label: "The draft deck is ready for the seller to review.",
        scene: "deck",
        artifact: {
          kind: "slides",
          title: "Illustrative meeting recap",
          cards: MEETING_SLIDES,
        },
      },
    ],
    clips: ["03-slides-granola"],
    demo: {
      title: "Nova",
      subtitle: "Meeting notes to a draft deck",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "nova",
          name: "Nova",
          role: "bot",
          persona: "Keeps the meeting recap and deck moving",
          color: "#04c9ce",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "nova",
          kind: "routine",
          body: "Illustrative demo. The Example account meeting started, so I opened the notes and the shared deck on my computer.",
        },
        {
          id: "m2",
          from: "nova",
          kind: "text",
          body: "I marked one useful note for the recap. I am keeping it as a summary, not a customer quote.",
        },
        {
          id: "m3",
          from: "nova",
          kind: "draft",
          draftLabel: "Draft meeting recap",
          artifact: {
            kind: "slides",
            title: "Illustrative meeting recap",
            cards: MEETING_SLIDES,
          },
        },
        {
          id: "m4",
          from: "nova",
          kind: "system",
          body: "Nothing sent. The deck stays in draft until the seller reviews it.",
        },
      ],
    },
  },
  {
    id: "answer-research",
    number: 2,
    agent: "Scout",
    title: "Find product and internal answers",
    trigger: "a customer question arrives",
    backgroundAction: "Scout checks approved sources and drafts a reply",
    outcome:
      "The seller gets a sourced draft without asking several teams for the same answer.",
    storyboard: [
      {
        when: "Question arrives",
        label: "Scout opens the request on its own computer.",
        scene: "notes",
        visual: {
          kind: "request-email",
          sender: "Account contact",
          subject: "Question about [product area]",
          request: "1 question to research",
        },
      },
      {
        when: "Research in progress",
        label: "Scout checks approved product and internal sources.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product docs", answer: "Current answer found" },
            { name: "Owner note", answer: "Approved wording checked" },
            { name: "Account record", answer: "Known context checked" },
          ],
          status: "Sources attached",
        },
      },
      {
        when: "Draft ready",
        label: "The reply waits for the seller to review.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Account contact",
          subject: "Follow-up on [product question]",
          status: "Not sent",
        },
      },
      {
        when: "Final frame",
        label: "The answer, sources, and draft reply stay together.",
        scene: "send",
        artifact: ANSWER_BRIEF,
      },
    ],
    clips: ["01-morning-inbox"],
    demo: {
      title: "Scout",
      subtitle: "Question to a sourced draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Checks approved sources before drafting an answer",
          color: "#0768dd",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Illustrative demo. A product question arrived, so I opened the approved sources on my computer.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "I found the current product answer and the approved internal wording. I attached the sources for review.",
        },
        {
          id: "m3",
          from: "scout",
          kind: "draft",
          draftLabel: "Sourced answer",
          artifact: ANSWER_BRIEF,
        },
        {
          id: "m4",
          from: "scout",
          kind: "system",
          body: "Nothing sent. The seller checks the answer and sources first.",
        },
      ],
    },
  },
  {
    id: "account-outreach",
    number: 3,
    agent: "Echo",
    title: "Research an account and draft outreach",
    trigger: "an account enters the target list",
    backgroundAction: "Echo gathers public evidence and prepares drafts",
    outcome:
      "The seller starts with a researched account brief instead of a generic sequence.",
    storyboard: [
      {
        when: "Account added",
        label: "Echo opens public sources for Example account.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Example account",
          sources: ["Company news", "Careers", "Public site"],
          signal: "Verified signal needed",
        },
      },
      {
        when: "Brief in progress",
        label: "Public evidence becomes a working account brief.",
        scene: "notes",
        visual: {
          kind: "account-brief",
          items: [
            { label: "Why this account", answer: "[Verified signal]" },
            { label: "Possible need", answer: "[Working hypothesis]" },
            { label: "Relevant role", answer: "[Role to confirm]" },
          ],
        },
      },
      {
        when: "Drafts ready",
        label: "Email, LinkedIn, and a short page wait for review.",
        scene: "send",
        visual: {
          kind: "outreach-ready",
          person: "[Relevant role]",
          channels: ["LinkedIn", "Email", "Account page"],
          status: "3 drafts, 0 sent",
        },
      },
      {
        when: "Final frame",
        label: "The research and outreach pack stay in one artifact.",
        scene: "send",
        artifact: OUTREACH_PACK,
      },
    ],
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Echo",
      subtitle: "Public research to reviewed outreach",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "echo",
          name: "Echo",
          role: "bot",
          persona: "Builds account briefs from verified public evidence",
          color: "#a54af4",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "echo",
          kind: "routine",
          body: "Illustrative demo. Example account entered the list, so I opened its public sources on my computer.",
        },
        {
          id: "m2",
          from: "echo",
          kind: "text",
          body: "I made a brief with placeholders for the signal, hypothesis, and role. Each one needs verified evidence before sending.",
        },
        {
          id: "m3",
          from: "echo",
          kind: "draft",
          draftLabel: "Account brief and outreach",
          artifact: OUTREACH_PACK,
        },
        {
          id: "m4",
          from: "echo",
          kind: "system",
          body: "Nothing sent. The seller reviews the evidence and replaces every placeholder.",
        },
      ],
    },
  },
];

export function getJob(id: string): GtmJob | undefined {
  return JOBS.find((job) => job.id === id);
}
