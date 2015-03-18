var _ = require('lodash');
var util = require('util');

function encode(val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
}


function Contact (opts) {
  this.family = opts.lastName || '';
  this.given = opts.firstName || '';
  this.additional  = opts.middleName || '';
  this.prefix = opts.prefix || '';
  this.suffix = opts.suffix || '';
  this.nickname = opts.nickname || '';

  this.nameAttributes = ['family', 'given', 'additional', 'prefix', 'suffix'];
}

Contact.prototype.nameToString = function () {
  var parts;
  var partsAsString;
  parts = _.forOwn(this, function (value, attr) {
    if (this.nameAttributes.indexOf(attr) > -1 ) {
      console.log('value: ' + value + 'attribute: ' + attr);
      console.log('encoded value: ' + encode(value));
      return {attr: encode(value) };
    }
  });
  partsAsString = _.reduce(parts, function (res, val, key) {
    res = res + ',' + val;
    return res;
  });

  return 'N:' + partsAsString;
};


Contact.prototype.fullNameToString = function () {
  var asString;
  var res = '';
  asString = _.reduce([this.family, this.additional, this.given], function (res, val) {
    if (!_.isEmpty(val)) {
      res = res + ' ' + encode(val);
    }
    return res;
  });
  return 'FN:' + asString;
};


Contact.prototype.nicknameToString = function () {
  if (!_.isEmpty(this.nickname)) {
    return 'NICKNAME:' + encode(this.nickname);
  }
  return null;
};



module.exports = Contact;
