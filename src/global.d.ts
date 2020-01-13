import { Bus } from "./index"; // eslint-disable-line

declare global {
    interface Window {
        Bus: {
            [name: string]: Bus
        };
    }
}