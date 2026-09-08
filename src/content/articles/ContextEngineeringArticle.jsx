const img1 = new URL('../../../images/ce-1.png', import.meta.url).href;
const img2 = new URL('../../../images/ce-2.png', import.meta.url).href;
const memoryStackImg = new URL('../../../images/memory_stack.png', import.meta.url).href;

export function ContextEngineeringArticle() {
  return (
    <>
      <p className="article-lead">
        Beyond the Prompt: A Beginner’s Guide to Context Engineering
      </p>

      <section className="article-panel">
        <p>
          Most people have heard of prompt engineering. It usually comes down to one question: <mark className="highlight highlight-green"><em>How do I phrase my instructions to get exactly what I want from an AI?</em></mark>
        </p>
        <p style={{ marginTop: '1rem' }}>
          But there is a bigger picture. It is called context engineering.
        </p>
        <p style={{ marginTop: '1rem' }}>
          If prompt engineering is how you ask the question, context engineering is the environment you build around that question. It focuses on exactly what the AI model sees and does at every single step.
        </p>
      </section>

      <section className="article-panel">
        <h2>What is &quot;Context&quot;?</h2>
        <p>
          For an AI, context is everything the model can &quot;see&quot; at the moment it generates a response &mdash; all the information present in its working window at inference time.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This context includes:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>System prompt</strong> &ndash; background instructions defining its role and behavior
          </li>
          <li>
            <strong>User query</strong> &ndash; what you actually typed or asked
          </li>
          <li>
            <strong>Conversation history</strong> &ndash; everything said earlier in the exchange
          </li>
          <li>
            <strong>Retrieved data</strong> &ndash; documents, search results, or database records pulled in to help answer
          </li>
          <li>
            <strong>Tool outputs</strong> &ndash; results from any actions the AI has taken (like a calculation, a file read, or an API call)
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          For a simple chatbot, context is mostly just the conversation so far. But for an AI agent &mdash; a system that takes a series of actions to complete a task &mdash; context is broader: it&apos;s all the information the agent uses to decide what to do next and how to respond, at every step along the way, not just at the start.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The key thing to understand is that this context isn&apos;t infinite &mdash; it&apos;s a fixed-size window the model works within. So what gets included, how it&apos;s organized, and when it&apos;s introduced all directly shape how well the model performs, which is exactly why &quot;context engineering&quot; exists as its own discipline.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Problem: Context Rot</h2>
        <p>
          You might think that giving an AI more information will make it smarter. This is a common trap. AI models have a finite capacity.
        </p>
        <p style={{ marginTop: '1rem' }}>
          More context does not mean better performance. In fact, performance often drops as the context grows. This is known as <strong>context rot</strong>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          When you overload an AI with irrelevant, poorly structured, or confusing data, things go wrong. The model struggles to reason. It gets distracted. It might even start hallucinating and making things up.
        </p>
      </section>

      <section className="article-panel">
        <h2>What Makes &quot;Good&quot; Context? Seven Characteristics</h2>
        <p>
          If dumping everything into the context window is a bad idea, what should you actually be doing? The talk laid out several key characteristics of well-engineered context. Here&apos;s each one explained in plain terms:
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Characteristic</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Relevance</strong></td>
                <td>
                  Only include information that&apos;s actually useful for the task at hand. If a piece of data doesn&apos;t help the model make a better decision right now, it shouldn&apos;t be sitting on the desk &mdash; it&apos;s just noise competing for the model&apos;s attention.
                </td>
              </tr>
              <tr>
                <td><strong>2. Structure</strong></td>
                <td>
                  Information should be organized clearly, not dumped in as a wall of unformatted text. Just like a well-organized report is easier for a human to read than a jumbled pile of notes, clearly structured context (headings, labeled sections, consistent formatting) helps the model parse and use information correctly.
                </td>
              </tr>
              <tr>
                <td><strong>3. Timing</strong></td>
                <td>
                  Context should be introduced only when it&apos;s actually needed &mdash; not all at once, upfront. Imagine handing someone every document they might need for a multi-step project on day one, versus handing them each relevant document exactly when that step of the project begins. The second approach keeps their &quot;desk&quot; clean and focused. This is especially important for AI agents, which work through tasks step-by-step.
                </td>
              </tr>
              <tr>
                <td><strong>4. Compression</strong></td>
                <td>
                  Sometimes you have a lot of useful information, but not all of it needs to be included word-for-word. Compression means summarizing or condensing information so the essential meaning survives, without taking up unnecessary space in the context window.
                </td>
              </tr>
              <tr>
                <td><strong>5. Retention vs. Discarding</strong></td>
                <td>
                  This is a decision-making skill: knowing what to keep and what to throw away as a task progresses. Not everything from three steps ago is still useful now. Good context engineering actively prunes out information that&apos;s no longer needed, rather than letting it silently accumulate.
                </td>
              </tr>
              <tr>
                <td><strong>6. Prioritization</strong></td>
                <td>
                  Not all information is equally important. Good context management assigns a kind of &quot;priority score&quot; to different pieces of information based on how relevant or critical they are to the current task &mdash; making sure the most important information is front and center, not buried under less important details.
                </td>
              </tr>
              <tr>
                <td><strong>7. Information Lifecycle Management</strong></td>
                <td>
                  This is the most dynamic piece. In real-world use, information changes over time &mdash; a database gets updated, a fact becomes outdated, a decision gets reversed. Context engineering means actively updating context as new information comes in, and invalidating (removing) outdated data so the model is always working from the most current and accurate picture of the world. This matters most in fast-changing environments, where yesterday&apos;s &quot;fact&quot; might be wrong today.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img1}
          alt="Principles of Context Engineering"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>The Takeaway</h2>
        <p>
          Writing a good prompt is a great start, but it is only half the battle. By managing the context&mdash;keeping it clean, organized, and highly relevant&mdash;you set the AI up for success. It clears the muddy waters and helps the model give you exactly what you need.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Put simply: <mark className="highlight highlight-green">prompt engineering optimizes what you say; context engineering optimizes what the model sees</mark>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          A model with a perfectly worded prompt but a messy, overloaded, outdated context will still underperform. A model with a simple prompt but clean, relevant, well-timed, well-prioritized context will often perform dramatically better.
        </p>
        <p style={{ marginTop: '1rem' }}>
          As AI systems evolve from single-turn chatbots into multi-step agents that retrieve data, use tools, and make decisions over time, context engineering becomes the real skill that determines whether these systems are reliable &mdash; or whether they quietly fall apart under the weight of their own clutter.
        </p>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img2}
          alt="Context Engineering Takeaway"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <h2 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Agent Memory Stack</h2>

      <div style={{ marginBottom: '2rem' }}>
        <img
          src={memoryStackImg}
          alt="Agent Memory Stack"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a
              href="https://blog.n8n.io/ai-agent-memory/"
              target="_blank"
              rel="noreferrer"
            >
              AI Agent Memory: How It Works & How to Build It (n8n Blog)
            </a>
          </li>
          <li>
            <a
              href="https://blog.bytebytego.com/p/graphrag-how-ai-answers-questions"
              target="_blank"
              rel="noreferrer"
            >
              GraphRAG: How AI Answers Complex Questions on Connected Data (ByteByteGo)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

