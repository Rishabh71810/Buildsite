require("dotenv").config();
import express from "express";
import Groq from "groq-sdk";
import { getSystemPrompt, BASE_PROMPT } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import cors from "cors";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const app = express();
app.use(cors());
app.use(express.json());

app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      max_tokens: 200,
      temperature: 0,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('Invalid response from Groq API');
    }

    const answer = response.choices[0].message.content.trim().toLowerCase();

    if (answer === "react") {
      res.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      });
    } else if (answer === "node") {
      res.json({
        prompts: [
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodeBasePrompt],
      });
    } else {
      res.status(403).json({ message: "You can't access this." });
    }
  } catch (err) {
    console.error("Template Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: getSystemPrompt(),
        },
        ...messages,
      ],
      model: "llama3-70b-8192",
      max_tokens: 8000,
      temperature: 0.7,
    });

    res.json({
      response: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Groq API Server running on port 3000"));
