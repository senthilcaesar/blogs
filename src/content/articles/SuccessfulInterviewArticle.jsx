export function SuccessfulInterviewArticle() {
  const points = [
    {
      title: 'Be on time',
      body: 'Punctuality is the first indicator of how much thought and preparation you have put into an interview.',
    },
    {
      title: 'Be authentic',
      body: "Interviews are a mutual assessment, a bit like speed dating; everyone is looking for the right fit. Be comfortable and natural, and chances are you will be liked for who you are. If you share who you are and the interview results in a job offer, that's great. If it doesn't work, it's likely that the organization wasn't right for you either. Better to know and move on.",
    },
    {
      title: 'Be prepared',
      body: "Learn about the company. Interviewers always enjoy discussing what's happening in their environment. Plus it's a good way for you to hear how enthusiastic an employee feels about the place where he or she works. Describe what draws you to the company and why. An interviewer wants to understand your motives and whether they fit with the organization's culture.",
    },
    {
      title: 'Be candid',
      body: "Don't be afraid to talk about what's on your mind. Focus less on impressing the interviewer and more on being open and striving for an honest conversation.",
    },
    {
      title: 'Be confident',
      body: 'Approach the situation as an equal, not as a supplicant. In most situations, employers are looking for someone who can hold the table. Provided they are not arrogant.',
    },
    {
      title: 'Be curious',
      body: 'The best interviews are interactive. Ask questions, ask for advice, ask your interviewers what they enjoy most about working for their organization. Find a way to engage interviewers, and always make sure the conversation goes both ways. Interviewers like to talk too, so that they can share what they know.',
    },
    {
      title: 'Avoid discussing divisive political issues unless asked',
      body: 'In that case, be straightforward. Describe what you believe and why, but do not be argumentative.',
    },
    {
      title: 'Mention people selectively',
      body: 'Mention people you know at an organization only if you like and respect them. Your interviewer will be judging your taste in people.',
    },
  ];

  return (
    <section className="article-stack">
      {points.map((point, index) => (
        <article className="insight-card" key={point.title}>
          <span className="insight-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{point.title}</h2>
            <p>{point.body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
