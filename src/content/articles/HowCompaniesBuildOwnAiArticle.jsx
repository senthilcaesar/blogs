const img1 = new URL('../../../images/intellect-1.png', import.meta.url).href;
const img2 = new URL('../../../images/intellect-2.png', import.meta.url).href;
const img3 = new URL('../../../images/intellect-3.png', import.meta.url).href;
const img4 = new URL('../../../images/intellect-4.png', import.meta.url).href;

export function HowCompaniesBuildOwnAiArticle() {
  return (
    <>
      <p className="article-lead">
        There is a big shift happening in tech. Instead of just renting generic AI models from big companies, businesses are starting to build their own. This is about taking control. It is about owning the intelligence that powers your products.
      </p>

      <section className="article-panel">
        <p>
          Let’s break down Sonya Huang’s talk and look at the blueprints for how companies actually do this.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Journey to Better AI</h2>
        <p>
          Building your own AI is a step-by-step process. The technical roadmap shows exactly how companies get there.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Strategy:</strong> It all starts with a plan. You have to decide what you actually need the AI to do.
          </li>
          <li>
            <strong>Evals:</strong> This means testing. You need to know if the AI is giving good answers. Teams use tools like LangChain and Braintrust for this. It is not glamorous work, but it is the foundation.
          </li>
          <li>
            <strong>Harness/Routing:</strong> This is how the AI connects to your app. Tools like LangChain, opencode, and openrouter make this happen.
          </li>
          <li>
            <strong>Prompt/Context Eng:</strong> You have to feed the AI the right background information. Turbopuffer is one tool used for this.
          </li>
          <li>
            <strong>Post-Training:</strong> This is where you refine the AI. You teach it specific skills using platforms like Fireworks AI.
          </li>
          <li>
            <strong>Mid/Pre-Training:</strong> Sometimes you have to build the core intelligence from the ground up. Together.ai handles this heavy lifting.
          </li>
          <li>
            <strong>Online Learning:</strong> The final goal. The AI constantly learns and improves from live data using tools like Trajectory.
          </li>
        </ul>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img1}
          alt="The Journey to Better AI"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>The Two-Part Architecture</h2>
        <p>
          To make sense of the technology, you have to split it into two halves.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Production Stack:</strong> This is the live environment. It is the part your users interact with. It contains the Model itself and the Harness, which holds the Tools and Context.
          </li>
          <li>
            <strong>Development Stack:</strong> This is the workshop. It is where developers test and improve the AI behind the scenes. It holds the Evals, Domain-specific data, and Online learning systems.
          </li>
        </ul>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img2}
          alt="The Two-Part Architecture"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>Renting Intelligence (The Closed Stack)</h2>
        <p>
          When a company simply rents AI, the setup is pretty simple.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>The Models:</strong> The Production Stack relies on closed models like Opus and GPT.
          </li>
          <li>
            <strong>The Harness:</strong> You use tools like Claude Code and Codex to connect things. Context is managed by Glean, Engram, turbopuffer, and MCP.
          </li>
          <li>
            <strong>The Workshop:</strong> Because you are renting the brain, the Development Stack is light. You only really focus on Evals, using LangChain and Braintrust to check the outputs. You don't need to worry much about your own training data or online learning because the closed model providers handle the heavy lifting.
          </li>
        </ul>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img3}
          alt="Renting Intelligence (The Closed Stack)"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>Owning Intelligence (The Open Stack)</h2>
        <p>
          When a company decides to build its own AI, the technical stack looks very different. It takes more work, but it gives you total control.
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>The Core Models:</strong> Instead of renting, you start with open pre-training models. These include KIMI K3, GLM 5.2, or Thinking Machines Inkling &amp; Tinker.
          </li>
          <li>
            <strong>Refining the Brain:</strong> You put those models through post-training to make them experts in your specific field. You do this using methods like SFT, DPO, or RFT on platforms like Fireworks AI, Thinking Machines Tinker, or Applied Compute.
          </li>
          <li>
            <strong>The Harness:</strong> The Production Stack connects everything using open tools like LangChain and opencode. You still use Glean, Engram, turbopuffer, and MCP for context.
          </li>
          <li>
            <strong>The Heavy Lifting:</strong> The Development Stack is massive here. You still use LangChain and Braintrust for Evals. But now, you have to bring your own domain-specific data. Companies use Mercor, Surge AI, Fleet, and Scale to manage this data. And for online learning, you rely on Trajectory, LangChain, and Fireworks AI to keep the model sharp.
          </li>
        </ul>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={img4}
          alt="Owning Intelligence (The Open Stack)"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <p>
          Building your own intelligence is harder. But it means you own the final product. Your data makes your AI better, and no one else gets access to that advantage.
        </p>
      </section>
    </>
  );
}
