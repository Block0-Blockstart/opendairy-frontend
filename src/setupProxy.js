const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:42001', //auth api running locally
      // target: 'https://########.execute-api.eu-central-1.amazonaws.com:443', //auth api running on AWS Gateway
      changeOrigin: true,
    })
  );
  app.use(
    '/core',
    createProxyMiddleware({
      target: 'http://localhost:42003', //documents api running locally
      // target: 'https://########.execute-api.eu-central-1.amazonaws.com:443', //documents api running on AWS Gateway
      changeOrigin: true,
      pathRewrite: { '^/core': '/' }, //path rewrite when documents api is running locally
    })
  );
};
