import { QUOTES } from "@/data/quotes";

export function QuoteWall() {
  return (
    <section id="testimonials" className="quotes">
      <h2>What people say about Grok Bot</h2>
      <p className="section-lede">
        These public posts link to their original sources.
      </p>
      <div className="quote-thread">
        {QUOTES.map((quote) => (
          <article
            key={`${quote.handle}-${quote.date}-${quote.source}`}
            className="quote-row"
          >
            <div className="quote-who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quote.avatar}
                alt=""
                width={36}
                height={36}
                className="quote-avatar"
              />
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            {quote.source ? (
              <a
                href={quote.source}
                target="_blank"
                rel="noopener noreferrer"
                className="quote-source"
              >
                Read source →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
