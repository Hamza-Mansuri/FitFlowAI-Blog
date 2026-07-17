// Helper to clean HTML markup and retain structural text layouts
const cleanHtmlToText = (htmlContent) => {
  if (!htmlContent) return "";

  let text = htmlContent;
  
  // Format headings
  text = text.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, "\n### $1\n");
  
  // Format list items
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, "\n* $1");
  
  // Format paragraphs
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n");
  
  // Strip all other HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Normalize multiple spaces or linebreaks
  text = text.replace(/\n\s*\n+/g, "\n\n").trim();
  
  return text;
};

// Limit text string to a maximum word count
const limitWords = (text, maxWords = 600) => {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "... [Truncated]";
};

export const buildContextFromBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return "";

  let contextSegments = [];

  for (const blog of blogs) {
    const cleanedContent = cleanHtmlToText(blog.content);
    const takeaways = (blog.takeaways || []).map((t) => `* ${t}`).join("\n");
    
    const blogSegment = `
--- FitFlowAI Article Reference ---
Title: ${blog.title}
Category: ${blog.category}
Author: ${blog.author}
Description: ${blog.description}
Key Takeaways:
${takeaways || "None"}
Expert Tip: ${blog.expertTip || "None"}
Content details:
${cleanedContent}
`;
    contextSegments.push(blogSegment.trim());
  }

  // Combine references
  const fullContext = contextSegments.join("\n\n");
  
  // Limit context size to 500-800 words (we'll limit to 650 words maximum to fit safety windows)
  return limitWords(fullContext, 650);
};
