var _ = require('lodash');

function encode(val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
}


exports.visit = function (obj) {
  if (!_.isUndefined(obj.address)) {
    var addr = {};
    addr.type = (!_.isUndefined(obj.address.type)) ? 'type=' + obj.address.type.toUpperCase() + ';' : '';
    addr.primary = (!_.isUndefined(obj.address.primary)) ? 'type=pref;' : '';

    addr.postOfficeBox = (!_.isUndefined(obj.address.postOfficeBox)) ? encode(obj.address.postOfficeBox) + ';' : ';';
    addr.extendedAddress = (!_.isUndefined(obj.address.extendedAddress)) ? encode(obj.address.extendedAddress) + ';' : ';';

    if (!_.isUndefined(obj.address.streetAddress)) {
      console.log(obj.address.streetAddress);
      if (_.isArray(obj.address.streetAddress)) {
        console.log('I am here');
        var streets = _.reduce(obj.address.streetAddress, function (res, val) {
          console.log('res: ', res);
          console.log('val: ', val);
          res = res + '\n' + encode(val);
          return res;
        });
        console.log('streets: ', streets);
        addr.streetAddress = streets + ';';
      } else {
        addr.streetAddress = encode(obj.address.streetAddress) + ';';
      }
    } else {
      addr.streetAddress = ';';
    }

    addr.locality = (!_.isUndefined(obj.address.city)) ? encode(obj.address.city) + ';' : ';';
    addr.region = (!_.isUndefined(obj.address.region)) ? encode(obj.address.region) + ';' : ';';
    addr.postalCode = (!_.isUndefined(obj.address.postalCode)) ? obj.address.postalCode + ';' : ';';
    addr.country = (!_.isUndefined(obj.address.country)) ? encode(obj.address.country) : ';';

    return 'ADR;' + addr.type + addr.primary + addr.postOfficeBox + addr.extendedAddress + addr.streetAddress + addr.locality + addr.region + addr.postalCode + addr.country;
  }
};
