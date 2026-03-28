export function SerumCholesterolArticle() {
  return (
    <>
      <p className="article-lead">
        <strong>Serum cholesterol</strong> refers to the amount of cholesterol
        present in the blood. It is measured through a blood test (lipid
        profile) and is used to assess cardiovascular risk.
      </p>

      <section className="article-panel">
        <h2>Main components</h2>
        <ul className="bullet-list">
          <li>
            <strong>Total cholesterol</strong>: Overall cholesterol level in
            blood
          </li>
          <li>
            <strong>LDL (Low-Density Lipoprotein)</strong>: “Bad” cholesterol;
            contributes to plaque buildup
          </li>
          <li>
            <strong>HDL (High-Density Lipoprotein)</strong>: “Good”
            cholesterol; helps remove cholesterol from blood
          </li>
          <li>
            <strong>Triglycerides</strong>: A type of fat linked to heart
            disease when elevated
          </li>
        </ul>
      </section>

      <section className="article-panel">
        <h2>Reference ranges (adults)</h2>
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
                <td>
                  <strong>Total cholesterol</strong>
                </td>
                <td>&lt; 200 mg/dL</td>
              </tr>
              <tr>
                <td>
                  <strong>LDL cholesterol</strong>
                </td>
                <td>&lt; 100 mg/dL (optimal)</td>
              </tr>
              <tr>
                <td>
                  <strong>HDL cholesterol</strong>
                </td>
                <td>&ge; 40 mg/dL (men), &ge; 50 mg/dL (women)</td>
              </tr>
              <tr>
                <td>
                  <strong>Triglycerides</strong>
                </td>
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
            <li>
              High <strong>LDL</strong> and triglycerides increase risk of heart
              disease and stroke
            </li>
            <li>
              Higher <strong>HDL</strong> is protective
            </li>
            <li>
              Total cholesterol alone is less informative than the full lipid
              profile.
            </li>
          </ul>
        </article>

        <article className="article-panel">
          <h2>Common causes of high serum cholesterol</h2>
          <ul className="bullet-list">
            <li>Diet high in saturated/trans fats</li>
            <li>Physical inactivity</li>
            <li>Obesity</li>
            <li>Diabetes, hypothyroidism</li>
            <li>Genetic factors (familial hypercholesterolemia)</li>
          </ul>
        </article>
      </section>
    </>
  );
}
