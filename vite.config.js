module.exports = {
  proxy: {
    '/fund': {
      target: 'http://fund.eastmoney.com/',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/fund/, ''),
    },
  },
};
