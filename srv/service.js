const cds = require('@sap/cds');

module.exports = async function (srv) {
  const db = await cds.connect.to('db');

  srv.on('analyzeOrder', async (req) => {
    const orderId = req.data.orderId;
    console.log('🧠 analyzeOrder triggered with orderId:', orderId);

    try {
      // オーダー情報を取得
      const order = await db.run(SELECT.one.from('allocation_system.Orders').where({ orderId }));
      if (!order) return req.error(404, `Order with ID ${orderId} not found`);

      console.log('📦 Found order:', order.orderNumber);

      try {
        // 🔧 修正: ドキュメント通りの正しい使用方法
        const vectorplugin = await cds.connect.to("cap-llm-plugin");
        
        // 🔧 修正: package.jsonから設定を正確に取得
        const chatModelConfig = cds.env.requires["gen-ai-hub"]["gpt-4o"];
        
        console.log("📋 Retrieved config from package.json:", chatModelConfig);
        
        // 🔧 修正: ドキュメント例に従ったペイロード
        const payload = {
          messages: [
            {
              role: 'system',
              content: `You are an expert order analyst. Analyze the following order and provide actionable recommendations.

Order Details:
- Order Number: ${order.orderNumber}
- Business Impact: ${order.businessImpact}
- Urgency Reason: ${order.urgencyReason}
- Customer ID: ${order.customer_customerId}
- Requested Date: ${order.requestedDate}
- Negotiation Room: ${order.negotiationRoom}`
            },
            {
              role: 'user',
              content: 'Please provide a concise analysis and specific recommendations for this order. Focus on priority level, risks, and actionable next steps.'
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        };

        console.log("📤 Sending to AI with config:", chatModelConfig);
        console.log("📤 Payload:", JSON.stringify(payload, null, 2));
        
        // 🔧 修正: ドキュメント通りのメソッド呼び出し
        const result = await vectorplugin.getChatCompletionWithConfig(chatModelConfig, payload);

        console.log("📥 Raw AI response:", JSON.stringify(result, null, 2));

        // AI応答を処理
        const aiComment = result?.choices?.[0]?.message?.content || 'No recommendation generated.';
        console.log("✅ Extracted AI Comment:", aiComment);

        // データベースを更新
        await db.run(UPDATE('allocation_system.Orders').set({ aiComment }).where({ orderId }));

        return { 
          message: 'AI analysis completed and saved successfully.',
          preview: aiComment.substring(0, 150) + '...',
          fullResponse: aiComment
        };

      } catch (aiError) {
        console.error("❌ AI analysis failed with detailed error:", {
          message: aiError.message,
          stack: aiError.stack,
          statusCode: aiError.statusCode,
          reason: aiError.reason
        });

        // 詳細なエラー情報を含むフォールバック
        let fallbackComment = `🤖 Rule-Based Analysis for Order ${order.orderNumber}:

📊 ANALYSIS SUMMARY:
• Business Impact: ${order.businessImpact}
• Urgency Level: ${order.urgencyReason}
• Customer: ${order.customer_customerId}
• Timeline: ${order.requestedDate}

💡 AUTOMATED RECOMMENDATIONS:`;

        // ビジネスインパクトに基づく推奨事項
        if (order.businessImpact === 'High') {
          fallbackComment += `
• 🚨 CRITICAL PRIORITY: Immediate escalation required
• 📞 Contact customer within 1 hour with status update
• 🚚 Expedite all processing and delivery steps
• 👥 Assign dedicated senior team member
• 📊 Monitor progress hourly until completion`;
        } else if (order.businessImpact === 'Medium') {
          fallbackComment += `
• ⚡ MEDIUM PRIORITY: Process within 24 hours
• 📧 Send proactive status updates to customer
• 📦 Use standard expedited processing
• 💰 Review negotiation options: ${order.negotiationRoom}
• 📋 Schedule follow-up within 48 hours`;
        } else {
          fallbackComment += `
• 📋 STANDARD PRIORITY: Normal queue processing
• 📮 Standard notification schedule
• 📊 Monitor for any priority changes
• 💼 Standard processing timeline applies`;
        }

        // 緊急度に基づく追加推奨事項
        if (order.urgencyReason && order.urgencyReason.toLowerCase().includes('urgent')) {
          fallbackComment += `
• ⚡ URGENCY NOTED: Consider priority elevation
• 🔍 Review delivery timeline for acceleration opportunities
• 📞 Proactive customer communication recommended`;
        }

        fallbackComment += `

🔧 TECHNICAL NOTE: AI analysis temporarily unavailable
📅 Generated: ${new Date().toLocaleString()}
⚠️ Error: ${aiError.message}`;

        await db.run(UPDATE('allocation_system.Orders').set({ aiComment: fallbackComment }).where({ orderId }));

        return { 
          message: 'Enhanced rule-based analysis applied (AI temporarily unavailable)',
          preview: fallbackComment.substring(0, 150) + '...',
          error: aiError.message,
          errorDetails: aiError.reason || 'No additional details available'
        };
      }

    } catch (error) {
      console.error("❌ Critical system error:", error);
      return req.error(500, `System error: ${error.message}`);
    }
  });
};