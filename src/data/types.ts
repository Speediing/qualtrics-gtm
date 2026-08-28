export type ClipId =
  | "01-morning-inbox"
  | "02-prospecting-pg"
  | "03-slides-granola";

export type JobId =
  | "meeting-deck"
  | "answer-research"
  | "account-outreach";

export type ParticipantRole = "you" | "bot";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  persona?: string;
  color?: string;
};

export type MessageKind = "text" | "draft" | "routine" | "system";

export type SlideCard = {
  n: number;
  title: string;
  body: string;
  kicker?: string;
};

export type StoryScene = "call" | "notes" | "deck" | "inspect" | "send";

export type StoryVisual =
  | {
      kind: "live-call";
      title: string;
      people: { initials: string; name: string }[];
    }
  | {
      kind: "meeting-note";
      timestamp: string;
      label: string;
      note: string;
      signals: string[];
    }
  | {
      kind: "deck-update";
      eyebrow: string;
      headline: string;
      product: string;
      status: string;
    }
  | {
      kind: "request-email";
      sender: string;
      subject: string;
      request: string;
    }
  | {
      kind: "answers-found";
      sources: { name: string; answer: string }[];
      status: string;
    }
  | {
      kind: "reply-ready";
      to: string;
      subject: string;
      status: string;
    }
  | {
      kind: "account-research";
      account: string;
      sources: string[];
      signal: string;
    }
  | {
      kind: "account-brief";
      items: { label: string; answer: string }[];
    }
  | {
      kind: "outreach-ready";
      person: string;
      channels: string[];
      status: string;
    };

export type StoryBeat = {
  label: string;
  scene: StoryScene;
  when?: string;
  artifact?: Artifact;
  visual?: StoryVisual;
};

export type Artifact =
  | {
      kind: "slides";
      title: string;
      cards: SlideCard[];
    }
  | {
      kind: "answer-brief";
      title: string;
      request: string;
      status: string;
      sources: { source: string; finding: string }[];
      draft: { to: string; subject: string; body: string };
    }
  | {
      kind: "outreach";
      title: string;
      account: string;
      summary: string;
      evidence: { source: string; finding: string }[];
      contactRole: string;
      drafts: {
        channel: "Email" | "LinkedIn";
        subject?: string;
        body: string;
      }[];
      page: { headline: string; body: string };
    };

export type DemoMessage = {
  id: string;
  from: string;
  kind: MessageKind;
  body?: string;
  draftLabel?: string;
  artifact?: Artifact;
  delayMs?: number;
};

export type DemoThread = {
  title: string;
  subtitle: string;
  participants: Participant[];
  messages: DemoMessage[];
};

export type Clip = {
  id: ClipId;
  file: string;
  poster: string;
  title: string;
  caption: string;
};

export type GtmJob = {
  id: JobId;
  number: number;
  agent: string;
  title: string;
  trigger: string;
  backgroundAction: string;
  storyboard: StoryBeat[];
  outcome: string;
  clips: ClipId[];
  demo: DemoThread;
};

export type Quote = {
  name: string;
  handle: string;
  date: string;
  avatar: string;
  quote: string;
  source: string;
};
