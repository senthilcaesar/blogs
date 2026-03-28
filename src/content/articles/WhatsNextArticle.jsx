export function WhatsNextArticle() {
  const articles = [
    {
      title: 'How to Do What You Love',
      author: 'Paul Graham',
      href: 'https://paulgraham.com/love.html',
      summary:
        'A deep exploration of how to find work you genuinely care about and the traps that pull people away from it.',
    },
    {
      title: 'Hell Yeah or No',
      author: 'Derek Sivers',
      href: 'https://sive.rs/hyn',
      summary:
        'A crisp decision-making framework: if the answer is not a full yes, treat it as a no.',
    },
    {
      title: 'How to Pick a Career (That Actually Fits You)',
      author: 'Wait But Why',
      href: 'https://waitbutwhy.com/2018/04/picking-career.html',
      summary:
        'A visual, exhaustive guide to understanding your motivations and finding a career that matches them.',
    },
    {
      title: 'Make Your Work Your Calling',
      author: 'The Atlantic',
      href: 'https://www.theatlantic.com/ideas/archive/2025/06/make-your-work-your-calling/683330/',
      summary:
        'A look at how people shift from seeing work as a paycheck toward seeing it as meaningful purpose.',
    },
    {
      title: 'The Pmarca Guide to Career Planning',
      author: 'Marc Andreessen',
      href: 'https://pmarchive.com/guide_to_career_planning_part1.html',
      summary:
        'Practical, contrarian advice for planning your career in a world that changes faster than your plans.',
    },
  ];

  return (
    <>
      <p className="article-lead">
        A curated selection of articles to help you navigate your career, find
        your passion, and decide on your next big move.
      </p>
      <section className="article-stack">
        {articles.map((article, index) => (
          <article className="insight-card insight-card--compact" key={article.title}>
            <span className="insight-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>
                <a href={article.href} target="_blank" rel="noreferrer">
                  {article.title}
                </a>
              </h2>
              <p className="eyebrow">by {article.author}</p>
              <p>{article.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
