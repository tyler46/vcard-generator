var _ = require('lodash');
var moment = require('moment');


exports.visit = function (obj) {
  if (!_.isUndefined(obj.birthday)) {
    // Use new Date, to remove deprecation warning.
    // https://github.com/moment/moment/issues/1407
    return 'BDAY;value=date:' + moment(new Date(obj.birthday)).format('YYYY-MM-DD');
  }
};
