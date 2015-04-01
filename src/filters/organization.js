var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj) {
  if (!_.isUndefined(obj.organization)) {
    var org = {};
    org.name = (!_.isUndefined(obj.organization.name)) ? encode(obj.organization.name) : '';
    org.department = (!_.isUndefined(obj.organization.department)) ? ';' + encode(obj.organization.department) : '';

    return 'ORG:' + org.name + org.department;
  }
};

