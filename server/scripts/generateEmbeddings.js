import mongoose from "mongoose";
import { getAllModels } from "../models/Blog.js";
import { generateEmbedding } from "../services/embeddingService.js";
import connectDB from "../config/db.js";
import "dotenv/config";

async function backfillEmbeddings() {
  const force = process.argv.includes("--force");
  
  try {
    await connectDB();
    console.log("Connected to MongoDB Database for backfilling embeddings.");

    const models = getAllModels();
    let totalUpdated = 0;

    for (const Model of models) {
      const collectionName = Model.collection.name;
      console.log(`\n⏳ Scanning collection: "${collectionName}"...`);
      
      const blogs = await Model.find({});
      console.log(`📋 Found ${blogs.length} total documents.`);

      for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i];
        
        // Skip document if embedding already exists (unless --force flag is passed)
        if (blog.embedding && blog.embedding.length > 0 && !force) {
          console.log(`[${i + 1}/${blogs.length}] ➡️ Skipped (Embedding already exists): "${blog.title}"`);
          continue;
        }

        console.log(`[${i + 1}/${blogs.length}] 🧠 Generating embedding for: "${blog.title}"...`);
        const textToEmbed = `${blog.title} ${blog.description} ${blog.category} ${blog.expertTip || ""} ${(blog.takeaways || []).join(" ")}`;
        
        try {
          const vector = await generateEmbedding(textToEmbed);
          if (vector && vector.length > 0) {
            blog.embedding = vector;
            // Use markModified if saving nested arrays, or standard save
            await blog.save({ validateBeforeSave: false });
            totalUpdated++;
            console.log(`✅ Stored vector (${vector.length} dimensions)`);
          } else {
            console.warn("⚠️ Received empty vector response.");
          }
        } catch (embedError) {
          console.error(`❌ Failed to embed document "${blog.title}":`, embedError.message);
        }
      }
    }

    console.log(`\n🎉 Backfill process finished! Total updated documents: ${totalUpdated}`);
  } catch (error) {
    console.error("❌ Backfill task crashed:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

backfillEmbeddings();
