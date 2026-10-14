const api1Img = new URL('../../../images/api1.webp', import.meta.url).href;
const crudImg = new URL('../../../images/crud.webp', import.meta.url).href;
const getPostImg = new URL('../../../images/get-post.webp', import.meta.url).href;
const postPutImg = new URL('../../../images/post-put.webp', import.meta.url).href;

function YoutubeIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="20" height="14" rx="4" fill="#ff0000" />
      <path d="M8 4l5 3-5 3z" fill="#ffffff" />
    </svg>
  );
}

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

      <div style={{ margin: '2rem 0' }}>
        <img
          src={crudImg}
          alt="CRUD Operations and HTTP Methods"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={getPostImg}
          alt="HTTP Methods GET and POST"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <div style={{ margin: '2rem 0' }}>
        <img
          src={postPutImg}
          alt="HTTP Methods POST and PUT"
          style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
        />
      </div>

      <section className="article-panel">
        <h2>Resources</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <a
              href="https://car-fleet-management.herokuapp.com/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
            >
              Car Fleet Management Swagger UI
            </a>
          </li>
          <li>
            <a
              href="https://www.openapis.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenAPI Initiative
            </a>
          </li>
          <li>
            <a
              href="https://docs.github.com/en/rest?api"
              target="_blank"
              rel="noreferrer"
            >
              GitHub REST API Documentation
            </a>
          </li>
          <li>
            <a
              href="https://serpapi.com/"
              target="_blank"
              rel="noreferrer"
            >
              SerpApi: Search Engine Results API
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/WXsD0ZgxjRw"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              APIs for Beginners - How to use an API (freeCodeCamp)
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/XvFmUE-36Kc"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              API Design and Architecture - Backend Engineering Intro (Caleb Curry)
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/_gQaygjm_hg"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              Good APIs Vs Bad APIs: 7 Tips for API Design (ByteByteGo)
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/-MTSQjw5DrM"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              RESTful APIs in 100 Seconds (Fireship)
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/7iHl71nt49o"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <YoutubeIcon />
              How to Design APIs Like a Senior Engineer (Hayk Simonyan)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

