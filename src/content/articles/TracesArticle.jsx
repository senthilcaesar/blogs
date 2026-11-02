const hierarchyImg = new URL('../../../images/traces-hierarchy.jpg', import.meta.url).href;

export function TracesArticle() {
  return (
    <>
      <p className="article-lead">
        When a web server fails, it usually tells you: a stack trace, a 500 error, a red line in the
        logs. When an AI agent fails, it often returns a polite, well-formatted, confident answer that
        happens to be wrong. Nothing crashed. The only way to see what went wrong is to replay what
        the agent actually did, step by step. That record is called a trace, and it is quietly
        becoming a new kind of data that teams have to ingest, store and query.
      </p>

      <section className="article-panel">
        <h2>What a trace is</h2>
        <p>
          Simply put, a trace is the full record of one request through an agent: the exact inputs,
          the exact outputs, and the order in which everything happened. Picture a flight recorder.
          It doesn&apos;t tell you the plane crashed (you already know that); it tells you what the
          pilot saw and did in the minutes before.
        </p>
        <p>
          Take a small example we&apos;ll stay with. A customer asks a support agent, &ldquo;Can I get
          a refund for order 1182?&rdquo; The agent looks up the order, checks the refund policy, and
          replies, &ldquo;Yes, you&apos;ll get $40 back.&rdquo; The order was actually $60. Every
          step returned successfully. So where did the $20 go?
        </p>
      </section>

      <section className="article-panel">
        <h2>From runs to trajectories</h2>
        <p>
          To answer that, it helps to know that agent data nests in four layers, each built from the
          one below it.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Run:</strong> one single step, such as one call to the model or one tool call. In
            our example, &ldquo;look up order 1182&rdquo; is a run.
          </li>
          <li>
            <strong>Trace:</strong> all the runs for one request, in order and nested inside each
            other. The whole refund answer, from question to reply, is one trace.
          </li>
          <li>
            <strong>Thread:</strong> several traces strung together into one conversation. If the
            customer replies &ldquo;That&apos;s wrong, I paid $60,&rdquo; the next trace joins the
            same thread.
          </li>
          <li>
            <strong>Trajectory:</strong> the path the agent takes across all those steps over time,
            the shape of its behaviour rather than any single answer.
          </li>
        </ul>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={hierarchyImg}
          alt="Runs roll up into traces, traces into threads, and threads into trajectories. Traces are stored in a database for querying."
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>Why traces are a new type of data</h2>
        <p>
          Traditional monitoring looks for errors and slow responses. Agent failures are different:
          they are <em>semantic</em>, meaning the answer is wrong in what it says, not in whether it
          arrived. Our refund trace has no error code and normal latency. The mistake only shows up
          when you read the runs and notice, say, that the order lookup returned two line items and
          the model only added up one.
        </p>
        <p>
          That changes the questions you ask of your data. Instead of &ldquo;which requests took over
          two seconds?&rdquo; you want &ldquo;which traces quoted a refund that didn&apos;t match the
          order total?&rdquo; or &ldquo;which threads ended with the customer correcting the
          agent?&rdquo; In practice, that means storing traces whole, with their full inputs and
          outputs, so they can be searched by meaning and not just by numbers.
        </p>
      </section>

      <section className="article-panel">
        <h2>How teams use them</h2>
        <p>The working loop is short, and it repeats:</p>
        <ol className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Look at a bunch of traces.</strong> Read real ones, not just dashboards. Patterns
            show up after a few dozen.
          </li>
          <li>
            <strong>Identify issues.</strong> Name what keeps going wrong, such as &ldquo;sums only the
            first line item.&rdquo;
          </li>
          <li>
            <strong>Make changes.</strong> Fix the prompt, the tool or the data, then go back to step
            one and check the new traces.
          </li>
        </ol>
        <p>
          Back to order 1182. Nobody would have found the missing $20 by watching error rates. They
          found it by opening the trace and reading it. With agents, reading the record isn&apos;t a
          last resort. It&apos;s the main way to debug.
        </p>
      </section>
    </>
  );
}
