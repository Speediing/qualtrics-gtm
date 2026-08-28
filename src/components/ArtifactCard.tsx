import type { Artifact } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  if (artifact.kind === "slides") {
    return <HeardSlide slides={artifact.cards} size="sm" />;
  }

  if (artifact.kind === "answer-brief") {
    return (
      <div className="art art-doc">
        <p className="art-kicker">{artifact.status}</p>
        <h3 className="art-title">{artifact.title}</h3>
        <div className="art-block">
          <p className="art-label">Request</p>
          <p>{artifact.request}</p>
        </div>
        {artifact.sources.map((item) => (
          <div key={item.source} className="art-block">
            <p className="art-label">{item.source}</p>
            <p>{item.finding}</p>
          </div>
        ))}
        <p className="art-caption">{artifact.draft.subject}</p>
      </div>
    );
  }

  return (
    <div className="art art-doc">
      <p className="art-kicker">Illustrative output</p>
      <h3 className="art-title">{artifact.title}</h3>
      <div className="art-block">
        <p className="art-label">{artifact.account}</p>
        <p>{artifact.summary}</p>
      </div>
      {artifact.evidence.map((item) => (
        <div key={item.source} className="art-block">
          <p className="art-label">{item.source}</p>
          <p>{item.finding}</p>
        </div>
      ))}
      <p className="art-caption">{artifact.contactRole}</p>
    </div>
  );
}
