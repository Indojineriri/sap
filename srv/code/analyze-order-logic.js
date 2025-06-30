const cds = require('@sap/cds');

module.exports = async function(req) {
    const { orderId } = req.data;

    try {
        const { Orders } = cds.entities('allocation_system');
        const order = await cds.run(SELECT.one.from(Orders).where({ ID: orderId }));

        if (!order) {
            return '注文が見つかりませんでした';
        }

        const prompt = `以下の注文について要約し、優先度が高そうかコメントしてください：

- 注文番号: ${order.orderNumber}
- 注文日: ${order.orderDate}
- 要求日: ${order.requestedDate}
- 事業インパクト: ${order.businessImpact}
- 緊急理由: ${order.urgencyReason}
- 交渉ルーム: ${order.negotiationRoom}`;

        let comment;
        
        try {
            // GenAI Hubとの連携を試行
            const llm = await cds.connect.to('GenAIHubDestination');
            
            // cap-llm-pluginを使用する場合
            const CAPLLMPlugin = require('cap-llm-plugin/srv/cap-llm-plugin');
            const plugin = new CAPLLMPlugin(llm);
            
            const response = await plugin.getChatCompletionWithConfig({
                config: {
                    messages: [
                        { role: 'system', content: 'あなたは在庫受注の分析アシスタントです。' },
                        { role: 'user', content: prompt }
                    ],
                    modelName: 'gpt-4o',
                    deploymentUrl: '/v2/inference/deployments/dab68677bbc2757a',
                    resourceGroup: 'deepdive104',
                    apiVersion: 'latest'
                }
            });

            comment = response.choices?.[0]?.message?.content ?? 'コメント生成に失敗しました';
            
        } catch (aiError) {
            console.warn('AI連携エラー、フォールバック処理を実行:', aiError);
            // フォールバック: ルールベースの分析
            comment = generateFallbackAnalysis(order);
        }

        // 結果をデータベースに保存
        await cds.run(UPDATE(Orders).set({ aiComment: comment }).where({ ID: orderId }));

        return comment;

    } catch (error) {
        console.error('LLM連携エラー:', error);
        return 'AIコメント生成中にエラーが発生しました: ' + error.message;
    }
};

// フォールバック分析機能
function generateFallbackAnalysis(order) {
    let priority = '中';
    let issues = [];
    let recommendations = [];

    // 緊急性チェック
    if (order.urgencyReason && order.urgencyReason.trim().length > 0) {
        priority = '高';
        issues.push('緊急理由が記載されています');
        recommendations.push('即座の対応が必要です');
    }

    // 要求日チェック
    if (order.requestedDate) {
        const reqDate = new Date(order.requestedDate);
        const today = new Date();
        const daysDiff = Math.ceil((reqDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 3) {
            priority = '高';
            issues.push('要求日まで3日以内');
            recommendations.push('在庫の即座確認');
        } else if (daysDiff <= 7) {
            priority = '中';
            issues.push('要求日まで1週間以内');
        }
    }

    // 事業インパクトチェック
    if (order.businessImpact) {
        const impact = order.businessImpact.toLowerCase();
        if (impact.includes('高') || impact.includes('重要') || impact.includes('critical')) {
            priority = '高';
            issues.push('事業インパクトが高い');
            recommendations.push('優先的な処理が必要');
        }
    }

    return `
🤖 AI分析結果 (フォールバック)

📊 優先度: ${priority}

${issues.length > 0 ? `⚠️ 検出された課題:\n${issues.map(i => `• ${i}`).join('\n')}` : '✅ 特に課題は検出されませんでした'}

${recommendations.length > 0 ? `💡 推奨アクション:\n${recommendations.map(r => `• ${r}`).join('\n')}` : '• 標準プロセスで処理してください'}

📅 分析日時: ${new Date().toLocaleString('ja-JP')}
    `.trim();
}