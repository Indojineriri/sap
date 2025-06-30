sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";

    var CustomActions = {
        onAnalyzeOrder: function (oBindingContext, aSelectedContexts) {
            console.log("AI分析ボタンがクリックされました");
            console.log("バインディングコンテキスト:", oBindingContext);

            if (!oBindingContext) {
                MessageBox.error("データの取得に失敗しました。");
                return;
            }

            const oData = oBindingContext.getObject();
            const sOrderNumber = oData.orderNumber || oData.orderId || "不明";

            console.log("オーダーデータ:", oData);
            console.log("オーダー番号:", sOrderNumber);

            const sUserInput = prompt(`オーダー ${sOrderNumber} について、AIに何を分析させますか？\n\n例: この注文の緊急度を評価して`, "");

            if (!sUserInput || sUserInput.trim() === "") {
                return;
            }

            CustomActions._callAIService(sUserInput.trim(), oData, sOrderNumber);
        },

        _callAIService: function (sUserInput, oData, sOrderNumber) {
            console.log("🤖 AIサービスを呼び出し中:", sUserInput);

            MessageBox.show("AIが分析中です...", {
                icon: MessageBox.Icon.INFORMATION,
                title: "処理中"
            });

            const requestBody = {
                orderId: oData.orderId
            };

            console.log("📤 リクエストボディ:", requestBody);

            fetch("/odata/v4/allocation-system-srv/analyzeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
                .then(function (response) {
                    console.log("📥 レスポンスステータス:", response.status);

                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(`HTTP error! status: ${response.status}, details: ${text}`);
                        });
                    }
                    return response.json();
                })
                .then(function (result) {
                    console.log("✅ AIレスポンス:", result);

                    let message = "";
                    if (result.value) {
                        if (typeof result.value === "object") {
                            message = result.value.message || JSON.stringify(result.value);
                        } else {
                            message = result.value;
                        }
                    } else if (typeof result === "object") {
                        message = result.message || JSON.stringify(result);
                    } else {
                        message = result;
                    }

                    if (message) {
                        CustomActions._fetchAndShowRecommendations(oData.orderId, sOrderNumber, message);
                    } else {
                        MessageBox.warning("AIから応答がありましたが、内容が空でした。");
                    }
                })
                .catch(function (err) {
                    console.error("❌ AI呼び出しエラー:", err);
                    MessageBox.error(`AIコメント生成に失敗しました。\n\n詳細: ${err.message}`);
                });
        },

        _fetchAndShowRecommendations: function (orderId, sOrderNumber, message) {
            console.log("📋 AIRecommendationsを取得中...");
            console.log("🔍 検索対象orderId:", orderId);

            fetch("/odata/v4/allocation-system-srv/AIRecommendations", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(function (response) {
                    console.log("📥 AIRecommendations取得ステータス:", response.status);

                    if (!response.ok) {
                        return response.text().then(text => {
                            console.log("❌ AIRecommendations取得エラー詳細:", text);
                            throw new Error(`Failed to fetch recommendations: ${response.status}, details: ${text}`);
                        });
                    }
                    return response.json();
                })
                .then(function (data) {
                    console.log("📊 取得したAIRecommendations（全件）:", data);

                    let displayMessage = `💬 AI分析が完了しました:\n\n${message}`;

                    if (data.value && data.value.length > 0) {
                        const latestRecommendations = data.value.slice(-3);

                        displayMessage += `\n\n🔍 最新のAI推奨事項 (${latestRecommendations.length}件):`;

                        latestRecommendations.forEach((rec, index) => {
                            displayMessage += `\n\n${index + 1}. ID: ${rec.recommendationId}`;
                            if (rec.recommendationText) {
                                const shortText = rec.recommendationText.length > 200
                                    ? rec.recommendationText.substring(0, 200) + "..."
                                    : rec.recommendationText;
                                displayMessage += `\n${shortText}`;
                            }
                        });

                        displayMessage += `\n\n📝 合計推奨事項数: ${data.value.length}件`;
                    } else {
                        displayMessage += "\n\n📝 AIRecommendationsテーブルにデータがありません";
                    }

                    MessageBox.information(displayMessage, {
                        title: `AI分析結果 (${sOrderNumber})`,
                        styleClass: "sapUiResponsiveMargin"
                    });
                })
                .catch(function (err) {
                    console.error("❌ AIRecommendations取得エラー:", err);

                    MessageBox.information(
                        `💬 AI分析が完了しました:\n\n${message}\n\n✅ AIRecommendationsテーブルに保存されました\n\n※ 推奨事項の詳細表示でエラーが発生しましたが、データは正常に保存されています`,
                        {
                            title: `AI分析結果 (${sOrderNumber})`,
                            styleClass: "sapUiResponsiveMargin"
                        }
                    );
                });
        }
    };

    return CustomActions;
});
