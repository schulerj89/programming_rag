const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { OpenAIEmbeddings } = require("@langchain/openai");
require('dotenv').config();

// Function to initialize and save the vector store
const initializeVectorStore = async (texts, directory) => {
  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await FaissStore.fromTexts(texts, [], embeddings);
  await vectorStore.save(directory);

  console.log("Vector store saved to directory:", directory);
};

// Main function to run the script
const run = async () => {
  const texts = [
    "Django 5.0.7 release notes July 9, 2024 Django 5.0.7 fixes two security issues with severity “moderate”, two security issues with severity “low”, and several bugs in 5.0.6. Bugfixes Fixed a bug in Django 5.0 that caused a crash of Model.full_clean() on unsaved model instances with a GeneratedField and certain defined Meta.constraints (#35560).",
    "Bye bye",
    "hello nice world"
  ];
  const directory = "./vector_db";

  await initializeVectorStore(texts, directory);
};

run().catch(error => console.error("Error initializing vector store:", error));
