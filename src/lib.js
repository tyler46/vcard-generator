module.exports.nwline = function () {
  return '\r\n';
};

module.exports.encode = function (val) {
  if (val) {
    return val.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  return '';
};
