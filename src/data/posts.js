const imageUrl = (fileName) => new URL(`../../images/${fileName}`, import.meta.url).href;

export const posts = [
  {
    title: "AI Changed the rules at Duolingo",
    slug: 'duolingo-ai-culture',
    category: 'AI',
    tags: ['ai', 'culture', 'product'],
    excerpt:
      'How Duolingo uses "vibe coding," prototypes, and technical literacy to drive quality outcomes for learners.',
    image: imageUrl('duolingo.avif'),
    date: 'Apr 2026',
    priority: 'High',
    type: 'local',
    route: '/posts/duolingo-ai-culture',
    author: {
      name: 'Luis von Ahn',
      role: 'CEO of Duolingo',
      initials: 'LA',
    },
    hero: {
      eyebrow: 'AI Culture',
      summary:
        'Operating principles for a high-performance AI culture that focuses on outcomes over inputs.',
    },
  },
  {
    title: 'Career Move Advice: Market, Company, Job',
    slug: 'career-move-advice-andy-kofoid',
    category: 'Career',
    tags: ['career', 'strategy', 'advice'],
    excerpt:
      'Andy Kofoid, President of Databricks, shares why you should look at the market and company before focusing on your title or scope.',
    image: imageUrl('andy.png'),
    date: 'Apr 2026',
    priority: 'High',
    type: 'local',
    route: '/posts/career-move-advice-andy-kofoid',
    author: {
      name: 'Andy Kofoid',
      role: 'President of Databricks',
      initials: 'AK',
    },
    hero: {
      eyebrow: 'Career Strategy',
      summary:
        'Why the market and company trajectory matters more than your title or scope.',
    },
  },
  {
    title: '10 steps to master AI agents and Claude Code',
    slug: 'ai-agents-mastery',
    category: 'AI',
    tags: ['ai', 'agents', 'strategy'],
    excerpt:
      'A practical synthesis of Jack Clark’s advice on specification writing, agent workflows, and building better judgment around AI tools.',
    image: imageUrl('jack.jpg'),
    date: 'Mar 2026',
    priority: 'High',
    type: 'local',
    route: '/posts/ai-agents-mastery',
    author: {
      name: 'Jack Clark',
      role: 'Co-Founder of Anthropic',
      initials: 'JC',
    },
    hero: {
      eyebrow: 'AI Strategy',
      summary:
        'Ten operating principles for getting real leverage from agentic tools without surrendering judgment.',
    },
  },
  {
    title: 'How to have a successful interview',
    slug: 'successful-interview',
    category: 'Career',
    tags: ['career', 'interview', 'advice'],
    excerpt:
      'Interview advice from Stephen A. Schwarzman on preparation, authenticity, candor, and curiosity.',
    image: imageUrl('blackstone.jpg'),
    date: 'Mar 2026',
    priority: 'High',
    type: 'local',
    route: '/posts/successful-interview',
    author: {
      name: 'Stephen A. Schwarzman',
      role: 'CEO and Co-Founder of Blackstone',
      initials: 'SS',
    },
    hero: {
      eyebrow: 'Career Development',
      summary:
        'A direct checklist for showing up in interviews with preparation, confidence, and honesty.',
    },
  },
  {
    title: "5 Articles to figure out what's next",
    slug: 'whats-next',
    category: 'Career',
    tags: ['career', 'planning', 'articles'],
    excerpt:
      'A curated reading list for career reflection, decision-making, and finding work that fits.',
    image: imageUrl('next.png'),
    date: 'Feb 2026',
    priority: 'Medium',
    type: 'local',
    route: '/posts/whats-next',
    author: {
      name: 'Reading List',
      role: 'Career Direction Notes',
      initials: 'RL',
    },
    hero: {
      eyebrow: 'Career Compass',
      summary:
        'Five essays worth revisiting when you need clarity on direction, ambition, or fit.',
    },
  },
  {
    title: 'Agency is the most important skill in the AI era',
    slug: 'agency-ai-era',
    category: 'AI',
    tags: ['ai', 'agency', 'leadership'],
    excerpt:
      'Why initiative, resourcefulness, and ownership compound faster than technical skill alone in the AI era.',
    image: imageUrl('agency.jpeg'),
    date: 'Feb 2026',
    priority: 'High',
    type: 'external',
    url: 'https://woolly-revolve-fec.notion.site/Agency-is-the-most-important-skill-in-the-AI-era-30fbdfa1611d80449403fc5b26b06584?source=copy_link',
    author: {
      name: 'Notion Essay',
      role: 'External Read',
      initials: 'NT',
    },
  },
  {
    title: 'Building Your First AI Agent Team',
    slug: 'first-ai-agent-team',
    category: 'AI',
    tags: ['ai', 'agents', 'productivity'],
    excerpt:
      'A beginner-friendly guide to moving from single prompts to coordinated teams of AI helpers.',
    image: imageUrl('agent.jpeg'),
    date: 'Feb 2026',
    priority: 'High',
    type: 'external',
    url: 'https://woolly-revolve-fec.notion.site/Beginner-s-Guide-Building-Your-First-AI-Agent-Team-30cbdfa1611d8012b357c31e102a2d92?source=copy_link',
    author: {
      name: 'Notion Essay',
      role: 'External Read',
      initials: 'NT',
    },
  },
  {
    title: 'Practice Questions SQL and Python',
    slug: 'practice-questions-sql-python',
    category: 'Code',
    tags: ['sql', 'python', 'practice'],
    excerpt:
      'A practice set for sharpening data manipulation and programming fundamentals.',
    image: imageUrl('questions.png'),
    date: 'Feb 2026',
    priority: 'Medium',
    type: 'external',
    url: 'https://woolly-revolve-fec.notion.site/Coding-Practice-308bdfa1611d8070b2ecc6644ee23dbc?source=copy_link',
    author: {
      name: 'Notion Essay',
      role: 'External Read',
      initials: 'NT',
    },
  },
  {
    title: 'Confidence Intervals: Correct and Incorrect Interpretations',
    slug: 'confidence-intervals',
    category: 'Statistics',
    tags: ['statistics', 'data', 'analysis'],
    excerpt:
      'A breakdown of what confidence intervals do and do not say in statistical analysis.',
    image: imageUrl('interval.png'),
    date: 'Feb 2026',
    priority: 'Medium',
    type: 'external',
    url: 'https://woolly-revolve-fec.notion.site/Confidence-intervals-Correct-and-incorrect-interpretations-304bdfa1611d80779a19f78c67263804?source=copy_link',
    author: {
      name: 'Notion Essay',
      role: 'External Read',
      initials: 'NT',
    },
  },
  {
    title: 'Data Analysis with Claude Sonnet 4.5',
    slug: 'data-analysis-claude-sonnet',
    category: 'Data',
    tags: ['data', 'ai', 'analysis'],
    excerpt:
      'Notes on using Claude Sonnet for regional performance analysis, trends, and profit insights.',
    image: imageUrl('sql.jpeg'),
    date: 'Feb 2026',
    priority: 'High',
    type: 'external',
    url: 'https://woolly-revolve-fec.notion.site/Data-Analysis-with-Claude-Sonnet-4-5-2f9bdfa1611d80e6953be762481a6f30?source=copy_link',
    author: {
      name: 'Notion Essay',
      role: 'External Read',
      initials: 'NT',
    },
  },
  {
    title: 'What is Serum Cholesterol?',
    slug: 'serum-cholesterol',
    category: 'Health',
    tags: ['health', 'medicine', 'wellness'],
    excerpt:
      'A compact guide to serum cholesterol, reference ranges, and why lipid profiles matter.',
    image: imageUrl('serum.jpeg'),
    date: 'Feb 2026',
    priority: 'Low',
    type: 'local',
    route: '/posts/serum-cholesterol',
    author: {
      name: 'Health Notes',
      role: 'Explainer',
      initials: 'HN',
    },
    hero: {
      eyebrow: 'Health Explainer',
      summary:
        'A plain-language refresher on cholesterol markers, target ranges, and risk context.',
    },
  },
  {
    title: '3 Questions with Eric Mosley, CEO of Workhuman',
    slug: 'eric-mosley-interview',
    category: 'Leadership',
    tags: ['leadership', 'hr', 'culture'],
    excerpt:
      'A short interview on culture, recognition, and what AI gets wrong in HR.',
    image: imageUrl('eric.png'),
    date: 'Feb 2026',
    priority: 'Medium',
    type: 'local',
    route: '/posts/eric-mosley-interview',
    author: {
      name: 'Eric Mosley',
      role: 'CEO of Workhuman',
      initials: 'EM',
    },
    hero: {
      eyebrow: 'Leadership Interview',
      summary:
        'Three sharp takes on culture as a performance system and AI as an amplifier of HR data quality.',
    },
  },
  {
    title: 'Understanding Web Development',
    slug: 'understanding-web-development',
    category: 'Web Dev',
    tags: ['webdev', 'frontend', 'html'],
    excerpt:
      'A planned primer on modern web development, frameworks, and core front-end thinking.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    date: 'Dec 2023',
    priority: 'Low',
    type: 'comingSoon',
    author: {
      name: 'Draft',
      role: 'Coming Soon',
      initials: 'CS',
    },
  },
  {
    title: 'Best Practices for Clean Code',
    slug: 'best-practices-clean-code',
    category: 'Code',
    tags: ['python', 'clean-code', 'best-practices'],
    excerpt:
      'A planned guide to writing cleaner, more maintainable code across day-to-day programming work.',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    date: 'Nov 2023',
    priority: 'Medium',
    type: 'comingSoon',
    author: {
      name: 'Draft',
      role: 'Coming Soon',
      initials: 'CS',
    },
  },
  {
    title: 'Top Platforms to Build Export Presence & Generate Global Leads',
    slug: 'export-platforms',
    category: 'Export',
    tags: ['export', 'business', 'global'],
    excerpt:
      'Ten platforms that help exporters increase visibility, credibility, and direct buyer access.',
    image: imageUrl('export.jpeg'),
    date: 'Feb 2026',
    priority: 'Medium',
    type: 'local',
    route: '/posts/export-platforms',
    author: {
      name: 'Export Notes',
      role: 'Growth Guide',
      initials: 'EX',
    },
    hero: {
      eyebrow: 'Global Growth',
      summary:
        'A ranked shortlist of platforms that matter when you want more international visibility and qualified leads.',
    },
  },
];

export const localPosts = posts.filter((post) => post.type === 'local');
