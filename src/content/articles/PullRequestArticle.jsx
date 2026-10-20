export function PullRequestArticle() {
  return (
    <>
      <p className="article-lead">
        PR stands for Pull Request in GitHub and software development.
      </p>

      <section className="article-panel">
        <p>
          A Pull Request is a request to review and merge changes you have made in one branch of a repository into another branch.
        </p>
      </section>

      <section className="article-panel">
        <h2>How it works</h2>
        <p>
          For example, suppose you are working on a software project:
        </p>
        <ol className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            You create a new branch called <code>feature/login</code>.
          </li>
          <li>You write code to implement the login functionality.</li>
          <li>You push your changes to GitHub.</li>
          <li>
            You create a Pull Request (PR) to request that your changes be reviewed and merged into the <code>main</code> branch.
          </li>
          <li>Your teammates review the code, suggest improvements, and approve it.</li>
          <li>
            Once approved, the changes are merged into <code>main</code>.
          </li>
        </ol>
      </section>

      <section className="article-panel">
        <h2>Why do developers use PRs?</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Code review:</strong> Teammates can examine your code and suggest improvements.
          </li>
          <li>
            <strong>Collaboration:</strong> Developers can discuss changes before they become part of the main codebase.
          </li>
          <li>
            <strong>Quality control:</strong> Automated tests and checks can run before merging.
          </li>
          <li>
            <strong>Documentation:</strong> The PR records what changed and why.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <p>
          <strong>In simple terms:</strong> A PR means, &quot;I&apos;ve made some changes to the code. Please review them, and if everything looks good, merge them into the main project.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          Note that a PR does not automatically merge the code. It is a request to review and integrate the changes.
        </p>
      </section>
    </>
  );
}
