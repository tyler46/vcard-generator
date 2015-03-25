var path = require('path');
var validUrl = require('valid-url');
var _ = require('lodash');


exports.visit = function (obj) {
  if (!_.isUndefined(obj.photo)) {
    var p = {};
    if (validUrl.isUri(obj.photo)) {
      p.value = 'URL';
    } else {
      p.value = 'STRING';
    }
    p.type = path.extname(obj.photo).split('.')[1].toUpperCase();

    return 'PHOTO;VALUE=' + p.value + ';TYPE=' + p.value + ':'+obj.photo;
  }
};
