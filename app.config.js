import { config } from 'dotenv';

config();

export default () => ({
    expo: {
        name: "My App",
        slug: "my-app",
        // other configuration...
        extra: {
            apiKey: process.env.EXPO_PUBLIC_API_KEY,
            // other environment variables...
        },
    },
});