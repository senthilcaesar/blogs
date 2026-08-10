import { useState } from "react";
import { Check, Copy } from "lucide-react";

const step1Img = new URL("../../../images/skill-step-1.png", import.meta.url).href;
const step2Img = new URL("../../../images/skill-step-2.png", import.meta.url).href;
const step3Img = new URL("../../../images/skill-step-3.png", import.meta.url).href;
const step4Img = new URL("../../../images/skill-step-4.png", import.meta.url).href;
const step5Img = new URL("../../../images/skill-step-5.png", import.meta.url).href;
const step6Img = new URL("../../../images/skill-step-6.png", import.meta.url).href;
const step7Img = new URL("../../../images/skill-step-7.png", import.meta.url).href;
const step8Img = new URL("../../../images/skill-step-8.png", import.meta.url).href;
const step9Img = new URL("../../../images/skill-step-9.png", import.meta.url).href;
const step10Img = new URL("../../../images/skill-step-10.png", import.meta.url).href;

const mkdirSnippet = `mkdir learn-skills
cd learn-skills

# Create hidden agent skills directory structure
mkdir -p .agents/skills/greet`;

const initialSkillSnippet = `---
name: greet
description: Greet the user back in Spanish. Use when the user says hi, hello, hey, good morning, or any other greeting.
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic -> \`¡Hola!\`
- Morning -> \`¡Buenos días!\`
- Afternoon -> \`¡Buenas tardes!\`
- Evening -> \`¡Buenas noches!\`

Keep it to one line. If the greeting came with a request, greet first, then do the work as normal.`;

const mkdirRefSnippet = `mkdir -p .agents/skills/greet/references
touch .agents/skills/greet/references/output_format.md`;

const outputFormatSnippet = `# Output Format

Two lines: the Spanish greeting, then the current date and time.

\`\`\`
<greeting>
Today is <Weekday>, <DD> <Month> <YYYY> — <HH:MM>
\`\`\`

Get the timestamp by running:

\`\`\`bash
date "+%A, %d %B %Y — %H:%M"
\`\`\`

## Example

\`\`\`
¡Buenas noches!
Today is Saturday, 08 August 2026 — 22:22
\`\`\``;

const updatedSkillSnippet = `---
name: greet
description: Greet the user back in Spanish with the current date and time. Use when the user says hi, hello, hey, good morning, or any other greeting.
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic -> \`¡Hola!\`
- Morning -> \`¡Buenos días!\`
- Afternoon -> \`¡Buenas tardes!\`
- Evening -> \`¡Buenas noches!\`

Keep it to one line. If the greeting came with a request, greet first, then do the work as normal.

## Output Format

Follow the layout in [references/output_format.md](references/output_format.md).`;

const disableInvocationSnippet = `---
name: greet
description: Greet the user back in Spanish with the current date and time. Use when the user says hi, hello, hey, good morning, or any other greeting.
disable-model-invocation: true
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic -> \`¡Hola!\`
- Morning -> \`¡Buenos días!\`
- Afternoon -> \`¡Buenas tardes!\`
- Evening -> \`¡Buenas noches!\`

Keep it to one line. If the greeting came with a request, greet first, then do the work as normal.

## Output Format

Follow the layout in [references/output_format.md](references/output_format.md).`;

const enableInvocationSnippet = `---
name: greet
description: Greet the user back in Spanish with the current date and time. Use when the user says hi, hello, hey, good morning, or any other greeting.
disable-model-invocation: false
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic -> \`¡Hola!\`
- Morning -> \`¡Buenos días!\`
- Afternoon -> \`¡Buenas tardes!\`
- Evening -> \`¡Buenas noches!\`

Keep it to one line. If the greeting came with a request, greet first, then do the work as normal.

## Output Format

Follow the layout in [references/output_format.md](references/output_format.md).`;

// ── Rendering & Highlighting Helpers ──────────────────────────────────────────

function withInlineCode(text, keyPrefix) {
  return text.split(/(`[^`]*`)/g).map((part, i) =>
    part.length > 1 && part.startsWith("`") && part.endsWith("`") ? (
      <span key={`${keyPrefix}-${i}`} className="sk-inline">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function highlight(source, lang) {
  const lines = source.split("\n");
  let fences = 0;
  const nodes = [];

  lines.forEach((line, i) => {
    let content;

    if (lang === "markdown" && line === "---" && fences < 2) {
      fences += 1;
      content = <span className="sk-fence">{line}</span>;
    } else if (
      lang === "markdown" &&
      fences === 1 &&
      /^[a-z][a-z-]*:/.test(line)
    ) {
      const colon = line.indexOf(":");
      content = (
        <>
          <span className="sk-key">{line.slice(0, colon)}</span>
          {line.slice(colon)}
        </>
      );
    } else if (lang === "markdown" && /^#{1,6} /.test(line)) {
      content = <span className="sk-head">{line}</span>;
    } else if (lang === "markdown" && line.startsWith("```")) {
      content = <span className="sk-muted">{line}</span>;
    } else if (lang === "bash" && line.startsWith("#")) {
      content = <span className="sk-muted">{line}</span>;
    } else {
      content = withInlineCode(line, i);
    }

    nodes.push(<span key={i}>{content}</span>);
    if (i < lines.length - 1) nodes.push("\n");
  });

  return nodes;
}

function CodeCard({ label, lang, snippet, sectionKey, copiedSection, onCopy }) {
  const isCopied = copiedSection === sectionKey;

  return (
    <div className="sk-card">
      <div className="sk-card__header">
        <span>{label}</span>
        <div className="sk-card__actions">
          <span className="sk-card__lang">{lang}</span>
          <button
            type="button"
            className={`sk-copy ${isCopied ? "sk-copy--done" : ""}`}
            onClick={() => onCopy(snippet, sectionKey)}
            title="Copy snippet"
          >
            {isCopied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="sk-block">
        <code>{highlight(snippet, lang)}</code>
      </pre>
    </div>
  );
}

function Figure({ src, alt, caption, maxWidth }) {
  return (
    <figure className="sk-figure" style={maxWidth ? { maxWidth, margin: "1.75rem auto" } : undefined}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function FirstSkillMdArticle() {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = async (text, sectionKey) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const card = (props) => (
    <CodeCard {...props} copiedSection={copiedSection} onCopy={handleCopy} />
  );

  return (
    <>
      <p className="article-lead">
        Learn how to create your own custom AI agent skills step by step using <code>SKILL.md</code>. This easy guide shows you how to set up skill folders in VS Code, format the AI&apos;s replies, organize extra instructions into reference files, and control when the AI triggers your skills.
      </p>

      {/* STEP 1 */}
      <section className="article-panel">
        <h2>Step 1 · Create the Project and Folder Structure</h2>
        <p>
          First, create a project folder called <code>learn-skills</code> on your computer, open it in VS Code, and create the hidden agent skill directory hierarchy: <code>.agents/skills/greet/</code>.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "Terminal — Create folder structure",
            lang: "bash",
            snippet: mkdirSnippet,
            sectionKey: "mkdir",
          })}
        </div>

        <p style={{ marginTop: "1rem" }}>
          <em>Note: You can run the terminal commands above, or create the folders directly inside the VS Code Explorer sidebar using the <strong>New Folder</strong> button.</em>
        </p>

        <p style={{ marginTop: "1.25rem" }}>
          Open the <code>learn-skills</code> directory in VS Code. Inside the <code>greet</code> folder, we will place our skill entry point file: <code>SKILL.md</code>.
        </p>

        <Figure
          src={step1Img}
          alt="VS Code Explorer showing folder tree: LEARN-SKILLS > .agents > skills > greet > SKILL.md"
          caption="Step 1: Nested folder hierarchy (.agents/skills/greet/) created inside VS Code."
          maxWidth="380px"
        />

        <div className="article-panel article-panel--accent" style={{ marginTop: "1.5rem" }}>
          <h3>Pro Tip: Disable VS Code Compact Folders</h3>
          <p>
            By default, VS Code collapses single child folders into a single compressed line (e.g. <code>.agents/skills/greet</code>).
            If you want VS Code&apos;s Explorer to display each folder individually in a proper nested tree hierarchy:
          </p>
          <ol className="bullet-list" style={{ marginTop: "0.75rem" }}>
            <li>Open VS Code Settings (press <code>Cmd + ,</code> on macOS / <code>Ctrl + ,</code> on Windows/Linux, or click the <strong>Gear icon ⚙️</strong> in the bottom-left corner and select <strong>Settings</strong>).</li>
            <li>Search for <strong>Compact Folders</strong>.</li>
            <li>Uncheck <strong>Explorer: Compact Folders</strong>.</li>
          </ol>

          <div style={{ marginTop: "1.25rem" }}>
            <Figure
              src={step2Img}
              alt="VS Code Settings showing Explorer: Compact Folders setting unchecked"
              caption="Step 2: Uncheck 'Explorer: Compact Folders' in Settings for clear tree visualization."
            />
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="article-panel">
        <h2>Step 2 · Write and Test your First SKILL.md File</h2>
        <p>
          Inside the <code>greet</code> folder, create a file named <code>SKILL.md</code>. Copy and paste the following contents into it and save the file:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: ".agents/skills/greet/SKILL.md — Initial Version",
            lang: "markdown",
            snippet: initialSkillSnippet,
            sectionKey: "initial-skill",
          })}
        </div>

        <Figure
          src={step3Img}
          alt="SKILL.md editor view showing YAML frontmatter and greeting instructions"
          caption="Step 3: Initial SKILL.md file with name, description frontmatter, and greeting logic."
        />

        <div className="article-panel article-panel--accent" style={{ marginTop: "1.5rem" }}>
          <p>
            Each skill lives in a <code>SKILL.md</code> file with a <code>name</code> and <code>description</code> in its frontmatter (the header settings at the top).
          </p>
          <p style={{ marginTop: "1rem" }}>
            The <code>name</code> identifies your skill, while the <code>description</code> tells the AI Agent when to use it. When you type a message in chat, the AI Agent reads the skill descriptions to find the right skill that matches your request.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <strong>A good description answers two questions:</strong>
          </p>
          <ul className="bullet-list" style={{ marginTop: "0.5rem" }}>
            <li>What does this skill do?</li>
            <li>When should an Agent use it?</li>
          </ul>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Invoke the Skill in Chat</h3>
        <p>
          Now open the agent chat window in VS Code and invoke the skill directly using the slash command <code>/greet</code> Hello.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          As you can see, the agent responded correctly with <strong>&quot;¡Hola!&quot;</strong>.
        </p>

        <Figure
          src={step4Img}
          alt="Agent chat window showing /greet Hello returning ¡Hola!"
          caption="Step 4: Invoking /greet in the chat window returns the expected Spanish greeting ¡Hola!."
        />
      </section>

      {/* STEP 3 */}
      <section className="article-panel">
        <h2>Step 3 · Format Output & Progressive Disclosure using Reference Files</h2>
        <p>
          Now let&apos;s learn how to format the agent&apos;s output. Suppose we want the greeting to carry the current date and time in a specific two-line format.
        </p>

        <p style={{ marginTop: "1rem" }}>
          To keep <code>SKILL.md</code> lightweight and modular, we place detailed instructions and templates into a <code>references</code> subfolder. This pattern is called <strong>progressive disclosure</strong> — reference files are loaded by the agent only when needed.
        </p>

        <p style={{ marginTop: "1rem" }}>
          Create a subfolder called <code>references</code> inside the <code>greet</code> folder, and inside it create a file named <code>output_format.md</code>:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "Terminal — Create reference file",
            lang: "bash",
            snippet: mkdirRefSnippet,
            sectionKey: "mkdir-ref",
          })}
        </div>

        <Figure
          src={step5Img}
          alt="VS Code Explorer showing output_format.md created inside greet/references/"
          caption="Step 5: Creating references/output_format.md inside the greet skill directory."
          maxWidth="380px"
        />

        <h3 style={{ marginTop: "2rem" }}>Add Output Formatting Content</h3>
        <p>
          Copy and paste the following output format specifications into <code>references/output_format.md</code> and save:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: ".agents/skills/greet/references/output_format.md",
            lang: "markdown",
            snippet: outputFormatSnippet,
            sectionKey: "output-format",
          })}
        </div>

        <Figure
          src={step6Img}
          alt="references/output_format.md open in editor showing timestamp command and example"
          caption="Step 6: Content of output_format.md specifying layout template, shell date command, and concrete example."
        />

        <h3 style={{ marginTop: "2rem" }}>Wire the Reference File into SKILL.md</h3>
        <p>
          Update the <code>description</code> field in <code>SKILL.md</code> so the always-loaded frontmatter reflects the new date/time behavior. Then add an <code>## Output Format</code> section that links directly to <code>[references/output_format.md](references/output_format.md)</code>:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: ".agents/skills/greet/SKILL.md — Updated with Reference Link",
            lang: "markdown",
            snippet: updatedSkillSnippet,
            sectionKey: "updated-skill",
          })}
        </div>

        <Figure
          src={step7Img}
          alt="Updated SKILL.md showing modified description and Output Format section referencing output_format.md"
          caption="Step 7: SKILL.md updated with modified description and relative link to output_format.md."
        />

        <h3 style={{ marginTop: "2rem" }}>Test the Formatted Output</h3>
        <p>
          Invoke the <code>/greet</code> Hello command again in the chat window. The agent reads the reference file, executes the shell date command, and responds with the precise formatted output:
        </p>

        <Figure
          src={step8Img}
          alt="Chat window showing /greet Hello returning ¡Hola! and Today is Monday, 10 August 2026 — 22:20"
          caption="Step 8: Invoking /greet returns the updated two-line response with Spanish greeting and live timestamp."
        />
      </section>

      {/* STEP 4 */}
      <section className="article-panel">
        <h2>Step 4 · Control Automated Triggers with disable-model-invocation</h2>
        <p>
          By default, AI agents inspect all loaded skill descriptions and automatically trigger a skill whenever your chat prompt matches its description. However, for administrative or sensitive skills, you may want to prevent automatic model triggering.
        </p>

        <p style={{ marginTop: "1rem" }}>
          Adding <code>disable-model-invocation: true</code> to the frontmatter of a <code>SKILL.md</code> file stops the AI agent from automatically invoking that skill during ambient conversational matching.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "SKILL.md — Model Invocation Disabled",
            lang: "markdown",
            snippet: disableInvocationSnippet,
            sectionKey: "disable-invocation",
          })}
        </div>

        <h3 style={{ marginTop: "2rem" }}>Testing with disable-model-invocation: true</h3>
        <p>
          Save <code>SKILL.md</code> with <code>disable-model-invocation: true</code> and type <code>Hello</code> in a chat window without using the <code>/greet</code> slash command:
        </p>

        <Figure
          src={step9Img}
          alt="Chat window showing prompt 'Hello' returning default 'Hello! How can I help you today?' without triggering skill"
          caption="Step 9: With disable-model-invocation: true, sending 'Hello' does not trigger the greet skill."
        />

        <p style={{ marginTop: "1.25rem" }}>
          As shown above, the agent does not trigger the skill automatically and instead responds with standard conversational text: <em>&quot;Hello! How can I help you today?&quot;</em>.
        </p>

        <h3 style={{ marginTop: "2rem" }}>Testing with disable-model-invocation: false</h3>
        <p>
          Now change the parameter back to <code>disable-model-invocation: false</code> (or omit it, as <code>false</code> is the default behavior):
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "SKILL.md — Model Invocation Enabled",
            lang: "markdown",
            snippet: enableInvocationSnippet,
            sectionKey: "enable-invocation",
          })}
        </div>

        <Figure
          src={step10Img}
          alt="Chat window showing prompt 'Hello' invoking greet skill and returning Spanish greeting with date/time"
          caption="Step 10: Resetting parameter to disable-model-invocation: false enables automatic AI model triggering on 'Hello'."
        />

        <p style={{ marginTop: "1.25rem" }}>
          In a new chat session, sending <code>Hello</code> allows the agent to automatically match the description, load the skill, and return the formatted Spanish greeting with the current date and time.
        </p>
      </section>

      {/* SUMMARY & BEST PRACTICES */}
      <section className="article-panel">
        <h2>Summary of Key Concepts</h2>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Feature / Parameter</th>
                <th>Purpose</th>
                <th>Best Practice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.agents/skills/&lt;name&gt;/</code></td>
                <td>Folder structure convention for storing skills</td>
                <td>Folder name defines the slash command (e.g. <code>/greet</code>).</td>
              </tr>
              <tr>
                <td><code>SKILL.md</code></td>
                <td>Main entry point file with YAML frontmatter</td>
                <td>Keep body concise; use relative markdown links to <code>references/</code>.</td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td>Frontmatter trigger text loaded in context</td>
                <td>Specify concrete triggers: <em>&quot;Use when user says hi, hello...&quot;</em>.</td>
              </tr>
              <tr>
                <td><code>references/</code></td>
                <td>Directory for supplementary Markdown docs</td>
                <td>Store templates, schemas, and heavy documentation here for progressive disclosure.</td>
              </tr>
              <tr>
                <td><code>disable-model-invocation</code></td>
                <td>Frontmatter flag (<code>true</code> / <code>false</code>)</td>
                <td>Set to <code>true</code> for manual slash commands only (e.g., deployments, git pushes).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="article-panel article-panel--accent" style={{ marginTop: "1.5rem" }}>
          <h3>Key Takeaways</h3>
          <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
            <li><strong>Folder Name = Command Name:</strong> The directory name <code>greet</code> determines the slash command <code>/greet</code>.</li>
            <li><strong>Progressive Disclosure Saves Context:</strong> By placing heavy schemas or templates in <code>references/</code>, you keep your main agent prompt lightweight.</li>
            <li><strong>Explicit Control:</strong> Use <code>disable-model-invocation: true</code> whenever automated triggering of a skill could cause unwanted side effects.</li>
          </ul>
        </div>
      </section>

      <style>{`
        .sk-card {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-strong);
          box-shadow: var(--shadow-sm);
        }

        .sk-card__header {
          padding: 10px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--surface-soft);
          color: var(--text);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .sk-card__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .sk-card__lang {
          font-family: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: lowercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--accent-glow);
          color: var(--accent);
          font-weight: 600;
        }

        .sk-copy {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          font-family: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-soft);
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .sk-copy:hover {
          color: var(--accent);
          background: var(--surface-soft);
          border-color: var(--border-strong);
        }

        .sk-copy--done {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.12);
          border-color: rgba(22, 163, 74, 0.3);
        }

        body[data-theme='dark'] .sk-copy--done {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.18);
          border-color: rgba(74, 222, 128, 0.4);
        }

        .sk-block {
          margin: 0;
          padding: 16px 20px;
          background: #0f172a;
          overflow-x: auto;
        }

        body[data-theme='dark'] .sk-block {
          background: #171b26;
        }

        .sk-block code {
          font-family: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', monospace;
          font-size: 0.92rem;
          line-height: 1.7;
          color: #e2e8f0;
          background: none;
          padding: 0;
          border: none;
          display: block;
          white-space: pre;
        }

        .sk-fence { color: #ff8a3d; font-weight: 600; }
        .sk-key { color: #ffa657; font-weight: 600; }
        .sk-head { color: #7ee787; font-weight: 600; }
        .sk-inline { color: #a5d6ff; }
        .sk-muted { color: #8b949e; }

        .sk-figure {
          margin: 1.75rem 0;
        }

        .sk-figure img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }

        .sk-figure figcaption {
          margin-top: 0.7rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
