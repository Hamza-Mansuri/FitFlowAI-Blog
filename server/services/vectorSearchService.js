import { getAllModels } from "../models/Blog.js";

/**
 * MongoDB Atlas Vector Search Index Configuration Details:
 * 
 * Create a Vector Search Index named "vector_index" on each of the 5 collections 
 * (workouts, nutritions, recoverys, healths, lifestyles) with the following JSON:
 * 
 * {
 *   "fields": [
 *     {
 *       "numDimensions": 768,
 *       "path": "embedding",
 *       "similarity": "cosine",
 *       "type": "vector"
 *     },
 *     {
 *       "path": "status",
 *       "type": "filter"
 *     }
 *   ]
 * }
 */

export const searchBlogsVector = async (queryEmbedding) => {
  if (!queryEmbedding || queryEmbedding.length === 0) return [];

  const models = getAllModels();
  const allResults = [];

  try {
    for (const Model of models) {
      // Execute the $vectorSearch aggregation pipeline
      const blogs = await Model.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryEmbedding,
            numCandidates: 15,
            limit: 5,
            filter: { status: "approved" } // Only fetch approved public articles
          }
        },
        {
          $project: {
            title: 1,
            description: 1,
            category: 1,
            content: 1,
            author: 1,
            expertTip: 1,
            takeaways: 1,
            score: { $meta: "vectorSearchScore" }
          }
        }
      ]);

      allResults.push(...blogs);
    }

    // Sort combined results by relevance score (highest score first) and select top 5
    const topResults = allResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return topResults;
  } catch (error) {
    console.error("MongoDB Atlas Vector Search failed:", error);
    // Throw error so the caller knows to fall back to keyword search
    throw error;
  }
};
