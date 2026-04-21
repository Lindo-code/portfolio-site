import { defineConfig } from "vite";
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),

    {
      name: "generate-github-fallback",
      async buildStart() {
        const fallbackPath = join(
          __dirname,
          "public",
          "assets",
          "data",
          "github-stats-fallback.json",
        );
        const defaultDataPath = join(
          __dirname,
          "src",
          "assets",
          "fallback_github_data.json",
        );

        // Load default data (excluding events)
        const defaultData = JSON.parse(readFileSync(defaultDataPath, "utf-8"));

        try {
          console.log("⏳ Fetching GitHub stats...");

          try {
            // Attempt to fetch fresh data
            const response = await fetch(
              "https://purple-cherry-17b4.sdrowvieli1.workers.dev/github-stats",
              {
                signal: AbortSignal.timeout(5000),
                headers: { "User-Agent": "ViteBuildProcess" },
              },
            );

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const apiData = await response.json();

            // Only write if fetch was successful
            const finalData = {
              user: apiData.user || defaultData.user || { public_repos: 0 },
              repos: apiData.repos || defaultData.repos || [],
              reviews: apiData.reviews ||
                defaultData.reviews || { total_count: 0 },
              events: apiData.events || [], // Always empty array
            };

            writeFileSync(fallbackPath, JSON.stringify(finalData), "utf-8");
            writeFileSync(defaultDataPath, JSON.stringify(finalData), "utf-8");
            console.log("✅ Successfully updated GitHub stats (events empty)");
            return; // Exit after successful write
          } catch (fetchError) {
            console.warn(
              "API fetch failed, using existing fallback:",
              fetchError.message,
            );
          }

          // If we get here, the fetch failed - use default data
          writeFileSync(
            fallbackPath,
            JSON.stringify({
              ...defaultData,
              events: [], // Ensure empty for fallback
            }),
            "utf-8",
          );
          console.log("ℹ️ Using default data with empty events");
        } catch (error) {
          console.error("⚠️ Fallback generation failed:", error.message);
          // Ensure we at least write the minimal valid structure
          writeFileSync(
            fallbackPath,
            JSON.stringify({
              user: { public_repos: 0 },
              repos: [],
              reviews: { total_count: 0 },
              events: [],
            }),
            "utf-8",
          );
        }
      },
    },
    svgr({
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: [
                "(inkscape|sodipodi):*",
                "xmlns:(inkscape|sodipodi)",
                "fill",
                "class", // Remove classes that might contain styles
                "style", // Remove inline styles
              ],
            },
          },
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [
                { stroke: "currentColor" }, // Adds stroke to root SVG
                { "stroke-width": "0.5px" },
              ],
            },
          },
          "removeXMLNS", // This plugin removes all xmlns declarations (optional)
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                // Keep these important attributes
                removeUnknownsAndDefaults: {
                  keepRoleAttr: true,
                },
              },
            },
          },
        ],
      },

      svgProps: {
        fill: "currentColor", // Default fill
        stroke: "currentColor", // Default stroke
      },
      // Replace these colors in the SVG with currentColor
      replaceAttrValues: {
        "#000": "currentColor",
        "#000000": "currentColor",
        black: "currentColor",
        white: "currentColor",
      },
      icon: true, // Add this to prevent namespace errors
      jsx: {
        babelConfig: {
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                throwIfNamespace: false, // This allows namespace tags
              },
            ],
          ],
        },
      },
    }),
  ],
  base: "/",
  assetsInclude: ["**/*.md"],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [".ngrok-free.app"],
  },
});
