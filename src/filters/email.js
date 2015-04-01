var _ = require('lodash');


exports.visit = function (obj) {
  if (!_.isUndefined(obj.email)) {
    var emails;

    emails = obj.email.map(function (e) {
      var mail = {};
      mail.address = (!_.isUndefined(e.address)) ? ':' + e.address : '';
      mail.type = (!_.isUndefined(e.type)) ? 'type=' + e.type.toUpperCase() : '';
      mail.primary = (!_.isUndefined(e.primary)) ? ';type=pref' : '';

      return 'EMAIL;type=INTERNET;' + mail.type + mail.primary + mail.address;
    });
    return emails;
  }
};
