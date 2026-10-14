function YoutubeIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="20" height="14" rx="4" fill="#ff0000" />
      <path d="M8 4l5 3-5 3z" fill="#ffffff" />
    </svg>
  );
}

const videos = [
  {
    href: 'https://youtu.be/ddDJxFnv-qs',
    title: 'CI/CD Explained in 5 Minutes (TechWorld with Nana)',
  },
  {
    href: 'https://youtu.be/R8_veQiYBjI',
    title: 'GitHub Actions Tutorial - Basic Concepts and CI/CD Pipeline with Docker (TechWorld with Nana)',
  },
  {
    href: 'https://youtu.be/0PbxpIao_EU',
    title: 'GitHub Actions Tutorial for Beginners - CI/CD Pipeline from Scratch (Thetips4you)',
  },
];

const workflowSnippet = `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run build`;

export function CiCdArticle() {
  return (
    <>
      <p className="article-lead">
        CI/CD stands for Continuous Integration and Continuous Delivery (or Deployment). It is a way of working where every code change is automatically built, tested and prepared for release, so teams can ship small updates quickly and safely instead of waiting for big, risky releases.
      </p>

      <section className="article-panel">
        <h2>The Problem CI/CD Solves</h2>
        <p>
          Imagine five developers each working on their own copy of a project for weeks. When they finally try to combine their work, the changes clash, tests break, and nobody is sure which change caused the problem. Releasing becomes a stressful, manual event that happens rarely.
        </p>
        <p style={{ marginTop: '1rem' }}>
          CI/CD fixes this by making integration and release <strong>small, frequent and automatic</strong>. Instead of merging once a month, developers merge every day, and a machine checks every change for them.
        </p>
      </section>

      <section className="article-panel">
        <h2>Continuous Integration (CI)</h2>
        <p>
          Continuous Integration means developers merge their code into a shared branch often, ideally several times a day. Every merge triggers an automated process that:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Fetches the latest code</strong> from the repository.
          </li>
          <li>
            <strong>Builds the application</strong> to make sure it still compiles or bundles.
          </li>
          <li>
            <strong>Runs automated tests</strong> to catch bugs before they reach users.
          </li>
          <li>
            <strong>Reports the result</strong> back to the team, usually as a green tick or red cross on the commit or pull request.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          If something breaks, the team finds out within minutes, while the change is still fresh in everyone&apos;s mind.
        </p>
      </section>

      <section className="article-panel">
        <h2>Continuous Delivery vs. Continuous Deployment</h2>
        <p>
          The &quot;CD&quot; half picks up where CI leaves off. Once the code has passed its checks, it is packaged and moved towards production. There are two flavours:
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>Practice</th>
                <th>What happens after tests pass</th>
                <th>Who presses &quot;release&quot;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Continuous Delivery</strong></td>
                <td>The build is always ready to release and is deployed to a staging environment</td>
                <td>A human approves the production release</td>
              </tr>
              <tr>
                <td><strong>Continuous Deployment</strong></td>
                <td>Every change that passes all checks goes straight to production</td>
                <td>Nobody; it is fully automatic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-panel">
        <h2>What a Pipeline Looks Like</h2>
        <p>
          The automated steps are arranged into a <strong>pipeline</strong>. Each stage must succeed before the next one runs:
        </p>
        <ol className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Source:</strong> a developer pushes code or opens a pull request.
          </li>
          <li>
            <strong>Build:</strong> dependencies are installed and the app is compiled or packaged, for example into a Docker image.
          </li>
          <li>
            <strong>Test:</strong> unit, integration and other automated tests run.
          </li>
          <li>
            <strong>Release:</strong> the tested artifact is stored and versioned, ready to ship.
          </li>
          <li>
            <strong>Deploy:</strong> the artifact is rolled out to staging or production.
          </li>
          <li>
            <strong>Monitor:</strong> logs and metrics confirm the new version is healthy.
          </li>
        </ol>
      </section>

      <section className="article-panel">
        <h2>A Simple Example with GitHub Actions</h2>
        <p>
          GitHub Actions lets you define a pipeline as a YAML file inside your repository at <code>.github/workflows/ci.yml</code>. This workflow runs on every push to <code>main</code> and on every pull request:
        </p>
        <pre className="code-block" style={{ marginTop: '1rem' }}>
          <code>{workflowSnippet}</code>
        </pre>
        <p style={{ marginTop: '1rem' }}>
          Each <code>run</code> step is a command you would normally type in your terminal. If any of them fails, the pipeline stops and the pull request shows a red cross.
        </p>
      </section>

      <section className="article-panel">
        <h2>Why It Matters</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Faster feedback:</strong> bugs are found minutes after they are written, not weeks later.
          </li>
          <li>
            <strong>Smaller, safer releases:</strong> shipping small changes often makes each release easier to understand and roll back.
          </li>
          <li>
            <strong>Less manual work:</strong> repetitive build and deploy steps are done by machines, consistently every time.
          </li>
          <li>
            <strong>More confidence:</strong> a green pipeline gives the whole team a shared definition of &quot;working&quot;.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Popular CI/CD tools include <strong>GitHub Actions</strong>, <strong>GitLab CI/CD</strong>, <strong>Jenkins</strong>, <strong>CircleCI</strong> and <strong>Azure Pipelines</strong>. The concepts are the same across all of them, so learning one makes the others easy to pick up.
        </p>
      </section>

      <section className="article-panel">
        <h2>Resources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: 0 }}>
          {videos.map((video) => (
            <li key={video.href}>
              <a
                href={video.href}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <YoutubeIcon />
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
