'use strict';

module.exports = function(app) {
  const emoji = require('../controllers/emoji');

  app.route('/emoji')
    .get(emoji.list)
};
