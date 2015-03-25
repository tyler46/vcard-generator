var _ = require('lodash');

function encode(val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
}


exports.visit = function (obj) {
  if (!_.isUndefined(obj.title)) {
    // TITLE appears when editing the job title field on a contact
    return 'TITLE:' + encode(obj.title);
  }
};

