import { ArticleToc } from '../../components/ArticleToc';

const ontologyDeckPdf = new URL(
  '../../../files/ontology-driven-semantic-layer-stardog.pdf',
  import.meta.url,
).href;

const vendorQuestions = [
  'What kinds of business relationships and rules can it represent?',
  'Can that knowledge be shared across different applications and AI agents?',
  'Who defines, validates, and governs that meaning?',
  'Can the knowledge be reused independently of a single platform?',
  'Does it support reasoning over relationships, or primarily organize definitions and metrics?',
];

const tocGroups = [
  { id: 'intro', label: 'Introduction' },
  { id: 'what-is-an-ontology', label: 'First, What Even Is an Ontology?' },
  { id: 'why-now', label: 'So… Why Is Everyone Suddenly Interested?' },
  { id: 'talking-about-meaning', label: 'The Industry Is Finally Talking About Meaning' },
  { id: 'same-thing', label: 'But Are We All Talking About the Same Thing?' },
  { id: 'funny-thing', label: 'The Funny Thing About All of This…' },
  { id: 'main-character-moment', label: 'So, Are Ontologies Having Their Main Character Moment?' },
  { id: 'resources', label: 'Resources' },
];

export function OntologiesMainCharacterArticle() {
  return (
    <>
      <ArticleToc groups={tocGroups} />

      <p className="article-lead" id="intro">Okay, can we talk about something for a second?</p>

      <section className="article-panel">
        <p>
          Because apparently, the entire tech industry woke up one morning and decided that ontologies are cool now.
        </p>
        <p style={{ marginTop: '1rem' }}>In just the past few weeks:</p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>Databricks announced the general availability of Genie Ontology.</li>
          <li>Snowflake introduced Business Ontology, with a public preview on the way.</li>
          <li>
            Oracle announced new capabilities involving AI-assisted enterprise ontologies and semantic reasoning.
          </li>
          <li>
            Neo4j launched its Context Engine, focused on creating a reusable knowledge layer for AI agents.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          And Gartner? They&apos;re talking about AI context platforms and the importance of ontologies, knowledge graphs, and semantic technologies for agentic AI.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The word ontology is suddenly showing up in product announcements, industry research, and enterprise AI conversations.
        </p>
        <p style={{ marginTop: '1rem' }}>So naturally, I have questions.</p>
        <p style={{ marginTop: '1rem' }}>
          Why now? What changed? And have we all finally agreed that giving AI access to a bunch of data doesn&apos;t automatically make it intelligent?
        </p>
        <p style={{ marginTop: '1rem' }}>Let&apos;s get into it.</p>
      </section>

      <section className="article-panel">
        <h2 id="what-is-an-ontology">First, What Even Is an Ontology?</h2>
        <p>
          Imagine you work at a company where every department has a slightly different definition of a customer.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Marketing says a customer is anyone who has engaged with the company. Sales says a customer is someone who&apos;s signed a contract. Finance says a customer is someone who&apos;s actually paid an invoice. Customer Success says a customer is an organization with an active contract.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Everyone is using the same word and thinks they&apos;re right. (And depending on the business question, they might be!)
        </p>
        <p style={{ marginTop: '1rem' }}>Now imagine asking an AI agent:</p>
        <blockquote>
          <p>&quot;How many active customers do we have?&quot;</p>
        </blockquote>
        <p>Whose definition should it use?</p>
        <p style={{ marginTop: '1rem' }}>This is where ontologies come in.</p>
        <p style={{ marginTop: '1rem' }}>
          <mark className="highlight-green">
            An ontology is a structured representation of what things mean, how they&apos;re related, and the rules that govern those relationships within a particular domain.
          </mark>
        </p>
        <p style={{ marginTop: '1rem' }}>Think of it as a shared understanding of how your business works.</p>
        <p style={{ marginTop: '1rem' }}>
          It can define concepts like customers, accounts, contracts, and invoices. It can also describe how those concepts relate to one another, which distinctions matter, and what conditions must be satisfied.
        </p>
        <p style={{ marginTop: '1rem' }}>
          For example, an ontology might distinguish between a prospective customer and an active customer, define how organizations relate to contracts, and represent the conditions required for an account to be considered active.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And when you connect actual business data using those concepts and relationships, you&apos;re getting into knowledge graph territory. A knowledge graph represents connected information. An ontology can provide the formal meaning and structure behind those connections.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Not every knowledge graph uses a formal ontology, but the combination can be incredibly powerful.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The ontology helps establish what things mean. The knowledge graph helps connect what we know about them.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And suddenly, we&apos;re not just looking at isolated data points anymore.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>We&apos;re looking at information in context.</strong>
        </p>
      </section>

      <section className="article-panel">
        <h2 id="why-now">So… Why Is Everyone Suddenly Interested?</h2>
        <p>Here&apos;s the plot twist.</p>
        <p style={{ marginTop: '1rem' }}>
          Ontologies didn&apos;t suddenly become useful. AI just made their absence a LOT harder to ignore.
        </p>
        <p style={{ marginTop: '1rem' }}>
          For years, enterprises have been collecting enormous amounts of data. Data lakes. Data warehouses. Databases. Dashboards. Applications. More dashboards. We&apos;ve gotten very good at storing information.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Understanding what that information means across an entire organization? Well. That&apos;s another story.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And for a while, businesses could work around that. A data analyst knew which table to query. A finance team knew which revenue calculation to use. An experienced employee knew that &quot;customer&quot; meant something different depending on which department was asking. A lot of important business knowledge lived in people&apos;s heads, documentation, or application logic.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Then generative AI entered the chat. At first, we were mostly asking AI to summarize documents, answer questions, and generate content. But now we&apos;re asking it to do much more.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We want AI agents to analyze business performance, investigate problems, make recommendations, and execute workflows across multiple enterprise systems.
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s a pretty significant promotion. And there&apos;s one tiny problem.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An AI model can be incredibly good at language without knowing your company&apos;s specific definitions, policies, or relationships.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It might know what revenue means generally… Does it know whether your organization includes refunds in a particular revenue metric? Does it know which subsidiary belongs to which parent organization? Does it know that a customer must satisfy certain contractual conditions before an action can be taken?
        </p>
        <p style={{ marginTop: '1rem' }}>
          Not unless that knowledge is made available to it in a usable form.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And this is where the industry&apos;s interest in semantics starts making a lot more sense today.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="talking-about-meaning">The Industry Is Finally Talking About Meaning</h2>
        <p>
          What&apos;s interesting about these recent announcements isn&apos;t just that major technology companies are using the word ontology.
        </p>
        <p style={{ marginTop: '1rem' }}>It&apos;s what they&apos;re trying to accomplish.</p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            Databricks is introducing ways for agents to use modeled and learned organizational knowledge.
          </li>
          <li>
            Snowflake is focusing on governed business definitions, relationships, and metrics that can be reused across applications and agents.
          </li>
          <li>
            Oracle is emphasizing enterprise ontologies and semantic reasoning to connect business concepts, policies, and workflows.
          </li>
          <li>
            Neo4j is building on graph technology to provide reusable business context for AI agents.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Different products. Different architectures. Different capabilities. But there&apos;s a common theme.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>
            AI needs more than information. It needs a reliable way to interpret information within the business.
          </strong>
        </p>
        <p style={{ marginTop: '1rem' }}>
          And we&apos;re starting to see that reflected in how major platforms are positioning their AI strategies.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Which brings me to something I think is worth discussing.
        </p>
      </section>

      <section className="article-panel">
        <h2 id="same-thing">But Are We All Talking About the Same Thing?</h2>
        <p>
          Because here&apos;s where things get interesting. Just because two vendors use the word ontology doesn&apos;t necessarily mean they&apos;re offering the same thing.
        </p>
        <p style={{ marginTop: '1rem' }}>
          SHOCKING, I know. The tech industry using the same terminology to describe different capabilities? Never happened before.
        </p>
        <p style={{ marginTop: '1rem' }}>
          An ontology can range from a relatively lightweight model of business terms and relationships to a highly expressive, formally defined representation of knowledge.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Some approaches focus on standardizing business metrics and definitions. Others support richer semantic relationships, logical reasoning, constraints, and inference.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Some are tightly integrated into a particular data platform. Others are designed to be reused across systems using open semantic standards.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And those differences matter. For example, defining what revenue means is valuable.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But there&apos;s a difference between defining a metric and modeling how customers, contracts, products, regions, transactions, and business policies relate to one another.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Both solve important problems. They just don&apos;t necessarily solve the same problems. This is why I think the questions enterprises should be asking are changing. Instead of simply asking, &quot;Does your platform have an ontology?&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>Maybe we should be asking:</p>
        <ol className="question-list">
          {vendorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
        <p style={{ marginTop: '1rem' }}>
          And perhaps most importantly: Are we building a shared understanding of the business, or are we just creating another version of it inside another platform?
        </p>
        <p style={{ marginTop: '1rem' }}>
          Because the last thing enterprises need is five different AI systems, each with its own definition of reality. We&apos;ve already tried that with data silos.
        </p>
        <p style={{ marginTop: '1rem' }}>The reviews were mixed…</p>
      </section>

      <section className="article-panel">
        <h2 id="funny-thing">The Funny Thing About All of This…</h2>
        <p>For years, the conversation around enterprise AI was largely about models.</p>
        <p style={{ marginTop: '1rem' }}>
          Bigger models. Better models. More parameters. More data. More computing power. And don&apos;t get me wrong. Those advancements matter.
        </p>
        <p style={{ marginTop: '1rem' }}>
          But increasingly, the conversation is expanding beyond what the model can do to what the model actually understands about the environment it&apos;s operating in.
        </p>
        <p style={{ marginTop: '1rem' }}>That&apos;s an important distinction.</p>
        <p style={{ marginTop: '1rem' }}>
          A model can be extremely capable and still produce the wrong answer if it&apos;s working with the wrong business definition. And no amount of confidence in an AI-generated response changes that.
        </p>
        <p style={{ marginTop: '1rem' }}>
          What&apos;s exciting about the renewed interest in ontologies is that the industry is paying more attention to something knowledge engineers have been working on for a very long time: <mark className="highlight">making meaning explicit, connected, and reusable</mark>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Of course, the real test won&apos;t be how many vendors add &quot;ontology&quot; to their product pages.
        </p>
        <p style={{ marginTop: '1rem' }}>
          It&apos;ll be whether organizations can actually use these technologies to create consistent, governed business knowledge that improves how their AI systems operate.
        </p>
        <p style={{ marginTop: '1rem' }}>That&apos;s the part worth watching.</p>
      </section>

      <section className="article-panel">
        <h2 id="main-character-moment">So, Are Ontologies Having Their Main Character Moment?</h2>
        <p>To be honest, kind of.</p>
        <p style={{ marginTop: '1rem' }}>
          And as someone who spends an arguably unhealthy amount of time thinking about knowledge graphs and semantic technologies, I&apos;m here for it. Not because ontologies are some shiny new invention.
        </p>
        <p style={{ marginTop: '1rem' }}>
          They&apos;re not. But because we&apos;re finally having a much broader conversation about something that&apos;s been overlooked for years.
        </p>
        <p style={{ marginTop: '1rem' }}>
          AI doesn&apos;t just need access to enterprise information. It needs the definitions, relationships, and rules that make that information meaningful.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And as more organizations move toward AI agents, that understanding becomes increasingly important.
        </p>
        <p style={{ marginTop: '1rem' }}>
          So yes, I&apos;m enjoying watching ontologies get their moment in the spotlight. But I&apos;ll leave you with one thought.
        </p>
        <blockquote>
          <p>
            AI didn&apos;t invent the need for ontologies. It just made the consequences of not having shared business meaning a whole lot more obvious.
          </p>
        </blockquote>
      </section>

      <section className="article-panel">
        <h2 id="resources">Resources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a href={ontologyDeckPdf} target="_blank" rel="noreferrer">
              Building Enterprise AI Agents with Claude and an Ontology-Driven Semantic Layer
            </a>{' '}
            (PDF, Navin Sharma, Stardog)
          </li>
          <li>
            <a
              href="https://info.stardog.com/building-enterprise-ai-agents-with-claude"
              target="_blank"
              rel="noreferrer"
            >
              Building Enterprise AI Agents with Claude
            </a>{' '}
            (Stardog)
          </li>
        </ul>
      </section>
    </>
  );
}
