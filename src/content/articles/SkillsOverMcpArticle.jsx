const beforeAfterImg = new URL('../../../images/skills-over-mcp-before-after.svg', import.meta.url).href;
const flowImg = new URL('../../../images/skills-over-mcp-flow.svg', import.meta.url).href;
const workflowImg = new URL('../../../images/skills-over-mcp-workflow.png', import.meta.url).href;

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
        Connect an agent to an MCP server and it learns what it <em>can</em> do: a list of tools, each with a name and an input schema. What it doesn&apos;t learn is how your team actually does the job those tools serve, such as the rule that the review checklist gets read before anyone touches the diff. Skills over MCP is the official MCP extension that lets a server ship that know-how alongside its tools.
      </p>

      <section className="article-panel">
        <h2>Two halves of one job</h2>
        <p>
          The Model Context Protocol (MCP) gives an agent hands: tools it can call on a remote server. An Agent Skill gives it a recipe. A skill is just a folder with a <code>SKILL.md</code> file inside, which opens with a short block of YAML naming the skill and describing when to use it, followed by plain Markdown instructions. It can also hold <code>references/</code>, <code>scripts/</code> and <code>assets/</code> folders for the detail.
        </p>
        <p style={{ marginTop: '1rem' }}>
          What makes skills cheap is a habit called progressive disclosure. The agent keeps only each skill&apos;s name and description in view (about 100 tokens apiece), reads the full instructions when a task matches (the spec recommends under 5,000 tokens), and opens a supporting file only if the instructions point to it. It&apos;s a library card catalogue: you browse the cards, and pull a book off the shelf only when you need it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The trouble was where the recipe lived, and each option broke something. Keep skills as local folders and every new or changed skill had to be copied to every user, so versions drifted apart. Put the guidance into the server&apos;s tool descriptions and instructions instead and it stays current, but all of it loads the moment the agent connects, needed or not. That&apos;s the tension: shorter context keeps an agent fast and focused, yet good behaviour usually needs longer, more detailed instructions.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The proposal that standardised the fix, SEP-2640, adds three more problems. You could install a server from a registry with no signal that a companion skill existed. The server&apos;s built-in <code>instructions</code> field is too small for real workflows; the proposal cites an 875-line skill that simply doesn&apos;t fit. And several teams had each invented their own <code>skill://</code> URLs, all slightly incompatible. The answer is the one Angie Jones of the Agentic AI Foundation summed up in a June blog post: &quot;ship the manual with the product.&quot; The server owns the skill, so it&apos;s always current, and the agent still reads it only when a task needs it.
        </p>

        <figure style={{ margin: '1.75rem 0 0' }}>
          <img
            src={beforeAfterImg}
            alt="Before: the MCP server and the skill folder reach the agent host separately. After: one MCP server serves both its tools and skill:// files."
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
          <figcaption>The skill now ships, and updates, with the server whose tools it describes.</figcaption>
        </figure>
      </section>

      <section className="article-panel">
        <h2>Why not invent something new?</h2>
        <p>
          An earlier proposal, SEP-2076, wanted skills as a brand-new MCP primitive next to tools, prompts and resources. The Skills Over MCP Working Group, co-led by Ola Hungerford of Nordstrom, Sambhav Kothari of Bloomberg and Peter Alexander of Anthropic, went the other way. MCP already has resources, which are read-only files a server exposes by URI. So each file in a skill folder simply becomes a resource, conventionally under <code>skill://</code>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That choice keeps the new surface tiny. The extension adds two required methods, <code>skills/list</code> and <code>skills/get</code>, plus an optional <code>resources/directory/read</code> for browsing folders. Everything else uses the existing <code>resources/read</code>. A client that has never heard of the extension sees ordinary resources, which is what they are. And the skill format itself isn&apos;t touched at all; it belongs to the separate Agent Skills specification. SEP-2640 reached Final status and was merged on 13 September 2026.
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
        <h2>Following one skill across the wire</h2>
        <p>
          Take the small example from the spec itself: a server that serves a <code>code-review</code> skill with one supporting file. The server first announces the extension when the client asks what it supports:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightJson(capabilitySnippet)}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          The host then calls <code>skills/list</code>. Each entry carries the skill&apos;s frontmatter, unchanged, and a manifest: every file&apos;s URI, its size in bytes and its SHA-256 digest, a fingerprint of the exact bytes.
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightJson(listSnippet)}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          Only the name and description reach the model at this point. When a user asks for a review, the host fetches <code>skill://code-review/SKILL.md</code> with <code>resources/read</code>, checks it against the manifest, and loads it, tagged with the server it came from:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{highlightMarkdown(skillSnippet)}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          The relative path resolves to <code>skill://code-review/references/checklist.md</code>, which is read from the same server only when the model follows that line. Crucially, the spec forbids hosts from fetching files early, on connection, on listing or on approval. Progressive disclosure survives the trip over the network.
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
          That sounds backwards until you look at what each one does. A tool call runs on the server. A skill is text that tells <em>your</em> agent what to do on <em>your</em> machine, and it can bundle scripts. The spec says so plainly: hosts must treat MCP-served skills as a higher-risk surface than remote tool calls.
        </p>
        <p style={{ marginTop: '1rem' }}>
          So the rules are strict. Skill content is untrusted input and must arrive labelled with its origin, never disguised as a local skill. Running any code needs explicit approval for that skill, and an <code>allowed-tools</code> field arriving from a server is ignored unless the user grants it. A server can&apos;t publish its own <code>code-review</code> and silently shadow yours. And an approval is pinned to the digests: change one file and the host has to ask again. The authors are careful about the limit, though. The digests aren&apos;t signed and come from the same server as the content, so they prove consistency, not trustworthiness.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The drafts also show what was given up. An early version let servers ship a skill as one zip or tar archive. The core maintainers removed it, because safely unpacking a stranger&apos;s archive means defending against path tricks, symlinks and decompression bombs in every host. (Microsoft&apos;s July 2026 .NET preview still reads an <code>index.json</code> and archives; it predates the final spec.)
        </p>
      </section>

      <section className="article-panel">
        <h2>Where it stands</h2>
        <p>
          The proposal shipped with reference code in the Python, C# and Go SDKs, and prototype hosts in gemini-cli, fast-agent and Codex; it also lists Claude Code as prototyped internally at Anthropic. Server-side adoption is still thin. An API Evangelist survey on 21 October 2026 found four companies serving skills the way the spec says (Hugging Face, Glean, Renoolab and BestPrice) out of 1,003 public MCP providers that responded. It counted only anonymous endpoints, and the spec had been final for barely five weeks, so it&apos;s an early snapshot, not a verdict.
        </p>
        <p style={{ marginTop: '1rem' }}>
          What still isn&apos;t settled is trust. A digest tells you the bytes didn&apos;t change after you said yes. It can&apos;t tell you whether you should have said yes. For now that judgement stays with the person approving the skill.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Scale is the other open problem. Progressive disclosure still keeps one card per skill in view, and cards add up: even at 20 tokens an entry, a few thousand skills cost tens of thousands of tokens before the agent has done anything. The fix extends the library picture. Instead of reading the whole catalogue, you ask a librarian, who listens to what you need and comes back with a handful of books. That idea, called progressive discovery, is on the official MCP roadmap: clients would learn a server&apos;s tools and resources as they need them, instead of ingesting the full catalogue up front.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Back to our review server. Without the extension, its checklist would sit somewhere the agent might never look. With it, the agent gets it from the same place it gets the tools, one file at a time, only when asked. It turns out an agent with hands still needed someone to hand it the manual.
        </p>
      </section>

      <section className="article-panel">
        <h2>References</h2>
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
            <a href="https://www.bloomberg.com/company/stories/skills-over-mcp-how-bloomberg-helped-standardize-agent-skills-at-scale/" target="_blank" rel="noreferrer">
              Skills over MCP: How Bloomberg Helped Standardize Agent Skills at Scale (Bloomberg)
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
            <a href="https://devblogs.microsoft.com/agent-framework/discover-agent-skills-from-mcp-servers-in-net/" target="_blank" rel="noreferrer">
              Discover Agent Skills from MCP servers in .NET (Microsoft)
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
      `}</style>
    </>
  );
}
