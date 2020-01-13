import { Bus } from "../src/index"; // eslint-disable-line

declare global {
    interface Window {
        Bus: {
            [name: string]: Bus
        };
    }
}