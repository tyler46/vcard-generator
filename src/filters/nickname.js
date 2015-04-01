var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj) {
  if (!_.isUndefined(obj.nickname)) {
    return 'NICKNAME:' + encode(obj.nickname);
  }
};
