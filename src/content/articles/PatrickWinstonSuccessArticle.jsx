const kptImg = new URL('../../../images/kpt.jpeg', import.meta.url).href;

export function PatrickWinstonSuccessArticle() {
  return (
    <>
      <p className="article-lead">
        Your success in life will be determined largely by your ability to speak, your ability to write,
        and the quality of your ideas, in that order.
      </p>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={kptImg}
          alt="Quality = f(K,p,t) formula by Patrick Winston"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <p>It's determined by this formula</p>
        <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Quality = f(K,p,t)</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>K</strong> -&gt; How much knowledge you have
          </li>
          <li>
            <strong>p</strong> -&gt; How much you practice with that knowledge
          </li>
          <li>
            <strong>t</strong> -&gt; Your inherent talent
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <p>
          Notice that the &quot;t&quot; is very small. What really matters is what you know
        </p>
        <p style={{ marginTop: '1rem' }}>
          You can get a lot better than people who may have inherent talents if you have the right amount of knowledge
        </p>
        <p className="eyebrow" style={{ marginTop: '1.5rem', opacity: 0.8 }}>
          Patrick Winston
        </p>
      </section>
    </>
  );
}
