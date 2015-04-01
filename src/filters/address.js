var _ = require('lodash');
var lookup = require('country-data').lookup;
var encode = require('../lib').encode;


exports.visit = function (obj, num) {
  var fp;
  var sp;
  var nxt;
  var countryCode;
  console.log('Until now items appearing: ', num);

  if (!_.isUndefined(obj.address)) {
    var address;
    address = obj.address.map(function(ad, rank) {
      var addr = {};
      addr.type = (!_.isUndefined(ad.type)) ? 'type=' + ad.type.toUpperCase() + ';' : '';
      addr.primary = (!_.isUndefined(ad.primary)) ? 'type=pref;' : '';

      addr.postOfficeBox = (!_.isUndefined(ad.postOfficeBox)) ? encode(ad.postOfficeBox) + ';' : ';';
      addr.extendedAddress = (!_.isUndefined(ad.extendedAddress)) ? encode(ad.extendedAddress) + ';' : ';';

      if (!_.isUndefined(ad.streetAddress)) {
        if (_.isArray(ad.streetAddress)) {
          var streets = _.reduce(ad.streetAddress, function (res, val) {
            console.log('res: ', res);
            console.log('val: ', val);
            res = res + '\n' + encode(val);
            return res;
          });
          console.log('streets: ', streets);
          addr.streetAddress = streets + ';';
        } else {
          addr.streetAddress = encode(ad.streetAddress) + ';';
        }
      } else {
        addr.streetAddress = ';';
      }

      addr.locality = (!_.isUndefined(ad.city)) ? encode(ad.city) + ';' : ';';
      addr.region = (!_.isUndefined(ad.region)) ? encode(ad.region) + ';' : ';';
      addr.postalCode = (!_.isUndefined(ad.postalCode)) ? ad.postalCode + ';' : ';';
      addr.country = (!_.isUndefined(ad.country)) ? encode(ad.country) : ';';

      // accessing rank in order to build the correct next item* value.
      nxt = num +rank + 1;
      console.log('RANK: ', rank);

      fp = 'item'+nxt+'.ADR;' + addr.type + addr.primary + addr.postOfficeBox + addr.extendedAddress + addr.streetAddress + addr.locality + addr.region + addr.postalCode + addr.country;
      if (addr.country !== ';') {
        countryCode = lookup.countries({name: encode(ad.country)})[0];
        if (!_.isUndefined(countryCode)) {
          countryCode = countryCode.alpha2.toLowerCase();
          sp = 'item'+nxt+'.X-ABADR:'+countryCode;
        }
      } else {
        sp = '';
      }
      return fp + '\n' + sp;
    });
    return address;
  }
};
