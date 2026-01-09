import { build } from "bun";
import { rm } from "node:fs/promises";

await rm("./dist", { recursive: true, force: true });
const result = await build({
  entrypoints: ["./index.html"],
  outdir: "./dist",
  minify: true,
  publicPath: "./",
  sourcemap: "none",
});

if (result.success) console.log("Build successful!");
else console.error("Build failed:", result.logs);
