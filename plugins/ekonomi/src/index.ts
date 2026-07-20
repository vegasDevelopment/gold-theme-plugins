import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/types";
import { storage } from "@vendetta/plugin";

let coins = storage.get("coins") ?? 0;
let unregisterDaily, unregisterBalance;

export default {
    onLoad: () => {
        unregisterDaily = registerCommand({
            name: "gunluk",
            displayName: "gunluk",
            description: "Günlük coin ödülünü al",
            displayDescription: "Günlük coin ödülünü al",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                coins += 100;
                storage.set("coins", coins);
                return { content: `✅ +100 coin! Toplam: **${coins}** coin` };
            },
        });

        unregisterBalance = registerCommand({
            name: "bakiye",
            displayName: "bakiye",
            description: "Coin bakiyeni göster",
            displayDescription: "Coin bakiyeni göster",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                return { content: `💰 Bakiyen: **${coins}** coin` };
            },
        });
    },
    onUnload: () => {
        unregisterDaily?.();
        unregisterBalance?.();
    },
};
