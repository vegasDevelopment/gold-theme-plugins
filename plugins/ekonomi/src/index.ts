import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/types";

let coins = 0;
let lastDaily = 0;

const GUNLUK_MIN = 50;
const GUNLUK_MAX = 200;
const YIRMIDORT_SAAT = 24 * 60 * 60 * 1000;

let unregisterDaily: () => void;
let unregisterBalance: () => void;

export default {
    onLoad: () => {
        unregisterDaily = registerCommand({
            name: "gunluk",
            displayName: "günlük",
            description: "Günlük coin ödülünü al",
            displayDescription: "Günlük coin ödülünü al",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                const simdi = Date.now();
                const gecenSure = simdi - lastDaily;

                if (gecenSure < YIRMIDORT_SAAT) {
                    return { content: `⏳ Günlük ödülünü zaten aldın, biraz sonra tekrar dene.` };
                }

                const kazanilan = Math.floor(Math.random() * (GUNLUK_MAX - GUNLUK_MIN + 1)) + GUNLUK_MIN;
                coins += kazanilan;
                lastDaily = simdi;

                return { content: `🪙 +${kazanilan} coin! Toplam: ${coins}` };
            },
        });

        unregisterBalance = registerCommand({
            name: "bakiye",
            displayName: "bakiye",
            description: "Coin bakiyeni gösterir",
            displayDescription: "Coin bakiyeni gösterir",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                return { content: `💰 Bakiyen: ${coins} coin` };
            },
        });
    },
    onUnload: () => {
        unregisterDaily?.();
        unregisterBalance?.();
    },
};
