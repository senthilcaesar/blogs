import { useId } from 'react';

const architectureImg = new URL('../../../images/skills-over-mcp-architecture.jpg', import.meta.url).href;
const flowImg = new URL('../../../images/skills-over-mcp-flow.svg', import.meta.url).href;
const workflowImg = new URL('../../../images/skills-over-mcp-workflow.png', import.meta.url).href;
const overviewImg = new URL('../../../images/skills-over-mcp-overview.jpg', import.meta.url).href;

const capabilitySnippet = `{
  "capabilities": {
    "resources": {},
    "extensions": {
      "io.modelcontextprotocol/skills": {}
    }
  }
}`;

const listSnippet = `// skills/list → one entry per skill (trimmed)
{
  "uri": "skill://code-review/SKILL.md",
  "frontmatter": {
    "name": "code-review",
    "description": "Review code using the team's checklist."
  },
  "resources": [
    { "uri": "skill://code-review/SKILL.md",
      "digest": "sha256:d2489d6c…", "size": 149 },
    { "uri": "skill://code-review/references/checklist.md",
      "digest": "sha256:dbab2de7…", "size": 65 }
  ]
}`;

const skillSnippet = `---
name: code-review
description: Review code using the team's checklist.
---

# Code review

Read \`references/checklist.md\`, then review the diff.`;

const progressiveDisclosureTip =
  'Think of it like a library. Without progressive disclosure, you would have to read every book on the shelves before picking one. Progressive disclosure gives you a catalog with a title and short summary for each book, so you only open the one you need.';

function TermTip({ children, tip }) {
  const tooltipId = useId();

  return (
    <span className="term-tip" tabIndex={0} aria-describedby={tooltipId}>
      {children}
      <span id={tooltipId} role="tooltip" className="term-tip__bubble">
        {tip}
      </span>
    </span>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="20" height="14" rx="4" fill="#ff0000" />
      <path d="M8 4l5 3-5 3z" fill="#ffffff" />
    </svg>
  );
}

// ── Syntax highlighting (Catppuccin Frappé, to match the dark code plate) ──

const JSON_TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?)|([{}[\],:])/g;

function highlightJson(source) {
  return source.split('\n').flatMap((line, i, lines) => {
    const nodes = [];
    let last = 0;
    for (const match of line.matchAll(JSON_TOKEN)) {
      const [text, comment, str, colon, num, punct] = match;
      if (match.index > last) nodes.push(line.slice(last, match.index));
      const key = `${i}-${match.index}`;
      if (comment) nodes.push(<span key={key} className="som-comment">{comment}</span>);
      else if (str && colon)
        nodes.push(
          <span key={key}>
            <span className="som-key">{str}</span>
            <span className="som-punct">{colon}</span>
          </span>,
        );
      else if (str) nodes.push(<span key={key} className="som-string">{str}</span>);
      else if (num) nodes.push(<span key={key} className="som-number">{num}</span>);
      else if (punct) nodes.push(<span key={key} className="som-punct">{punct}</span>);
      last = match.index + text.length;
    }
    if (last < line.length) nodes.push(line.slice(last));
    return i < lines.length - 1 ? [...nodes, '\n'] : nodes;
  });
}

function withInlineCode(text, keyPrefix) {
  return text.split(/(`[^`]*`)/g).map((part, i) =>
    part.length > 1 && part.startsWith('`') && part.endsWith('`') ? (
      <span key={`${keyPrefix}-${i}`} className="som-inline">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function highlightMarkdown(source) {
  let fences = 0;
  return source.split('\n').flatMap((line, i, lines) => {
    let content;
    if (line === '---' && fences < 2) {
      fences += 1;
      content = <span className="som-fence">{line}</span>;
    } else if (fences === 1 && /^[a-z][a-z-]*:/.test(line)) {
      const colon = line.indexOf(':');
      content = (
        <>
          <span className="som-key">{line.slice(0, colon)}</span>
          <span className="som-punct">:</span>
          <span className="som-string">{line.slice(colon + 1)}</span>
        </>
      );
    } else if (/^#{1,6} /.test(line)) {
      content = <span className="som-head">{line}</span>;
    } else {
      content = withInlineCode(line, i);
    }
    const node = <span key={i}>{content}</span>;
    return i < lines.length - 1 ? [node, '\n'] : [node];
  });
}

export function SkillsOverMcpArticle() {
  return (
    <>
      <p className="article-lead">
        <mark className="highlight highlight-green">Skills over MCP</mark> is an approach for giving AI agents both the tools to do a job and the instruction manual on how to do it right, delivered through a single standardized connection. Instead of just handing the agent bare tools, Skills over MCP lets the MCP server package and serve Skills directly over the same protocol.
      </p>

      <figure style={{ margin: '0 0 1.75rem' }}>
        <img
          src={overviewImg}
          alt="An MCP server on the left connects to an AI agent on the right through a single pipe labelled MCP Connection, which carries both a Tools toolbox and a Skills book."
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </figure>
      <p className="article-lead">
        Skills over MCP is a specification enhancement proposal (SEP) for MCP that, as its name implies, defines a convention for serving agent skills directly over an MCP server. Simply put, MCP servers can now serve both tools and instructions for using them effectively – that is, skills – together, as a single dynamic unit. Once a skill is live on an MCP server, any agent connected to that server can discover and execute it, pending safeguards and approvals. Updates to existing skills are immediately accessible to any connected agent.
      </p>

      <section className="article-panel">
        <h2>Two halves of one job</h2>
        <p>
          An AI agent is a language model that can take actions, not just chat: open a file, search the web, leave a comment on some code. To do real work it needs two different things. The first is tools it can call.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The Model Context Protocol (MCP) is the open standard for handing those tools over. It gives agents one consistent, structured way to connect to tools, data and context, whether that means querying a database, calling an API, reading files or working with some other outside system. A program called an MCP server offers a list of tools, and MCP defines how the agent discovers what&apos;s on that list, asks for information and performs actions, without needing to know how any of it is built behind the scenes. That&apos;s how Claude, or any other agent that speaks MCP, can work with external tools and data sources without a custom integration for each one. A GitHub server, for example, might offer one tool to read a pull request and another to post a review comment.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But a set of tools isn&apos;t the same as knowing how to do the job. Tool descriptions say what each tool does, not how to orchestrate them for a task. Give a new hire access to GitHub and they still don&apos;t know your team&apos;s review checklist, which files to look at first, or what counts as a serious problem. That know-how is the second thing, and it&apos;s what an Agent Skill provides: the order of steps, domain conventions and conditional logic (do this if that happens) come from the skill. A skill is just a folder with a text file called <code>SKILL.md</code> inside. The top few lines give the skill a name and say when to use it, such as <em>code-review: review code using the team&apos;s checklist</em>. The rest is plain written instructions, the way you&apos;d brief a colleague. The folder can also hold extra files, like the full checklist, for the instructions to point to.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Skills stay cheap because of a habit called <TermTip tip={progressiveDisclosureTip}>progressive disclosure</TermTip>: the agent reads a little first, and more only when it needs to. That matters because a model can only keep so much text in mind at once, a limit measured in tokens (roughly, chunks of words). So at the start the agent sees only each skill&apos;s name and one-line description, about 100 tokens apiece. When you ask for a code review, it opens the full code-review instructions (the spec recommends keeping these under 5,000 tokens). Only if those instructions say &quot;read the checklist&quot; does it open that file. It&apos;s a library card catalogue: you browse the cards, and fetch a book off the shelf only when you need it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That leaves a practical question: where should a skill be stored? Before Skills over MCP, there were two options, and both had a downside.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The first option was to give everyone their own copy of the skill folder on their computer. That works until the team changes something, such as adding a new item to the review checklist. Then someone has to send the updated folder to every person, and anyone who misses it keeps using the old version. Soon, different people&apos;s agents are following different rules.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The second option was to put the instructions inside the MCP server, written into the descriptions of its tools. Now there&apos;s only one copy, so it&apos;s always up to date. But the agent receives all of that text the moment it connects, even if today&apos;s task needs none of it, which undoes progressive disclosure. It&apos;s a balancing act: with too few instructions the agent does the job badly, and with too many it slows down and loses focus.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The fix is what Angie Jones of the Agentic AI Foundation described in a June blog post as &quot;ship the manual with the product.&quot; Instead of keeping the skill somewhere separate, the same MCP server that provides the tools also provides the skill. When the team updates the skill on the server, every agent gets the new version automatically. And the agent still reads the full skill only when a task needs it, so progressive disclosure keeps working.
        </p>

        <figure style={{ margin: '1.75rem 0 0' }}>
          <img
            src={architectureImg}
            alt="Traditional: the AI agent host reaches a local skills folder and an MCP server for tools separately. Skills over MCP: the host connects to one MCP server that packages tools and skills together."
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
          <figcaption>The skill now ships, and updates, with the server whose tools it describes.</figcaption>
        </figure>
      </section>

      <section className="article-panel">
        <h2>Why not invent something new?</h2>
        <p>
          Once people agreed that MCP servers should serve skills, the next question was how. MCP already gives a server a few basic kinds of thing it can offer an agent, known as primitives. An earlier proposal, SEP-2076, suggested adding skills to the list as a brand-new fourth one:
        </p>
        <ul>
          <li>
            <strong>Tools:</strong> actions the agent can take.
          </li>
          <li>
            <strong>Prompts:</strong> ready-made message templates a user can pick from.
          </li>
          <li>
            <strong>Resources:</strong> read-only files or data the agent can look at.
          </li>
          <li>
            <strong>Skills (proposed):</strong> instructions on how to do a job well.
          </li>
        </ul>
        <p>
          The Skills Over MCP Working Group, the group steering this work, took a different route. It&apos;s co-led by Ola Hungerford of Nordstrom, Sambhav Kothari of Bloomberg and Peter Alexander of Anthropic. The thinking is simple: a skill is just a folder of files, and MCP already has a way to serve files. That&apos;s what resources are. Each resource has its own address, called a URI, which works much like a web link. So instead of inventing something new, each file in a skill folder simply becomes a resource. By convention those addresses start with <code>skill://</code>, so our code-review skill&apos;s main file lives at <code>skill://code-review/SKILL.md</code>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Reusing resources keeps the amount of new machinery very small. The final proposal, SEP-2640, adds just two required methods, which are named requests an agent can send to a server. <code>skills/list</code> asks &quot;what skills do you have?&quot;, and <code>skills/get</code> asks for the details of one skill. There&apos;s also an optional third, <code>resources/directory/read</code>, for looking inside a skill&apos;s folders. Actually reading a file uses <code>resources/read</code>, a request MCP already had.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That design has two useful side effects. First, an older agent app that has never heard of the extension doesn&apos;t break. It just sees a list of ordinary resources, which is exactly what they are, and can still read them. Second, the skill files themselves don&apos;t change at all. What goes inside a <code>SKILL.md</code> is defined by a separate document, the Agent Skills specification, so the same skill folder can be served over MCP as it is. In other words, the extension changes how skills are delivered, not what they are.
        </p>
        <p style={{ marginTop: '1rem' }}>
          SEP-2640 reached Final status, meaning it was formally accepted into the MCP standard, and was merged on 13 September 2026.
        </p>

        <figure style={{ margin: '1.75rem 0 0' }}>
          <img
            src={workflowImg}
            alt="Skills over MCP workflow in four steps: create a skill package (SKILL.md, instructions, workflows), publish it via an MCP server, the AI agent discovers and loads the skill, then executes the workflow."
            loading="lazy"
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
          <figcaption>The whole lifecycle at a glance. In the real protocol, the host verifies each file and asks the user before a skill can run any code.</figcaption>
        </figure>
      </section>

      <section className="article-panel">
        <h2>Following one skill from server to agent</h2>
        <p>
          So far this has all been description. To see how it actually works, let&apos;s follow one skill from the server to the agent, step by step. We&apos;ll use the small example from the spec itself: a server that offers the <code>code-review</code> skill we&apos;ve been following, plus one supporting file, the checklist.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Two terms help here. The host is the app the agent runs in, such as a chat app or a code editor; it does the talking to the server on the agent&apos;s behalf. The model is the AI itself, and it only sees what the host passes to it.
        </p>

        <h3>Step 1: The server says it can serve skills</h3>
        <p>
          When the host first connects, it asks the server what it supports, a bit like asking a shop which payment cards it takes. A server that offers skills includes this in its answer:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightJson(capabilitySnippet)}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          The important part is <code>io.modelcontextprotocol/skills</code>. It tells the host that this server follows the Skills over MCP extension, so it&apos;s worth asking for skills. A server without that line simply doesn&apos;t offer any.
        </p>

        <h3>Step 2: The host asks for the list of skills</h3>
        <p>
          Next, the host sends <code>skills/list</code>, which asks &quot;what skills do you have?&quot; The server replies with one entry per skill. Here&apos;s the entry for code-review, trimmed for length:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightJson(listSnippet)}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          Each entry has two parts. The first is the frontmatter, the short name-and-description block from the top of <code>SKILL.md</code>, copied over unchanged. The second is a manifest, a packing list of every file in the skill. For each file it gives the file&apos;s address (its URI), its size in bytes, and its digest.
        </p>
        <p style={{ marginTop: '1rem' }}>
          A digest, made here with a method called SHA-256, is a fingerprint of the file&apos;s exact contents. Change even one character in the file and the fingerprint comes out completely different. That lets the host check later that the file it downloads is exactly the one the server listed.
        </p>

        <h3>Step 3: The skill waits until it&apos;s needed</h3>
        <p>
          At this point the model sees only the skill&apos;s name and description: the card in the catalogue, not the book. The full instructions stay on the server, and nothing more happens until a task calls for this skill.
        </p>

        <h3>Step 4: A user asks for a review, and the host loads the skill</h3>
        <p>
          When a user asks for a code review, the host fetches <code>skill://code-review/SKILL.md</code> using <code>resources/read</code>, MCP&apos;s ordinary request for reading a file. Before using it, the host checks the file against the manifest, comparing fingerprints to make sure it&apos;s the exact file the server listed. Then it hands the instructions to the model, labelled with the server they came from, so the model knows where they originated. Here&apos;s the whole file:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightMarkdown(skillSnippet)}</code>
        </pre>

        <h3>Step 5: The checklist is read only if the instructions call for it</h3>
        <p>
          Notice the line telling the model to read <code>references/checklist.md</code>. That&apos;s a relative path, an address written relative to the skill&apos;s own folder, much like saying &quot;the file next door&quot;. The host turns it into the full address <code>skill://code-review/references/checklist.md</code> and reads it from the same server, but only when the model actually follows that instruction.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Crucially, the spec forbids hosts from fetching these files early. A host can&apos;t download them when it first connects, when it gets the list, or when a user approves the skill. Each file is read only at the moment it&apos;s needed. That&apos;s what keeps progressive disclosure working, even though the skill now lives on a server across the network rather than in a folder on your machine.
        </p>

        <figure style={{ margin: '1.75rem 0 0' }}>
          <img
            src={flowImg}
            alt="Three stages: skills/list sends name and description at discovery, resources/read fetches SKILL.md on activation, and a second resources/read fetches the checklist only on demand."
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
          <figcaption>Three requests, three sizes of context. Each row happens only if the one above it did.</figcaption>
        </figure>
      </section>

      <section className="article-panel">
        <h2>A skill is riskier than a tool</h2>
        <p>
          That sounds backwards at first. Tools are the part that actually does things, so surely they&apos;re the dangerous bit? The answer lies in <em>where</em> each one runs. When the agent calls a tool, the work happens on the server, out of reach of your computer. A skill is different: it&apos;s a set of instructions telling <em>your</em> agent what to do on <em>your</em> machine, and it can even include scripts for the agent to run.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Think of the difference between ordering a meal and being handed a recipe. When you order, the cooking happens in the restaurant&apos;s kitchen, and whatever goes wrong stays there. A recipe gets cooked in your own kitchen, so if it tells you to leave the gas on, it&apos;s your house at risk. The spec says so plainly: hosts must treat skills served over MCP as a higher-risk surface than remote tool calls.
        </p>
        <p style={{ marginTop: '1rem' }}>
          So the rules are strict. Using our code-review skill as the example, here&apos;s what a host has to do:
        </p>
        <ul>
          <li>
            <strong>Treat it as untrusted.</strong> The skill&apos;s text is handled like anything else that came from outside, and it must arrive labelled with the server it came from. It can never be passed off as one of your own local skills.
          </li>
          <li>
            <strong>Ask before running code.</strong> If the skill wants to run a script, the user has to approve it for that specific skill first.
          </li>
          <li>
            <strong>Never let it impersonate yours.</strong> If you already have your own <code>code-review</code> skill, a server can&apos;t publish one with the same name and quietly take its place.
          </li>
          <li>
            <strong>Ask again after any change.</strong> An approval is tied to the fingerprints (the digests) of the skill&apos;s files at the moment you said yes. If the server later changes even one file, the fingerprint no longer matches and the host has to ask you again.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>What&apos;s next: progressive discovery</h2>
        <p>
          Progressive disclosure makes sure the agent reads a skill&apos;s full instructions only when a task needs them, but it doesn&apos;t shrink the catalogue: an agent still sees a card for every tool and resource a server offers. Back in our library, a catalogue of titles and short summaries works well when the library is small. In one with millions of books, just reading the catalogue becomes the problem. That&apos;s where progressive discovery comes in. Where progressive disclosure decides <em>how much</em> of a skill the agent reads, progressive discovery decides <em>which</em> tools and resources (and so which skills, since skills are served as resources) the agent hears about at all. It&apos;s more like asking a librarian, who listens to what you need and comes back with a handful of books worth reading.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Progressive discovery is now on the official MCP roadmap for the next six to twelve months. The aim is to let agents find a server&apos;s tools, resources and other building blocks as they need them, rather than loading the full catalogue up front.
        </p>
      </section>

      <section className="article-panel">
        <h2>References</h2>
        <div className="som-recommended">
          <span className="som-recommended__label">Recommended reading</span>
          <a href="https://www.bloomberg.com/company/stories/skills-over-mcp-how-bloomberg-helped-standardize-agent-skills-at-scale/" target="_blank" rel="noreferrer">
            Skills over MCP: How Bloomberg Helped Standardize Agent Skills at Scale
          </a>
        </div>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a href="https://modelcontextprotocol.io/extensions/skills/overview" target="_blank" rel="noreferrer">
              Skills extension overview (Model Context Protocol)
            </a>
          </li>
          <li>
            <a href="https://modelcontextprotocol.io/seps/2640-skills-extension" target="_blank" rel="noreferrer">
              SEP-2640: Skills Extension
            </a>
          </li>
          <li>
            <a href="https://modelcontextprotocol.io/community/working-groups/skills-over-mcp" target="_blank" rel="noreferrer">
              Skills Over MCP Working Group charter
            </a>
          </li>
          <li>
            <a href="https://modelcontextprotocol.io/development/roadmap" target="_blank" rel="noreferrer">
              MCP Roadmap: Improved Primitives and progressive discovery
            </a>
          </li>
          <li>
            <a href="https://agentskills.io/specification" target="_blank" rel="noreferrer">
              Agent Skills specification
            </a>
          </li>
          <li>
            <a href="https://apievangelist.com/2026/10/21/four-companies-serve-skills-over-mcp-the-way-the-spec-says/" target="_blank" rel="noreferrer">
              Four Companies Serve Skills Over MCP The Way The Spec Says (API Evangelist)
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/3oHLjC3wZNE"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              Skills over MCP – Ola Hungerford, Principal Engineer Nordstrom (Agentic AI Foundation)
            </a>
          </li>
        </ul>
      </section>

      <style>{`
        .som-key { color: #8caaee; } /* Blue */
        .som-string { color: #a6d189; } /* Green */
        .som-number { color: #ef9f76; } /* Peach */
        .som-punct { color: #949cbb; } /* Overlay 2 */
        .som-comment { color: #838ba7; font-style: italic; } /* Overlay 1 */
        .som-fence { color: #ca9ee6; font-weight: 600; } /* Mauve */
        .som-head { color: #ef9f76; font-weight: 600; } /* Peach */
        .som-inline { color: #81c8be; } /* Teal */

        .som-recommended {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 1rem;
          padding: 0.9rem 1.1rem;
          background: color-mix(in srgb, var(--success) 12%, transparent);
          border-radius: 10px;
        }
        .som-recommended__label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--success);
        }
      `}</style>
    </>
  );
}
