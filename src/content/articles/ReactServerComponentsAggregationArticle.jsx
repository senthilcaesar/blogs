export function ReactServerComponentsAggregationArticle() {
  return (
    <>
      <section className="article-panel">
        <h2>The Problem with Heavy Browsers</h2>
        <p>
          For a long time, we built Single Page Applications (SPAs). In an SPA, the server hands the user&apos;s browser a nearly empty page and a massive bundle of JavaScript. The browser has to download it all and run it to build the interface. The user&apos;s device ends up doing all the heavy lifting. If the network is slow or the phone is old, the app is slow.
        </p>
        <p style={{ marginTop: '1rem' }}>
          To fix this, developers started using Server-Side Rendering (SSR). The server runs the code and sends fully formed HTML to the browser. The user sees the page almost instantly. But there is a catch. The page is basically a static picture at first. The browser still has to download that giant JavaScript bundle in the background and wire it up to the buttons and forms to make them interactive. We call this process &quot;hydration.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          It is a good step, but we are still sending too much code to the frontend.
        </p>
      </section>

      <section className="article-panel">
        <h2>A Practical Shift: React Server Components</h2>
        <p>
          React Server Components (RSC) solve this by keeping some components strictly on the server. They never ship any JavaScript to the browser.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Because they run on the backend, they sit right next to your database and internal APIs. They fetch the data, render the final visual output, and send just that lightweight result to the user.
        </p>
        <p style={{ marginTop: '1rem' }}>
          And they do this efficiently using &quot;streaming.&quot; Instead of making the browser wait until the entire page is built, the server sends chunks as they are ready. The navigation bar appears immediately, and the heavier data feeds stream in a moment later.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Backend-for-Frontend (BFF) Pattern</h2>
        <p>
          This is where the &quot;Aggregation Layer&quot; comes in. Modern apps need data from all over the place. A single dashboard might pull from a user database, an order system, and a payment gateway.
        </p>
        <p style={{ marginTop: '1rem' }}>
          In an SPA, the browser makes three separate network requests over the public internet to gather this data. This is slow.
        </p>
        <p style={{ marginTop: '1rem' }}>
          With React Server Components, you move this orchestration back to the server. The server acts as a Backend-for-Frontend. It handles the aggregation. It talks to the user database, the order system, and the payment gateway over a lightning-fast internal network. It stitches the data together and sends a single, clean UI to the browser.
        </p>
      </section>

      <section className="article-panel">
        <h2>Real Security</h2>
        <p>
          This pattern also makes security straightforward. Take Role-Based Access Control (RBAC).
        </p>
        <p style={{ marginTop: '1rem' }}>
          If you try to hide an &quot;Admin Settings&quot; button using frontend code, a clever user can just inspect the page and unhide it. The browser is fundamentally insecure. But if you check the user&apos;s role on the server using an RSC, the server simply decides not to render the button. It never gets sent to the browser. You cannot hack a button that does not exist.
        </p>
      </section>

      <section className="article-panel">
        <h2>The Right Tools for the Job</h2>
        <p>
          You might wonder if you can just use a standard backend framework like NestJS to serve React Server Components. The answer is no.
        </p>
        <p style={{ marginTop: '1rem' }}>
          NestJS is fantastic for building your core backend services. But RSCs require a deep connection with a frontend bundler and router. Currently, you use a framework like Next.js to build this aggregation layer. In practice, your Next.js application serves the frontend and talks directly to your NestJS server, which handles the core business logic.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This architecture just makes sense. It takes the heavy lifting and complex orchestration away from the user&apos;s browser and puts it back on the server where it belongs.
        </p>
      </section>
    </>
  );
}
