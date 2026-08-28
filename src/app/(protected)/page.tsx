import { AccountContext } from "@/components/AccountContext";
import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/watercolor-pad.png"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">Qualtrics x SpaceXAI</p>
              <h1>A fleet that keeps GTM work moving.</h1>
              <p className="hero-intro">
                Each named agent has its own computer, browser, and files. It
                can pick up a clear task, keep working in the background, and
                bring a draft back for review.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>Three clear examples for Qualtrics GTM.</h2>
            <p>
              The output below is illustrative. It uses role labels and
              placeholders until a source is confirmed.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>
                    {job.agent} · sample {String(job.number).padStart(2, "0")}
                  </p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
          <AccountContext />
        </div>

        <RosterChart />

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/watercolor-orbit.png" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Qualtrics x SpaceXAI</p>
          <p>Illustrative GTM leave-behind</p>
        </div>
        <address className="footer-contact">
          <p>Cursor account executive</p>
          <strong>Sean Middleton, AE</strong>
          <a href="mailto:sean.middleton@cursor.com">
            sean.middleton@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
