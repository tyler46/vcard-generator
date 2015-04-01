var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj) {
  if (!_.isUndefined(obj.name)) {
    var parts;
    var no = {};
    no.family = obj.name.lastName || '';
    no.given = obj.name.firstName || '';
    no.additional  = obj.name.middleName || '';
    no.prefix = obj.name.prefix || '';
    no.suffix = obj.name.suffix || '';
    parts = _.forOwn(no, function (value, attr) {
      return {attr: encode(value)};
    });

    var partsAsString = _.reduce(parts, function (res, val, key) {
      res = res + ',' + val;
      return res;
    });
    return 'N:' + partsAsString;
  }
};
