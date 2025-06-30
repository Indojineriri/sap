sap.ui.define([
    "sap/m/MessageBox",
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
], function (MessageBox, Controller, Button) {
    "use strict";

    return Controller.extend("allocationsystem.allocationapp.ext.controller.OrdersObjectPageExt", {
        
        onInit: function() {
            console.log("OrdersObjectPageExt controller initialized");
            
            // テスト用ボタンを動的に追加
            setTimeout(() => {
                this._addTestButton();
            }, 2000);
        },

        _addTestButton: function() {
            try {
                const oView = this.getView();
                const oPage = oView.getContent()[0];
                
                if (oPage && oPage.getHeaderContent) {
                    const oTestButton = new Button({
                        text: "🤖 Test AI",
                        press: this.onAnalyzeOrder.bind(this),
                        type: "Emphasized"
                    });
                    
                    oPage.addHeaderContent(oTestButton);
                    console.log("Test AI button added successfully");
                } else {
                    console.log("Could not find page to add button");
                }
            } catch (error) {
                console.error("Error adding test button:", error);
            }
        },
        
        /**
         * AI分析ボタンのイベントハンドラー
         */
        onAnalyzeOrder: function (oEvent) {
            const oView = this.getView();
            const oBindingContext = oView.getBindingContext();
            
            // バインディングコンテキストの存在確認
            if (!oBindingContext) {
                MessageBox.error("データの取得に失敗しました。画面を再読み込みしてください。");
                return;
            }
            
            const oData = oBindingContext.getObject();
            const sPath = oBindingContext.getPath();
            
            // デバッグ: 利用可能なプロパティを確認
            console.log("Available data:", oData);
            console.log("Binding path:", sPath);
            
            // 表示用のオーダー番号を取得
            const sDisplayOrderNumber = oData.orderNumber || oData.orderId || "不明";
            
            // ユーザー入力
            const sUserInput = prompt(`オーダー ${sDisplayOrderNumber} について、AIに何を分析させますか？\n\n例: この注文の緊急度を評価して`, "");
            if (!sUserInput || sUserInput.trim() === "") {
                return;
            }

            // 簡単なFetch呼び出しでテスト
            this._callAIServiceSimple(sUserInput.trim(), oData, sDisplayOrderNumber);
        },

        /**
         * シンプルなAIサービス呼び出し（Fetch使用）
         * @param {string} sUserInput ユーザーの入力テキスト
         * @param {object} oData 現在のオーダーデータ
         * @param {string} sDisplayOrderNumber 表示用オーダー番号
         */
        _callAIServiceSimple: function(sUserInput, oData, sDisplayOrderNumber) {
            console.log("Calling AI service with input:", sUserInput);
            console.log("Order data:", oData);
            
            // バックエンドのanalyzeOrderアクションを直接呼び出し
            const requestBody = {
                orderId: sDisplayOrderNumber, // または適切なID
                input: sUserInput
            };

            console.log("Request body:", requestBody);

            fetch("/odata/v4/allocation-system-srv/analyzeOrder", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            .then(function(response) {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(function(result) {
                console.log("AI response:", result);
                if (result && (result.value || result.result || result.response)) {
                    const aiResponse = result.value || result.result || result.response;
                    MessageBox.information("💬 AIからの回答:\n\n" + aiResponse, {
                        title: `AI分析結果 (${sDisplayOrderNumber})`,
                        styleClass: "sapUiResponsiveMargin"
                    });
                } else {
                    MessageBox.warning("AIから応答がありましたが、内容が空でした。\n\nレスポンス: " + JSON.stringify(result));
                }
            })
            .catch(function(err) {
                console.error("❌ AI呼び出しエラー:", err);
                MessageBox.error(
                    "AIコメント生成に失敗しました。\n\n詳細: " + err.message,
                    {
                        title: "エラー",
                        styleClass: "sapUiResponsiveMargin"
                    }
                );
            });
        },

        /**
         * オプション: より高度なダイアログ入力を使用したい場合
         * 将来的にprompt()をこちらに置き換えることを推奨
         */
        _showInputDialog: function() {
            return new Promise(function(resolve, reject) {
                const oDialog = new sap.m.Dialog({
                    title: "AI分析",
                    contentWidth: "500px",
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Label({ text: "分析したいコメント:" }),
                                new sap.m.TextArea({
                                    id: "aiInputTextArea",
                                    width: "100%",
                                    rows: 4,
                                    placeholder: "AIに分析してもらいたい内容を入力してください..."
                                })
                            ]
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "分析開始",
                        press: function() {
                            const sValue = sap.ui.getCore().byId("aiInputTextArea").getValue();
                            if (sValue && sValue.trim()) {
                                oDialog.close();
                                resolve(sValue.trim());
                            } else {
                                MessageBox.warning("コメントを入力してください。");
                            }
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "キャンセル",
                        press: function() {
                            oDialog.close();
                            reject("cancelled");
                        }
                    }),
                    afterClose: function() {
                        oDialog.destroy();
                    }
                });
                
                oDialog.open();
            });
        }
    });
});