import { CodeCard } from '../../components/CodeCard';

const listToolsImg = new URL('../../../images/mcp-list-tools-request-result.png', import.meta.url).href;

const openCode = `claude`;

const installCode = `/plugin marketplace add microsoftdocs/mcp
/plugin install microsoft-docs@microsoft-docs-marketplace`;

const listToolsCode = `/microsoft-docs:microsoft-docs What tools do you provide?`;

const tools = [
  {
    name: 'microsoft_docs_search',
    what: 'Searches Microsoft Learn and returns up to 10 short excerpts, each with its title and URL. It’s the first step for concepts, limits, quotas and best practices.',
  },
  {
    name: 'microsoft_code_sample_search',
    what: 'Finds official code samples. It can filter by language.',
  },
  {
    name: 'microsoft_docs_fetch',
    what: 'Fetches a whole documentation page as Markdown, for when an excerpt is cut short or you need every step of a tutorial.',
  },
];

const qa = [
  {
    q: 'You’re building an MCP client to connect your application to an MCP server. What are the two main components you need?',
    a: 'An MCP Client class and a Client Session.',
  },
  {
    q: 'Your MCP client needs to find out what tools are available from an MCP server. What message type should it send?',
    a: 'ListToolsRequest',
  },
  {
    q: 'You’ve built an MCP server and want to test whether your tools work correctly before connecting it to a full application. What’s the easiest way to do this?',
    a: 'Use the built-in MCP Inspector with `mcp dev mcp_server.py`.',
  },
  {
    q: 'You’re building a chat app where users ask Claude about their GitHub data. Without MCP, what’s the main problem you’d face?',
    a: 'You’d have to write and maintain all the GitHub tool code yourself.',
  },
  {
    q: 'You’re deciding how to implement a new feature in your MCP server. Users should be able to click a button to trigger a “summarize document” workflow. Which MCP primitive should you use?',
    a: 'Prompts, because users control when to start the workflow.',
  },
  {
    q: 'You’re using the Python MCP SDK to create a tool that reads files. What’s the easiest way to define this tool?',
    a: 'Use the @mcp.tool() decorator on a Python function.',
  },
  {
    q: 'You want to create a resource that fetches different documents based on their ID, like docs://documents/report.pdf. What type of resource should you use?',
    a: 'A templated resource with parameters in the URI.',
  },
];

const qaCode = qa.map((item, i) => `Q${i + 1}. ${item.q}\n${item.a}`).join('\n\n');

export function MicrosoftLearnMcpClaudeCodeArticle() {
  return (
    <>
      <section className="article-panel">
        <p>Open Claude Code in your terminal window:</p>

        <div style={{ marginTop: '1rem' }}>
          <CodeCard code={openCode} lang="bash" />
        </div>

        <p style={{ marginTop: '1.25rem' }}>
          Then add the marketplace and install the plugin:
        </p>

        <div style={{ marginTop: '1rem' }}>
          <CodeCard code={installCode} lang="bash" />
        </div>

        <p style={{ marginTop: '1.25rem' }}>
          After installing, you can explore the available tools by asking Claude Code to list
          the tools exposed by the Microsoft Learn MCP server.
        </p>

        <div style={{ marginTop: '1rem' }}>
          <CodeCard code={listToolsCode} lang="bash" />
        </div>

        <p style={{ marginTop: '1.25rem' }}>
          <strong>ListToolsRequest/ListToolsResult:</strong> The client asks the server
          &ldquo;What tools do you provide?&rdquo; and gets back a list of available tools.
        </p>

        <figure>
          <img
            src={listToolsImg}
            alt="MCP communication: the MCP client in our server sends a ListToolsRequest (give me a list of tools you provide) to the MCP server for Microsoft Learn, which replies with a ListToolsResult (here are the tools I can run)."
            loading="lazy"
          />
        </figure>

        <p style={{ marginTop: '1.25rem' }}>
          The Microsoft Learn MCP Server currently exposes three tools that allow Claude Code to
          interact with official Microsoft documentation.
        </p>

        <div className="table-wrap" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.name}>
                  <td>
                    <code>{t.name}</code>
                  </td>
                  <td>{t.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-panel">
        <h2>Resources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a
              href="https://learn.microsoft.com/en-us/training/support/mcp-get-started"
              target="_blank"
              rel="noreferrer"
            >
              https://learn.microsoft.com/en-us/training/support/mcp-get-started
            </a>
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <details className="mslearn-qa">
          <summary>
            <h2>Questions and answers</h2>
          </summary>
          <CodeCard code={qaCode} title="Questions and answers" className="mslearn-qa__card" expandable>
            {qa.map((item, i) => (
              <span key={item.q} className="mslearn-qa__item">
                <span className="mslearn-qa__q">{`Q${i + 1}. ${item.q}`}</span>
                {'\n'}
                <span className="mslearn-qa__a">{item.a}</span>
                {i < qa.length - 1 && '\n\n'}
              </span>
            ))}
          </CodeCard>
        </details>
      </section>

      <style>{`
        .mslearn-qa summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
          list-style: none;
          margin-top: 2.5rem;
          padding: 0.45rem 0.85rem;
          background: var(--surface-soft);
          border-radius: 6px;
        }
        .mslearn-qa summary::-webkit-details-marker { display: none; }
        .mslearn-qa summary h2 { margin: 0; }
        .mslearn-qa summary::after {
          content: '+';
          flex: none;
          width: 1.75rem;
          height: 1.75rem;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 50%;
          font-size: 1.1rem;
          color: var(--text-soft);
          transition: transform 150ms ease;
        }
        .mslearn-qa[open] summary::after { content: '\\2212'; }
        .mslearn-qa summary:hover::after { color: var(--accent); border-color: var(--border-strong); }
        .mslearn-qa__card { margin-top: 1.25rem; }
        .mslearn-qa__card pre.code-block { white-space: pre-wrap; word-break: break-word; }
        .mslearn-qa__q { font-weight: 600; }
        .mslearn-qa__a { color: var(--text-soft); }
      `}</style>
    </>
  );
}
