const api1Img = new URL('../../../images/api1.png', import.meta.url).href;

export function WhatIsApiEndpointArticle() {
  return (
    <>
      <p className="article-lead">
        An API endpoint is a specific digital location - usually a URL&mdash;where two software programs connect to share information or trigger an action. If an API is the entire menu of services a system offers, the endpoint is the specific address you use to order one of those services.
      </p>

      <section className="article-panel">
        <p>
          It’s important to note that endpoints and APIs are different. An endpoint is a component of an API, while an API is a set of rules that allow two applications to share resources. Endpoints are the locations of the resources, and the API uses endpoint URLs to retrieve the requested resources.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Tree Analogy: Understanding Structure</h2>
        <p>
          Think of an API as a tree where every branch and leaf represents a resource:
        </p>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>The Trunk (API):</strong> The starting point or base address of the entire service.
          </li>
          <li>
            <strong>Major Branches (/customers):</strong> High-level categories of information.
          </li>
          <li>
            <strong>Smaller Branches (/customers/6):</strong> A specific entity within that group—in this case, customer #6.
          </li>
          <li>
            <strong>Twigs (/customers/6/orders):</strong> Resources belonging to that specific customer.
          </li>
          <li>
            <strong>Individual Leaves (/customers/6/orders/4):</strong> The precise endpoint targeting a single item—order #4 for customer #6.
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          By following the path from trunk to leaf, the application pinpoints the exact data it needs.
        </p>
      </section>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={api1Img}
          alt="The Tree Analogy of API Structure"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>Actions You Can Perform</h2>
        <p>
          Reaching an endpoint is only half the job; you also need an HTTP method to tell the server what to do once you arrive:
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>HTTP Method</th>
                <th>Endpoint</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>GET</strong></td>
                <td><code>/orders</code></td>
                <td>Fetch all orders across all customers</td>
              </tr>
              <tr>
                <td><strong>POST</strong></td>
                <td><code>/orders</code></td>
                <td>Create a brand-new order</td>
              </tr>
              <tr>
                <td><strong>GET</strong></td>
                <td><code>/orders/93246</code></td>
                <td>Fetch details for order #93246 specifically</td>
              </tr>
              <tr>
                <td><strong>DELETE</strong></td>
                <td><code>/orders/93246</code></td>
                <td>Cancel order #93246</td>
              </tr>
              <tr>
                <td><strong>GET</strong></td>
                <td><code>/customers/82762/orders</code></td>
                <td>Fetch all orders belonging to customer #82762</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem' }}>
          Notice that the exact same endpoint path can perform different actions depending on the method used: sending a <strong>GET</strong> to <code>/orders/93246</code> reads the data, while sending a <strong>DELETE</strong> to that identical address removes it.
        </p>
      </section>
    </>
  );
}

