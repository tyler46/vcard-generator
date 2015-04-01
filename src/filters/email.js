var _ = require('lodash');


exports.visit = function (obj, num) {
  if (!_.isUndefined(obj.email)) {
    var emails;

    emails = obj.email.map(function (e, rank) {
      var mail = {};
      var nxt;
      mail.address = (!_.isUndefined(e.address)) ? ':' + e.address : '';
      mail.type = (!_.isUndefined(e.type)) ? 'type=' + e.type.toUpperCase() : '';
      mail.primary = (!_.isUndefined(e.primary)) ? ';type=pref' : '';

      // if emails length is more than two, use weird Apple's "item" prefix.
      if (rank > 1) {
        nxt = num + rank - 2 + 1; // dirty hack to have the correct item number.
        return 'item' + nxt + '.EMAIL;type=INTERNET' + mail.type + mail.primary + mail.address + '\n' + 'item' + nxt + '.X-ABLabel:_$!<Other>!$_';
      } else {
        return 'EMAIL;type=INTERNET;' + mail.type + mail.primary + mail.address;
      }
    });
    return emails;
  }
};
