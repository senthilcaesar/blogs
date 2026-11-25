import { CodeCard } from '../../components/CodeCard';

const installSnippet = `/plugin install github@claude-plugins-official`;

const marketplaceSnippet = `/plugin marketplace add your-org/claude-plugins`;

const manifestSnippet = `{
  "name": "svg-splitter-review",
  "version": "0.1.0",
  "description": "Reviews the SVG Splitter repo",
  "author": {
    "name": "Lewis Menelaws"
  }
}`;

export function ClaudePluginsArticle() {
  return (
    <>
      <p className="article-lead">
        A setup you trust is worth a lot more once your whole team is running it. The problem is moving it around. You build a great <code>.claude</code> directory with skills, subagents, and hooks, and then what? Everyone copies and pastes files between machines and hopes they stay in sync. Plugins fix that. A plugin is how Claude Code packages a setup and moves it from one person to the next.
      </p>
      <p style={{ marginTop: '1rem' }}>
        There are two sides to this, and we&apos;ll cover both. First, using plugins that other people publish. Second, packaging your own once you&apos;ve built something worth sharing.
      </p>

      <section className="article-panel">
        <h2>What a Plugin Is</h2>
        <p>
          A plugin is one installable unit. It bundles everything you&apos;d otherwise share by hand: skills, subagents, hooks, and MCP server configs, plus the longer tail of stuff like language server protocol servers, background monitors, themes, and a slice of <code>settings.json</code>. One version, one install.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Where the plugin lives decides how you install it. Inside a session, you can install one directly by name:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={installSnippet} lang="bash" title="Claude Code" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          The command opens the plugin&apos;s details first, so you can review it and choose a scope. Then Claude Code installs it and prints a short summary. Either it says the plugin is already active in this session, or it mentions <code>/reload-plugins</code> and Claude Code runs that reload for you. You step in only if the reload warns that your next message would re-read the whole conversation: run <code>/reload-plugins --force</code> to activate the plugin anyway.
        </p>
      </section>

      <section className="article-panel">
        <h2>Adding a Marketplace for Your Team</h2>
        <p>
          For a team, the better move is to add a private marketplace once. A marketplace is a shared source that plugins resolve through:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={marketplaceSnippet} lang="bash" title="Claude Code" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          Call it whatever you want. Once it&apos;s added, every install after that resolves through it. You get centralized discovery, version tracking, and updates in one place instead of scattered across everyone&apos;s laptop.
        </p>
        <p style={{ marginTop: '1rem' }}>
          You can browse what&apos;s available from the Discover tab. It lists the plugins on your marketplaces so you can search and pick.
        </p>
      </section>

      <section className="article-panel">
        <h2>Read Before You Install</h2>
        <p>
          Here&apos;s the part that matters most. A plugin runs code on your machine, with your privileges. Its hooks fire on every matching tool call. So if you install a plugin for its skills, you also get its <code>PreToolUse</code> and <code>Stop</code> hooks whether you read them or not.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Think about what that means. A community plugin could ship a <code>Stop</code> hook that calls out to a network endpoint every time, and nothing in your configuration would warn you about it. That&apos;s not a reason to avoid plugins. It&apos;s a reason to look first.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Before you install, check the plugin&apos;s details. Claude Code shows you what it will install and estimates the context cost, along with a plain warning that Anthropic doesn&apos;t control what&apos;s inside third-party plugins.
        </p>
        <p style={{ marginTop: '1rem' }}>Two things worth knowing about where plugins come from:</p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>A plugin gets onto the community marketplace because the person who wrote it sent it to Anthropic.</li>
          <li>The official marketplace is curated on its own separate track.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          But listed isn&apos;t the same as trusted. So the rule stands: install plugins and add marketplaces only from sources you truly trust, and check what a plugin actually does before turning it on.
        </p>
      </section>

      <section className="article-panel">
        <h2>Components Run Alongside Yours</h2>
        <p>
          A plugin doesn&apos;t overwrite your configuration. Its components run alongside your own. That&apos;s mostly good, but it has consequences you should understand.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Hooks stack.</strong> A plugin&apos;s <code>PreToolUse</code> hook and your own <code>PreToolUse</code> hook both fire on every tool call. Neither replaces the other. This is exactly why you read the details first.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Skills, agents, and commands are namespaced under the plugin name, so they never clash with yours. A plugin can also ship a <code>settings.json</code> file, but only a narrow one. Claude Code honors just two keys from it: the agent and subagent status line keys.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That agent key is worth a pause. Setting it promotes one of the plugin&apos;s subagents to the main thread, along with its system prompt, tool restrictions, and model. In other words, enabling the plugin can change how Claude Code behaves by default. That&apos;s one of the main reasons to look before you even turn it on.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Once a plugin is installed you can see everything it added, manage it, and uninstall it from the plugin panel.
        </p>
      </section>

      <section className="article-panel">
        <h2>Packaging Your Own Plugin</h2>
        <p>
          Now the other side. Once you&apos;ve built a <code>.claude</code> directory that works, don&apos;t make your team copy and paste it between machines. Package it instead.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The good news is you don&apos;t have to restructure anything. A plugin uses the same <code>.claude</code> shape you already use:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>One folder per skill.</li>
          <li>
            One markdown file per subagent under <code>agents</code>.
          </li>
          <li>
            <code>hooks/hooks.json</code> and <code>.mcp.json</code>, at the plugin root.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The directory structure does most of the work. Claude Code discovers components by convention.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>The manifest</h3>
        <p>
          On top of that, there&apos;s an optional manifest. It lives at <code>.claude-plugin/plugin.json</code> and holds the name, version, description, and author:
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <CodeCard code={manifestSnippet} lang="json" title=".claude-plugin/plugin.json" />
        </div>
        <p style={{ marginTop: '1.25rem' }}>
          The manifest is optional. Leave it out and Claude Code still discovers your components by directory convention. But a couple of details are worth knowing:
        </p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Name is the only required field.</strong> It namespaces your skills as <code>/plugin-name:skill-name</code>, so a skill in this plugin runs as <code>/svg-splitter-review:&lt;skill-name&gt;</code>. That keeps your skills from colliding with anyone else&apos;s.
          </li>
          <li>
            <strong>Version it like any other dependency.</strong> That&apos;s what makes updates and version tracking work across your team.
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>The Takeaway</h2>
        <p>Two simple rules cover most of this:</p>
        <ul className="bullet-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>When you use plugins, read before you install.</strong> A plugin runs code with your privileges, so look at its hooks, agents, and MCP servers first.
          </li>
          <li>
            <strong>When you build one, package your <code>.claude</code> the moment it works.</strong> One manifest, one install.
          </li>
        </ul>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        That&apos;s the whole point. One installable unit, and the setup you trust reaches your entire team.
      </p>
    </>
  );
}
