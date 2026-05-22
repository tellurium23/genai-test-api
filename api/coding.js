const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const processingStartedAt = new Date().toISOString();

  try {
    const message = req.body?.inputs?.message ?? "";

    if (!message) {
      return res.status(400).json({
        error: "message is required",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "developer",
          content:
            "あなたは源内AIのコーディング支援担当です。ユーザーの依頼に対して、修正方針、変更コード、確認手順を日本語で簡潔に返してください。",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({
      outputs: response.output_text,
      timestamps: {
        processingStartedAt,
        processingEndedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      timestamps: {
        processingStartedAt,
        processingEndedAt: new Date().toISOString(),
      },
    });
  }
};
