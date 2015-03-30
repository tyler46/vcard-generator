var _ = require('lodash');

function encode(val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
}


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
      res = res + ';' + val;
      return res;
    });
    return 'N:' + partsAsString;
  }
};
