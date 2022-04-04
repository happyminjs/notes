// eslint-disable-next-line import/no-extraneous-dependencies
const postCSSPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postCSSPresetEnv({
      browsers: 'last 10 version', // 最近的10个版本
    }),
  ],
};
