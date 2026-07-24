export function ChatbotsKnowAboutYouArticle() {
  return (
    <>
      <p className="article-lead">
        Copy and paste these 4 prompts into your AI chatbot to uncover what it has inferred about your background, future decisions, and blind spots.
      </p>

      <section className="article-stack">
        <article className="insight-card">
          <span className="insight-index">01</span>
          <div>
            <p>
              Tell me everything you’ve figured out about me that I never actually stated — the things you inferred from how I write and what I ask, including my age, income level, where I live, my personal situation. Show me what tipped you off.
            </p>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">02</span>
          <div>
            <p>
              Predict how I’d handle things I’ve never told you about: money, stress, conflict, risk and the decision I’m likely to make next in my life. Tell me how confident you are in each prediction.
            </p>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">03</span>
          <div>
            <p>
              Based on everything you know about me, name the personality traits I most likely don’t see in myself. My blind spots, my insecurities and the way I actually come across.
            </p>
          </div>
        </article>

        <article className="insight-card">
          <span className="insight-index">04</span>
          <div>
            <p>
              What have you figured out about me that is embarrassing or sensitive? Information I wouldn’t necessarily want the public (e.g., an employer or a stranger) to know.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
