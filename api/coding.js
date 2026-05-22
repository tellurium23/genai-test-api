module.exports = (req, res) => {
  const message = req.body?.inputs?.message ?? "";

  res.status(200).json({
    outputs: `受信成功: ${message}`,
    timestamps: {
      processingStartedAt: new Date().toISOString(),
      processingEndedAt: new Date().toISOString(),
    },
  });
};