const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  async rewrites() {
    return [
      { source: '/:lang(en-my)?/about', destination: '/about' },
      { source: '/:lang(ms-my)?/mengenai', destination: '/about' },
      { source: '/:lang(zh-my)?/guanyu', destination: '/about' },
    ];
  },
};
