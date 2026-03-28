export function ExportPlatformsArticle() {
  const platforms = [
    ['🔟', 'Alibaba.com', 'The world’s largest B2B platform offering unmatched global reach, Trade Assurance, and strong supplier verification — ideal for bulk and international trade.'],
    ['9️⃣', 'Global Sources', 'Known for high-quality, verified suppliers and strong integration of online sourcing with international trade shows.'],
    ['8️⃣', 'TradeIndia', 'A powerful gateway connecting Indian manufacturers and exporters with domestic and overseas buyers.'],
    ['7️⃣', 'eWorldTrade', 'A fast-growing platform spanning 90+ countries, offering strong buyer discovery and lead-generation tools.'],
    ['6️⃣', 'Made-in-China.com', 'A trusted portal to access Chinese manufacturers with factory audit reports and transparent certifications.'],
    ['5️⃣', 'ExportHub', 'Focused on lead generation and conversion, with multilingual support and exporter-friendly account management.'],
    ['4️⃣', 'Kompass', 'An excellent B2B business directory across 70+ countries — ideal for market research and targeted buyer identification.'],
    ['3️⃣', 'DHgate', 'Best suited for low-MOQ wholesale trade, startups, and small exporters entering global markets.'],
    ['2️⃣', 'Amazon Business', 'Leverages Amazon’s logistics and payment infrastructure to reach verified business buyers in the US, Europe, and beyond.'],
    ['1️⃣', 'LinkedIn', 'More than networking — it’s a powerful tool for personal branding, direct buyer engagement, thought leadership, and trust-building.'],
  ];

  return (
    <>
      <p className="article-lead">
        In today’s competitive export ecosystem, visibility + credibility +
        direct buyer access are the real growth drivers. The most successful
        exporters strategically use B2B marketplaces and professional networks
        to connect with verified global buyers.
      </p>

      <p className="article-lead">
        Here are the Top 10 most effective platforms every export-focused
        business should leverage 👇
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
        <h2>✨ Pro Insight</h2>
        <p>
          Top exporters don’t depend on a single platform. They build a
          multi-channel presence to maximize visibility, diversify leads, and
          reduce dependency risk.
        </p>
      </section>

      <p className="article-lead">
        🚢 In exports, the right platform can shorten your sales cycle and
        multiply global opportunities.
      </p>
    </>
  );
}
