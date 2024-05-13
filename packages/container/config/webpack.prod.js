const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // Content hash is added to handle cache issues
    publicPath: '/container/latest/', // Fix issue on main.js script when accessing the app through our CDN
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/market/latest/remoteEntry.js`,
        // dashboard: `dashboard@${domain}/dashboard/remoteEntry.js`,
        // auth: `auth@${domain}/auth/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig);
