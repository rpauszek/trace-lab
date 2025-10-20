import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    base: "./", // important: makes all built paths relative
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                workbench: resolve(__dirname, "workbench.html"),
            },
        },
    },
});
