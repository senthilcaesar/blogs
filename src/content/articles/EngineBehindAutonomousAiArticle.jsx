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
          An AI agent doesn&apos;t just work on its own out of nowhere. It needs a framework to operate. We call this the &quot;harness.&quot; The harness is the software layer that wraps around the AI model and gives it the structure it needs to be useful.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Here is what makes up a good harness:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Prompt Construction:</strong> This is how the system talks to the AI. It dynamically builds the instructions, giving the agent its current goal and the exact rules it needs to follow right now.
          </li>
          <li>
            <strong>Tool Execution:</strong> Agents need tools to affect the outside world. The harness connects the AI to APIs, web browsers, or your local files, and executes the actions the AI decides to take.
          </li>
          <li>
            <strong>Context Management:</strong> AI models can only process a certain amount of text at once. The harness filters the information, feeding the AI exactly what it needs to know for the current step without overwhelming it.
          </li>
          <li>
            <strong>Memory:</strong> If an agent is working on a long task, it needs to remember what it did an hour ago. The harness stores past actions and brings them up when relevant.
          </li>
          <li>
            <strong>Error Handling:</strong> Things break. APIs fail. The AI makes bad choices. A solid harness catches these errors and tells the agent to try a different approach instead of just crashing.
          </li>
          <li>
            <strong>Loops:</strong> This is the core engine. The harness puts the agent in a loop: observe the current state, decide what to do, take action, and observe the results. It keeps looping until the job is done.
          </li>
          <li>
            <strong>Skills:</strong> These are specialized abilities or routines you give the agent. Instead of figuring out how to search a database from scratch every time, the agent can just pull up a pre-written &quot;database search&quot; skill.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>3. Autoresearch Loops</h2>
        <p>
          So, what happens when you put agents to work at scale? You get things like autoresearch.
        </p>
        <p style={{ marginTop: '1rem' }}>
          According to <a href="https://www.autolab.ai/autoresearch.html" target="_blank" rel="noreferrer">Autolab</a>, autoresearch is the use of autonomous AI agents to run the machine learning research loop itself.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Normally, human researchers come up with ideas, write code, run experiments, and check the results. But humans are the bottleneck here. You can hold ten ideas in your head, but you can only babysit a few experiments at a time.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Autoresearch hands the heavy lifting over to AI agents. Here is how the loop works:
        </p>
        <ol className="resource-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Humans set the goal:</strong> You tell the system what you want to achieve and write the evaluation script that defines success.
          </li>
          <li>
            <strong>Agents plan and code:</strong> The agents read your code repository, propose concrete changes (like adjusting architectures or tweaking data), and write the actual code for the experiments.
          </li>
          <li>
            <strong>Agents run the tests:</strong> The agents run the experiments on your servers. They log the metrics and capture everything so the results are perfectly reproducible.
          </li>
          <li>
            <strong>Agents learn and iterate:</strong> If a run fails, the agents diagnose the error and fix it. If an idea works, they scale it up. The results steer the very next round of experiments.
          </li>
        </ol>
        <p style={{ marginTop: '1.5rem' }}>
          It’s completely different from just tracking experiments or searching for basic settings. The agents are actively writing real code and pursuing an open-ended goal. The human is still in charge of the destination, but the AI handles the driving.
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
        </ul>
        <p style={{ marginTop: '1.5rem', fontWeight: 500 }}>
          by Artem Lukoianov
        </p>
      </section>
    </>
  );
}
