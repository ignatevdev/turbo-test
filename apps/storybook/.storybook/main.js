import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: ["../stories/*.stories.tsx", "../stories/**/*.stories.tsx"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: {
          "@turbo-cr-test/ui": resolve(__dirname, "../../../packages/ui/src"),
          "@turbo-cr-test/utils": resolve(
            __dirname,
            "../../../packages/utils/src",
          ),
        },
      },
    };
  },

  docs: {
    autodocs: true,
  },
};

export default config;
