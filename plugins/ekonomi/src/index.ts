import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/types";

let coins = 0;

let unregisterDaily: () => void;

export default {
    onLoad: () => {
        unregisterDaily = registerCommand({
            name: "gunluk",
            displayName: "gunluk",
            description: "Daily coin reward",
            displayDescription: "Daily coin reward",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                coins += 100;
                return { content: "+100 coin! Total: " + coins };
            },
        });
    },
    onUnload: () => {
        unregisterDaily?.();
    },
};
