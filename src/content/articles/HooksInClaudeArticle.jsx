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
          These are just a few of the events you can hook into - Claude Code supports many more. See the hooks reference for the full list.
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
          <code>PreToolUse</code> hooks can block tool calls before they execute. Your hook receives the tool name and input as JSON on stdin. The exit code determines the behavior:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Exit code 0</strong> - proceed normally.
          </li>
          <li>
            <strong>Exit code 2</strong> - block the action. The stderr message gets fed back to Claude as feedback so it knows why it was blocked and can adjust.
          </li>
          <li>
            <strong>Any other exit code</strong> - a non-blocking error that gets shown to you but doesn&apos;t stop anything.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          This is how you enforce hard rules. Block writes to a production config directory. Block bash commands that contain <code>rm -rf</code>. Block commits to main. Whatever your team needs to be guaranteed, not suggested.
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
