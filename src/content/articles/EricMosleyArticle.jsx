export function EricMosleyArticle() {
  const questions = [
    {
      question:
        'Culture has become a top business priority. In a shifting macro environment, is it still important?',
      answer: [
        'Culture is the operating system of performance. Strong cultures consistently outperform on productivity, innovation, and retention, especially during disruption.',
        'During downturns or transformation, culture becomes a resilience multiplier by shaping how quickly people adapt, collaborate, and recommit to shared purpose.',
      ],
    },
    {
      question:
        'What advice do you have for leaders looking to promote a culture of recognition that is authentic and actionable?',
      answer: [
        'Recognition should be part of the rhythm of work, not saved for special occasions. The most effective leaders make appreciation daily, specific, and tied to real impact.',
        'Authentic recognition also has to come from peers, not just executives, because that builds trust, fairness, and a stronger sense of shared ownership.',
        'Treat recognition like a business process: measure it, track fairness, and connect it to outcomes such as engagement, retention, and innovation.',
      ],
    },
    {
      question:
        'What are the biggest mistakes and missed opportunities you see in AI for HR?',
      answer: [
        'One major mistake is expecting AI to solve cultural problems without fixing the data first. Bad inputs still produce bad decisions.',
        'Another misconception is seeing AI only as an efficiency tool. Its real upside is illumination: helping leaders identify potential, mentors, and key contributors faster.',
        'AI does not change your culture by itself. It amplifies whatever culture your underlying data already reflects.',
      ],
    },
  ];

  return (
    <section className="article-stack">
      {questions.map((item, index) => (
        <article className="insight-card" key={item.question}>
          <span className="insight-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{item.question}</h2>
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
