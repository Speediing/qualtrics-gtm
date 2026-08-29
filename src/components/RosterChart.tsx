import { FLEET, type FleetNode } from "@/data/fleet";

function initials(node: FleetNode) {
  if (node.mark) return node.mark;
  const parts = node.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function isLight(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function Box({
  node,
  root = false,
}: {
  node: FleetNode;
  root?: boolean;
}) {
  const className = root ? "org-box is-root" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: node.color,
          color: isLight(node.color) ? "#111" : "#fff",
        }}
        aria-hidden
      >
        {initials(node)}
      </span>
      <span className="org-name">{node.name}</span>
      <span className="org-blurb">{node.blurb}</span>
      <span className="org-computer">{node.computer}</span>
    </>
  );

  if (node.jobId) {
    return (
      <a className={className} href={`#${node.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const rep = FLEET.find((item) => item.rep);
  const agents = FLEET.filter((item) => !item.rep);

  if (!rep) return null;

  return (
    <section id="roster" className="roster">
      <h2>A background team for every sales rep</h2>
      <p className="section-lede">
        The work itself is the trigger. A call starts, an email lands, or an
        account enters the list, and the right agent picks it up. They keep
        working after the laptop closes. Drafts stay drafts until the rep sends.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box node={rep} root />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box node={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
