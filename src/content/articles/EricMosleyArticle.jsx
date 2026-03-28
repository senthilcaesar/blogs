export function EricMosleyArticle() {
  const questions = [
    {
      question:
        'Over the past few years, culture has become a top business priority. In a shifting macro environment, is it still important? How do you see it connecting to organizational performance and goals?',
      answer: [
        "I think there's still some confusion about what culture is and why it matters. The reality is, culture is the operating system of performance. The data consistently shows that companies with strong cultures outperform their peers on productivity, innovation and retention, especially during disruption. For example, in manufacturing, our data shows that sites that used recognition effectively saw 70% year-over-year improvement in productivity, safety and quality.",
        'In downturns or transformation periods, culture becomes a multiplier of resilience. It determines how quickly people adapt, collaborate and recommit to shared purpose when everything else is uncertain. The conversation has evolved from "Is culture important?" to "What can culture deliver and how do we quantify it?" — and recognition data is finally making that possible.',
      ],
    },
    {
      question:
        'What advice do you have for leaders looking to promote a culture of recognition that is authentic and actionable?',
      answer: [
        'Mosley: Recognition must be embedded in the rhythm of work, not reserved for special occasions. The most successful leaders make it a habit with daily, specific appreciation that is tied to, and reflects, real impact. But authentic recognition comes from the crowd, not just the corner office.',
        'When peers celebrate one another, it builds trust, fairness and a sense of shared ownership.',
        'Finally, treat recognition like a business process. Measure it, track equity across teams and connect it to outcomes like engagement, retention and innovation. When you opera-tionalize appreciation, culture becomes measurable — but just as importantly, it produces data that makes culture manageable and scalable.',
      ],
    },
    {
      question:
        'Many companies are experimenting with Al in human resources. What are the biggest mistakes, misconceptions or missed opportunities you see?',
      answer: [
        'Mosley: The biggest mistake I see is assuming AI will solve cultural problems without fixing the data hrst. Bad data in means bad decisions out, and many HR systems are still built on incomplete or biased inputs like performance reviews or demographic data.',
        `Another misconception is seeing Al purely as an efficiency tool. The real opportunity is to use Al for illumination: to understand people, potential and connection in ways we couldn't before. For example, a leader might ask, "Who would be the best person to lead this new initiative?" or "Who is the best mentor in engineering?" and get instant answers that help them make key talent decisions.`,
        `Finally, leaders must remember, AI doesn't change your culture; it amplifies it. If you train AI on transactional data, you get transactional outcomes. If you train it on human data, you get what we call "Human Intelligence," or the insight layer that gives you decision-ready insights and drives better leadership.`,
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
