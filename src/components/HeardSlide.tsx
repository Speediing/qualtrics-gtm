import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <header className="heard-bar">
        <span>Illustrative output</span>
        <span>{slides.length} draft slides</span>
      </header>
      <ol className={`deck-slides size-${size}`}>
        {slides.map((slide) => (
          <li key={slide.n} className="deck-tile">
            <div className="deck-tile-bar">
              <span className="deck-kicker">
                {slide.kicker || "Draft slide"}
              </span>
              <span className="deck-n">{String(slide.n).padStart(2, "0")}</span>
            </div>
            <h3 className="deck-tile-title">{slide.title}</h3>
            <p className="deck-map">{slide.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
