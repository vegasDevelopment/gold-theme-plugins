import { registerCommand } from "@vendetta/commands";
import { ApplicationCommandInputType, ApplicationCommandType } from "@vendetta/types";

let unregister: () => void;

export default {
    onLoad: () => {
        unregister = registerCommand({
            name: "test",
            displayName: "test",
            description: "test komutu",
            displayDescription: "test komutu",
            inputType: ApplicationCommandInputType.BUILT_IN,
            type: ApplicationCommandType.CHAT,
            applicationId: "-1",
            options: [],
            execute: () => {
                return { content: "çalışıyor!" };
            },
        });
    },
    onUnload: () => {
        unregister?.();
    },
};
