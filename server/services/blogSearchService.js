import { getAllModels } from "../models/Blog.js";

// Helper to filter out stop words and extract significant search keywords
const extractKeywords = (queryText) => {
  const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
    "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
    "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
    "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
    "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
    "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
    "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
    "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then",
    "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
    "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're",
    "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while",
    "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll",
    "you're", "you've", "your", "yours", "yourself", "yourselves", "want", "like", "need", "get", "give", "tell"
  ]);

  return queryText
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // replace punctuation with spaces
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
};

export const searchBlogs = async (queryText) => {
  const keywords = extractKeywords(queryText);
  if (keywords.length === 0) return [];

  const models = getAllModels();
  const searchResults = [];

  // Construct regex patterns for keywords
  const regexPatterns = keywords.map((k) => new RegExp(k, "i"));

  // Build regex query filter
  const queryFilter = {
    status: "approved", // Only search approved, published, public blogs
    $or: [
      { title: { $in: regexPatterns } },
      { description: { $in: regexPatterns } },
      { category: { $in: regexPatterns } },
      { content: { $in: regexPatterns } },
      { author: { $in: regexPatterns } },
      { expertTip: { $in: regexPatterns } },
      { takeaways: { $in: regexPatterns } }
    ]
  };

  try {
    for (const Model of models) {
      // Query database efficiently, selecting only required fields to avoid overhead
      const blogs = await Model.find(queryFilter)
        .select("title description category content author expertTip takeaways")
        .limit(3)
        .lean();

      searchResults.push(...blogs);
    }

    // Rank matching results by number of keyword hits
    const scoredResults = searchResults.map((blog) => {
      let score = 0;
      const combinedText = `${blog.title} ${blog.description} ${blog.category} ${blog.content} ${blog.expertTip} ${(blog.takeaways || []).join(" ")}`.toLowerCase();
      
      keywords.forEach((keyword) => {
        const matches = combinedText.match(new RegExp(keyword, "g"));
        if (matches) {
          score += matches.length;
        }
      });
      return { blog, score };
    });

    // Sort by relevance score descending and take the top 3
    const topResults = scoredResults
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.blog);

    return topResults;
  } catch (error) {
    console.error("MongoDB Blog search error:", error);
    return [];
  }
};
