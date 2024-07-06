const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { OpenAIEmbeddings } = require("@langchain/openai");
const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI();
const directory = "./vector_db";

const loadVectorStore = async () => {
  return FaissStore.load(directory, new OpenAIEmbeddings());
};

const generateCompletion = async (prompt, context) => {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: "system", content: `You are an expert in programming languages and know all about programming frameworks. Consider this context before answering: '''${context}'''` },
      { role: "user", content: prompt }
    ],
    stream: true,
  });
};

app.get('/api/chat', async (req, res) => {
  const { prompt } = req.query;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const vectorStore = await loadVectorStore();
    const result = await vectorStore.similaritySearch(prompt, 1);
    const context = result[0]?.pageContent || '';

    const completion = await generateCompletion(prompt, context);

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(`data: ${content}\n\n`);
    }
    res.end();
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).send('Error fetching response');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
