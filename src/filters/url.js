var _ = require('lodash');
var encode = require('../lib').encode;


exports.visit = function (obj, num) {
  var nxt;
  if (!_.isUndefined(obj.url)) {
    var url = {};
    url.primary = (!_.isUndefined(obj.url.primary)) ? 'type=pref' : '';
    url.address = (!_.isUndefined(obj.address)) ? ':' + encode(obj.url.address) : '';
    
    nxt = num + 1;
    // check more on label
    return 'item' + nxt + '.URL;' + url.primary + url.address + '\n' + 'item' + nxt + '.X-ABLabel: _$!<HomePage>!$_';
  }
};

