const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  this.on("analyzeFreetext", async (req) => {
    const inputText = req.data.input;
    console.log("📨 Freetext received:", inputText);

    // ここで任意の LLM やロジックを呼び出す（簡易応答をモック）
    const aiResponse = `AIが分析したコメント: 「${inputText}」に基づいて提案を行います。`;

    return aiResponse;
  });
});
