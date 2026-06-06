require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  })
);
app.options(/.*/, cors());

app.use(express.json());

const groq = process.env.GROQ_API_KEY
  ? new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  : null;

const documents = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "documents.json"), "utf8")
);

function scoreDocuments(question) {
  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  return documents
    .map((doc) => {
      const text = String(doc.text || "").toLowerCase();
      let score = 0;

      keywords.forEach((keyword) => {
        if (text.includes(keyword)) {
          score += 1;
        }
      });

      return { ...doc, score };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function buildFallbackAnswer(question, relevantDocs) {
  const snippets = relevantDocs
    .slice(0, 3)
    .flatMap((doc) =>
      String(doc.text || "")
        .split(/(?<=[.!?])\s+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 2)
    )
    .slice(0, 6);

  if (!snippets.length) {
    return "I could not find enough matching profile information for that question.";
  }

  return [
    `I found related profile information for: "${question}"`,
    "",
    ...snippets.map((line) => `- ${line}`),
  ].join("\n");
}

app.get("/", (req, res) => {
  res.send("Sanket AI Backend Running");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        error: "Question required",
      });
    }

    const relevantDocs = scoreDocuments(question);
    const fallbackAnswer = buildFallbackAnswer(question, relevantDocs);
    const context = relevantDocs.map((doc) => String(doc.text || "").substring(0, 3000)).join("\n\n");

    if (!groq) {
      return res.json({ answer: fallbackAnswer });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are Sanket Agalave's professional AI recruiter assistant.

Answer questions about:
- Experience
- Education
- Projects
- Skills
- Certifications
- Career interests

Rules:
- Be concise.
- Answer like a recruiter-facing assistant.
- Use bullet points when helpful.
- Never mention document names.
- Never say "Based on the provided information".
- Speak confidently when the information exists.
- If information is missing, say "I could not find evidence of that in Sanket's profile."
- Focus on business value and achievements.
`,
        },
        {
          role: "user",
          content: `
Question:
${question}

Knowledge Base:
${context}
`,
        },
      ],
      temperature: 0.2,
    });

    res.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.json({
      answer:
        "I’m having trouble reaching the AI provider right now, but the chatbox is still available with profile-based fallback answers.",
      error: error.message,
    });
  }
});

app.get("/ask-test", async (req, res) => {
  const question = req.query.q;

  if (!question) {
    return res.send("Add ?q=your question");
  }

  res.json({
    question,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
