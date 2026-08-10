import { useState } from "react";
import { Check, Copy } from "lucide-react";

const caseSnippet = `{
  "id": "refund-002",
  "description": "Customer asks for a refund on an order that is 45 days old",
  "input": "Hi, I want my money back for order #10432.",
  "fixtures": {
    "orders": [
      { "id": "10432", "placed_days_ago": 45, "status": "delivered" }
    ],
    "policy": { "refund_window_days": 30 }
  },
  "expect": {
    "outcome": "refund_declined",
    "must_call": ["lookup_order"],
    "must_not_call": ["issue_refund"],
    "must_mention": ["30-day", "store credit"]
  },
  "tags": ["policy", "negative-path"],
  "source": "prod incident 2026-07-14"
}`;

const dimensionsSnippet = `# 01 · Tool selection — right tool, and a tool at all.
assert "lookup_order" in called
assert "issue_refund" not in called

# 02 · Tool use — the call itself was well formed, and a
#      failed call was corrected rather than repeated.
assert all(validate_args(c) for c in run.tool_calls)
assert no_identical_retry(run.tool_calls, limit=2)

# 03 · Memory & context — did the needed facts make it in,
#      and how much noise came with them?
assert context_recall(run.context, case.required_facts) >= 0.9
assert context_precision(run.context, case.required_facts) >= 0.6

# 04 · Structured output — a hard, free, deterministic check.
#      (raises on a malformed or incomplete payload)
RefundRequest.model_validate_json(run.payload)

# 05 · Sequencing & recovery — dependencies respected, and the
#      injected tool failure was adapted to, not ignored.
assert index_of("check_policy") < index_of("issue_refund")
assert run.recovered_from_error is True`;

const graderSnippet = `def grade(case, run):
    """Return a list of (criterion, passed) pairs. No partial credit."""
    checks = []

    # 1. Outcome — the only thing the customer actually experiences.
    checks.append(("outcome", run.final_state == case.expect["outcome"]))

    # 2. Trajectory — did it look before it leapt?
    called = [c.name for c in run.tool_calls]
    checks.append((
        "required_tools",
        all(t in called for t in case.expect["must_call"]),
    ))
    checks.append((
        "forbidden_tools",
        not any(t in called for t in case.expect["must_not_call"]),
    ))

    # 3. Efficiency — a correct answer after 40 tool calls is a bug.
    checks.append(("under_budget", len(run.tool_calls) <= 8))

    return checks`;

const judgeSnippet = `You are grading one criterion of a customer-support agent's reply.

<criterion>
The reply states that the order is outside the refund window and
offers store credit as an alternative.
</criterion>

<transcript>
{{transcript}}
</transcript>

Decide whether the criterion is met. Judge only the criterion above —
ignore tone, length, formatting, and any other quality.

Answer in this exact form:

reasoning: <one or two sentences citing the specific text you relied on>
verdict: PASS or FAIL

If the transcript does not contain enough evidence, answer FAIL.`;

const runnerSnippet = `# Run the suite five times so you can see the noise, not just the number.
$ evals run suites/support.yaml --repeat 5

  24 cases × 5 runs = 120 rollouts

  refund-002   ●●●●●   5/5   outcome ✓  tools ✓  budget ✓
  refund-007   ●●●○●   4/5   budget ✗ on run 4 (11 tool calls)
  escalate-001 ○○●○○   1/5   outcome ✗ (closed ticket instead of escalating)
  … 21 more

  pass^5 ......... 58%   (14/24 cases passed all 5 attempts)
  pass@5 ......... 91%   (22/24 cases passed at least once)
  mean tool calls   6.2
  mean cost/case    $0.031`;

const ciSnippet = `name: agent-evals
on: [pull_request]

jobs:
  evals:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: evals run suites/regression.yaml --repeat 3 --json out.json
      - run: evals compare out.json --baseline main --fail-under-pass-hat 0.90`;

// ── Rendering ────────────────────────────────────────────────────────────────

function withInlineCode(text, keyPrefix) {
  return text.split(/(`[^`]*`)/g).map((part, i) =>
    part.length > 1 && part.startsWith("`") && part.endsWith("`") ? (
      <span key={`${keyPrefix}-${i}`} className="ev-inline">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function highlightPythonLine(line, lineIdx) {
  if (/^\s*#/.test(line)) {
    return <span className="ev-muted">{line}</span>;
  }

  const tokenRegex = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#.*$)|\b(def|return|assert|in|not|for|if|else|elif|and|or|is|import|from|as|class|pass|raise|with)\b|\b(True|False|None)\b|\b([a-zA-Z_]\w*)(?=\()|\b(\d+(?:\.\d+)?)\b/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(withInlineCode(line.slice(lastIndex, match.index), `${lineIdx}-${lastIndex}`));
    }

    const [fullMatch, str, comment, keyword, boolVal, fnName, numVal] = match;

    if (str) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-string">{str}</span>);
    } else if (comment) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-muted">{comment}</span>);
    } else if (keyword) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-keyword">{keyword}</span>);
    } else if (boolVal) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-bool">{boolVal}</span>);
    } else if (fnName) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-fn">{fnName}</span>);
    } else if (numVal) {
      elements.push(<span key={`${lineIdx}-${match.index}`} className="ev-num">{numVal}</span>);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    elements.push(withInlineCode(line.slice(lastIndex), `${lineIdx}-${lastIndex}`));
  }

  return elements.length > 0 ? elements : line;
}

function highlight(source, lang) {
  const lines = source.split("\n");
  const nodes = [];

  lines.forEach((line, i) => {
    let content;

    if (lang === "python") {
      content = highlightPythonLine(line, i);
    } else if (lang === "json" && /^\s*"[^"]+"\s*:/.test(line)) {
      const colon = line.indexOf(":");
      content = (
        <>
          <span className="ev-key">{line.slice(0, colon)}</span>
          {line.slice(colon)}
        </>
      );
    } else if (lang === "prompt" && /^\s*<\/?[a-z_]+>\s*$/.test(line)) {
      content = <span className="ev-key">{line}</span>;
    } else if (lang === "yaml" && /^\s*(- )?[a-z-]+:/.test(line)) {
      const colon = line.indexOf(":");
      content = (
        <>
          <span className="ev-key">{line.slice(0, colon)}</span>
          {line.slice(colon)}
        </>
      );
    } else if (lang === "bash" && line.startsWith("#")) {
      content = <span className="ev-muted">{line}</span>;
    } else if (lang === "bash" && line.startsWith("$")) {
      content = <span className="ev-head">{line}</span>;
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
    <div className="ev-card">
      <div className="ev-card__header">
        <span>{label}</span>
        <div className="ev-card__actions">
          <span className="ev-card__lang">{lang}</span>
          <button
            type="button"
            className={`ev-copy ${isCopied ? "ev-copy--done" : ""}`}
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
      <pre className="ev-block">
        <code>{highlight(snippet, lang)}</code>
      </pre>
    </div>
  );
}

export function AgentEvaluationsArticle() {
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
        The biggest problem with agents is that we do not know how well they are
        performing. You ship one, it demos well, and then the honest questions
        start: <em>is this actually working for my use case?</em> Where is it
        going wrong? Is it getting better or worse than last week? Without a way
        to answer those, every change you make is a guess. What you need is a{" "}
        <strong>feedback loop</strong> — a way to continuously observe outcomes,
        turn them into evidence, and feed that evidence back into the next
        version. An <strong>evaluation</strong> is the machinery that makes that
        loop possible: it turns &quot;it seemed fine when I tried it&quot; into
        a number you can watch move.
      </p>

      <section className="article-panel">
        <h2>Deterministic software vs. probabilistic agents</h2>
        <p>
          Traditional software is deterministic. The same input always produces
          the same output, which is exactly why unit tests and integration tests
          work so well — you get a clear pass-or-fail verdict against
          predictable behaviour. Assert the value, get a green tick, move on.
        </p>
        <p style={{ marginTop: "1rem" }}>
          AI agents are <strong>probabilistic and autonomous</strong>. They
          plan, adapt, call tools, read the results, and can make{" "}
          <em>different but equally valid</em> decisions on each run. Give the
          same prompt twice and the two runs may take completely different paths
          to get to the answer — or fail to get there at all. That single
          property dismantles most of what you rely on when testing ordinary
          code.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Traditional software</th>
                <th>AI agent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Same input twice</strong>
                </td>
                <td>Same output, always</td>
                <td>Two different valid paths — or one success, one failure</td>
              </tr>
              <tr>
                <td>
                  <strong>Correctness</strong>
                </td>
                <td>Equals an expected value</td>
                <td>Has a set of expected properties</td>
              </tr>
              <tr>
                <td>
                  <strong>Control flow</strong>
                </td>
                <td>You wrote it</td>
                <td>The agent decides it at runtime</td>
              </tr>
              <tr>
                <td>
                  <strong>A single run tells you</strong>
                </td>
                <td>Pass or fail</td>
                <td>One sample from a distribution — nearly nothing</td>
              </tr>
              <tr>
                <td>
                  <strong>Verdict</strong>
                </td>
                <td>Binary, immediate</td>
                <td>A rate, measured over repeats</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          Three more properties compound the problem, and each one costs you a
          testing technique you were relying on.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>What changes</th>
                <th>Why the old approach stops working</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Multiple steps</strong>
                </td>
                <td>
                  The agent chooses tools, reads results, and decides again.
                  Right answer via the wrong route is a latent bug — it means
                  the reasoning was wrong and got lucky.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Side effects</strong>
                </td>
                <td>
                  It sends emails, writes rows, spends money. Some failures do
                  not show up in the output at all; they show up in the
                  environment.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Compounding error</strong>
                </td>
                <td>
                  95% per-step reliability over 20 steps is 36% end-to-end.
                  Step-level accuracy that sounds excellent produces a task
                  success rate that is not.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>The compounding-error number is the whole argument</h3>
          <p>
            0.95<sup>20</sup> ≈ 0.36. This is why you cannot evaluate an agent
            by evaluating its prompt. The failure mode you are hunting is not a
            bad sentence — it is a chain that survives nineteen steps and dies
            on the twentieth. Only an end-to-end task-level eval can see it.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            That multiplication assumes steps fail independently and that a
            failure is fatal, which is the pessimistic case. A well-built agent
            checks its own work and retries, so real end-to-end rates land above
            the naive product — that recovery ability is precisely what
            dimension 05 measures. Read 36% as the floor you are engineering
            away from, not as a prediction.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>So where does an agent actually fail?</h2>
        <p>
          &quot;The agent failed&quot; is not a finding you can act on. Before
          you can build a feedback loop, you need to know what the loop is
          supposed to detect. In practice, agent failures cluster into five
          recurring shapes — and each one has a question attached that you can
          write a grader for.
        </p>

        <div className="ev-dims">
          <div className="ev-dims__item">
            <span className="ev-dims__num">01</span>
            <h3>Tool selection</h3>
            <p className="ev-dims__q">Is the agent picking the right tool?</p>
            <p>
              With a dozen tools available, the agent reaches for a search when
              it should have queried the database, or answers from memory when
              it should have looked something up. The output can still sound
              confident — and be wrong for a reason that never appears in the
              final message.
            </p>
            <p className="ev-dims__grade">
              <strong>Grade it:</strong> required and forbidden tool calls per
              case; rate of &quot;answered without calling any tool&quot; on
              cases that need one.
            </p>
          </div>

          <div className="ev-dims__item">
            <span className="ev-dims__num">02</span>
            <h3>Tool use</h3>
            <p className="ev-dims__q">
              Can the agent use that tool <em>effectively</em>?
            </p>
            <p>
              Picking correctly and calling correctly are different skills. The
              right tool with a malformed filter, a missing required argument, a
              hallucinated ID, or an over-broad query returns garbage — and the
              agent frequently treats that garbage as an answer instead of a
              signal to retry.
            </p>
            <p className="ev-dims__grade">
              <strong>Grade it:</strong> argument-schema validation, call error
              rate, and whether a failed call was followed by a sensible
              correction rather than a repeat.
            </p>
          </div>

          <div className="ev-dims__item">
            <span className="ev-dims__num">03</span>
            <h3>Memory &amp; context</h3>
            <p className="ev-dims__q">
              Does the agent remember what really matters?
            </p>
            <p>
              Long runs lose things. A constraint stated in turn two is gone by
              turn nine; a retrieval step pulls back plausible-but-irrelevant
              documents and buries the one that mattered. This is the failure
              mode users describe as &quot;it forgot what I told it.&quot;
            </p>
            <p className="ev-dims__grade">
              <strong>Grade it:</strong> context precision and recall — see
              below.
            </p>
          </div>

          <div className="ev-dims__item">
            <span className="ev-dims__num">04</span>
            <h3>Structured output</h3>
            <p className="ev-dims__q">
              Did it produce a valid, correctly-populated request?
            </p>
            <p>
              Agents that talk to real systems must emit real payloads: valid
              JSON, every required field present, enums drawn from the allowed
              set, types that match. A near-miss here is a hard failure
              downstream, and it is the cheapest of all failures to catch.
            </p>
            <p className="ev-dims__grade">
              <strong>Grade it:</strong> schema validation on every emitted
              payload — free, deterministic, no judge required.
            </p>
          </div>

          <div className="ev-dims__item">
            <span className="ev-dims__num">05</span>
            <h3>Sequencing &amp; recovery</h3>
            <p className="ev-dims__q">
              Right order — and does it adapt when something fails?
            </p>
            <p>
              Some steps have real dependencies: check the policy before issuing
              the refund, read the file before editing it. And when a tool
              returns an error or an empty result, does the agent adapt, or does
              it retry the identical call five times and give up — or worse,
              proceed as if the call had succeeded?
            </p>
            <p className="ev-dims__grade">
              <strong>Grade it:</strong> ordering constraints on
              dependency-bearing pairs, plus fault-injection cases where a tool
              is rigged to fail.
            </p>
          </div>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Context precision and recall, concretely</h3>
          <p>
            Both borrow from information retrieval, and the distinction is worth
            keeping straight because they fail for different reasons and cost
            you different things.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Context recall</strong> — of the information the agent
            genuinely needed, how much made it into the context? Low recall
            means the task was <em>impossible</em>: the answer was never in the
            room. Fix retrieval, chunking, or memory.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Context precision</strong> — of what was pulled in, how much
            was actually relevant? Low precision means the task was possible but
            noisy. It costs tokens, it costs latency, and it distracts the model
            into citing something that merely looked related.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Recall is the one that makes runs fail outright, so measure it
            first. Precision is the one that quietly degrades quality as your
            corpus grows.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Check your framework&apos;s exact definitions before comparing
            numbers with anyone, because they differ. The plain versions above
            are set-based; some implementations — RAGAS&apos;s context precision
            among them — are rank-aware, rewarding a retriever that puts the
            relevant chunks near the top rather than merely including them. Same
            name, different number.
          </p>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          Written as assertions on a run, these five turn into checks you can
          actually execute:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "The five dimensions as executable checks",
            lang: "python",
            snippet: dimensionsSnippet,
            sectionKey: "dimensions",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Notice how few of these need a model to judge them. Four of the five
          are ordinary code reading a structured trace. That is the general
          lesson: most of what goes wrong with an agent is visible in the{" "}
          <em>trajectory</em>, and the trajectory is data.
        </p>
      </section>

      <section className="article-panel">
        <h2>The five pieces of vocabulary</h2>
        <p>
          Nearly every eval framework — homegrown or off-the-shelf — is these
          five nouns wearing different names. Learn them once and every tool
          reads the same.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>What it is</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Case</strong>{" "}
                  <span className="ev-alias">task, sample</span>
                </td>
                <td>
                  One scenario: an input, the world it runs against, and what
                  success means for it. The atom of an eval.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Dataset</strong>{" "}
                  <span className="ev-alias">suite, eval set</span>
                </td>
                <td>
                  A versioned collection of cases. Versioned matters — a score
                  is only comparable to another score on the same set.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Run</strong>{" "}
                  <span className="ev-alias">rollout, trajectory</span>
                </td>
                <td>
                  One execution of one case: every message, every tool call and
                  result, the final answer, and the end state of the
                  environment.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Grader</strong>{" "}
                  <span className="ev-alias">scorer, judge</span>
                </td>
                <td>
                  The function that turns a run into a score. Code, a model, a
                  human, or a mix.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Metric</strong>
                </td>
                <td>
                  The aggregate over all cases and repeats — pass rate, mean
                  cost, p95 latency. What you actually put on a dashboard.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          The loop is: <strong>dataset → run → grader → metric</strong>. Change
          a prompt, a model, or a tool; rerun; compare. Everything else in this
          article is detail about how to do each arrow honestly.
        </p>
      </section>

      <section className="article-panel">
        <h2>The three things you are allowed to measure</h2>
        <p>
          Teams argue about eval design far longer than they need to because
          they have not separated these. They are independent, they fail
          independently, and a mature suite grades all three.
        </p>

        <div className="ev-triple">
          <div className="ev-triple__item">
            <span className="ev-triple__tag">1 · Outcome</span>
            <p>
              Did the world end up the way it should? The refund was issued, the
              ticket was routed to tier 2, the file compiles, the row exists.
            </p>
            <p className="ev-triple__why">
              The only one that maps directly to user value. Start here. If you
              build one grader, build this one.
            </p>
          </div>
          <div className="ev-triple__item">
            <span className="ev-triple__tag">2 · Trajectory</span>
            <p>
              Did it get there sensibly? Called <code>lookup_order</code> before
              deciding. Never called <code>issue_refund</code> on an
              out-of-policy order. Did not invent an order ID.
            </p>
            <p className="ev-triple__why">
              Catches right-for-the-wrong-reason, which is the failure that
              generalises worst to inputs you did not test.
            </p>
          </div>
          <div className="ev-triple__item">
            <span className="ev-triple__tag">3 · Cost</span>
            <p>
              What did it take? Tokens, dollars, wall-clock, number of tool
              calls, number of retries.
            </p>
            <p className="ev-triple__why">
              An agent that is correct at forty tool calls and thirty seconds is
              not shippable. Quality regressions hide inside cost wins and vice
              versa.
            </p>
          </div>
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Grade trajectory with a light touch</h3>
          <p>
            Asserting the exact sequence of tool calls turns your eval into a
            change-detector: every legitimate improvement fails it. Assert
            <strong> required</strong> calls and <strong>forbidden</strong>{" "}
            calls, not the full ordering. &quot;Must have read the order before
            refunding it&quot; is durable. &quot;Must call exactly these six
            tools in this order&quot; will be wrong by Thursday.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Anatomy of one case</h2>
        <p>
          Cases are data, not code — put them in JSON or YAML so non-engineers
          can add them and so you can diff them in review. Everything the run
          needs, and everything the grader needs, lives in the same object.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "One eval case",
            lang: "json",
            snippet: caseSnippet,
            sectionKey: "case",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Four fields do more work than the rest:
        </p>
        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>
              <code>fixtures</code>
            </strong>{" "}
            — the world the agent runs against, pinned. A case that reads live
            data grades a different scenario every week, and its score means
            nothing across time.
          </li>
          <li>
            <strong>
              <code>expect</code>
            </strong>{" "}
            — success as a set of independent, checkable properties. Not a gold
            answer string. One honest caveat about this example:{" "}
            <code>must_mention</code> is a keyword check on prose, which is the
            brittle pattern the grader table warns about two sections down. It
            is fine as a starting point — it costs nothing and catches gross
            regressions — but it fails an agent that says &quot;within a month
            of purchase&quot; instead of &quot;30-day&quot;. Once a criterion
            starts producing that kind of false alarm, promote it to a judged
            criterion.
          </li>
          <li>
            <strong>
              <code>tags</code>
            </strong>{" "}
            — how you slice the results. An overall 82% is not actionable; 96%
            on happy paths and 41% on policy edge cases is a work item.
          </li>
          <li>
            <strong>
              <code>source</code>
            </strong>{" "}
            — where the case came from. Cases traced to a real incident survive
            the cleanup that eventually comes for invented ones.
          </li>
        </ul>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Where the first twenty cases come from</h3>
          <p>
            Not from brainstorming. Open the last month of real transcripts,
            find the ones that went wrong, and write each one up as a case. A
            suite built from observed failures is small, unglamorous, and
            predicts production behaviour. A suite built from imagination tests
            the situations you already knew how to handle.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>Four ways to grade, and when each is right</h2>
        <p>
          The instinct is to reach for a model judge immediately. Resist it —
          the cheapest grader that can decide the question is always the right
          one, because it is also the one that never drifts.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Grader</th>
                <th>Good for</th>
                <th>Cost</th>
                <th>Watch out for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Exact / structural</strong>
                </td>
                <td>
                  Final state, JSON shape, IDs, numbers, &quot;did the row get
                  written&quot;
                </td>
                <td>Free</td>
                <td>Brittle if you assert prose</td>
              </tr>
              <tr>
                <td>
                  <strong>Rule-based</strong>
                </td>
                <td>
                  Tool-call assertions, budgets, forbidden strings, schema
                  validation, does-it-compile
                </td>
                <td>Free</td>
                <td>Only checks what you thought to write</td>
              </tr>
              <tr>
                <td>
                  <strong>LLM-as-judge</strong>
                </td>
                <td>
                  Anything expressed in prose: was the policy explained, was the
                  tone right, is the summary faithful
                </td>
                <td>Cents per case</td>
                <td>
                  Needs its own calibration — an ungrounded judge is a random
                  number generator with good manners
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Human</strong>
                </td>
                <td>
                  The initial label set, anything ambiguous, periodic audit of
                  the judge
                </td>
                <td>Expensive</td>
                <td>
                  Doesn&apos;t scale — spend it on calibration, not on volume
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          In practice one case is graded by several of these at once. Here is
          the shape — outcome, trajectory, and cost checked separately, each
          returning a plain boolean:
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "A composite grader",
            lang: "python",
            snippet: graderSnippet,
            sectionKey: "grader",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          Note what it does not do: award partial credit. A run that scores 0.7
          tells you nothing you can act on. Four named booleans tell you exactly
          which property broke, and they aggregate into a per-criterion pass
          rate that points at a fix.
        </p>
      </section>

      <section className="article-panel">
        <h2>LLM-as-judge, done so you can trust it</h2>
        <p>
          A model judge is the only practical way to grade prose at volume, and
          it is where most eval suites quietly stop being meaningful. Four rules
          carry most of the reliability.
        </p>

        <ul className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>One criterion per call.</strong> Asking a judge to rate
            &quot;overall quality&quot; from 1–10 produces a number that means
            something different each time. Ask a yes/no question about one
            property and call it as many times as you have properties.
          </li>
          <li>
            <strong>Binary, not a scale.</strong> Nobody can defend the
            difference between a 6 and a 7, including the judge. Pass/fail
            aggregates into a rate that is directly interpretable.
          </li>
          <li>
            <strong>Reasoning before verdict.</strong> Make it cite the specific
            text it relied on, and put the citation <em>before</em> the answer.
            You will read these when you disagree with a score, and they are
            what makes disagreement resolvable.
          </li>
          <li>
            <strong>Fail on missing evidence.</strong> Absent an explicit
            default, judges are agreeable. State the tiebreak in the prompt.
          </li>
        </ul>

        <div style={{ marginTop: "1.5rem" }}>
          {card({
            label: "A judge prompt for a single criterion",
            lang: "prompt",
            snippet: judgeSnippet,
            sectionKey: "judge",
          })}
        </div>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>The judge is a model, so evaluate the judge</h3>
          <p>
            Hand-label fifty runs yourself, then run the judge over the same
            fifty and measure agreement. Below roughly 80–85% you are not
            measuring your agent, you are measuring your judge. Fix the rubric —
            the disagreements almost always point at a criterion that is
            ambiguously worded, not at a model that is too weak. Re-check
            agreement whenever you change the judge&apos;s model or prompt,
            because that is a silent change to every historical score.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            One caveat on that 80–85%: raw agreement flatters you when the
            labels are lopsided. If 90% of your runs pass, a judge that says
            PASS unconditionally scores 90% agreement and knows nothing. Look at
            agreement <em>on the failures</em> separately, or use Cohen&apos;s
            κ, which subtracts the agreement you would get by chance. A judge
            that is 95% accurate on passes and 40% accurate on failures is the
            single most common way a suite ends up quietly reporting good news.
          </p>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          Two biases worth knowing by name, because they are easy to neutralise
          once you can see them. <strong>Position bias</strong>: when comparing
          two outputs side by side, judges favour one slot — so run each
          comparison in both orders and keep only the pairs that agree.{" "}
          <strong>Self-preference</strong>: a judge tends to rate text from its
          own model family more highly, which quietly rigs any comparison
          between your current model and a candidate replacement.
        </p>
      </section>

      <section className="article-panel">
        <h2>Metrics: run it more than once</h2>
        <p>
          Because agents are stochastic, a single pass over your suite gives you
          one sample from a distribution. Run every case <code>k</code> times —
          three to five is usually enough — and the numbers start meaning
          something.
        </p>

        <div style={{ marginTop: "1.25rem" }}>
          {card({
            label: "What a suite run looks like",
            lang: "bash",
            snippet: runnerSnippet,
            sectionKey: "runner",
          })}
        </div>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Definition</th>
                <th>What it tells you</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>pass@k</strong>
                </td>
                <td>Case passes on at least one of k attempts</td>
                <td>
                  Ceiling. Honest only when a human or a check picks the good
                  attempt — otherwise it flatters you.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>pass^k</strong>
                </td>
                <td>Case passes on all k attempts</td>
                <td>
                  Reliability. This is the number to ship on for an unattended
                  agent, and it is always the ugly one. Popularised by the
                  τ-bench tool-agent benchmark.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Per-criterion rate</strong>
                </td>
                <td>Pass rate for one named check across the suite</td>
                <td>
                  Where the work is. &quot;Forbidden-tool 99%, budget 71%&quot;
                  is a plan.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Cost / latency per case</strong>
                </td>
                <td>Mean and p95</td>
                <td>
                  Whether a quality win was bought with a budget you cannot
                  actually pay.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          The gap between pass@k and pass^k is itself diagnostic. In the run
          above, 91% versus 58% says the agent usually <em>knows how</em> to do
          these tasks and is failing on consistency — a scaffolding, retry, or
          verification problem. A low pass@k would have meant something
          different and more expensive: it does not know how.
        </p>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>Do not over-read small movements</h3>
          <p>
            Know what one flip is worth in whatever metric you are quoting. On
            20 cases run 3 times, a single rollout changing verdict moves the
            run-level pass rate by 1/60 — about 1.7 points. But one whole{" "}
            <em>case</em> flipping moves pass^3 by 1/20, a full 5 points. The
            same underlying wobble looks three times bigger in one metric than
            the other, which is why &quot;we went up 4 points&quot; is
            meaningless until you say up in what.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            So treat any change smaller than your suite&apos;s run-to-run noise
            as no change at all. The cheap way to learn that noise: run the
            exact same configuration twice and look at the spread. Everything
            inside that band is weather. On suites this small, that band is
            usually wider than the improvement you are hoping to see — which is
            an argument for more cases before it is an argument for more tuning.
          </p>
        </div>
      </section>

      <section className="article-panel">
        <h2>The five mistakes that cost the most time</h2>

        <div className="ev-compare">
          <div className="ev-compare__item ev-compare__item--dont">
            <span className="ev-compare__tag">Only happy paths</span>
            <p>
              Every case is a request the agent should fulfil. Nothing tests
              refusal, missing data, a failing tool, or a hostile input.
            </p>
            <p className="ev-compare__why">
              Your suite scores 95% and production is on fire. Roughly a third
              of cases should be ones where the correct behaviour is to decline,
              ask, or escalate.
            </p>
          </div>
          <div className="ev-compare__item ev-compare__item--dont">
            <span className="ev-compare__tag">Tuning against the suite</span>
            <p>
              Prompt is edited until the eval passes, over and over, using the
              same twenty cases.
            </p>
            <p className="ev-compare__why">
              You have trained on the test set. Hold out cases you never look at
              during iteration, and rotate fresh ones in from production.
            </p>
          </div>
          <div className="ev-compare__item ev-compare__item--dont">
            <span className="ev-compare__tag">Leaky fixtures</span>
            <p>
              Cases hit the live database, today&apos;s date, or a real API.
            </p>
            <p className="ev-compare__why">
              The scenario changes underneath you, so a score drop could be your
              agent or could be Tuesday. Pin the world; freeze the clock.
            </p>
          </div>
          <div className="ev-compare__item ev-compare__item--dont">
            <span className="ev-compare__tag">
              Grading only the last message
            </span>
            <p>
              The final reply is checked; the eleven tool calls that produced it
              are not.
            </p>
            <p className="ev-compare__why">
              Deleted files, duplicate charges, and invented data all pass this
              grader. Assert on the environment, not just the transcript.
            </p>
          </div>
          <div className="ev-compare__item ev-compare__item--dont">
            <span className="ev-compare__tag">An eval nobody runs</span>
            <p>
              A beautiful suite that takes forty minutes and runs manually,
              sometimes.
            </p>
            <p className="ev-compare__why">
              A twenty-case suite in CI on every PR beats a two-hundred-case
              suite run quarterly. Optimise for how often it actually gates a
              change.
            </p>
          </div>
        </div>
      </section>

      <section className="article-panel">
        <h2>Closing the feedback loop</h2>
        <p>
          Everything so far builds one instrument. The loop is what makes it
          useful: <strong>run → grade → diagnose → change → run again</strong>,
          on a cadence fast enough that you are still holding the context of
          what you changed. A suite you run twice a year is an audit. A suite
          that runs on every change is a feedback loop — and only the second one
          improves anything.
        </p>
        <p style={{ marginTop: "1rem" }}>
          The same dataset does different jobs at different points in that loop,
          and each point wants a different size and speed.
        </p>

        <div className="table-wrap" style={{ marginTop: "1.5rem" }}>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Size &amp; speed</th>
                <th>Question it answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Dev loop</strong>
                </td>
                <td>5–20 cases, seconds</td>
                <td>Did the change I just made help?</td>
              </tr>
              <tr>
                <td>
                  <strong>CI gate</strong>
                </td>
                <td>50–200 cases, minutes, k≥3</td>
                <td>Is this PR safe to merge?</td>
              </tr>
              <tr>
                <td>
                  <strong>Release</strong>
                </td>
                <td>Full suite plus held-out set</td>
                <td>Is this model or major prompt change an upgrade?</td>
              </tr>
              <tr>
                <td>
                  <strong>Production</strong>
                </td>
                <td>Sampled live traffic, graded async</td>
                <td>
                  Is real behaviour drifting, and what new cases should the
                  suite have?
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          {card({
            label: "A regression gate on every pull request",
            lang: "yaml",
            snippet: ciSnippet,
            sectionKey: "ci",
          })}
        </div>

        <p style={{ marginTop: "1.25rem" }}>
          The last stage is the one most teams skip, and it is the one that
          makes the loop continuous rather than a one-off. Grading sampled
          production traffic with the same graders does two things: it catches
          drift that your frozen fixtures cannot, and every failure it surfaces
          is a new case with a real <code>source</code> field. That flow —
          production failure becomes eval case becomes regression gate — is what
          stops a suite from slowly going stale, and it is the honest answer to
          &quot;can I continuously get feedback on how to improve this
          agent?&quot;
        </p>
      </section>

      <section className="article-panel">
        <h2>Start here</h2>
        <p>
          A first useful eval suite is an afternoon of work, not a quarter. In
          order:
        </p>
        <ol className="bullet-list" style={{ marginTop: "0.75rem" }}>
          <li>
            <strong>Write down what the agent is for</strong> in one sentence.
            Everything you grade should trace back to it.
          </li>
          <li>
            <strong>Collect 20 real cases</strong> from transcripts — about
            two-thirds things that went wrong, one-third representative normal
            traffic.
          </li>
          <li>
            <strong>Grade outcome only, with code.</strong> No judge yet. Get
            the harness running end to end while it is still simple to debug.
          </li>
          <li>
            <strong>Run it three times and record the spread.</strong> That is
            your noise floor and you will refer to it constantly.
          </li>
          <li>
            <strong>Add trajectory assertions</strong> for the two or three
            things that must never happen.
          </li>
          <li>
            <strong>Add a judge for one prose criterion</strong> and calibrate
            it against fifty of your own labels before trusting it.
          </li>
          <li>
            <strong>Put it in CI</strong> with a pass^k threshold, and add a
            case every time production surprises you.
          </li>
        </ol>

        <div
          className="article-panel article-panel--accent"
          style={{ marginTop: "1.5rem" }}
        >
          <h3>The one idea to keep</h3>
          <p>
            An eval is not a test that proves your agent works. It is an
            instrument that makes changes in behaviour <em>visible</em>. Its
            value is not the absolute number — that number is always partly an
            artifact of the cases you happened to write. Its value is that when
            the number moves, you know something real moved with it, and you
            know which criterion to look at.
          </p>
        </div>
      </section>

      <style>{`
        .ev-card {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-strong);
          box-shadow: var(--shadow-sm);
        }

        .ev-card__header {
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

        .ev-card__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .ev-card__lang {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: lowercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--accent-glow);
          color: var(--accent);
          font-weight: 600;
        }

        .ev-copy {
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

        .ev-copy:hover {
          color: var(--accent);
          background: var(--surface-soft);
          border-color: var(--border-strong);
        }

        .ev-copy--done {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.12);
          border-color: rgba(22, 163, 74, 0.3);
        }

        body[data-theme='dark'] .ev-copy--done {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.18);
          border-color: rgba(74, 222, 128, 0.4);
        }

        .ev-block {
          margin: 0;
          padding: 16px 20px;
          background: #0f172a;
          overflow-x: auto;
        }

        body[data-theme='dark'] .ev-block {
          background: #171b26;
        }

        .ev-block code {
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

        .ev-key { color: #ffa657; font-weight: 600; }
        .ev-head { color: #7ee787; font-weight: 600; }
        .ev-inline { color: #a5d6ff; }
        .ev-muted { color: #8b949e; }
        .ev-keyword { color: #ff7b72; font-weight: 600; }
        .ev-string { color: #a5d6ff; }
        .ev-fn { color: #d2a8ff; font-weight: 600; }
        .ev-num { color: #79c0ff; }
        .ev-bool { color: #ffa657; font-weight: 600; }

        .ev-alias {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .ev-dims {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 1.5rem;
        }

        .ev-dims__item {
          position: relative;
          padding: 20px 22px 18px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--surface-soft);
        }

        .ev-dims__num {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent);
          background: var(--accent-glow);
          padding: 3px 9px;
          border-radius: 6px;
        }

        .ev-dims__item h3 {
          margin: 0.75rem 0 0 !important;
          font-size: 1.15rem;
        }

        .ev-dims__q {
          margin: 0.35rem 0 0.85rem !important;
          font-size: 0.95rem !important;
          font-style: italic;
          color: var(--accent) !important;
        }

        .ev-dims__item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text);
        }

        .ev-dims__grade {
          margin-top: 0.85rem !important;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border);
          font-size: 0.9rem !important;
          color: var(--text-muted) !important;
        }

        .ev-triple {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-top: 1.25rem;
        }

        .ev-triple__item {
          padding: 16px 18px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface-soft);
          border-top: 3px solid var(--accent);
        }

        .ev-triple__tag {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.6rem;
        }

        .ev-triple__item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text);
        }

        .ev-triple__why {
          margin-top: 0.7rem !important;
          font-size: 0.9rem !important;
          color: var(--text-muted) !important;
        }

        .ev-compare {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 1.25rem;
        }

        .ev-compare__item {
          padding: 16px 18px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface-soft);
          border-left-width: 4px;
        }

        .ev-compare__item--dont { border-left-color: #dc2626; }

        .ev-compare__tag {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #dc2626;
          margin-bottom: 0.6rem;
        }

        .ev-compare__item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text);
        }

        .ev-compare__why {
          margin-top: 0.7rem !important;
          font-size: 0.9rem !important;
          color: var(--text-muted) !important;
        }
      `}</style>
    </>
  );
}
