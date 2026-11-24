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
