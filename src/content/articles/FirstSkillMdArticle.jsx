import { useState } from "react";
import { Check, Copy } from "lucide-react";

const fileImg = new URL("../../../images/skillmd-file.png", import.meta.url)
  .href;
const invokeImg = new URL("../../../images/skillmd-invoke.png", import.meta.url)
  .href;

const treeSnippet = `learn-skills/
└── .agents/
    └── skills/
        └── greet/
            ├── SKILL.md
            └── references/
                └── output_format.md`;

const scaffoldSnippet = `mkdir -p ~/Programme/learn-skills
cd ~/Programme/learn-skills

mkdir -p .agents/skills/greet
touch .agents/skills/greet/SKILL.md`;

const symlinkSnippet = `# Replace <agent-skills-dir> with the path your agent scans.
mkdir -p <agent-skills-dir>
ln -s ../../.agents/skills/greet <agent-skills-dir>/greet`;

const firstSkillSnippet = `---
name: greet
description: Greet the user back in Spanish. Use when the user says hi, hello, hey, good morning, or any other greeting.
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic → \`¡Hola!\`
- Morning → \`¡Buenos días!\`
- Afternoon → \`¡Buenas tardes!\`
- Evening → \`¡Buenas noches!\`

Keep it to one line. If the greeting came with a request, greet first, then do the work as normal.`;

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

const finalSkillSnippet = `---
name: greet
description: Greet the user back in Spanish with the current date and time. Use when the user says hi, hello, hey, good morning, or any other greeting.
---

# Greet

When the user greets you, reply with a Spanish greeting:

- Generic → \`¡Hola!\`
- Morning → \`¡Buenos días!\`
- Afternoon → \`¡Buenas tardes!\`
- Evening → \`¡Buenas noches!\`

If the greeting came with a request, greet first, then do the work as normal.

## Output Format

Follow the layout in [references/output_format.md](references/output_format.md).`;

const deploySnippet = `---
name: deploy
description: Deploy the application to production.
disable-model-invocation: true
---

# Deploy

Deploy the current branch to production:

1. Run the test suite. Stop if anything fails.
2. Build the application.
3. Push to the deployment target.
4. Verify the deployment succeeded.`;

const manualGreetSnippet = `---
name: greet
description: Greet the user back in Spanish with the current date and time. Use when the user says hi, hello, hey, good morning, or any other greeting.
disable-model-invocation: true
---`;

// ── Rendering ────────────────────────────────────────────────────────────────
// Every code block is derived from its snippet constant, so the text a reader
// copies is the text on screen by construction. Highlighting only wraps
// substrings in spans; it never adds or removes a character.

function withInlineCode(text, keyPrefix) {
  return text.split(/(`[^`]*`)/g).map((part, i) =>
    part.length > 1 && part.startsWith("`") && part.endsWith("`") ? (
      <span key={`${keyPrefix}-${i}`} className="sk-inline">
        {part}
      </span>
    ) : (
      part
    ),
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

function Figure({ src, alt, caption }) {
  return (
    <figure className="sk-figure">
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
        A skill is a folder with a Markdown file in it. That is the entire
        format. In about twenty-five minutes you will build a working{" "}
        <code>/greet</code> skill that answers you in Spanish and stamps the
        reply with today&apos;s date — and along the way pick up the one
        structural idea that separates a toy skill from a maintainable one.
      </p>

      <section className="article-panel">
        <h2>The idea: three tiers, loaded at different times</h2>
        <p>
          What makes a skill more than a note in a file is <em>when</em> it gets
          read. The agent sees only the skill&apos;s one-line description at all
          times. The body is loaded on demand — when the description matches
          what you asked for, or when you type the skill&apos;s name as a
          slash-command. Anything the body links to is opened only if the work
          actually calls for it.
        </p>
        <p style={{ marginTop: "1rem" }}>
          That staging is called <strong>progressive disclosure</strong>, and it
          is why a skill can be as long as it needs to be without taking up room
          in every conversation.
        </p>

        <p style={{ marginTop: "1rem" }}>
          This article walks the three tiers in the order you will actually meet
          them: write one file, watch it fire, then split the detail out when
          one file stops being enough. Here is the finished shape:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "What we are building",
            lang: "text",
            snippet: treeSnippet,
            sectionKey: "tree",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Nine lines of tree for a skill whose entire job is to say{" "}
          <em>hola</em>. That is deliberate — the greeting is trivial so the
          structure stays visible.
        </p>
      </section>

      <section className="article-panel">
        <h2>Tier 1 · Build the folder and write SKILL.md</h2>
        <p>
          Every folder in the path carries meaning, so build it one level at a
          time rather than pasting a single long command you cannot read.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "Scaffold the skill",
            lang: "bash",
            snippet: scaffoldSnippet,
            sectionKey: "scaffold",
          })}
        </div>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Folder</th>
                <th>What it&apos;s for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.agents/</code>
                </td>
                <td>
                  Hidden. Everything an AI agent needs, kept separate from your
                  source code. A cross-tool convention — the same folder other
                  agents look in.
                </td>
              </tr>
              <tr>
                <td>
                  <code>skills/</code>
                </td>
                <td>
                  A collection. One subfolder per skill, so ten skills sit side
                  by side without colliding.
                </td>
              </tr>
              <tr>
                <td>
                  <code>greet/</code>
                </td>
                <td>
                  One skill.{" "}
                  <strong>The folder name becomes the command</strong> — this
                  folder is why you will type <code>/greet</code> and not
                  something else.
                </td>
              </tr>
              <tr>
                <td>
                  <code>SKILL.md</code>
                </td>
                <td>
                  The entry point. Exact filename, capitals included. Empty for
                  now.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Check where your agent looks</h3>
          <p>
            <code>.agents/</code> is a cross-tool convention for authoring, not
            a guarantee that every agent scans it. Most agents also read a
            skills directory of their own — one scoped to the project, one
            global to your machine. Before going further, check your
            agent&apos;s documentation for the path it watches. If it is not{" "}
            <code>.agents/skills/</code>, keep authoring here and link the skill
            across so you only ever maintain one copy:
          </p>
          <div style={{ marginTop: "1rem" }}>
            {card({
              label: "Link .agents/skills/ into the directory your agent scans",
              lang: "bash",
              snippet: symlinkSnippet,
              sectionKey: "symlink",
            })}
          </div>
          <p style={{ marginTop: "1rem" }}>
            Agents typically watch those directories and pick up new skills
            mid-session. If the folder did not exist when you started, restart
            once so it can be watched.
          </p>
        </div>

        <h3 style={{ marginTop: "2rem" }}>The file itself</h3>
        <p>
          Our goal in one sentence:{" "}
          <em>when the user greets me, greet them back in Spanish.</em> Open{" "}
          <code>.agents/skills/greet/SKILL.md</code> and write this:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "SKILL.md — the first version",
            lang: "markdown",
            snippet: firstSkillSnippet,
            sectionKey: "first",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          That is a complete, working skill. It is worth being slow about the
          four lines at the top, because they do more work than the rest of the
          file.
        </p>

        <p style={{ marginTop: "1rem" }}>
          The <code>---</code> lines mark a YAML block. It must be the very
          first thing in the file — a blank line or a stray character above it
          and the skill silently fails to load. Only a handful of keys are
          allowed; an unrecognised one is a hard error with a message listing
          what is permitted.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Required</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>name</code>
                </td>
                <td>Yes</td>
                <td>
                  Identifies the skill. Match it to the folder name — mixing
                  them up is a confusing afternoon.
                </td>
              </tr>
              <tr>
                <td>
                  <code>description</code>
                </td>
                <td>Yes</td>
                <td>The trigger. Always in context; everything else is not.</td>
              </tr>
              <tr>
                <td>
                  <code>allowed-tools</code>
                </td>
                <td>No</td>
                <td>
                  Tools pre-approved for the turn that invokes the skill, so it
                  does not stop to ask.
                </td>
              </tr>
              <tr>
                <td>
                  <code>disallowed-tools</code>
                </td>
                <td>No</td>
                <td>
                  Tools removed while the skill is active. Useful for unattended
                  skills.
                </td>
              </tr>
              <tr>
                <td>
                  <code>disable-model-invocation</code>
                </td>
                <td>No</td>
                <td>
                  Set to <code>true</code> and only you can fire the skill — the
                  agent cannot. Covered in the last section.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "2rem" }}>
          Why the description lists the words
        </h3>
        <p>
          Compare two versions of the same line. Both are true; only one fires
          reliably.
        </p>

        <div className="sk-compare">
          <div className="sk-compare__item sk-compare__item--do">
            <span className="sk-compare__tag">
              Do this — name the trigger words
            </span>
            <p>
              Greet the user back in Spanish. Use when the user says hi, hello,
              hey, good morning, or any other greeting.
            </p>
            <p className="sk-compare__why">
              Says what it does <em>and</em> when to use it. The literal words a
              user types appear in the text, so the match is obvious.
            </p>
          </div>
          <div className="sk-compare__item sk-compare__item--dont">
            <span className="sk-compare__tag">
              Not this — vague and self-referential
            </span>
            <p>A friendly greeting skill.</p>
            <p className="sk-compare__why">
              Nothing to match against. The agent has to guess what
              &quot;friendly&quot; covers, and mostly it guesses no.
            </p>
          </div>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>The rule worth remembering</h3>
          <p>
            Write descriptions in the form{" "}
            <strong>
              &quot;&lt;what it does&gt;. Use when &lt;concrete
              situations&gt;.&quot;
            </strong>{" "}
            A skill that never triggers is indistinguishable from a skill that
            does not exist, and the description is the only thing standing
            between those two states.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Invoke it: two routes into the same skill</h2>
        <p>There are two ways to set a skill off, and both matter.</p>

        <p style={{ marginTop: "1rem" }}>
          <strong>Explicitly</strong> — type the folder name as a slash-command,{" "}
          <code>/greet</code>. This skips the matching step entirely: you named
          the skill, so its body loads. Use this while developing, because it
          isolates the body from the description. If <code>/greet</code> behaves
          and a plain &quot;hi&quot; does not, your instructions are fine and
          your description is the problem.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <strong>Implicitly</strong> — just say <code>hello</code>. The agent
          compares your message against every loaded description, sees the one
          listing &quot;hi, hello, hey, good morning&quot;, and reads the body.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>You type</th>
                <th>You get</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>hi</code>
                </td>
                <td>¡Hola!</td>
                <td>No time signal, so the generic greeting.</td>
              </tr>
              <tr>
                <td>
                  <code>good morning</code>
                </td>
                <td>¡Buenos días!</td>
                <td>Matched the morning row of the list.</td>
              </tr>
              <tr>
                <td>
                  <code>hey, fix this test</code>
                </td>
                <td>¡Hola! then the fix</td>
                <td>
                  The &quot;greet first, then work&quot; rule doing its job.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Nothing happened — what do I check?</h3>
          <p>
            In order: is the file at <code>.agents/skills/greet/SKILL.md</code>{" "}
            (or linked into the directory your agent scans)? Is <code>---</code>{" "}
            the literal first line? Is the filename <code>SKILL.md</code> in
            capitals? Does <code>/greet</code> appear when you type{" "}
            <code>/</code>? If the explicit call works but &quot;hello&quot;
            does not, rewrite the description — not the body.
          </p>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          This is a legitimate stopping point. Plenty of useful skills are one
          file this size. The rest of this article is about what happens when
          one file stops being enough.
        </p>
      </section>

      <section className="article-panel">
        <h2>Tier 2 · A new requirement forces a split</h2>
        <p>
          Suppose the greeting should now carry the current date and time — two
          lines instead of one:
        </p>

        <pre className="sk-block sk-block--plain">
          <code>
            {"¡Buenas noches!\nToday is Saturday, 08 August 2026 — 22:22"}
          </code>
        </pre>

        <p style={{ marginTop: "1.25rem" }}>
          Small as it is, this requirement drags a surprising amount of detail
          behind it. An exact line template. A choice about date format (is it{" "}
          <code>08 August</code> or <code>August 8</code>?). The shell
          incantation that produces it. A worked example so the agent can see
          the shape rather than infer it.
        </p>
        <p style={{ marginTop: "1rem" }}>
          You could staple all of that into <code>SKILL.md</code>. It would
          work. It would also double the file, and every future rule — a second
          language, a weekend variant — would double it again. That is the
          moment to split.
        </p>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>When to split, concretely</h3>
          <p>
            Move a chunk into <code>references/</code> when it is{" "}
            <strong>long</strong> (a table of cases, a full template),{" "}
            <strong>occasional</strong> (needed for one branch of the work), or{" "}
            <strong>volatile</strong> (edited on its own schedule). Keep it
            inline when it is a rule the skill cannot function without.
          </p>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Write the reference file</h3>
        <p>
          Create the folder with{" "}
          <code>mkdir -p .agents/skills/greet/references</code> and save this as{" "}
          <code>references/output_format.md</code>. The name{" "}
          <code>references/</code> is a convention, not a rule — nothing scans
          it automatically. It works because <code>SKILL.md</code> links to what
          is inside.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "references/output_format.md",
            lang: "markdown",
            snippet: outputFormatSnippet,
            sectionKey: "output",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Three things earn their place in that file:
        </p>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>A template with named slots</strong> — the agent can see the
            exact shape, including the em dash and the comma, without
            reverse-engineering it from prose.
          </li>
          <li>
            <strong>The command that produces the value</strong> — the agent
            should not guess today&apos;s date from context when{" "}
            <code>date</code> can tell it. The format string is what makes{" "}
            <code>08 August 2026</code> come out that way and not some other
            way.
          </li>
          <li>
            <strong>One filled-in example</strong> — the cheapest possible way
            to remove ambiguity. Templates get misread; a real line does not.
          </li>
        </ul>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Reference files have no frontmatter</h3>
          <p>
            Only <code>SKILL.md</code> gets the <code>---</code> block.
            Everything under <code>references/</code> is ordinary Markdown, read
            as content when the body points at it.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Wire the reference into SKILL.md</h2>
        <p>
          A file in <code>references/</code> that nothing links to is a file
          nobody reads. Two edits connect it: update the description so the
          always-loaded line reflects the new behaviour, then add an{" "}
          <code>## Output Format</code> section that points at the file.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "SKILL.md — finished",
            lang: "markdown",
            snippet: finalSkillSnippet,
            sectionKey: "final",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          The file grew by two lines and gained a capability. That ratio is the
          point of the pattern.
        </p>

        <Figure
          src={fileImg}
          alt="The finished SKILL.md open in an editor, showing frontmatter, the greeting list, and the Output Format section linking to references/output_format.md"
          caption="The finished SKILL.md — 19 lines. Frontmatter on top, the decision in the middle, a pointer at the bottom."
        />

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Use a relative link</h3>
          <p>
            <code>references/output_format.md</code> is relative to the skill
            folder, so the skill keeps working when it is copied to another
            machine, committed to a different repo, or shared with a teammate.
            An absolute path like <code>/Users/you/Programme/…</code> breaks the
            moment it leaves your laptop.
          </p>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Run it again</h3>
        <p>
          Same command as before, different result — and this is the whole
          mechanism in one screen:
        </p>

        <Figure
          src={invokeImg}
          alt="Chat panel showing /greet Hello producing ¡Hola! followed by the current date, next to the SKILL.md source"
          caption="/greet now returns two lines. Note the status line: it reviewed the skill and ran the date command."
        />

        <p>Behind that, three things happened in order:</p>
        <ol className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>The skill fired</strong> — you named it, so{" "}
            <code>SKILL.md</code> was read.
          </li>
          <li>
            <strong>The body sent it onward</strong> — the Output Format section
            pointed at <code>references/output_format.md</code>, so that file
            was opened too. On a &quot;hi&quot; with no formatting involved, it
            would not have been.
          </li>
          <li>
            <strong>The command ran</strong> — the reference specified{" "}
            <code>date &quot;+%A, %d %B %Y — %H:%M&quot;</code>, and its output
            filled the second line. The date is real, not inferred.
          </li>
        </ol>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Two things that commonly go wrong</h3>
          <p>
            <strong>Greeting but no date line.</strong> The link is not
            resolving. Check the path in <code>SKILL.md</code> matches the file
            on disk exactly — no leading slash, no <code>./</code>, underscore
            in the right place.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>The date format looks wrong.</strong> <code>%A</code> and{" "}
            <code>%B</code> render in your system locale, so a non-English
            locale gives non-English day and month names. If you want them fixed
            regardless of machine, prefix the command with <code>LC_ALL=C</code>{" "}
            in the reference file.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Tier 3 · Deciding who is allowed to invoke it</h2>
        <p>
          You have seen two routes into the same skill: you typed{" "}
          <code>/greet</code>, or you said &quot;hello&quot; and the agent
          matched the description on its own. One optional frontmatter key
          closes the second route:
        </p>

        <pre className="sk-block sk-block--plain">
          <code>{"disable-model-invocation: true"}</code>
        </pre>

        <p style={{ marginTop: "1.25rem" }}>
          It is a boolean, it is optional, and leaving it out is the same as
          writing <code>false</code>. Everything you have built so far has been
          running on that default.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Value</th>
                <th>
                  You can type <code>/name</code>
                </th>
                <th>The agent can fire it</th>
                <th>Is the description in context?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>false</code> (default)
                </td>
                <td>Yes</td>
                <td>Yes — whenever the description matches</td>
                <td>Yes, always</td>
              </tr>
              <tr>
                <td>
                  <code>true</code>
                </td>
                <td>Yes</td>
                <td>No — the call is blocked</td>
                <td>
                  <strong>No</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          That last column is the part people miss. With <code>true</code>, the
          description is not merely ignored for matching — it is not loaded at
          all. That follows logically: the description exists so the agent can
          decide when to use a skill, and a skill the agent may never invoke has
          nothing to decide.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Two consequences worth internalising. First,{" "}
          <strong>it costs zero context</strong> — a <code>true</code> skill is
          free to sit in your skills folder forever, which is the honest
          argument for marking a rarely-used command as manual-only even when it
          is harmless. Second,{" "}
          <strong>
            your careful &quot;Use when…&quot; wording stops earning its keep
          </strong>
          . It still shows in the <code>/</code> menu, so write it for a human
          skimming autocomplete rather than for a matcher.
        </p>

        <h3 style={{ marginTop: "2rem" }}>A skill with consequences</h3>
        <p>
          Our <code>greet</code> skill never set the key, so it is already the{" "}
          <code>false</code> case — and that is right for a skill that only
          produces text. The worst case for a mistaken trigger is an unwanted{" "}
          <em>¡Hola!</em>. Now a different skill:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: ".agents/skills/deploy/SKILL.md",
            lang: "markdown",
            snippet: deploySnippet,
            sectionKey: "deploy",
          })}
        </div>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>You type</th>
                <th>What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>/deploy</code>
                </td>
                <td>
                  Fires normally. <strong>The key never restricts you.</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <code>ship this to prod</code>
                </td>
                <td>
                  Nothing fires. The agent cannot see the description, so there
                  is nothing to match against.
                </td>
              </tr>
              <tr>
                <td>
                  <code>the tests pass, we&apos;re good to go</code>
                </td>
                <td>
                  Still nothing. No amount of contextual hinting reaches a skill
                  the agent is not allowed to call.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          And if the agent somehow attempts the call anyway, a well-behaved
          runtime blocks it — and tells the agent not to reproduce the deploy
          steps by some other route instead. So the realistic outcome is the
          agent replying that you should run <code>/deploy</code> yourself.
        </p>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>The rule of thumb</h3>
          <p>
            Set <code>true</code> when firing the skill by accident would cost
            something you cannot take back — deploying, committing, sending a
            message, opening a PR, spending money. Leave it at the default when
            the skill only produces words on your screen. Ask yourself:{" "}
            <em>
              if this fired at the wrong moment, would I be annoyed, or would I
              be paging someone?
            </em>
          </p>
        </div>

        <h3 style={{ marginTop: "2rem" }}>The mirror-image key</h3>
        <p>
          There is a second key that restricts the other direction.{" "}
          <code>user-invocable: false</code> hides a skill from the{" "}
          <code>/</code> menu while leaving the agent free to load it — right
          for background knowledge that is not a meaningful command. Nobody
          wants to type <code>/legacy-billing-context</code>; they just want the
          agent to know it.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Frontmatter</th>
                <th>You</th>
                <th>The agent</th>
                <th>Typical skill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>neither key</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>
                  <code>greet</code>, a style guide, a checklist
                </td>
              </tr>
              <tr>
                <td>
                  <code>disable-model-invocation: true</code>
                </td>
                <td>Yes</td>
                <td>No</td>
                <td>
                  <code>deploy</code>, <code>commit</code>, a send-message skill
                </td>
              </tr>
              <tr>
                <td>
                  <code>user-invocable: false</code>
                </td>
                <td>No</td>
                <td>Yes</td>
                <td>Background context about a legacy system</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Setting both to lock everyone out is legal and useless — the skill
          becomes unreachable.
        </p>

        <h3 style={{ marginTop: "2rem" }}>
          Feel the difference in thirty seconds
        </h3>
        <p>Add the key to your greet skill:</p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "greet — temporarily manual-only",
            lang: "markdown",
            snippet: manualGreetSnippet,
            sectionKey: "manual",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Now type <code>hello</code> — you get an ordinary reply, no Spanish.
          Type <code>/greet</code> and the full two-line greeting comes back.
          Remove the key and &quot;hello&quot; starts working again.
        </p>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Writing the value</h3>
          <p>
            The key is spelled with hyphens, all lower case:{" "}
            <code>disable-model-invocation</code>. Some agents also accept{" "}
            <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code>
            , <code>1</code>, and <code>0</code> in any casing for boolean
            fields, but that varies by tool and by version. Stick to{" "}
            <code>true</code>/<code>false</code> and the question never comes up
            — note that YAML reads an unquoted <code>no</code> as{" "}
            <code>false</code>, so <code>disable-model-invocation: no</code>{" "}
            means the same thing as <code>false</code>, which is rarely what
            someone typing &quot;no&quot; intends.
          </p>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>
            My skill still doesn&apos;t fire on its own, and I never set this
            key
          </h3>
          <p>
            Then the key is not your problem — check the description first. The
            quick test: if <code>/greet</code> works and plain speech does not,
            you have either a weak description or{" "}
            <code>disable-model-invocation: true</code> somewhere in the file.
            Open the frontmatter and look; those are the only two explanations.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>What you learned</h2>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>The folder is the command.</strong> <code>greet/</code> is
            why <code>/greet</code> works. Rename the folder and you rename the
            command.
          </li>
          <li>
            <strong>The description is the trigger.</strong> It is the only part
            always in context. Name the real words a user would type. Vague
            descriptions never fire.
          </li>
          <li>
            <strong>The body decides.</strong> Short, imperative, specific. What
            to do, in what order, and what not to do.
          </li>
          <li>
            <strong>References hold the detail.</strong> Long, occasional, or
            volatile material lives one link away and costs nothing until it is
            opened.
          </li>
          <li>
            <strong>You choose who can fire it.</strong>{" "}
            <code>disable-model-invocation: true</code> keeps a skill
            manual-only. Reach for it the moment a mistaken trigger would cost
            more than an unwanted sentence.
          </li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>Four small edits to try next</h3>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>Add a language</strong> — a second reference file,{" "}
            <code>references/languages.md</code>, and one line in the body
            choosing between them. The body stays the same length.
          </li>
          <li>
            <strong>Pre-approve the date command</strong> — add{" "}
            <code>allowed-tools: Bash(date *)</code> to the frontmatter so the
            skill never pauses for permission.
          </li>
          <li>
            <strong>Promote it to a personal skill</strong> — move the folder
            out of the project and into your agent&apos;s global skills
            directory, and it works in every project, not just this one.
          </li>
          <li>
            <strong>Break it on purpose</strong> — blank the description and see
            that &quot;hello&quot; stops triggering while <code>/greet</code>{" "}
            still works. That asymmetry is the clearest way to feel what the
            description does.
          </li>
        </ul>

        <p style={{ marginTop: "1.5rem" }}>
          Nothing here was specific to greetings. The same three tiers carry a
          code-review checklist, a deploy runbook, or a house style guide: a
          description precise enough to fire at the right moment, a body short
          enough to read in one pass, and reference files that hold the detail
          until the moment it matters.
        </p>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>A good first real skill</h3>
          <p>
            Look for something you have pasted into a chat more than twice — a
            checklist, a command sequence, a set of conventions. That repetition
            is the signal. Convert it exactly as you converted this one: folder,
            frontmatter, body, then split out the detail when the body stops
            being skimmable.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Reference</h2>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <a href="https://agentskills.io" target="_blank" rel="noreferrer">
              Agent Skills specification
            </a>{" "}
            — the portable frontmatter keys: <code>name</code>,{" "}
            <code>description</code>, <code>license</code>,{" "}
            <code>compatibility</code>, <code>metadata</code>, and{" "}
            <code>allowed-tools</code>.
          </li>
          <li>
            Your agent&apos;s own documentation — for the directories it scans
            and for keys beyond the portable set. Invocation controls such as{" "}
            <code>disable-model-invocation</code> and{" "}
            <code>user-invocable</code> are tool-specific extensions rather than
            part of the spec above, so confirm support before relying on them.
          </li>
        </ul>
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
          font-family: 'IBM Plex Mono', monospace;
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
          font-family: 'IBM Plex Mono', monospace;
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

        .sk-block--plain {
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-top: 1.25rem;
        }

        .sk-block code {
          font-family: 'IBM Plex Mono', monospace;
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

        .sk-compare {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          margin-top: 1.25rem;
        }

        .sk-compare__item {
          padding: 16px 18px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface-soft);
          border-left-width: 4px;
        }

        .sk-compare__item--do { border-left-color: #16a34a; }
        .sk-compare__item--dont { border-left-color: #dc2626; }

        .sk-compare__tag {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .sk-compare__item--do .sk-compare__tag { color: #16a34a; }
        .sk-compare__item--dont .sk-compare__tag { color: #dc2626; }

        .sk-compare__item p {
          margin: 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--text);
        }

        .sk-compare__why {
          margin-top: 0.7rem !important;
          font-family: inherit !important;
          font-size: 0.9rem !important;
          color: var(--text-muted) !important;
        }
      `}</style>
    </>
  );
}
