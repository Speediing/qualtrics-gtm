import { ACCOUNT_CONTEXT } from "@/data/context";

export function AccountContext() {
  return (
    <section className="account-context" aria-labelledby="account-context-title">
      <div>
        <p className="eyebrow">Approved account context</p>
        <h2 id="account-context-title">Current Qualtrics context.</h2>
      </div>
      <dl>
        {ACCOUNT_CONTEXT.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
