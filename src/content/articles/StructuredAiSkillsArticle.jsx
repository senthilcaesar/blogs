import { useState } from "react";
import { Check, Copy } from "lucide-react";

const skillsImg = new URL(
  "../../../images/ai-skills-framework.png",
  import.meta.url,
).href;

const yamlSkillSnippet = `---
name: Database Migration Auditor
description: Audits SQL migration files for destructive operations, locking changes, and missing rollbacks.
allowed-tools: Read, Grep, Bash
metadata:
  version: 1.2.0
---

# Objective
Analyze target SQL migration files for schema safety and concurrency hazards.

## Input Parameters
- \`migration_path\`: Absolute path to target .sql file
- \`db_dialect\`: Target database (\`postgres\` | \`mysql\` | \`sqlite\`)

## Execution Steps
1. **Syntax & Style Validation**: Parse file to confirm structural validity.
2. **Destructive Operations Audit**: Scan for \`DROP TABLE\`, \`DROP COLUMN\`, or unindexed \`ALTER TABLE\`.
3. **Rollback Generation**: Generate automated inverse migration statements.

## Output Requirements
Return findings grouped strictly under:
- ## Risk Rating
- ## Found Hazards
- ## Recommended Rollback Script`;

const xmlSkillSnippet = `<skill_definition>
  <meta>
    <name>API Contract Validator</name>
    <purpose>Ensure response payloads conform to standard JSON schema guidelines.</purpose>
  </meta>

  <constraints>
    - Never permit extra top-level keys not defined in the contract.
    - All timestamp strings must strictly follow ISO-8601 UTC format.
    - Return explicit failure locations using JSONPath expression syntax.
  </constraints>

  <examples>
    <example>
      <input>{"status": "active", "createdAt": "2026-08-10T11:30:00Z"}</input>
      <thought>Keys match schema. Timestamps are valid ISO-8601 UTC.</thought>
      <output>PASS</output>
    </example>
    <example>
      <input>{"status": 200}</input>
      <thought>'status' field expected string enum, received integer 200.</thought>
      <output>FAIL: Type mismatch at $.status</output>
    </example>
  </examples>

  <task>
    Validate the provided JSON payload against the active API contract.
  </task>
</skill_definition>`;

const reactLoopSnippet = `# Skill: Automated Refactoring Engine

## Loop State Machine
For each refactoring iteration, you MUST follow this strict cycle:

1. **THOUGHT**: Analyze the codebase state and state what single change is required.
2. **ACTION**: Invoke a single tool command (\`Grep\`, \`Edit\`).
3. **OBSERVATION**: Inspect tool response, compiler logs, or lint results.
4. **VERIFICATION**: Run local unit tests to ensure zero regression.

## Guardrails & Exit Conditions
- Stop loop immediately if 3 consecutive test runs fail.
- Do NOT edit files outside the designated target workspace directory.
- Roll back all uncommitted changes if build step throws an unhandled exception.`;

const jsonSchemaSnippet = `{
  "name": "run_security_audit",
  "description": "Performs static security analysis on target repository dependencies.",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "severity_threshold": {
        "type": "string",
        "enum": ["low", "medium", "high", "critical"],
        "description": "Minimum vulnerability severity to trigger alert."
      },
      "include_dev_deps": {
        "type": ["boolean", "null"],
        "description": "Include devDependencies in the scan. Null means false."
      }
    },
    "required": ["severity_threshold", "include_dev_deps"],
    "additionalProperties": false
  }
}`;

const contractSnippet = `# Skill: Production Database Migration

## Preconditions
Assert ALL of the following before executing any step:
- \`git status --porcelain\` returns empty output (clean working tree).
- \`DATABASE_URL\` is set and does NOT resolve to the production cluster.
- A verified backup exists with a timestamp less than 60 minutes old.

If any precondition fails: STOP, report which assertion failed, take no further action.

## Postconditions
Assert ALL of the following after the final step:
- The migrations table records exactly one newly applied revision.
- The application boots and \`/healthz\` returns HTTP 200.
- The generated down-migration replays cleanly against the staging replica.

If any postcondition fails: run the down-migration, then report the failed assertion.`;

// Header for a code card. `snippet` must be byte-identical to the markup rendered
// inside the sibling <pre>; src/test/snippet-parity.test.jsx enforces it.
// Declared at module scope so a copy click re-renders the button rather than
// remounting every code block below it.
function CodeCardHeader({
  label,
  lang,
  snippet,
  sectionKey,
  copiedSection,
  onCopy,
}) {
  const isCopied = copiedSection === sectionKey;

  return (
    <div className="code-card__header">
      <span>{label}</span>
      <div className="code-card__actions">
        <span className="code-card__lang">{lang}</span>
        <button
          type="button"
          className={`code-copy-btn ${isCopied ? "code-copy-btn--copied" : ""}`}
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
  );
}

export function StructuredAiSkillsArticle() {
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

  return (
    <>
      <p className="article-lead">
        As AI agents transition from simple conversational bots to autonomous
        software engineering partners, unstructured text prompts quickly hit a
        wall. To build predictable, repeatable, and scalable agents, developers
        are adopting <strong>structured skill formats</strong>.
      </p>

      <section className="article-panel">
        <h2>Why Unstructured Prompts Fail at Scale</h2>
        <p>
          When you give an LLM a wall of informal text prose, three major
          failure modes occur:
        </p>
        <ul className="bullet-list" style={{ marginTop: "1rem" }}>
          <li>
            <strong>Instruction Dilution:</strong> Critical constraints get lost
            inside long paragraphs.
          </li>
          <li>
            <strong>Context Bleed:</strong> Background context gets mixed up
            with the actionable task or hard rules.
          </li>
          <li>
            <strong>Non-Deterministic Behavior:</strong> Without defined schema
            boundaries, the model improvises tool parameters and response
            formats unpredictably.
          </li>
        </ul>
        <p style={{ marginTop: "1.25rem" }}>
          Structuring skills provides an explicit blueprint that separates
          metadata, constraints, reasoning loops, and output expectations.
          Let&apos;s look at the 5 formats that show up most often in production
          agent stacks.
        </p>
      </section>

      <section className="article-panel">
        <h2>1. YAML Frontmatter + Structured Markdown (SKILL.md)</h2>
        <p>
          This is the convention agent frameworks have converged on: YAML
          frontmatter for machine-readable capability routing, plain Markdown
          below it for the procedure. The frontmatter is what lets an agent
          decide <em>whether</em> to load a skill without reading the whole body
          — so the <code>description</code> field is doing more work than it
          looks like.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Two details bite people. Field names are hyphenated rather than
          snake_case (<code>allowed-tools</code>, not <code>allowed_tools</code>
          ), and the allowed key set is small: <code>name</code>,{" "}
          <code>description</code>, <code>license</code>,{" "}
          <code>compatibility</code>, <code>metadata</code>, and{" "}
          <code>allowed-tools</code>. An unrecognized top-level key such as{" "}
          <code>version</code> is a hard packaging error rather than a silently
          ignored field, so custom data belongs under the free-form{" "}
          <code>metadata</code> map. Tool names are framework-specific; the ones
          below follow Claude Code&apos;s naming.
        </p>

        <div
          className="code-card"
          style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}
        >
          <CodeCardHeader
            label="SKILL.md Specification Example"
            lang="markdown"
            snippet={yamlSkillSnippet}
            sectionKey="yaml"
          copiedSection={copiedSection}
          onCopy={handleCopy}
          />
          <pre className="code-block">
            <code>
              <span className="syn-comment">{"---"}</span>
              {"\n"}
              <span className="syn-prop">{"name"}</span>
              {": "}
              <span className="syn-string">{"Database Migration Auditor"}</span>
              {"\n"}
              <span className="syn-prop">{"description"}</span>
              {": "}
              <span className="syn-string">
                {
                  "Audits SQL migration files for destructive operations, locking changes, and missing rollbacks."
                }
              </span>
              {"\n"}
              <span className="syn-prop">{"allowed-tools"}</span>
              {": "}
              <span className="syn-func">{"Read"}</span>
              {", "}
              <span className="syn-func">{"Grep"}</span>
              {", "}
              <span className="syn-func">{"Bash"}</span>
              {"\n"}
              <span className="syn-prop">{"metadata"}</span>
              {":\n  "}
              <span className="syn-prop">{"version"}</span>
              {": "}
              <span className="syn-number">{"1.2.0"}</span>
              {"\n"}
              <span className="syn-comment">{"---"}</span>
              {"\n\n"}
              <span className="syn-keyword">{"# Objective"}</span>
              {"\n"}
              <span className="syn-text">
                {
                  "Analyze target SQL migration files for schema safety and concurrency hazards."
                }
              </span>
              {"\n\n"}
              <span className="syn-keyword">{"## Input Parameters"}</span>
              {"\n- "}
              <span className="syn-prop">{"`migration_path`"}</span>
              {": "}
              <span className="syn-string">
                {"Absolute path to target .sql file"}
              </span>
              {"\n- "}
              <span className="syn-prop">{"`db_dialect`"}</span>
              {": "}
              <span className="syn-string">
                {"Target database (`postgres` | `mysql` | `sqlite`)"}
              </span>
              {"\n\n"}
              <span className="syn-keyword">{"## Execution Steps"}</span>
              {"\n1. "}
              <span className="syn-tag">{"**Syntax & Style Validation**"}</span>
              {": Parse file to confirm structural validity.\n2. "}
              <span className="syn-tag">
                {"**Destructive Operations Audit**"}
              </span>
              {
                ": Scan for `DROP TABLE`, `DROP COLUMN`, or unindexed `ALTER TABLE`.\n3. "
              }
              <span className="syn-tag">{"**Rollback Generation**"}</span>
              {": Generate automated inverse migration statements.\n\n"}
              <span className="syn-keyword">{"## Output Requirements"}</span>
              {"\n"}
              <span className="syn-text">
                {"Return findings grouped strictly under:"}
              </span>
              {"\n- "}
              <span className="syn-attr">{"## Risk Rating"}</span>
              {"\n- "}
              <span className="syn-attr">{"## Found Hazards"}</span>
              {"\n- "}
              <span className="syn-attr">
                {"## Recommended Rollback Script"}
              </span>
            </code>
          </pre>
        </div>
      </section>

      <section className="article-panel">
        <h2>2. XML &amp; Few-Shot Instruction Schemas</h2>
        <p>
          Wrapping instructions in distinct XML tags creates clear contextual
          boundaries — the model can tell a hard rule from background material
          without relying on paragraph position. The tags are delimiters, not
          enforcement: nothing rejects output that ignores them. What they buy
          you is markedly better instruction adherence, and pairing them with
          input-thought-output examples is what pins down the decision boundary
          on classification-style tasks.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Note the failing example below. One passing example teaches the happy
          path; the failing one teaches the model where the line actually sits
          and what a rejection should look like.
        </p>

        <div
          className="code-card"
          style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}
        >
          <CodeCardHeader
            label="XML Tagged Skill with Few-Shot Examples"
            lang="xml"
            snippet={xmlSkillSnippet}
            sectionKey="xml"
          copiedSection={copiedSection}
          onCopy={handleCopy}
          />
          <pre className="code-block">
            <code>
              <span className="xml-tag-context">{"<skill_definition>"}</span>
              {"\n  "}
              <span className="syn-tag">{"<meta>"}</span>
              {"\n    "}
              <span className="syn-tag">{"<name>"}</span>
              <span className="syn-string">{"API Contract Validator"}</span>
              <span className="syn-tag">{"</name>"}</span>
              {"\n    "}
              <span className="syn-tag">{"<purpose>"}</span>
              <span className="syn-text">
                {
                  "Ensure response payloads conform to standard JSON schema guidelines."
                }
              </span>
              <span className="syn-tag">{"</purpose>"}</span>
              {"\n  "}
              <span className="syn-tag">{"</meta>"}</span>
              {"\n\n  "}
              <span className="xml-tag-constraints">{"<constraints>"}</span>
              {"\n"}
              <span className="xml-code-content">
                {
                  "    - Never permit extra top-level keys not defined in the contract."
                }
              </span>
              {"\n"}
              <span className="xml-code-content">
                {
                  "    - All timestamp strings must strictly follow ISO-8601 UTC format."
                }
              </span>
              {"\n"}
              <span className="xml-code-content">
                {
                  "    - Return explicit failure locations using JSONPath expression syntax."
                }
              </span>
              {"\n  "}
              <span className="xml-tag-constraints">{"</constraints>"}</span>
              {"\n\n  "}
              <span className="xml-tag-input">{"<examples>"}</span>
              {"\n    "}
              <span className="syn-tag">{"<example>"}</span>
              {"\n"}
              <span className="xml-code-content">
                {"      <input>"}
                <span className="syn-string">
                  {'{"status": "active", "createdAt": "2026-08-10T11:30:00Z"}'}
                </span>
                {"</input>"}
              </span>
              {"\n"}
              <span className="xml-code-content">
                {"      <thought>"}
                <span className="syn-comment">
                  {"Keys match schema. Timestamps are valid ISO-8601 UTC."}
                </span>
                {"</thought>"}
              </span>
              {"\n"}
              <span className="xml-code-content">
                {"      <output>"}
                <span className="syn-keyword">{"PASS"}</span>
                {"</output>"}
              </span>
              {"\n    "}
              <span className="syn-tag">{"</example>"}</span>
              {"\n    "}
              <span className="syn-tag">{"<example>"}</span>
              {"\n"}
              <span className="xml-code-content">
                {"      <input>"}
                <span className="syn-string">{'{"status": 200}'}</span>
                {"</input>"}
              </span>
              {"\n"}
              <span className="xml-code-content">
                {"      <thought>"}
                <span className="syn-comment">
                  {"'status' field expected string enum, received integer 200."}
                </span>
                {"</thought>"}
              </span>
              {"\n"}
              <span className="xml-code-content">
                {"      <output>"}
                <span className="syn-keyword">
                  {"FAIL: Type mismatch at $.status"}
                </span>
                {"</output>"}
              </span>
              {"\n    "}
              <span className="syn-tag">{"</example>"}</span>
              {"\n  "}
              <span className="xml-tag-input">{"</examples>"}</span>
              {"\n\n  "}
              <span className="xml-tag-task">{"<task>"}</span>
              {"\n"}
              <span className="xml-code-content">
                {
                  "    Validate the provided JSON payload against the active API contract."
                }
              </span>
              {"\n  "}
              <span className="xml-tag-task">{"</task>"}</span>
              {"\n"}
              <span className="xml-tag-context">{"</skill_definition>"}</span>
            </code>
          </pre>
        </div>
      </section>

      <section className="article-panel">
        <h2>3. ReAct (Reason + Act) Loop Specifications</h2>
        <p>
          For interactive skills that execute terminal commands or inspect code
          repositories, the ReAct pattern (Yao et al., 2023) prescribes a rigid
          three-beat cycle:{" "}
          <strong>Thought &rarr; Action &rarr; Observation</strong>, repeated
          until the goal is met.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Coding agents in production almost always bolt a fourth beat onto that
          loop — <strong>Verification</strong> — because an observation only
          tells you what the tool returned, not whether the codebase still
          works. That step is a practical extension rather than part of ReAct as
          published, but it is the one that keeps a refactoring loop from
          confidently walking off a cliff.
        </p>

        <div
          className="code-card"
          style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}
        >
          <CodeCardHeader
            label="ReAct Loop Skill Specification"
            lang="markdown"
            snippet={reactLoopSnippet}
            sectionKey="react"
          copiedSection={copiedSection}
          onCopy={handleCopy}
          />
          <pre className="code-block">
            <code>
              <span className="syn-keyword">
                {"# Skill: Automated Refactoring Engine"}
              </span>
              {"\n\n"}
              <span className="syn-keyword">{"## Loop State Machine"}</span>
              {"\n"}
              <span className="syn-text">
                {
                  "For each refactoring iteration, you MUST follow this strict cycle:"
                }
              </span>
              {"\n\n1. "}
              <span className="syn-badge-thought">{"**THOUGHT**"}</span>
              {
                ": Analyze the codebase state and state what single change is required.\n2. "
              }
              <span className="syn-badge-action">{"**ACTION**"}</span>
              {": Invoke a single tool command ("}
              <span className="syn-func">{"`Grep`"}</span>
              {", "}
              <span className="syn-func">{"`Edit`"}</span>
              {").\n3. "}
              <span className="syn-badge-obs">{"**OBSERVATION**"}</span>
              {": Inspect tool response, compiler logs, or lint results.\n4. "}
              <span className="syn-badge-verify">{"**VERIFICATION**"}</span>
              {": Run local unit tests to ensure zero regression.\n\n"}
              <span className="syn-keyword">
                {"## Guardrails & Exit Conditions"}
              </span>
              {"\n- "}
              <span className="syn-attr">{"Stop loop immediately"}</span>
              {" if 3 consecutive test runs fail.\n- "}
              <span className="syn-attr">{"Do NOT edit files"}</span>
              {" outside the designated target workspace directory.\n- "}
              <span className="syn-attr">
                {"Roll back all uncommitted changes"}
              </span>
              {" if build step throws an unhandled exception."}
            </code>
          </pre>
        </div>
      </section>

      <section className="article-panel">
        <h2>4. JSON Schema / Function Calling Definitions</h2>
        <p>
          When skill invocation happens at the model API level, JSON Schema
          describes the shape of the arguments the model should produce. It is
          worth being precise about what that does and does not guarantee: by
          default the schema is{" "}
          <em>documentation the model is asked to follow</em>, serialized into
          the prompt alongside the tool name and description. Nothing validates
          the model&apos;s output against it during generation, and models will
          occasionally invent a plausible value for a parameter you never
          supplied.
        </p>
        <p style={{ marginTop: "1rem" }}>
          To turn the schema into an actual contract, opt into strict mode —{" "}
          <code>strict: true</code> on the tool definition, supported by both
          OpenAI (structured outputs) and Anthropic (strict tool use). Strict
          mode constrains decoding so the emitted arguments conform by
          construction, at the cost of a narrower schema dialect: every property
          must appear in <code>required</code>,{" "}
          <code>additionalProperties</code> must be <code>false</code>, and
          genuinely optional fields are expressed as a nullable union rather
          than being omitted. Even then, validate on your side before executing
          anything — the schema governs shape, not whether the values make
          sense.
        </p>

        <div
          className="code-card"
          style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}
        >
          <CodeCardHeader
            label="Strict Function Calling Definition (OpenAI shape)"
            lang="json"
            snippet={jsonSchemaSnippet}
            sectionKey="json"
          copiedSection={copiedSection}
          onCopy={handleCopy}
          />
          <pre className="code-block">
            <code>
              {"{\n  "}
              <span className="syn-prop">{'"name"'}</span>
              {": "}
              <span className="syn-string">{'"run_security_audit"'}</span>
              {",\n  "}
              <span className="syn-prop">{'"description"'}</span>
              {": "}
              <span className="syn-string">
                {
                  '"Performs static security analysis on target repository dependencies."'
                }
              </span>
              {",\n  "}
              <span className="syn-prop">{'"strict"'}</span>
              {": "}
              <span className="syn-keyword">{"true"}</span>
              {",\n  "}
              <span className="syn-prop">{'"parameters"'}</span>
              {": {\n    "}
              <span className="syn-prop">{'"type"'}</span>
              {": "}
              <span className="syn-keyword">{'"object"'}</span>
              {",\n    "}
              <span className="syn-prop">{'"properties"'}</span>
              {": {\n      "}
              <span className="syn-prop">{'"severity_threshold"'}</span>
              {": {\n        "}
              <span className="syn-prop">{'"type"'}</span>
              {": "}
              <span className="syn-keyword">{'"string"'}</span>
              {",\n        "}
              <span className="syn-prop">{'"enum"'}</span>
              {": ["}
              <span className="syn-string">{'"low"'}</span>
              {", "}
              <span className="syn-string">{'"medium"'}</span>
              {", "}
              <span className="syn-string">{'"high"'}</span>
              {", "}
              <span className="syn-string">{'"critical"'}</span>
              {"],\n        "}
              <span className="syn-prop">{'"description"'}</span>
              {": "}
              <span className="syn-string">
                {'"Minimum vulnerability severity to trigger alert."'}
              </span>
              {"\n      },\n      "}
              <span className="syn-prop">{'"include_dev_deps"'}</span>
              {": {\n        "}
              <span className="syn-prop">{'"type"'}</span>
              {": ["}
              <span className="syn-keyword">{'"boolean"'}</span>
              {", "}
              <span className="syn-keyword">{'"null"'}</span>
              {"],\n        "}
              <span className="syn-prop">{'"description"'}</span>
              {": "}
              <span className="syn-string">
                {'"Include devDependencies in the scan. Null means false."'}
              </span>
              {"\n      }\n    },\n    "}
              <span className="syn-prop">{'"required"'}</span>
              {": ["}
              <span className="syn-string">{'"severity_threshold"'}</span>
              {", "}
              <span className="syn-string">{'"include_dev_deps"'}</span>
              {"],\n    "}
              <span className="syn-prop">{'"additionalProperties"'}</span>
              {": "}
              <span className="syn-keyword">{"false"}</span>
              {"\n  }\n}"}
            </code>
          </pre>
        </div>

        <p style={{ marginTop: "-0.25rem" }}>
          The wrapper differs by vendor even though the schema body does not.
          Anthropic&apos;s Messages API nests the same JSON Schema under{" "}
          <code>input_schema</code> rather than <code>parameters</code>, so a
          definition written for one provider needs that key renamed before it
          will load in the other.
        </p>
      </section>

      <section className="article-panel">
        <h2>5. Design-by-Contract (Pre &amp; Post-Condition Verification)</h2>
        <p>
          For critical autonomous operations like production builds or database
          migrations, skills use formal contract checks:
        </p>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>Pre-conditions:</strong> Prerequisites that MUST evaluate to
            true before execution begins (e.g., git branch clean, environment
            variables set).
          </li>
          <li>
            <strong>Post-conditions:</strong> Invariants guaranteed upon
            completion (e.g., zero build errors, generated artifact present in
            output directory).
          </li>
        </ul>
        <p style={{ marginTop: "1.25rem" }}>
          The value here is not the assertions themselves but the explicit
          failure branch attached to each block. An agent that knows exactly
          what to do when an assertion fails will stop; one that does not will
          improvise.
        </p>

        <div
          className="code-card"
          style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}
        >
          <CodeCardHeader
            label="Contract-Checked Skill Specification"
            lang="markdown"
            snippet={contractSnippet}
            sectionKey="contract"
          copiedSection={copiedSection}
          onCopy={handleCopy}
          />
          <pre className="code-block">
            <code>
              <span className="syn-keyword">
                {"# Skill: Production Database Migration"}
              </span>
              {"\n\n"}
              <span className="syn-keyword">{"## Preconditions"}</span>
              {"\n"}
              <span className="syn-text">
                {"Assert ALL of the following before executing any step:"}
              </span>
              {"\n- "}
              <span className="syn-func">{"`git status --porcelain`"}</span>
              {" returns empty output (clean working tree).\n- "}
              <span className="syn-prop">{"`DATABASE_URL`"}</span>
              {" is set and does NOT resolve to the production cluster.\n"}
              {
                "- A verified backup exists with a timestamp less than 60 minutes old.\n\n"
              }
              <span className="syn-attr">
                {
                  "If any precondition fails: STOP, report which assertion failed, take no further action."
                }
              </span>
              {"\n\n"}
              <span className="syn-keyword">{"## Postconditions"}</span>
              {"\n"}
              <span className="syn-text">
                {"Assert ALL of the following after the final step:"}
              </span>
              {"\n"}
              {
                "- The migrations table records exactly one newly applied revision.\n"
              }
              {"- The application boots and "}
              <span className="syn-func">{"`/healthz`"}</span>
              {" returns HTTP 200.\n"}
              {
                "- The generated down-migration replays cleanly against the staging replica.\n\n"
              }
              <span className="syn-attr">
                {
                  "If any postcondition fails: run the down-migration, then report the failed assertion."
                }
              </span>
            </code>
          </pre>
        </div>
      </section>

      <section className="article-panel">
        <h2>Format Selector Guide</h2>
        <p style={{ marginBottom: "1rem" }}>
          Choose the right skill format based on the nature of your agent task:
        </p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--surface-soft)",
                  borderBottom: "2px solid var(--border)",
                }}
              >
                <th style={{ padding: "10px", textAlign: "left" }}>Format</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Best Use Case
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Primary Advantage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px" }}>
                  <strong>YAML + SKILL.md</strong>
                </td>
                <td style={{ padding: "10px" }}>
                  Modular Agent Skill Libraries
                </td>
                <td style={{ padding: "10px" }}>
                  Tool routing + human readable documentation
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px" }}>
                  <strong>XML + Few-Shot</strong>
                </td>
                <td style={{ padding: "10px" }}>
                  Complex Prompting &amp; Formatting
                </td>
                <td style={{ padding: "10px" }}>
                  High compliance, reduces rule dilution
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px" }}>
                  <strong>ReAct Loop</strong>
                </td>
                <td style={{ padding: "10px" }}>
                  Autonomous Coding &amp; Terminal Agents
                </td>
                <td style={{ padding: "10px" }}>
                  Strict step-by-step verification safety
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px" }}>
                  <strong>JSON Schema</strong>
                </td>
                <td style={{ padding: "10px" }}>
                  Native LLM API Function Calling
                </td>
                <td style={{ padding: "10px" }}>
                  Guaranteed argument shape under strict mode
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>
                  <strong>Design-by-Contract</strong>
                </td>
                <td style={{ padding: "10px" }}>
                  Autonomous Production Operations
                </td>
                <td style={{ padding: "10px" }}>
                  Fail-fast pre-flight + guaranteed end state
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-panel">
        <h2>References</h2>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            Yao et al.,{" "}
            <a
              href="https://arxiv.org/abs/2210.03629"
              target="_blank"
              rel="noreferrer"
            >
              ReAct: Synergizing Reasoning and Acting in Language Models
            </a>{" "}
            (ICLR 2023) — the Thought/Action/Observation loop.
          </li>
          <li>
            The{" "}
            <a href="https://agentskills.io" target="_blank" rel="noreferrer">
              Agent Skills specification
            </a>{" "}
            and the{" "}
            <a
              href="https://code.claude.com/docs/en/skills"
              target="_blank"
              rel="noreferrer"
            >
              SKILL.md frontmatter reference
            </a>{" "}
            — the allowed frontmatter keys.
          </li>
          <li>
            <a
              href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use"
              target="_blank"
              rel="noreferrer"
            >
              Anthropic strict tool use
            </a>{" "}
            and{" "}
            <a
              href="https://platform.openai.com/docs/guides/structured-outputs"
              target="_blank"
              rel="noreferrer"
            >
              OpenAI structured outputs
            </a>{" "}
            — what <code>strict: true</code> actually guarantees.
          </li>
        </ul>
      </section>

      <div style={{ margin: "2rem 0" }}>
        <img
          src={skillsImg}
          alt="Structured Formats for Writing Effective AI Agent Skills"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            border: "1px solid var(--border)",
          }}
        />
      </div>

      <style>{`
        .code-card {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-strong);
          box-shadow: var(--shadow-sm);
        }

        .code-card__header {
          padding: 10px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--surface-soft);
          color: var(--text);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .code-card__actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .code-card__lang {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: lowercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--accent-glow);
          color: var(--accent);
          font-weight: 600;
        }

        .code-copy-btn {
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

        .code-copy-btn:hover {
          color: var(--accent);
          background: var(--surface-soft);
          border-color: var(--border-strong);
        }

        .code-copy-btn--copied {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.12);
          border-color: rgba(22, 163, 74, 0.3);
        }

        body[data-theme='dark'] .code-copy-btn--copied {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.18);
          border-color: rgba(74, 222, 128, 0.4);
        }

        .code-block {
          margin: 0;
          padding: 16px 20px;
          background: #0f172a;
          overflow-x: auto;
        }

        body[data-theme='dark'] .code-block {
          background: #171b26;
        }

        .code-block code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.92rem;
          line-height: 1.7;
          color: #e2e8f0;
          background: none;
          padding: 0;
          border: none;
          display: block;
        }

        .xml-code-content {
          color: #cbd5e1;
          display: inline-block;
        }

        /* Syntax Highlighting Colors */
        .syn-comment { color: #8b949e; font-style: italic; }
        .syn-keyword { color: #ff7b72; font-weight: 600; }
        .syn-string { color: #a5d6ff; }
        .syn-func { color: #d2a8ff; font-weight: 600; }
        .syn-tag { color: #7ee787; font-weight: 600; }
        .syn-attr { color: #79c0ff; }
        .syn-prop { color: #ffa657; font-weight: 600; }
        .syn-number { color: #79c0ff; font-weight: 600; }
        .syn-text { color: #e2e8f0; }

        .syn-badge-thought { color: #f59e0b; background: rgba(245, 158, 11, 0.18); padding: 1px 6px; border-radius: 4px; font-weight: 700; }
        .syn-badge-action { color: #38bdf8; background: rgba(56, 189, 248, 0.18); padding: 1px 6px; border-radius: 4px; font-weight: 700; }
        .syn-badge-obs { color: #c4b5fd; background: rgba(196, 181, 253, 0.18); padding: 1px 6px; border-radius: 4px; font-weight: 700; }
        .syn-badge-verify { color: #4ade80; background: rgba(74, 222, 128, 0.18); padding: 1px 6px; border-radius: 4px; font-weight: 700; }
      `}</style>
    </>
  );
}
