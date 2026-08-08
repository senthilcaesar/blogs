const complexImg = new URL('../../../images/complex.png', import.meta.url).href;

export function AgentsForComplexWorkflowsArticle() {
  return (
    <>
      <p className="article-lead">
        If you&apos;ve built anything with AI agents, you&apos;ve probably hit two walls pretty quickly:
      </p>

      <section className="article-panel">
        <ol className="resource-list" style={{ marginBottom: '1.5rem' }}>
          <li>
            The agent can&apos;t &quot;see&quot; properly. Show it a UI, a design, or a screenshot, and it either misreads it or just guesses.
          </li>
          <li>
           The agent gets lost in big codebases. Ask it to make a change in a 500,000-line repo, and it either hallucinates file relationships or burns your entire context window trying to figure out where things live.
          </li>
        </ol>

        <p>
          The talk tackles both of these problems &mdash; and then makes a sharp turn into a third, sneakier problem that shows up once you try to naively fix the first two. Let&apos;s walk through it in order.
        </p>
      </section>

      <section className="article-panel">
        <h2>Problem 1 &amp; 2: Agents Are Bad at Seeing and Bad at Navigating</h2>
        <p>
          At a basic level, large language models are trained on text. They&apos;re reasonably good at reading code line-by-line, but two things trip them up:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Visual understanding:</strong> A UI isn&apos;t just markup &mdash; it&apos;s layout, hierarchy, visual grouping, and implied behavior. An agent looking only at raw HTML/CSS or a component tree often misses what a human would instantly understand by looking at the screen.
          </li>
          <li>
            <strong>Large codebase understanding:</strong> A codebase isn&apos;t just a pile of files. It&apos;s a web of imports, dependencies, and relationships that build up over years. An agent that only sees one file at a time has no sense of that bigger structure.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>The Obvious (Wrong) Fix: Just Add More Context</h2>
        <p>
          The instinctive fix for both problems is: give the agent more information. Feed it the UI screenshots, dump in the whole codebase, describe everything in exhaustive detail.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This creates a new problem: you&apos;re now giving the AI too much context. And counterintuitively, more context doesn&apos;t mean better performance &mdash; it means:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>Important details get buried in noise</li>
          <li>The agent&apos;s attention gets diluted across irrelevant information</li>
          <li>You burn through context window budget that could&apos;ve gone toward actual reasoning</li>
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          So the real challenge isn&apos;t &quot;how do we give the agent more information&quot; &mdash; it&apos;s &quot;<mark className="highlight">how do we give the agent exactly the right information, at the right time, in the right structure</mark>.&quot; This is the discipline of context engineering, and the rest of the talk is really a toolkit for doing it well.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Toolkit: Precision Over Volume</h2>

        <h3 style={{ marginTop: '1.5rem' }}>0. UI Discovery Agents &mdash; Treat the UI as Ground Truth</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Instead of trying to reconstruct what a UI does by reading the underlying codebase (which is slow and error-prone), a UI Discovery Agent flips the source of truth: it treats the actual rendered UI as the authoritative reference, not the code that generated it. This matters because code can be messy, outdated, or abstracted in ways that obscure real behavior &mdash; but the UI a user actually interacts with doesn&apos;t lie.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>1. Effective Prompting with XML Tags</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Rather than writing prompts as unstructured prose, wrapping different parts of a prompt in XML-style tags (like <code className="xml-tag-context">&lt;context&gt;</code>, <code className="xml-tag-task">&lt;task&gt;</code>, <code className="xml-tag-constraints">&lt;constraints&gt;</code>) gives the model a clear structural map of the prompt. This isn&apos;t cosmetic &mdash; it measurably helps the model distinguish &quot;this is background info&quot; from &quot;this is the actual instruction&quot; from &quot;this is a hard rule to follow.&quot;
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>2. Subagents &mdash; Divide and Conquer Across Context Windows</h3>
        <p style={{ marginTop: '0.5rem' }}>
          One of the biggest structural ideas in the talk: instead of asking a single agent to do a large, multi-part task in one giant context window, break the task into a team of subagents, each operating in its own separate context window.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Why this matters: context windows aren&apos;t just size-limited, they&apos;re attention-limited. A single agent juggling five different subtasks in one context has to hold all of it in its head at once. Split into subagents, each one gets a clean, focused context &mdash; dramatically reducing noise and improving reliability, similar to how a human team divides work instead of one person trying to do everything simultaneously.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>3. Writing Effective Skills</h3>
        <p style={{ marginTop: '0.5rem' }}>
          &quot;Skills&quot; here refers to packaged, reusable capabilities you give an agent &mdash; instructions, scripts, and context bundled together for a specific kind of task. The talk emphasizes that how you write these skills matters as much as what they contain.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>4. The Goldilocks Zone &mdash; Calibrating the System Prompt</h3>
        <p style={{ marginTop: '0.5rem' }}>
          This is a really useful mental model: your system prompt (or skill instructions) can be:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.5rem' }}>
          <li>Too specific &rarr; brittle, breaks the moment the task deviates slightly from what you anticipated</li>
          <li>Too vague &rarr; the agent has no real guardrails and improvises unpredictably</li>
          <li>Just right &rarr; enough structure to constrain behavior, enough flexibility to generalize</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Finding this zone is iterative &mdash; it&apos;s not something you get right on the first try, and it&apos;s specific to each task.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>5. Progressive Disclosure</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Rather than dumping all possible context upfront &quot;just in case,&quot; progressive disclosure means giving the agent a minimal starting point and letting it pull in more detail as needed, layer by layer. This mirrors good UX design (where you don&apos;t show a user every setting at once) and directly fights the &quot;too much context&quot; problem from earlier.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>6. Code-First Skills &mdash; Know What&apos;s Deterministic</h3>
        <p style={{ marginTop: '0.5rem' }}>
          This is a subtle but important distinction the talk draws out: within any complex task, some sub-tasks are deterministic (there&apos;s one correct, mechanical way to do them &mdash; e.g., &quot;parse this file and extract imports&quot;) and some are non-deterministic (they require judgment, reasoning, or creativity &mdash; e.g., &quot;decide whether this UI change is a good idea&quot;).
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          The insight: deterministic tasks shouldn&apos;t be left to the LLM&apos;s judgment at all &mdash; they should be handled by actual code/scripts. Let the agent reason where reasoning is needed, and let deterministic scripts handle the parts that don&apos;t need a language model&apos;s guesswork. This saves context, saves cost, and is more reliable.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>7. AST Graphs &mdash; Structural Understanding of Code</h3>
        <p style={{ marginTop: '0.5rem' }}>
          This ties directly back to Problem 2 (bad codebase understanding). An AST (Abstract Syntax Tree) graph is a hierarchical, tree-like representation of a codebase&apos;s syntactic structure &mdash; essentially a structured map of how the code is organized, rather than a flat pile of text.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          The talk gives a concrete, real-world example: the Razorpay team&apos;s approach. They built a script called <code>create_importMap.js</code> that:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.5rem' }}>
          <li>Walks through the entire codebase</li>
          <li>Identifies all the imports, dependencies, and file-to-file relationships</li>
          <li>Writes the result out to an <code>importMap.json</code> file</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          This <code>importMap.json</code> becomes a compact, structured &quot;map&quot; of the codebase &mdash; showing which files depend on which, without the agent having to read and hold the entire codebase in context. Instead of the agent guessing at relationships by grepping around, it can consult this pre-built map to understand structure instantly. This is a textbook example of the &quot;code-first skills&quot; principle in action: mapping dependencies is a deterministic task, so it&apos;s handled by a script &mdash; not by asking the LLM to read every file and infer connections itself.
        </p>
      </section>

      <section className="article-panel">
        <h2>Bringing It All Together</h2>
        <p>Here&apos;s how the pieces connect into one coherent story:</p>
        <ol className="resource-list" style={{ marginTop: '1rem' }}>
          <li>
            Agents struggle with visual context (UIs) and structural context (large codebases).
          </li>
          <li>
            The naive fix &mdash; throwing more raw context at the model &mdash; backfires, creating a context overload problem.
          </li>
          <li>
            The real fix is precision, not volume: give the agent the right context, structured well, only when needed.
          </li>
          <li>
            This is achieved through a set of concrete techniques: UI-as-source-of-truth discovery agents, XML-structured prompts, subagents with isolated context windows, well-calibrated (Goldilocks) system prompts, progressive disclosure of information, and offloading deterministic work to actual code (like AST-based import maps) instead of the LLM.
          </li>
        </ol>
        <p style={{ marginTop: '1.5rem' }}>
          The underlying theme, if you zoom out: building good AI agents for complex workflows is less about making the model smarter, and more about being a disciplined context engineer &mdash; deciding what the agent sees, when it sees it, and what should be handled by code instead of reasoning at all.
        </p>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={complexImg}
          alt="Agents for Complex Workflows"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>
    </>
  );
}
