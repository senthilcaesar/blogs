const harnessImg = new URL('../../../images/harness.jpeg', import.meta.url).href;

export function EngineBehindAutonomousAiArticle() {
  return (
    <>
      <p className="article-lead">
        Let&apos;s break down three core concepts driving this shift: AI Agents, the Harness that controls them, and Autoresearch.
      </p>

      <section className="article-panel">
        <h2>1. The AI Agent</h2>
        <p>
          Think of a standard language model as a very smart encyclopedia. You ask a question, and it gives you an answer. An AI agent is different. It’s an AI that takes action.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Agents can plan steps, use tools, and make decisions to reach a goal. If you tell an agent to &quot;book a flight,&quot; it won&apos;t just give you instructions. It will actually go to a website, find the flight, and try to book it for you. It&apos;s the difference between a brain in a jar and a worker with hands.
        </p>
      </section>

      <section className="article-panel">
        <h2>2. The Harness: Making It All Work</h2>
        <p>
          An AI agent doesn&apos;t just work on its own out of nowhere. It needs a framework to operate. We call this the &quot;harness.&quot; An AI harness is the infrastructure that gives an AI model tools and manages input/output behind the scenes, ensuring the model has the tools, context, and environment to do what&apos;s asked. It&apos;s the scaffolding that wraps around an LLM to make it useful for real-world tasks &mdash; not just answering one prompt, but doing actual work in a loop.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>What Is AI Harness Engineering?</h3>
        <p style={{ marginTop: '1rem' }}>
          A useful formula has emerged across the AI engineering community in the past few months:
        </p>
        <blockquote>
          Agent = Model + Harness
        </blockquote>
        <p style={{ marginTop: '1rem' }}>
          The model provides raw intelligence. The harness is everything else: the infrastructure that channels that intelligence into reliable, safe, repeatable behavior. In practice, that means tool interfaces, context/memory handling, guardrails, verification steps, approval gates, logging, and recovery loops.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Harness engineering is the current frontier because AI has fundamentally changed both what it does and what it is asked to do. Models no longer just generate content &mdash; agents now take actions, and the tasks they perform have grown dramatically more complex: multi-step workflows, long-running sessions, tool orchestration, and decisions with real-world consequences.
        </p>

        <p style={{ marginTop: '1rem' }}>
          The term crystallized in February 2026 when Mitchell Hashimoto &mdash; co-founder of HashiCorp, creator of Terraform &mdash; published a blog post giving the practice a name:
        </p>
        <blockquote style={{ marginTop: '1rem' }}>
          Whenever an agent makes a mistake, you engineer the environment so it won&apos;t make that mistake again.
        </blockquote>

        <p style={{ marginTop: '1rem' }}>
          Days later, OpenAI used the same phrase describing how they built an internal beta product: roughly one million lines of code, written entirely by agents, shipped in five months, with no manually written source code. Their key insight:
        </p>
        <blockquote style={{ marginTop: '1rem' }}>
          When something failed, the fix was almost never &quot;try harder.&quot; Human engineers always stepped in and asked: what capability is missing, and how do we make it both legible and enforceable for the agent?
        </blockquote>

        <p style={{ marginTop: '1rem' }}>
          Harness engineering shifts the engineer&apos;s job from writing code to designing environments, specifying intent, and providing structured feedback. The harness is the moat. The model is rented.
        </p>

        <p style={{ marginTop: '1rem' }}>
          Major AI labs use different terminology for this concept. Anthropic refers to their Claude Agent SDK as a &quot;general-purpose agent harness&quot; that provides built-in context management and tool use so Claude can function as a long-running assistant, while calling the context layer &quot;context engineering.&quot; OpenAI describes the same underlying idea as orchestration.
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          Here is what makes up a good harness:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Prompt Construction:</strong> This is how the system talks to the AI. It dynamically builds the instructions, giving the agent its current goal and the exact rules it needs to follow right now.
          </li>
          <li>
            <strong>Planning:</strong> Before taking action, an agent needs a roadmap. The harness helps the AI take a large, complex goal and break it down into smaller, manageable steps. This way, the agent tackles one piece of the puzzle at a time instead of trying to do everything at once.
          </li>
          <li>
            <strong>Context Management:</strong> AI models can only process a certain amount of text at once. Think of this as the agent&apos;s short-term memory. The harness filters the information, feeding the AI exactly what it needs to know for the current step without overwhelming it.
          </li>
          <li>
            <strong>Memory:</strong> If an agent is working on a long task, it needs a long-term memory to remember what it did an hour or a week ago. The harness stores past actions and brings them up when relevant.
          </li>
          <li>
            <strong>Tool Execution &amp; Interfaces:</strong> Agents need tools to affect the outside world. The harness connects the AI to APIs, web browsers, or your local files, and executes the actions the AI decides to take.
          </li>
          <li>
            <strong>Skills:</strong> These are specialized abilities or routines you give the agent. Instead of figuring out how to search a database from scratch every time, the agent can just pull up a pre-written &quot;database search&quot; skill.
          </li>
          <li>
            <strong>Loops &amp; Recovery:</strong> This is the core engine. The harness puts the agent in a loop: observe the current state, decide what to do, take action, and observe the results. It keeps looping until the job is done.
          </li>
          <li>
            <strong>Guardrails &amp; Approval Gates:</strong> Agents need strict boundaries and human-in-the-loop checkpoints. The harness sets hard rules so the AI doesn’t take actions it shouldn&apos;t, stopping it from making costly mistakes.
          </li>
          <li>
            <strong>Error Handling &amp; Verification Steps:</strong> Things break. APIs fail. The AI makes bad choices. A solid harness verifies outcomes, catches errors, and tells the agent to try a different approach instead of crashing.
          </li>
          <li>
            <strong>Observability &amp; Logging:</strong> When an agent is working in the background, you need to see what it’s doing. The harness logs every step, tool call, and error. If something goes wrong, you can look under the hood and see exactly why the AI made a specific choice.
          </li>
        </ul>

        <blockquote style={{ marginTop: '1.5rem' }}>
          Ultimately, LLMs are probabilistic; the harness surrounds them with deterministic boundaries and verification loops to guarantee reliable system outcomes.
        </blockquote>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={harnessImg}
          alt="The AI Harness"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>3. Autoresearch Loops</h2>
        <p>
          So, what happens when you put agents to work at scale? You get things like autoresearch.
        </p>
        <p style={{ marginTop: '1rem' }}>
          According to Andrej Karpathy, autoresearch is the use of autonomous AI agents to run the machine learning research loop itself.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Normally, human researchers come up with ideas, write code, run experiments, and check the results. But humans are the bottleneck here. You can hold ten ideas in your head, but you can only babysit a few experiments at a time.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Autoresearch hands the heavy lifting over to AI agents. Here is how the loop works:
        </p>
        <ol className="resource-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Humans set the goal:</strong> You tell the system what you want to achieve and write the evaluation script that defines success. But there is a hard rule here. The agent is strictly forbidden from editing this test file. If it could, it would eventually just cheat and make the test easier instead of writing better code.
          </li>
          <li>
            <strong>Agents plan and code:</strong> The agents read your code repository, propose concrete changes (like adjusting architectures or tweaking data), and write the actual code for the experiments. This isn&apos;t magic. It usually just looks like a command-line AI tool—like Claude Code—running in the terminal, navigating files and writing code exactly like a human developer would.
          </li>
          <li>
            <strong>Agents run the tests:</strong> The agents run the experiments on your servers. They log the metrics and capture everything so the results are perfectly reproducible.
          </li>
          <li>
            <strong>Agents learn and iterate:</strong> It works like a ratchet using version control. The agent makes a code change and runs a test. If the score improves, it keeps the git commit. If it fails, it instantly reverts the commit and tries a new direction. It is a continuous loop of survival of the fittest code. The results steer the very next round of experiments.
          </li>
        </ol>
        <p style={{ marginTop: '1.5rem' }}>
          It&apos;s completely different from just tracking experiments or searching for basic settings. The agents are actively writing real code and pursuing an open-ended goal. The human is still in charge of the destination, but the AI handles the driving.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This is the next phase of AI. It&apos;s moving past simple text generation and into systems that plan, act, and research on their own.
        </p>
      </section>

      <section className="article-panel">
        <h2>References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a href="https://www.trychroma.com/research/context-rot" target="_blank" rel="noreferrer">
              https://www.trychroma.com/research/context-rot
            </a>
          </li>
          <li>
            <a href="https://www.autolab.ai/research/" target="_blank" rel="noreferrer">
              https://www.autolab.ai/research/
            </a>
          </li>
          <li>
            <a href="https://artificialanalysis.ai/" target="_blank" rel="noreferrer">
              https://artificialanalysis.ai/
            </a>
          </li>
          <li>
            <a href="https://elliezhou16.substack.com/p/ai-harness-engineering-beyond-the" target="_blank" rel="noreferrer">
              https://elliezhou16.substack.com/p/ai-harness-engineering-beyond-the
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
