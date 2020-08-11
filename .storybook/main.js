const path = require("path");
module.exports = {
  stories: ["../stories/*.stories.tsx"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            configFile: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx", ".md", ".json", ".png");

    return config;
  },
};
