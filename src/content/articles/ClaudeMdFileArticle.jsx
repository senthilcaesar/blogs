import { CodeCard } from '../../components/CodeCard';

const exampleSnippet = `# Project

This is a Next.js 15 app using the App Router, Tailwind, and Drizzle ORM.

# Commands
- Dev server: \`pnpm dev\`
- Run tests: \`pnpm test\`
- Lint: \`pnpm lint\`

# Code Style
- Use 2-space indentation
- Prefer named exports
- All API routes go in app/api/
- Use server actions instead of API routes where possible`;

const referenceSnippet = `## README.md

Please read if you need more info: @README.md`;

export function ClaudeMdFileArticle() {
  return (
    <>
      <p className="article-lead">
        One of the most useful features in Claude Code is the <code>CLAUDE.md</code> file. It gives Claude Code persistent memory about your project.
      </p>

      <section className="article-panel">
        <h2>The Problem It Solves</h2>
        <p>
          When you open Claude Code without a <code>CLAUDE.md</code> file, it starts fresh every time. It has to re-explore your codebase, figure out what dependencies are needed, and understand what features are already implemented. Sometimes it makes assumptions, which makes it harder to steer Claude in the right direction.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <code>CLAUDE.md</code> solves this. It&apos;s a Markdown file you add to the root of your project, and Claude Code reads it automatically every time you start a session. Think of it as an onboarding script for your codebase. The contents of the <code>CLAUDE.md</code> file are appended to your prompt.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The key thing to understand is that <code>CLAUDE.md</code> is not enforced configuration. It&apos;s guidance. Every line competes with every other line for Claude&apos;s attention. The longer the file gets, the more it competes with itself, and the less reliably Claude follows any single rule. So the goal isn&apos;t to write down everything. The goal is to keep the file tight. The leaner the file, the more of it Claude actually follows.
        </p>
      </section>

      <section className="article-panel">
        <h2>An Example</h2>
        <p>Here&apos;s what a typical <code>CLAUDE.md</code> file looks like:</p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={exampleSnippet} lang="markdown" title="CLAUDE.md" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          It&apos;s straightforward. Now if you ask Claude Code to create a React component, it already knows to use Tailwind for styling and to follow your code conventions.
        </p>
      </section>

      <section className="article-panel">
        <h2>CLAUDE.md is for Teams</h2>
        <p>
          You can (and should) commit your <code>CLAUDE.md</code> to version control so your team benefits from it. There&apos;s actually a hierarchy of memory files depending on who they&apos;re for:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Project-level <code>CLAUDE.md</code></strong> lives in the root directory of your project. Shared with the team.
          </li>
          <li>
            <strong>User-level <code>CLAUDE.md</code></strong> lives in your configuration folder. This one is just for you and applies across all your projects. Put your personal preferences here.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>Guidance vs. Hard Rules</h2>
        <p>
          Before you write a rule, ask whether it belongs in <code>CLAUDE.md</code> at all. Some rules are guidance, and some rules are hard lines that must never be crossed. Those are two different jobs.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Take a rule like &quot;never push to main.&quot; If you put that in <code>CLAUDE.md</code>, you&apos;re hoping Claude reads it and respects it. Most of the time it will. But &quot;most of the time&quot; isn&apos;t good enough for something that dangerous. A hard rule like that belongs in a pre-tool-use hook instead.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The difference matters. A hook is code that runs before Claude takes an action, and it can actually block the action. So even if Claude does try to push to main, the hook stops it. That&apos;s real enforcement, not a polite request. Move your hard rules to hooks and let <code>CLAUDE.md</code> handle the softer conventions.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Conventions that apply all the time, things like naming rules or where files go, belong in your <code>CLAUDE.md</code> file. Procedures and reference material tied to a particular kind of task belong in a skill.
        </p>
        <p style={{ marginTop: '1rem' }}>
          There&apos;s a third case. A rule that Claude must not be able to skip belongs in a hook, not in either of the above. That&apos;s because <code>CLAUDE.md</code> and skills are both instructions that Claude follows, while a hook is code that actually runs. If skipping the rule isn&apos;t acceptable, don&apos;t leave it up to instruction-following.
        </p>
      </section>

      <section className="article-panel">
        <h2>Writing Rules Claude Follows</h2>
        <p>
          Once you&apos;ve decided a rule belongs in <code>CLAUDE.md</code>, whether Claude actually obeys it comes down to how you phrase it. Most rules fail because they&apos;re vague. Here&apos;s how to fix that.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Be specific and checkable</h3>
        <p>
          Don&apos;t write &quot;follow best practices.&quot; Do you even know exactly what that means? If you can&apos;t check whether it was followed, neither can Claude. Compare these two:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Vague:</strong> &quot;Follow best practices for API routes.&quot;
          </li>
          <li>
            <strong>Specific:</strong> &quot;Put new API routes in <code>src/api/handlers</code>, one per file.&quot;
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The second one is explicit. You can look at the result and immediately tell if it was done right. That&apos;s the bar every rule should clear.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Name the replacement, don&apos;t just ban something</h3>
        <p>
          When you tell Claude not to do something, say what to do instead. Otherwise you&apos;ve left the door open.
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Leaves it open:</strong> &quot;Don&apos;t use default exports.&quot; Okay, but then what?
          </li>
          <li>
            <strong>Closes it:</strong> &quot;Use named exports, not default exports.&quot;
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The second version names the replacement, so there&apos;s nothing left to misinterpret.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Keep the file under revision</h3>
        <p>
          Your <code>CLAUDE.md</code> file is never finished. Treat it like living code that keeps getting edited.
        </p>
        <p style={{ marginTop: '1rem' }}>
          When Claude does the wrong thing, don&apos;t just sigh and fix it by hand. Treat it as a bug report against your <code>CLAUDE.md</code> file. You can even tell Claude directly: &quot;add that to the <code>CLAUDE.md</code> file,&quot; and it&apos;ll write the rule for you. That way the file gets better every time something goes wrong.
        </p>
      </section>

      <section className="article-panel">
        <h2>Tips</h2>
        <p>
          <strong>Save corrections to memory.</strong> If you find yourself correcting Claude repeatedly - like telling it to always use server actions instead of API routes - explicitly ask Claude to save that rule to memory. Next time you open the project, it&apos;ll know.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Reference project docs.</strong> If you have documentation in your project that you want Claude to reference, use the <code>@</code> symbol with the file path:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={referenceSnippet} lang="markdown" title="CLAUDE.md" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          <strong>Start without one.</strong> We recommend starting a project without a <code>CLAUDE.md</code> file so you can see where you constantly have to course-correct the model. This keeps your <code>CLAUDE.md</code> compact and focused on only the necessary information. When you&apos;re ready, run <code>/init</code> to have Claude generate one for you.
        </p>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        The difference between a frustrating Claude Code session and a productive one often comes down to context - and the <code>CLAUDE.md</code> file is how you provide that context. Start with your stack, your preferences, and your commands, then build from there as you go.
      </p>
    </>
  );
}
