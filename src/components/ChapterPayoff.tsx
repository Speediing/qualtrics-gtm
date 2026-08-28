import type { Artifact, StoryBeat } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

function AnswerBrief({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "answer-brief" }>;
}) {
  return (
    <div className="leave leave-answer-brief">
      <header className="leave-artifact-header">
        <div>
          <p className="leave-kicker">Illustrative output</p>
          <h3>{artifact.title}</h3>
        </div>
        <p>{artifact.status}</p>
      </header>
      <div className="answer-brief-grid">
        <section>
          <p className="leave-kicker">Request</p>
          <p className="answer-request">{artifact.request}</p>
          <ol>
            {artifact.sources.map((item) => (
              <li key={item.source}>
                <strong>{item.source}</strong>
                <span>{item.finding}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="answer-draft">
          <p className="leave-kicker">Draft reply, not sent</p>
          <p>
            <span>To</span>
            {artifact.draft.to}
          </p>
          <p>
            <span>Subject</span>
            {artifact.draft.subject}
          </p>
          <div>{artifact.draft.body}</div>
        </section>
      </div>
    </div>
  );
}

function OutreachPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "outreach" }>;
}) {
  return (
    <div className="leave leave-outreach-pack">
      <header className="leave-artifact-header">
        <div>
          <p className="leave-kicker">Illustrative output</p>
          <h3>{artifact.title}</h3>
        </div>
        <p>{artifact.summary}</p>
      </header>
      <div className="outreach-grid">
        <section>
          <p className="leave-kicker">Evidence to verify</p>
          <ul className="outreach-evidence">
            {artifact.evidence.map((item) => (
              <li key={item.source}>
                <strong>{item.source}</strong>
                <span>{item.finding}</span>
              </li>
            ))}
          </ul>
          <p className="outreach-role">
            <span>Relevant role</span>
            {artifact.contactRole}
          </p>
        </section>
        <section className="outreach-drafts">
          {artifact.drafts.map((draft) => (
            <article key={draft.channel}>
              <p className="leave-kicker">{draft.channel} draft</p>
              {draft.subject ? <strong>{draft.subject}</strong> : null}
              <p>{draft.body}</p>
            </article>
          ))}
        </section>
      </div>
      <section className="outreach-page">
        <p className="leave-kicker">Draft account page</p>
        <h4>{artifact.page.headline}</h4>
        <p>{artifact.page.body}</p>
      </section>
    </div>
  );
}

export function ChapterPayoff({ beat }: { beat: StoryBeat }) {
  const artifact = beat.artifact;
  if (!artifact) return null;

  let body;
  if (artifact.kind === "slides") {
    body = <HeardSlide slides={artifact.cards} size="lg" />;
  } else if (artifact.kind === "answer-brief") {
    body = <AnswerBrief artifact={artifact} />;
  } else {
    body = <OutreachPack artifact={artifact} />;
  }

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
    </div>
  );
}
