var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj) {
  if (!_.isUndefined(obj.name)) {
    var asString;
    var no = {};
    no.family = obj.name.lastName || '';
    no.given = obj.name.firstName || '';
    no.additional  = obj.name.middleName || '';

    asString = _.reduce([no.family, no.additional, no.given], function (res, val) {
      if (!_.isEmpty(val)) {
        res = res + ' ' + encode(val);
      }
      return res;
    });
    return 'FN:' + asString;
  }
};

