const loopImg = new URL('../../../images/rlhf-1.webp', import.meta.url).href;
const stepsImg = new URL('../../../images/rlhf-2.webp', import.meta.url).href;

export function RlhfArticle() {
  return (
    <>
      <p className="article-lead">
        Ask a raw language model to &quot;explain the moon landing to a 6 year old&quot; and it may hand you a list of similar questions instead of an answer. It isn&apos;t broken. It was trained to continue text, and on the internet a question is often followed by more questions. Reinforcement Learning from Human Feedback (RLHF) is how a model learns to answer instead.
      </p>

      <section className="article-panel">
        <h2>Why you can&apos;t just write the rules</h2>
        <p>
          What makes an answer good for a six-year-old? It should be short and warm, it should leave out orbital mechanics, and it should be true. You can&apos;t write that down as a loss function, because there isn&apos;t a formula for &quot;helpful&quot;. People can tell a good answer from a bad one when they see it, though, even when they can&apos;t define the difference.
        </p>
        <p style={{ marginTop: '1rem' }}>
          RLHF turns that judgment into a training signal. People compare the model&apos;s answers and pick the better ones, and the model is then tuned to produce more of what they picked. The loop below shows the whole idea: collect human preferences, optimise for them, repeat.
        </p>

        <div style={{ margin: '1.75rem 0 0' }}>
          <img
            src={loopImg}
            alt="How RLHF works: collect human preferences, then optimise the model for those preferences, in a loop"
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
        </div>
      </section>

      <section className="article-panel">
        <h2>The three steps</h2>
        <p>
          OpenAI&apos;s InstructGPT work laid out the recipe that most chat models still follow, in three steps.
        </p>
        <ol className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Show it how.</strong> A labeller writes a good answer to a prompt such as the moon-landing one, and the model is fine-tuned on many such examples. This is supervised fine-tuning (SFT).
          </li>
          <li>
            <strong>Teach a judge.</strong> The model writes several answers to the same prompt and a labeller ranks them from best to worst. Those rankings train a second model, the reward model, which learns to give any answer a score for how much a person would like it.
          </li>
          <li>
            <strong>Practise against the judge.</strong> The model answers new prompts, the reward model scores each answer, and an algorithm called PPO nudges the model towards higher-scoring answers. No human has to watch this step; the reward model stands in for them.
          </li>
        </ol>

        <div style={{ margin: '1.75rem 0 0' }}>
          <img
            src={stepsImg}
            alt="The three steps of RLHF: supervised fine-tuning on demonstrations, training a reward model from ranked comparisons, and optimising the policy with PPO"
            style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}
          />
        </div>
      </section>

      <section className="article-panel">
        <h2>Why it mattered, and where it falls short</h2>
        <p>
          The result surprised people. OpenAI reported that labellers preferred answers from a 1.3-billion-parameter InstructGPT model over those from the 175-billion-parameter GPT-3, a model more than 100 times larger. Feedback did more for usefulness than size did.
        </p>
        <p style={{ marginTop: '1rem' }}>
          RLHF has limits, though. The model learns what the labellers liked, which isn&apos;t always what is true, and it can learn to please the reward model rather than the person: confident tone, extra length, polite filler. OpenAI&apos;s own write-up says the models still make simple mistakes and can follow harmful instructions. Newer methods such as DPO and AI-generated feedback try to make the same idea cheaper, but the core remains a person saying &quot;this one is better.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          So the moon-landing answer you get today is short, kind and roughly right because thousands of people once ranked answers like it. The model never learned what a six-year-old is. It learned what we prefer.
        </p>
      </section>

      <section className="article-panel">
        <h2>References</h2>
        <ul className="bullet-list" style={{ marginTop: '1rem' }}>
          <li>
            <a
              href="https://openai.com/index/instruction-following/"
              target="_blank"
              rel="noreferrer"
            >
              Aligning language models to follow instructions (OpenAI)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
