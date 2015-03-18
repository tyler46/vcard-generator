var _ = require('lodash');


function encode(val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
}


exports.visit = function (obj) {
  if (!_.isUndefined(obj.nickname)) {
    // or TITLE ?
    return 'NICKNAME:' + encode(obj.nickname);
  }
};
