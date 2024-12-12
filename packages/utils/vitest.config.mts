import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    include: ["./**/*.spec.{ts,tsx}"],
    globals: true,
    passWithNoTests: true,
  },
  plugins: [tsconfigPaths()],
});
