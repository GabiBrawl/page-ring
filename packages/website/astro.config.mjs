// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    server: {
      cors: { preflightContinue: true },
    },
  },

  adapter: vercel(),

  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-latte",
    },
  },
});
