require('@babel/register')({
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
});
require('./index.js'); // 脚本入口