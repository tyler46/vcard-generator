var _ require('lodash');


// A quoted encoded string with a trailing '=', indicating that
// it's nto terminated
var UNTERMINATED_QUOTED_PRINTABLE = /ENCODING=QUOTED-PRINTABLE:.*=$/;


function VCard (opts) {
  // Backwards compatibility
  if (_.isString(opts)) {
    opts = {version: opts}
  }

  // Default options
  this.version = opts.version || '4.0';
  this.chars = options.chars || 75;

  this.fields = {};
  this.groups = {};
  this.group = null;
};


VCard.prototype.setGroup = function (group) {
  this.group = group;
};


VCard.prototype.methodMissing = function (method, args) {
  if (_.isEmpty(args)){
    // Return the field property/properties when no arguments are passed
    this.field(method)
  } else {
    // Add property to vCard
    this.add(method, args);
  }
};


VCard.prototype.add = function (name, args) {
  if (!_.isNull(this.group)) {
    // if there's a group, add it to the name
    name = this.group + '.' + name;

    // Reset group
    this.group = null;
  }
  // Build the property and add it to the vCard
  property = this.buildProp(name, args);
  this.addProp(property);
};


VCard.prototype.remove = function (name) {
  if (_.has(this.fields, name)) {
    delete this.fields[name];

    _.forOwn(this.fields, function (value, key) {
      var groupName = key.group;
      if (!_.isUndefined(groupName)) {
        var groupFieldNames = delete this.groups[groupName];
        _.reject(this.groups, function (el) {
          return el === name;
        });

        _.forOwn(groupFieldNames, function (value, key) {
          var namedFields = this.fields[key];
          if(!_.isUndefined(namedFields)) {
            _.forOwn(this.namedFields, function (key, value) {
              if (key.group === groupName) delete this.namedFields[key];
            });
          }
        });
      }
    });
  }
};


VCard.prototype.field = function (name) {
  name = name.toLowerCase();
  if (!_.isNull(this.group) && !_.isUndefined(this.fields[name])) {
    // Finds all items that match the prop type in the group
    var fields = _.filter(this.fields[name], function (item) {
      return item.group === this.group;
    });

    // Reset the group to null and return the fields
    this.group = null;
    return fields;
  } else {
    return this.fields[name];
  }
};


VCard.prototype.group = function (name) {
  this.group = name;
};

VCard.prototype.toS = function () {
  var vcard;
  // Raise error if invalid
  // this.validate();

  // Start vCard
  vcard.begin = 'VCARD\n';

  // Add version
  vcard.version = this.version;

  // Add the properties
  _.forOwn(this.fields, function (value, key) {
    value.forEach(function (val) {
      _.assign(vcard, val, '\n');
    });
  });

  // END
  vcard.end 'VCARD\n';

  // Return vcard
  return vcard;
};


// Aliases
VCard.prototype.name (args) {
  this.n(args);
};

VCard.prototype.fullname (args) {
  this.fn(args);
};


// PRIVATE
VCard.prototype.addProp = function (property) {
  var name = property.name;
  var group = property.group;

  // Create a field on the fields hash, if not already present, to house
  // the property
  if (!_.has(this.fields, name)) {
    this.fields[name] = [];
  }

  // Add the property to the field array
  this.fields[name].push(property);

  if (!_.isUndefined(group)) {
    // Add a field on the groups hash, if not already present, to house
    // the group properties
    if (!_.has(this.groups, group)) {
      this.groups[group] = [];
    }
    // Add the property to the groups array
    this.groups[name].push(property);
  }
};


VCard.prototype.validate = function () {
  if (!_.has(this.fields, 'fn')) {
    throw new Error('vCards must include a FN field');
  }

};
