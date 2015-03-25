var path = require('path');
var _ = require('lodash');


exports.visit = function (obj) {
  if (!_.isUndefined(obj['social-profiles'])) {
    var profiles;

    profiles = obj['social-profiles'].map(function (p) {
      var profile = {};
      profile.service = (!_.isUndefined(p.service)) ? 'type=' + p.service : '';
      if (!_.isUndefined(p.address)) {
        profile.link = ';x-user=' + path.basename(p.address) + ':' + p.address;
      } else {
        profile.link = '';
      }

      return 'X-SOCIALPROFILE;' + profile.service + profile.link;
    });
    return profiles;
  }
};
