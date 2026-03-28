export function SerumCholesterolArticle() {
  return (
    <>
      <p className="article-lead">
        <strong>Serum cholesterol</strong> refers to the amount of cholesterol
        present in the blood. It is measured through a blood test and is used
        to assess cardiovascular risk.
      </p>

      <section className="article-panel">
        <h2>Main components</h2>
        <ul className="bullet-list">
          <li>
            <strong>Total cholesterol:</strong> overall cholesterol level in
            blood
          </li>
          <li>
            <strong>LDL:</strong> bad cholesterol that contributes to plaque
            buildup
          </li>
          <li>
            <strong>HDL:</strong> good cholesterol that helps remove
            cholesterol from the blood
          </li>
          <li>
            <strong>Triglycerides:</strong> a type of fat linked to heart
            disease when elevated
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>Reference ranges for adults</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Desirable level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total cholesterol</td>
                <td>&lt; 200 mg/dL</td>
              </tr>
              <tr>
                <td>LDL cholesterol</td>
                <td>&lt; 100 mg/dL (optimal)</td>
              </tr>
              <tr>
                <td>HDL cholesterol</td>
                <td>&ge; 40 mg/dL (men), &ge; 50 mg/dL (women)</td>
              </tr>
              <tr>
                <td>Triglycerides</td>
                <td>&lt; 150 mg/dL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-grid article-grid--two">
        <article className="article-panel">
          <h2>Why it matters</h2>
          <ul className="bullet-list">
            <li>High LDL and triglycerides increase cardiovascular risk.</li>
            <li>Higher HDL levels tend to be protective.</li>
            <li>
              Total cholesterol alone is less useful than the full lipid
              profile.
            </li>
          </ul>
        </article>

        <article className="article-panel">
          <h2>Common causes of high levels</h2>
          <ul className="bullet-list">
            <li>Diet high in saturated or trans fats</li>
            <li>Physical inactivity</li>
            <li>Obesity</li>
            <li>Diabetes or hypothyroidism</li>
            <li>Genetic conditions such as familial hypercholesterolemia</li>
          </ul>
        </article>
      </section>
    </>
  );
}
