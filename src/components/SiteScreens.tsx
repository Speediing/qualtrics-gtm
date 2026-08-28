import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { MEETING_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}

function asAnswer(artifact?: Artifact) {
  return artifact?.kind === "answer-brief" ? artifact : null;
}

function asOutreach(artifact?: Artifact) {
  return artifact?.kind === "outreach" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  switch (beat.site) {
    case "granola":
      return <GranolaScreen account={account} />;
    case "figma":
      return (
        <FigmaScreen
          account={account}
          slides={asSlides(artifact)?.cards ?? MEETING_SLIDES}
        />
      );
    case "gmail":
      return (
        <GmailScreen
          account={account}
          answer={asAnswer(artifact)}
          outreach={asOutreach(artifact)}
          sent={sent}
        />
      );
    case "gdoc":
      return (
        <DocsScreen
          account={account}
          answer={asAnswer(artifact)}
          outreach={asOutreach(artifact)}
        />
      );
    case "linkedin":
      return (
        <LinkedInScreen outreach={asOutreach(artifact)} sent={sent} />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return <PageScreen account={account} outreach={asOutreach(artifact)} />;
    default: {
      const exhaustiveSite: never = beat.site;
      return exhaustiveSite;
    }
  }
}

function GranolaScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Live meeting notes</span>
      </header>
      <p className="site-time">Illustrative notes for {account}</p>
      <ul>
        <li>
          <span>Live</span> Customer goal: [add reviewed summary]
        </li>
        <li>
          <span>Live</span> Open question: [add reviewed question]
        </li>
        <li>
          <span>Live</span> Proposed next step: [confirm with account team]
        </li>
        <li>
          <span>Live</span> Owner: [customer role] and [Qualtrics role]
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  slides,
}: {
  account: string;
  slides: Extract<Artifact, { kind: "slides" }>["cards"];
}) {
  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>{account} meeting recap</strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        <HeardSlide slides={slides} size="sm" />
      </div>
    </div>
  );
}

function GmailScreen({
  account,
  answer,
  outreach,
  sent,
}: {
  account: string;
  answer: ReturnType<typeof asAnswer>;
  outreach: ReturnType<typeof asOutreach>;
  sent: boolean;
}) {
  const outreachEmail = outreach?.drafts.find(
    (draft) => draft.channel === "Email",
  );
  const to = answer?.draft.to || outreach?.contactRole || "Account contact";
  const subject =
    answer?.draft.subject ||
    outreachEmail?.subject ||
    "Question about [product area]";
  const body =
    answer?.draft.body ||
    outreachEmail?.body ||
    `Illustrative request for ${account}. Add the customer question here.`;

  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {to}
      </p>
      <p>
        <span>Subject</span>
        {subject}
      </p>
      <div>{body}</div>
    </div>
  );
}

function DocsScreen({
  account,
  answer,
  outreach,
}: {
  account: string;
  answer: ReturnType<typeof asAnswer>;
  outreach: ReturnType<typeof asOutreach>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{answer?.title || outreach?.title || `${account} brief`}</span>
      </header>
      <article>
        {answer ? (
          <>
            <p className="gdoc-status">{answer.status}</p>
            <p>
              <b>Request.</b> {answer.request}
            </p>
            {answer.sources.map((item) => (
              <p key={item.source}>
                <b>{item.source}.</b> {item.finding}
              </p>
            ))}
          </>
        ) : outreach ? (
          <>
            <p className="gdoc-status">Illustrative output</p>
            <p>{outreach.summary}</p>
            {outreach.evidence.map((item) => (
              <p key={item.source}>
                <b>{item.source}.</b> {item.finding}
              </p>
            ))}
          </>
        ) : (
          <p>Working note for {account}.</p>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>Public sources</strong>
        <span>Illustrative research</span>
      </header>
      <p className="site-time">
        Verify each source before using it for {account}.
      </p>
      <ul>
        <li>
          <span>News</span> Add one recent company update and its source.
        </li>
        <li>
          <span>Careers</span> Add one relevant role and its public listing.
        </li>
        <li>
          <span>Website</span> Add one stated priority from the public site.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  outreach,
  sent,
}: {
  outreach: ReturnType<typeof asOutreach>;
  sent: boolean;
}) {
  const draft = outreach?.drafts.find(
    (item) => item.channel === "LinkedIn",
  );
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {outreach?.contactRole || "[Relevant role]"}
      </p>
      <div>{draft?.body || "Add a reviewed draft here."}</div>
    </div>
  );
}

function PageScreen({
  account,
  outreach,
}: {
  account: string;
  outreach: ReturnType<typeof asOutreach>;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>Account page</strong>
        <em>Not live</em>
      </header>
      <h4>{outreach?.page.headline || `A short view for ${account}`}</h4>
      <p>
        {outreach?.page.body ||
          "Use verified evidence and give the reader one clear next step."}
      </p>
    </div>
  );
}
