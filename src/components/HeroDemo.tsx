"use client";

import { useState } from "react";
import { HERO_JOBS, type HeroJobId } from "@/data/hero-jobs";

function MonitorMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="11"
        rx="1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 19.5h7M12 15.5v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroDemo() {
  const firstJob = HERO_JOBS[0];
  const [activeId, setActiveId] = useState<HeroJobId>(firstJob.id);
  const activeJob =
    HERO_JOBS.find((job) => job.id === activeId) ?? firstJob;
  const toneClass = `hero-tone-${activeJob.tone}`;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">A proactive agent for every Qualtrics seller</p>
        <h1 id="hero-title">The agents that work while your reps sell.</h1>
        <p className="hero-intro">
          Each named agent has its own computer. It picks up a clear trigger and
          works in the background until a draft is ready for review.
        </p>
        <div className="hero-phone-jobs" aria-label="Choose an agent">
          {HERO_JOBS.map((job) => (
            <button
              key={job.id}
              type="button"
              className={`hero-phone-job hero-tone-${job.tone}`}
              aria-controls="hero-phone-thread"
              aria-pressed={job.id === activeId}
              onClick={() => setActiveId(job.id)}
            >
              {job.label}
            </button>
          ))}
        </div>
      </div>

      <aside
        className={`hero-bot-demo ${toneClass}`}
        aria-label={`${activeJob.label} agent demo`}
      >
        <div className="hero-phone">
          <div className="hero-phone-notch" aria-hidden />

          <header className="hero-phone-header">
            <span className="hero-phone-back" aria-hidden>
              ‹
            </span>
            <span className="hero-phone-avatar" aria-hidden>
              {activeJob.mark}
            </span>
            <div className="hero-phone-identity">
              <strong>{activeJob.label} Agent</strong>
              <span className="hero-phone-status">
                <i aria-hidden />
                Working in the cloud
              </span>
            </div>
            <span className="hero-phone-monitor" aria-hidden>
              <MonitorMark />
            </span>
          </header>

          <div
            key={activeJob.id}
            id="hero-phone-thread"
            className="hero-phone-thread"
            aria-live="polite"
          >
            <article className="hero-phone-work">
              <p className="hero-signal-label">NEW SIGNAL DETECTED</p>
              <dl>
                <div className="hero-signal-row">
                  <dt>Account</dt>
                  <dd>{activeJob.account}</dd>
                </div>
                <div className="hero-signal-row">
                  <dt>Signal</dt>
                  <dd>{activeJob.signal}</dd>
                </div>
              </dl>
              <p className="hero-signal-copy">{activeJob.detail}</p>
              <p className="hero-signal-result">{activeJob.result}</p>
            </article>

            <p className="hero-phone-bubble is-user">
              {activeJob.userMessage}
            </p>
            <p className="hero-phone-bubble is-bot">{activeJob.botMessage}</p>
          </div>

          <footer className="hero-phone-composer">
            <span className="hero-phone-plus" aria-hidden>
              +
            </span>
            <span className="hero-phone-input">
              Message {activeJob.label} Agent
            </span>
            <span className="hero-phone-send" aria-hidden>
              ↑
            </span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
