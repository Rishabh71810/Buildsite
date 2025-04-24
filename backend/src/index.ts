require("dotenv").config();
// Default
// Default
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
      stream: true,
      temperature: 0.7,
      model: "llama-3.3-70b-versatile",
    })
    .then(async (stream) => {
      for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
      }
    });
}

main();