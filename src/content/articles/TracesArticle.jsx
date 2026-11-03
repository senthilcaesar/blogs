const hierarchyImg = new URL('../../../images/traces-hierarchy.jpg', import.meta.url).href;

export function TracesArticle() {
  return (
    <>
      <p className="article-lead">
        When a traditional application fails, developers can usually find clues in error messages,
        server logs, or stack traces. For example, a web server might return a 500 error, indicating
        that something went wrong.
      </p>

      <section className="article-panel">
        <p>
          AI agents are different. An agent can complete every technical step successfully and still
          produce an incorrect answer. There may be no error message, no failed request, and nothing
          unusual in the application logs.
        </p>
        <p>
          So, how do you figure out what went wrong?
        </p>
        <p>
          You need to look beyond the final answer and examine every step the agent took to produce
          it. This is where agent tracing comes in.
        </p>
      </section>

      <section className="article-panel">
        <h2>What Is an Agent Trace?</h2>
        <p>
          An agent trace is a detailed record of everything an AI agent does while handling a
          request. It captures the sequence of operations, model interactions, tool calls, inputs,
          and outputs that lead to the final response.
        </p>
        <p>
          Think of it as a flight recorder in an aircraft. A flight recorder captures what happened
          during a flight, helping investigators understand how events unfolded. Similarly, an agent
          trace records what happened during an agent&apos;s execution, helping developers understand
          how it arrived at a particular answer.
        </p>
        <p>Let&apos;s take a simple example.</p>
        <p>A customer asks a support agent:</p>
        <blockquote>&ldquo;Can I get a refund for order 1182?&rdquo;</blockquote>
        <p>To answer this question, the agent:</p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>Looks up order 1182 in the order management system.</li>
          <li>Retrieves the order details.</li>
          <li>Checks the refund policy.</li>
          <li>Calculates the eligible refund amount.</li>
          <li>Responds to the customer.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The agent replies: &ldquo;Yes, you&apos;ll receive a refund of $40.&rdquo;
        </p>
        <p>
          However, the customer actually paid $60.
        </p>
        <p>
          The interesting part is that every operation completed successfully. The order lookup
          worked, the policy was retrieved, and the agent generated a response. Yet, the final answer
          was incorrect.
        </p>
        <p>
          Without a trace, you only see the wrong answer. With a trace, you can examine each step and
          discover that the order contained two items, but the agent considered only one when
          calculating the refund.
        </p>
      </section>

      <section className="article-panel">
        <h2>Understanding Runs, Traces, Threads, and Trajectories</h2>
        <p>
          To understand how an AI agent operates, it helps to look at four related concepts: runs,
          traces, threads, and trajectories. Each provides a different perspective on the
          agent&apos;s execution.
        </p>
        <p>Let&apos;s continue with our refund example.</p>

        <h3 style={{ marginTop: '1.5rem' }}>1. Run &ndash; An individual operation</h3>
        <p>
          A run represents one unit of work performed by the agent. It could be an LLM call, a tool
          invocation, or another operation.
        </p>
        <p>
          For example, retrieving order details from the order management system is one run.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>2. Trace &ndash; The complete execution of one request</h3>
        <p>
          A trace brings together all the individual runs involved in handling a request. These runs
          are connected in a nested execution tree, showing how one operation leads to another.
        </p>
        <p>
          For example, retrieving the order, checking the refund policy, calculating the amount, and
          generating the response together form a trace.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>3. Thread &ndash; The complete conversation</h3>
        <p>
          A thread groups multiple traces belonging to the same conversation.
        </p>
        <p>
          For example, the customer&apos;s original refund request and subsequent follow-up messages
          belong to the same thread, with each interaction potentially generating a separate trace.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>4. Trajectory &ndash; The chronological path of agent behaviour</h3>
        <p>
          A trajectory presents the agent&apos;s activity across a thread in a simplified,
          chronological format. It brings together customer messages, agent responses, tool calls,
          and tool results, making it easier to understand how the conversation unfolded.
        </p>
        <p>
          Unlike a trace, which exposes the detailed execution structure, a trajectory provides a
          more readable view of the agent&apos;s actions and interactions across the session.
        </p>

        <div style={{ margin: '2rem 0' }}>
          <img
            src={hierarchyImg}
            alt="Runs roll up into traces, traces into threads, and threads into trajectories. Traces are stored in a database for querying."
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
        </div>

        <p><strong>In simple terms:</strong></p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Run:</strong> An individual operation.
          </li>
          <li>
            <strong>Trace:</strong> The complete execution of one request.
          </li>
          <li>
            <strong>Thread:</strong> Multiple traces belonging to one conversation.
          </li>
          <li>
            <strong>Trajectory:</strong> A chronological view of agent behaviour across that conversation.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>Why Are Agent Traces Important?</h2>
        <p>
          Traditional application monitoring focuses primarily on technical metrics such as response
          time, server availability, failed requests, and error rates.
        </p>
        <p>
          AI agents introduce a different challenge: an application can work perfectly from a
          technical perspective while producing incorrect results.
        </p>
        <p>Consider our refund example:</p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>The API call succeeded.</li>
          <li>The refund policy was retrieved.</li>
          <li>The AI model responded successfully.</li>
          <li>The response was delivered within the expected time.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          From a traditional monitoring perspective, everything looks healthy.
        </p>
        <p>
          But the customer received the wrong refund amount.
        </p>
        <p>
          This is a semantic failure: the system successfully produced an answer, but the meaning or
          content of that answer was incorrect.
        </p>
        <p>
          Agent traces help uncover these failures by allowing teams to investigate questions such as:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>Did the agent retrieve the correct information?</li>
          <li>Did it select the right tool?</li>
          <li>Did it use the retrieved information correctly?</li>
          <li>At which step did something go wrong?</li>
          <li>Are similar mistakes happening across other requests?</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          This changes how teams approach observability. Instead of looking exclusively at metrics and
          error logs, they need to capture, store, inspect, and analyse the actual execution history
          of their agents.
        </p>
      </section>

      <section className="article-panel">
        <h2>How Teams Use Agent Traces to Improve AI Agents</h2>
        <p>
          Collecting traces is only the first step. Their real value comes from using them to
          understand failures and improve agent behaviour.
        </p>
        <p>Think of it as a continuous improvement cycle:</p>

        <h3 style={{ marginTop: '1.5rem' }}>1. Observe &ndash; Examine real agent interactions</h3>
        <p>
          Review traces generated from actual user requests. Examine what the agent did, which tools
          it used, what information it retrieved, and how it arrived at its final answer. Reviewing
          multiple traces helps uncover recurring patterns that may not be visible from a single
          interaction.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>2. Identify &ndash; Find recurring problems</h3>
        <p>
          Look for patterns in the agent&apos;s behaviour. For example, you might discover that the
          refund agent consistently considers only the first item in an order instead of calculating
          the total for all items.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>3. Improve &ndash; Fix the underlying problem</h3>
        <p>
          Once you understand the cause, make targeted changes. This could involve improving the
          system prompt, correcting the tool implementation, refining the retrieved data, or
          changing the agent&apos;s workflow.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>4. Validate &ndash; Check whether the fix worked</h3>
        <p>
          Run the agent again using the same scenarios that previously exposed the problem. Compare
          the new traces and evaluation results with the earlier ones to verify that the agent behaves
          correctly and that the changes haven&apos;t introduced new problems.
        </p>
        <p>Then repeat the cycle as new traces become available.</p>
        <p>
          This creates a continuous feedback loop in which every interaction becomes an opportunity
          to understand and improve agent behaviour.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Bigger Picture</h2>
        <p>
          As AI agents become part of business applications and critical workflows, understanding
          their behaviour becomes just as important as monitoring their technical performance.
        </p>
        <p>The distinction is important:</p>
        <blockquote style={{ fontStyle: 'normal', fontWeight: 600 }}>
          With AI agents, successful execution does not necessarily mean successful outcomes.
        </blockquote>
        <p>
          Agent traces provide the visibility needed to understand, debug, evaluate, and continuously
          improve how AI agents behave.
        </p>
      </section>

      <section className="article-panel">
        <h2>References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a href="https://www.langchain.com/resources/agent-observability" target="_blank" rel="noreferrer">
              Agent Observability (LangChain)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
