import { CodeCard } from '../../components/CodeCard';

const hookInputSnippet = `{
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf build/"
  }
}`;

const blockScriptSnippet = `#!/bin/bash
# Read the request from stdin and pull out the command Claude wants to run
command=$(jq -r '.tool_input.command')

if echo "$command" | grep -q 'rm -rf'; then
  echo "rm -rf is not allowed in this project. Delete specific files instead." >&2
  exit 2   # block, and send the message above back to Claude
fi

exit 0     # anything else goes ahead`;

const blockSettingsSnippet = `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\\"$CLAUDE_PROJECT_DIR\\"/.claude/hooks/block-rm-rf.sh"
          }
        ]
      }
    ]
  }
}`;

export function HooksInClaudeArticle() {
  return (
    <>
      <p className="article-lead">
        Hooks let you run commands at specific points in Claude Code&apos;s lifecycle. The key difference between hooks and everything else is that hooks are deterministic - they always run.
      </p>

      <section className="article-panel">
        <h2>Why Use Hooks</h2>
        <p>
          You can tell Claude in your <code>CLAUDE.md</code> to run Prettier after every file edit. Most of the time it will. But sometimes it won&apos;t. A hook makes it happen every single time, no exceptions.
        </p>
        <p style={{ marginTop: '1rem' }}>Common use cases include:</p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>Auto-formatting after file edits</li>
          <li>Logging all executed commands for compliance</li>
          <li>Blocking dangerous operations like modifying production files</li>
          <li>Sending yourself notifications when Claude finishes a task</li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>How They Work</h2>
        <p>
          Hooks are configured in your <code>settings.json</code>. You pick an event, optionally set a matcher for which tools it applies to, and provide a command to run. Some of the most common events are:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong><code>PreToolUse</code></strong> - runs before a tool call
          </li>
          <li>
            <strong><code>PostToolUse</code></strong> - runs after a tool call completes
          </li>
          <li>
            <strong><code>UserPromptSubmit</code></strong> - runs when you submit a prompt, before Claude processes it
          </li>
          <li>
            <strong><code>Stop</code></strong> - runs when Claude finishes responding
          </li>
          <li>
            <strong><code>Notification</code></strong> - runs when Claude sends a notification
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          These are just a few of the events you can hook into - Claude Code supports many more. See the{' '}
          <a href="https://code.claude.com/docs/en/hooks" target="_blank" rel="noopener noreferrer">
            hooks reference
          </a>{' '}
          for the full list.
        </p>
        <p style={{ marginTop: '1rem' }}>
          You configure them by editing <code>settings.json</code> directly. The <code>/hooks</code> command inside Claude Code opens a read-only list of your configured hooks, so you can check that a new one shows up.
        </p>
      </section>

      <section className="article-panel">
        <h2>A Practical Example</h2>
        <p>
          The most common hook: auto-formatting after edits. Set a <code>PostToolUse</code> hook with a matcher of <code>&quot;Edit|Write&quot;</code> so it fires after Claude uses the Edit or Write tool. The command checks the file extension and runs the appropriate formatter: Prettier for TypeScript, gofmt for Go, whatever your project uses.
        </p>
      </section>

      <section className="article-panel">
        <h2>Blocking with PreToolUse</h2>
        <p>
          A <code>PreToolUse</code> hook is a checkpoint between Claude deciding to do something and that thing actually happening. Every time Claude reaches for a tool - running a shell command, editing a file, making a commit - your script gets to look at the request first and decide whether it goes ahead. If the answer is no, the tool never runs.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Take one concrete case. Claude is tidying up a project and decides to clear out the build folder with <code>rm -rf build/</code>, a command that deletes a folder and everything in it, with no undo. You&apos;d like that never to run without a human looking at it first. So how does your script see the command, and how does it say no?
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>The script reads the request from stdin.</strong> When Claude Code starts your script, it writes a description of the pending tool call to the script&apos;s standard input, or <em>stdin</em>, the stream a program reads its input from. Think of it as a note slid under the door. The note is JSON, and for our example it looks like this (trimmed down to the fields that matter):
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={hookInputSnippet} lang="json" title="What the hook receives" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          <code>tool_name</code> says which tool Claude wants to use, and <code>tool_input</code> holds exactly what it wants to do with it - here, the full command it&apos;s about to run.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>The script answers with its exit code.</strong> It doesn&apos;t reply in words. Instead, Claude Code looks at the exit code, the number every program hands back when it finishes, and reads it like a traffic light:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Exit code 0</strong> - green. The tool call goes ahead as normal.
          </li>
          <li>
            <strong>Exit code 2</strong> - red. The tool call is blocked and never runs.
          </li>
          <li>
            <strong>Any other exit code</strong> - Claude Code treats it as a problem with the hook itself, not a verdict. It reports the error, and the tool call goes ahead anyway.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Exit code 2 does more than stop the action. Whatever your script prints to standard error, or <em>stderr</em> (the stream programs use for error messages), is handed back to Claude as the reason it was stopped. So Claude doesn&apos;t just hit a wall. It reads &quot;rm -rf is not allowed in this project&quot;, understands why, and can change course - delete specific files instead, or ask you what to do.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The third case is the one that catches people out. Exit code 1 is what most scripts return when they fail, and it does <em>not</em> block. If your hook crashes - say, <code>jq</code> isn&apos;t installed - the dangerous command slips straight through. A hook that guards something important has to block deliberately, with exit code 2.
        </p>
        <p style={{ marginTop: '1rem' }}>Here&apos;s the whole hook for our example:</p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={blockScriptSnippet} lang="bash" title=".claude/hooks/block-rm-rf.sh" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          And the entry in <code>settings.json</code> that wires it up. The matcher <code>&quot;Bash&quot;</code> means the hook only runs before shell commands, not before every file edit:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={blockSettingsSnippet} lang="json" title=".claude/settings.json" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          In practice, the next time Claude tries <code>rm -rf build/</code>, the command never reaches your terminal. Claude gets the message instead and picks a safer route.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The same pattern enforces any hard rule: read the request, check it, exit 2 with a reason when it breaks the rule. Block writes to a production config directory. Block commits to main. Whatever your team needs to be guaranteed, not suggested.
        </p>
      </section>

      <section className="article-panel">
        <h2>Sharing Hooks with Your Team</h2>
        <p>
          Hooks configured in <code>.claude/settings.json</code> are project-level and can be checked into your repo. This means your entire team gets the same hooks automatically. Use the <code>CLAUDE_PROJECT_DIR</code> environment variable in your commands to reference scripts stored in your project, so they work regardless of Claude&apos;s current working directory.
        </p>
      </section>

      <section className="article-panel">
        <h2>Recap</h2>
        <p>
          Hooks give you deterministic control over Claude Code&apos;s behavior. Use <code>PostToolUse</code> for auto-formatting and logging. Use <code>PreToolUse</code> to block dangerous operations. Configure them in <code>settings.json</code> and view them with <code>/hooks</code>. And check them into your repo so your team gets them too.
        </p>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        If something needs to happen every time without fail, don&apos;t put it in a prompt. Put it in a hook.
      </p>
    </>
  );
}
