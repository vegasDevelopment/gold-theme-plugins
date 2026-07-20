import { registerCommand } from "@vendetta/commands";
import { storage } from "@vendetta/plugin";
import {
    ApplicationCommandInputType,
    ApplicationCommandType,
} from "@vendetta/types";

// storage otomatik olarak diske kaydedilir, uygulamayı kapatsan bile kalır
if (!storage.coins) storage.coins = 0;
if (!storage.lastDaily) storage.lastDaily = 0;

const GUNLUK_MIN = 50;
const GUNLUK_MAX = 80;
const YIRMIDORT_SAAT = 24 * 60 * 60 * 1000;

let unregisterDaily: () => void;
let unregisterBalance: () => void;

export const onLoad = () => {
    unregisterDaily = registerCommand({
        name: "günlük",
        displayName: "günlük",
        description: "Günlük coin ödülünü al",
        displayDescription: "Günlük coin ödülünü al",
        inputType: ApplicationCommandInputType.BUILT_IN,
        type: ApplicationCommandType.CHAT,
        applicationId: "-1",
        options: [],
        execute: () => {
            const simdi = Date.now();
            const gecenSure = simdi - storage.lastDaily;

            if (gecenSure < YIRMIDORT_SAAT) {
                const kalanMs = YIRMIDORT_SAAT - gecenSure;
                const kalanSaat = Math.floor(kalanMs / (60 * 60 * 1000));
                const kalanDakika = Math.floor((kalanMs % (60 * 60 * 1000)) / (60 * 1000));
                return {
                    content: `⏳ Günlük ödülünü zaten aldın. Tekrar almak için **${kalanSaat} saat ${kalanDakika} dakika** bekle.`,
                };
            }

            const kazanilan = Math.floor(Math.random() * (GUNLUK_MAX - GUNLUK_MIN + 1)) + GUNLUK_MIN;
            storage.coins += kazanilan;
            storage.lastDaily = simdi;

            return {
                content: `🪙 Günlük ödülün: **+${kazanilan} coin**\nToplam bakiyen: **${storage.coins} coin**`,
            };
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
            return {
                content: `💰 Bakiyen: **${storage.coins} coin**`,
            };
        },
    });
};

export const onUnload = () => {
    unregisterDaily?.();
    unregisterBalance?.();
};
