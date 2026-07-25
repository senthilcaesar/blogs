const traceImg = new URL('../../../images/trace.png', import.meta.url).href;

export function NextjsOpentelemetryBuildArticle() {
  return (
    <>
      <p className="article-lead">
        If your team is suffering from sluggish Next.js builds, here is the step-by-step breakdown of how to stop guessing and start measuring.
      </p>

      <section className="article-panel">
        <h2>The Problem: The CI/CD Black Box</h2>
        <p>
          When a GitHub Actions workflow takes over an hour, the immediate reaction is usually frustration, followed by blind guessing. Is it the server provisioning? Downloading NPM dependencies? The build command itself?
        </p>
        <p style={{ marginTop: '1rem' }}>
          Without proper instrumentation, your build pipeline is essentially a black box. You know when it starts and when it (eventually) ends, but the inner workings are a mystery.
        </p>
      </section>

      <section className="article-panel">
        <h2>Step 1: Measuring the Pipeline with Thoth</h2>
        <p>
          The first revelation from the meetup was a tool called <strong>Thoth</strong>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Thoth brings <strong>OpenTelemetry</strong>—an open-source standard for software observability—directly into GitHub Actions. By integrating Thoth, you start generating <strong>traces</strong> (the complete timeline of your build) and <strong>spans</strong> (the individual steps, like setup, installation, and testing).
        </p>
        <p style={{ marginTop: '1rem' }}>
          Instead of just knowing the build took 60 minutes, Thoth acts as an external observer, telling you exactly how much of that time was spent on the overarching Next.js build command.
        </p>
      </section>

      <section className="article-panel">
        <h2>Step 2: Unlocking Internal Next.js Traces</h2>
        <p>
          Thoth is great for the high-level GitHub Actions steps, but what happens <em>inside</em> the Next.js build process?
        </p>
        <p style={{ marginTop: '1rem' }}>
          It turns out, Next.js has a built-in secret weapon. During a build, Next.js automatically generates a file called <code>.next/trace</code>. This file contains incredibly detailed OpenTelemetry data about its own internal processes. It breaks down the micro-steps of the compilation that usually remain hidden from the developer.
        </p>
      </section>

      <section className="article-panel">
        <h2>Step 3: Visualizing the Bottleneck with Oodle.ai</h2>
        <p>
          Raw OpenTelemetry data is just a massive wall of timestamps and JSON—nearly impossible for a human to read quickly.
        </p>
        <p style={{ marginTop: '1rem' }}>
          To make sense of it, you need to route the data from Thoth and the <code>.next/trace</code> file into an observability platform. The meetup highlighted <strong>Oodle.ai</strong>, which ingests this trace data and translates it into a visual waterfall chart.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Once visualized, the root cause of the 1-hour build became immediately obvious.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <img
            src={traceImg}
            alt="OpenTelemetry Trace Waterfall Visualization"
            style={{ width: '100%', height: 'auto', borderRadius: '12px', border: '1px solid var(--border)' }}
          />
        </div>
      </section>

      <section className="article-panel">
        <h2>The Culprit: Webpack</h2>
        <p>
          Looking at the generated Gantt chart, one massive span dwarfed everything else on the screen: <strong>frontend Webpack compilation</strong>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It accounted for a staggering <strong>80% of the total build time</strong>. The server wasn&apos;t struggling to download dependencies; it was spending nearly an hour just trying to bundle the frontend code and assets.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Because OpenTelemetry provided exact, indisputable data, the team didn&apos;t have to waste time tweaking the wrong things. They knew exactly where to focus their optimization efforts—whether that meant tuning Webpack configurations, removing heavy dependencies, or migrating to faster bundlers.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Takeaway</h2>
        <p>
          You can’t fix what you can’t measure. If your CI/CD pipelines are slowing down your engineering velocity, stop treating them like a black box. Bring OpenTelemetry into your workflows, visualize the traces, and let the data tell you exactly where the bottleneck lives.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Have you integrated OpenTelemetry into your CI/CD pipelines yet? I&apos;d love to hear what tools you are using to keep your Next.js builds fast.
        </p>
      </section>
    </>
  );
}
