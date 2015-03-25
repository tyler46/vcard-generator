var _ = require('lodash');


exports.visit = function (obj) {
  if (!_.isUndefined(obj.phone)) {
    var phones;

    phones = obj.phone.map(function (e) {
      var phone = {};
      phone.number = (!_.isUndefined(e.number)) ? ':' + e.number : '';
      phone.primary = (!_.isUndefined(e.primary)) ? ';type=pref' : '';
      if (!_.isUndefined(e.type)) {
        if (e.type.toLowerCase() === 'iphone') {
          phone.type = 'type=IPHONE;type=CELL;';
        } else {
          phone.type = 'type=' + e.type.toUpperCase() + ';';
        }
      } else {
        phone.type = '';
      }

      return 'TEL;' + phone.type + 'type=VOICE' + phone.primary + phone.number;
    });
    return phones;
  }
};
