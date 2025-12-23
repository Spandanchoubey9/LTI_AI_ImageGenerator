import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Conrim running of server
app.get("/", (req, res) => {
  res.send("Backend running with Pollinations API key");
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt);

    const response = await fetch(
      `https://image.pollinations.ai/prompt/${encodedPrompt}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Pollinations API error");
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error("POLLINATIONS ERROR:", error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
