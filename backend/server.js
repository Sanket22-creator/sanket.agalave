require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");

const app = express();

// CORS middleware - enable for all origins
const corsOptions = {
  origin: function(origin, callback) {
    callback(null, true); // Allow all origins
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const documents = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data", "documents.json"),
    "utf8"
  )
);

app.get("/", (req, res) => {
  res.send("Sanket AI Backend Running");
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        error: "Question required",
      });
    }

    const keywords = question
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3);

    const relevantDocs = documents
      .map(doc => {
        let score = 0;

        keywords.forEach(keyword => {
          if (doc.text.toLowerCase().includes(keyword)) {
            score++;
          }
        });

        return { ...doc, score };
      })
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    console.log(
      "Selected docs:",
      relevantDocs.map(d => d.file)
    );

    const context = relevantDocs
      .map((d) => d.text.substring(0, 3000))
      .join("\n\n");

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
`
        },
        {
          role: "user",
          content: `
Question:
${question}

Knowledge Base:
${context}
`
        }
      ],
      temperature: 0.2,
    });

    res.json({
      answer: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
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
    question
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
