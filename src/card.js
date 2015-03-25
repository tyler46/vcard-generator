var moment = require('moment');
var _ = require('lodash');

var filters = require('./filters');


function nwline() {
  return '\r\n';
}


module.exports = function (contact) {
  var card = '';
  card += 'BEGIN:VCARD' + nwline();
  card += 'VERSION:' + (contact.version || '3.0') + nwline();


  _.forOwn(filters, function (filter) {
    var part = filter.visit(contact);
    if (!_.isEmpty(part)) {
      if (_.isArray(part)) {
        part.map(function (item) {
          card += item + nwline();
        });
      } else {
        card += part + nwline();
      }
    }
  });
  
  card += 'REV:' + moment().format() + nwline();
  card += 'END:VCARD' + nwline();

  return card;
};
