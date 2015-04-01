var moment = require('moment');
var uuid = require('node-uuid');
var _ = require('lodash');

var filters = require('./filters');
var nwline = require('./lib').nwline;


module.exports = function (contact) {
  var card = '';
  var itemCount = 0;
  card += 'BEGIN:VCARD' + nwline();
  card += 'VERSION:' + (contact.version || '3.0') + nwline();


  _.forOwn(filters, function (filter) {
    itemCount = ((card.match(/item/g) || []).length / 2);
    var part = filter.visit(contact, itemCount);
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
  card += 'UID:' + uuid.v1().toUpperCase() + nwline();
  card += 'END:VCARD' + nwline();

  return card;
};
