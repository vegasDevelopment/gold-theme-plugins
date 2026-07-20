import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/types";

let coins = 0;

let unregisterDaily: () => void;

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
                coins += 100;
                return { content: `🪙 +100 coin! Toplam: ${coins}` };
            },
        });
    },
    onUnload: () => {
        unregisterDaily?.();
    },
};
