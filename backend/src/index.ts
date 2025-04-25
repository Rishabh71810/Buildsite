require("dotenv").config();
// Default
// Default
import Groq from "groq-sdk";
import { getSystemPrompt } from "./prompts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: getSystemPrompt()
        },
        {
          role: "user",
          content: "create a todo application using react and typescript with a backend",
        },
      ],
      stream: true,
      temperature: 0.7,
      model: "llama-3.3-70b-versatile"
    })
    .then(async (stream) => {
      for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
      }
    });
}

main();