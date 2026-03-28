export function ExportPlatformsArticle() {
  const platforms = [
    ['10', 'Alibaba.com', 'The largest B2B platform for global reach, supplier verification, and trade assurance.'],
    ['9', 'Global Sources', 'A trusted marketplace for verified suppliers that also connects strongly to trade-show discovery.'],
    ['8', 'TradeIndia', 'A gateway for Indian exporters to connect with domestic and international buyers.'],
    ['7', 'eWorldTrade', 'A fast-growing platform across 90+ countries with buyer discovery and lead-generation tools.'],
    ['6', 'Made-in-China.com', 'A well-known portal for Chinese manufacturers with audit reports and visible certifications.'],
    ['5', 'ExportHub', 'Focused on lead generation, multilingual support, and exporter-friendly account management.'],
    ['4', 'Kompass', 'A broad B2B directory useful for research and highly targeted buyer identification.'],
    ['3', 'DHgate', 'A strong fit for low-MOQ wholesale trade, startups, and smaller exporters.'],
    ['2', 'Amazon Business', 'Combines Amazon logistics and payments with access to verified business buyers.'],
    ['1', 'LinkedIn', 'A powerful channel for personal branding, buyer outreach, thought leadership, and trust-building.'],
  ];

  return (
    <>
      <p className="article-lead">
        Visibility, credibility, and direct buyer access are the real growth
        drivers in exports. The strongest exporters build a multi-channel
        presence instead of depending on a single marketplace.
      </p>

      <section className="article-stack">
        {platforms.map(([rank, name, description]) => (
          <article className="insight-card insight-card--compact" key={name}>
            <span className="insight-index">{rank}</span>
            <div>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="article-panel article-panel--accent">
        <h2>Pro insight</h2>
        <p>
          Top exporters do not depend on one platform. They build a layered
          presence to increase visibility, diversify leads, and reduce platform
          dependency risk.
        </p>
      </section>
    </>
  );
}
