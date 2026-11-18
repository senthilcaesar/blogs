const paletteImg = new URL('../../../images/vscode-mcp-1.png', import.meta.url).href;
const addServerImg = new URL('../../../images/vscode-mcp-2.png', import.meta.url).href;
const galleryImg = new URL('../../../images/vscode-mcp-3.png', import.meta.url).href;
const installedImg = new URL('../../../images/vscode-mcp-4.png', import.meta.url).href;
const settingImg = new URL('../../../images/vscode-mcp-5.png', import.meta.url).href;

const imgStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '16px',
  border: '1px solid var(--border)',
};

function Shot({ src, alt, caption }) {
  return (
    <figure style={{ margin: '1.5rem 0 0' }}>
      <img src={src} alt={alt} style={imgStyle} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Keys({ keys }) {
  return (
    <span className="vsmcp-keys">
      {keys.map((k, i) => (
        <span key={k}>
          {i > 0 && <span className="vsmcp-plus">+</span>}
          <kbd>{k}</kbd>
        </span>
      ))}
    </span>
  );
}

const servers = [
  {
    name: 'GitHub',
    by: 'github',
    what: 'Reads and changes things on GitHub for you: repositories, issues, pull requests, code search.',
  },
  {
    name: 'Context7',
    by: 'upstash',
    what: 'Fetches current, version-specific documentation for libraries and frameworks, so answers aren’t stuck at the model’s training date.',
  },
  {
    name: 'Playwright',
    by: 'microsoft',
    what: 'Drives a real browser. It reads the page through its accessibility tree (the labelled outline of buttons, links and fields that screen readers use) rather than guessing from pixels.',
  },
  {
    name: 'Microsoft Learn',
    by: 'MicrosoftDocs',
    what: 'Searches and fetches the official Microsoft and Azure documentation, including code samples.',
  },
];

export function VsCodeMcpServersArticle() {
  return (
    <>
      <section className="article-panel">
        <h2>What you&apos;re actually installing</h2>
        <p>
          The Model Context Protocol (MCP) is an open standard for connecting AI assistants to
          outside tools and data. A program called an <strong>MCP server</strong> advertises a list
          of tools, each with a name and a one-line description. The assistant (here, the chat in
          VS Code, acting as the <strong>MCP client</strong>) reads that list, and when your
          question needs one of those tools, it calls it and reads the result before answering.
          We can picture the servers as extra pairs of hands: the model still does the thinking,
          but now it can reach for a reference book or a browser instead of answering from memory.
        </p>
        <p style={{ marginTop: '1rem' }}>
          VS Code ships a built-in gallery of these servers, so installing one is a click rather
          than a hand-edited JSON file. In practice, once a server is installed, its tools show up
          in the chat&apos;s tool list and the assistant can use them in any conversation.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We&apos;ll install these four:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          {servers.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong> <span className="vsmcp-by">({s.by})</span> - {s.what}
            </li>
          ))}
        </ul>
      </section>

      <section className="article-panel">
        <h2>Step 1: Open Settings</h2>
        <p>
          Open VS Code and press <Keys keys={['Cmd', 'Shift', 'P']} /> to open the Command Palette,
          the search box that can run any command in the editor. Type <code>MCP</code>. The list
          narrows to every command with MCP in its name.
        </p>
        <Shot
          src={paletteImg}
          alt="VS Code Command Palette with '>MCP' typed, listing commands such as MCP: Add Server, MCP: Browse MCP Servers, MCP: List Servers and MCP: Open User Configuration."
          caption="Typing MCP filters the Command Palette to the MCP commands."
        />
      </section>

      <section className="article-panel">
        <h2>Step 2: Open the server gallery</h2>
        <p>
          Choose <strong>MCP: Browse MCP Servers</strong>. The other options are for servers that aren&apos;t in the
          gallery; for the four we want, browsing is the short way round.
        </p>
        <Shot
          src={addServerImg}
          alt="Command Palette with '>MCP' typed and MCP: Browse MCP Servers highlighted at the top, followed by Show Installed Servers, Open Workspace Folder MCP Configuration, List Servers, Open User Configuration and MCP Servers."
          caption="MCP: Browse MCP Servers opens the server gallery."
        />
      </section>

      <section className="article-panel">
        <h2>Step 3: Browse the list</h2>
        <p>
          A <strong>Customizations</strong> panel opens. In its left sidebar, select{' '}
          <strong>MCP Servers</strong>, then click the <strong>Browse</strong> button at the top
          right. You&apos;ll see the full list of MCP servers available in the gallery, each with
          its publisher and a short description, plus a search box to narrow it down.
        </p>
        <Shot
          src={galleryImg}
          alt="The Customizations panel with MCP Servers selected in the sidebar and the Browse button circled at the top right."
          caption="Customizations → MCP Servers → Browse."
        />
      </section>

      <section className="article-panel">
        <h2>Step 4: Install the four servers</h2>
        <p>
          Search for each server by name and click <strong>Install</strong>. Check the publisher
          as you go, because the gallery can hold more than one server with a similar name; the
          ones below are the official listings.
        </p>
        <ul className="vsmcp-matrix">
          {servers.map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
        <p style={{ marginTop: '1.25rem' }}>
          When you&apos;re done, the <strong>MCP Servers - Installed</strong> section should look
          like this. The gear icon next to each one lets you start, stop or configure it later.
          GitHub will ask you to sign in the first time it runs, since it acts on your account.
        </p>
        <Shot
          src={installedImg}
          alt="The MCP Servers - Installed list showing GitHub (github), Context7 (upstash), Playwright (microsoft) and Microsoft Learn (MicrosoftDocs), each with a settings gear."
          caption="All four servers installed."
        />
        <p style={{ marginTop: '1.25rem' }}>
          Now go back to the question we started with. With Context7 installed, ask the chat how
          to write a route loader in React Router v7 and add &quot;use Context7&quot; to the end. Instead
          of answering from memory, the assistant calls Context7, pulls the current React Router
          docs, and answers from those. The answer might come out the same, but now it&apos;s
          checked rather than remembered.
        </p>
      </section>

      <section className="article-panel">
        <h2>If the gallery is empty</h2>
        <p>
          Sometimes you click <strong>Browse</strong> and see no servers at all, just{' '}
          <em>No MCP servers in this group</em>. That usually means the gallery itself is switched
          off. It&apos;s still marked as a <em>Preview</em> feature, so some setups leave it disabled.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Open Settings with <Keys keys={['Cmd', ',']} />, search for{' '}
          <code>chat.mcp.gallery.enabled</code>, and make sure the box is ticked. Its description
          reads <em>Enables the default Marketplace for Model Context Protocol (MCP) servers.</em>{' '}
          Then repeat Step 3 and the list should fill in.
        </p>
        <Shot
          src={settingImg}
          alt="VS Code Settings searched for chat.mcp.gallery.enabled, showing Chat › Mcp › Gallery: Enabled (Preview) with its checkbox ticked."
          caption="Chat › Mcp › Gallery: Enabled must be ticked for the gallery to appear."
        />
      </section>

      <style>{`
        .vsmcp-keys { display: inline-flex; align-items: center; gap: 0.2rem; white-space: nowrap; }
        .vsmcp-keys kbd {
          font-family: var(--font-mono);
          font-size: 0.8em;
          padding: 0.1rem 0.45rem;
          border: 1px solid var(--border);
          border-bottom-width: 2px;
          border-radius: 6px;
          background: color-mix(in srgb, var(--accent) 8%, transparent);
        }
        .vsmcp-plus { margin: 0 0.2rem; opacity: 0.6; }
        .vsmcp-by { opacity: 0.65; font-size: 0.9em; }
        .article-panel ul.vsmcp-matrix {
          list-style: none;
          padding: 0;
          margin: 1rem auto 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          max-width: 480px;
        }
        .vsmcp-matrix li {
          margin: 0;
          padding: 0.85rem 1rem;
          text-align: center;
          font-weight: 600;
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .vsmcp-matrix li:nth-child(1) { background: color-mix(in srgb, #ff8a3d 12%, transparent); }
        .vsmcp-matrix li:nth-child(2) { background: color-mix(in srgb, #22c55e 12%, transparent); }
        .vsmcp-matrix li:nth-child(3) { background: color-mix(in srgb, #38bdf8 14%, transparent); }
        .vsmcp-matrix li:nth-child(4) { background: color-mix(in srgb, #a78bfa 16%, transparent); }
      `}</style>
    </>
  );
}
