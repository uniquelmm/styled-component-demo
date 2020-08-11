require("dotenv/config");

const fs = require("fs");

const { NODE_ENV, SHOP_DOMAIN } = process.env;

module.exports = {
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          displayName: NODE_ENV === "development",
        },
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 修改输出文件名
      webpackConfig.output.filename = "main.js";

      // 不拆分模块
      delete webpackConfig.optimization.splitChunks;
      delete webpackConfig.optimization.runtimeChunk;

      // 删除不必要的插件
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) =>
          ![
            "GenerateSW",
            "HtmlWebpackPlugin",
            "InlineChunkHtmlPlugin",
            "InterpolateHtmlPlugin",
            "ManifestPlugin",
            "MiniCssExtractPlugin",
          ].includes(plugin.constructor.name)
      );

      return webpackConfig;
    },
  },

  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // Proxy
    devServerConfig.proxy = {
      "*": {
        target: `https://${SHOP_DOMAIN}`,
        changeOrigin: true,
        autoRewrite: true,
      },
    };

    return devServerConfig;
  },
};
