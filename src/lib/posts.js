export function filterPosts(posts, query, activeCategory) {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      ...(post.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}

export function getDailySpotlight(posts, date = new Date()) {
  if (!posts.length) {
    return null;
  }

  const normalizedDay = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  const dayNumber = Math.floor(normalizedDay / 86400000);
  return posts[dayNumber % posts.length];
}
