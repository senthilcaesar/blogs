import { CodeCard } from '../../components/CodeCard';

const updateRule = `Q(s, a)  ←  Q(s, a)  +  α · [ r  +  γ · max Q(s′, a′)  −  Q(s, a) ]`;

const qLearningCode = `import numpy as np

Q = np.zeros((n_states, n_actions))
alpha, gamma, epsilon = 0.1, 0.99, 0.1

for episode in range(5000):
    s = env.reset()
    done = False
    while not done:
        a = env.random_action() if np.random.rand() < epsilon else np.argmax(Q[s])
        s_next, r, done = env.step(a)
        Q[s, a] += alpha * (r + gamma * np.max(Q[s_next]) * (not done) - Q[s, a])
        s = s_next`;

const gap = { marginTop: '1rem' };

export function QTableArticle() {
  return (
    <>
      <p className="article-lead">
        A Q-table is a lookup table that holds an agent&rsquo;s estimate of how good each action is in each situation. It&rsquo;s the core data structure of <strong>Q-learning</strong>, one of the basic algorithms in reinforcement learning, where a program (the <em>agent</em>) learns by trial and error from rewards instead of being shown the right answers.
      </p>

      <section className="article-panel">
        <h2>The idea</h2>
        <p>
          Picture a robot in a small grid maze. In every cell (a <strong>state</strong>) it can move up, down, left or right (an <strong>action</strong>). It doesn&rsquo;t know the maze ahead of time. It only gets a <strong>reward</strong>, such as +10 for reaching the exit or &minus;1 for each step taken. The catch is that the big reward arrives only at the end, so the robot can&rsquo;t tell which of its earlier moves actually helped. The Q-table is how it keeps track.
        </p>
        <p style={gap}>
          The Q-table has one row per state and one column per action. Each cell holds a number, <strong>Q(s, a)</strong>. That number is the agent&rsquo;s estimate of the total future reward it will get if it takes action <em>a</em> in state <em>s</em> and then keeps acting well after that.
        </p>

        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>↑ Up</th>
                <th>↓ Down</th>
                <th>← Left</th>
                <th>→ Right</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(0,0)</td>
                <td>-1.2</td>
                <td>0.5</td>
                <td>-1.0</td>
                <td><strong>2.3</strong></td>
              </tr>
              <tr>
                <td>(0,1)</td>
                <td>0.1</td>
                <td><strong>4.7</strong></td>
                <td>1.1</td>
                <td>-0.8</td>
              </tr>
              <tr>
                <td>…</td>
                <td>…</td>
                <td>…</td>
                <td>…</td>
                <td>…</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: '0.75rem', fontSize: '0.9em', color: 'var(--text-muted)' }}>
          Illustrative values, as they might look after some training. The best action in each row is in bold.
        </p>

        <p style={{ marginTop: '1.25rem' }}>
          To act, the agent finds its current state&rsquo;s row and picks the action with the highest value. That is its <strong>policy</strong>.
        </p>
      </section>

      <section className="article-panel">
        <h2>How it learns</h2>
        <p>
          All values start at zero or random, so the table is useless at first. The agent explores, and after every step it updates one cell with the <strong>Bellman update</strong>:
        </p>

        <CodeCard code={updateRule} file='update rule' />

        <ul className="bullet-list" style={{ marginTop: '1.25rem' }}>
          <li><strong>r</strong>: the reward just received</li>
          <li><strong>s′</strong>: the state it landed in</li>
          <li><strong>max Q(s′, a′)</strong>: the best value in the new state&rsquo;s row, taken over every action <em>a′</em> it could make there</li>
          <li><strong>α (learning rate)</strong>: how far each update moves the old value toward the new estimate (e.g., 0.1)</li>
          <li><strong>γ (discount factor)</strong>: how much future rewards count compared with immediate ones (e.g., 0.9–0.99)</li>
          <li><strong>episode</strong>: one full trip, from the robot&rsquo;s start until it reaches the exit</li>
        </ul>

        <p style={gap}>
          The term in brackets is the <strong>temporal-difference error</strong>: the gap between what the agent expected and what it just saw. Over many episodes, the reward at the exit flows backward through the table. Cells near the goal get high values first, and those values spread outward until every cell points toward the exit.
        </p>
      </section>

      <section className="article-panel">
        <h2>Exploration vs. exploitation</h2>
        <p>
          If the agent always picked the current best action, it could lock in an early bad guess. The usual fix is <strong>ε-greedy</strong>: with probability ε (say 10%) take a random action, and otherwise take the best one. ε usually starts high and is lowered over training.
        </p>
      </section>

      <section className="article-panel">
        <h2>Minimal code</h2>
        <p>
          Here <code>env</code> stands for the maze: <code>reset()</code> puts the robot back at the start, and <code>step(a)</code> makes a move and returns the new cell, the reward and whether the episode is over. For a 4 × 4 maze, <code>n_states</code> is 16 and <code>n_actions</code> is 4, so the whole table is 64 numbers.
        </p>
        <CodeCard code={qLearningCode} lang='python' file='q_learning.py' />
      </section>

      <section className="article-panel">
        <h2>Where it breaks down</h2>
        <p>
          A Q-table needs one cell for every state–action pair, so it only works when the states are <strong>small and discrete</strong>: grid worlds, simple board games, small control problems. For an Atari screen or a robot&rsquo;s continuous joint angles, the table would be far too large, and the agent would almost never see the same state twice.
        </p>
        <p style={gap}>
          The standard fix is to replace the table with a <strong>function approximator</strong>, usually a neural network that takes a state and outputs Q-values. That&rsquo;s a <strong>Deep Q-Network (DQN)</strong>, the 2015 DeepMind result that learned Atari games from pixels. The update rule is the same; only the storage changes from a table to a network.
        </p>
        <p style={gap}>
          Back in our maze, the robot never learns a map. It only learns, row by row, which way the numbers get bigger, and that is enough to find the exit.
        </p>
      </section>
    </>
  );
}
