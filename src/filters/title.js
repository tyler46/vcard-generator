var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj) {
  if (!_.isUndefined(obj.title)) {
    // TITLE appears when editing the job title field on a contact
    return 'TITLE:' + encode(obj.title);
  }
};

