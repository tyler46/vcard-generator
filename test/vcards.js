var assert = require('chai').assert;

var card = require('../src/card');

var contact = {
  name: {
    firstName: 'John',
    lastName: 'Smith',
    prefix: 'Mr'
  },
  nickname: 'Little John',
  organization: {
    name: 'Lakers',
    department: 'Basketball Team'
  },
  birthday: 'Sat Oct 15 2011 00:00:00 GMT+0300 (EEST)',
  url: {address: 'http://johnsmith.com', primary: true},
  title: 'Basketball Player',
  photo: 'http://www.example.com/dir_photos/my_photo.png',
  email: [
    {
      address: 'kobe@la.com',
      type: 'home',
      primary: true
    },
    {
      address: 'kobe@nba.com',
      type: 'work'
    },
    {
      address: 'john@smith.com'
    }
  ],
  phone: [
    {number: '465424 3464364', type: 'cell'},
    {number: '2432 543', type: 'iphone'},
    {number: '24532 535', type: 'home'}
  ],
  address: [{
      type: 'home',
      primary: true,
      streetAddress: ['1 Madison Square', '5th Ave'],
      city: 'New York',
      postalCode: 'WC2N',
      country: 'United States'
    },
    {
      type: 'work',
      streetAddress: ['25th LA Ave'],
      city: 'Los Angeles',
      postalCode: 'LC2A',
      country: 'United States'
  }],
  'social-profiles': [
    {
      service: 'twitter', address: 'http://twitter.com/blackmamba'
    },
    {
      service: 'flickr', address: 'http://www.flickr.com/photos/kobetakingpics'
    },
    {
      service: 'linkedin', address: 'http://www.linkedin.com/in/kobejob'
    },
    {
      service: 'myspace', address: 'http://www.myspace.com/kobemusic'
    },
    {
      service: 'weibo', address: 'http://weibo.com/n/kobweib'
    },
    {
      service: 'facebook', address: 'http://www.facebook.com/kobefb'
    }
  ]
};

console.log(card(contact));

describe('vcard testing', function () {

  describe('#Set correctly enclosing tags', function () {
    var c = card({nickname: 'Jay'});

    it('creates a string', function () {
      assert.isString(c, 'a stringified object');
    });

    it('contains nickname tag', function () {
      assert.match(c, /NICKNAME:Jay/, 'nickname regexp matches');
    });

    it('version is 3.0', function () {
      assert.match(c, /VERSION:3.0/, 'version regexp matches');
    });
  });

  describe('#Set correctly name', function () {
    var c = card({name: {firstName: 'Jay', lastName: 'Foo', prefix: 'Mr'}});

    it('contains N tag with all passed name parameters', function () {
      assert.match(c, /N:Foo,Jay,,Mr,/, 'name regexp matches');
    });

    it('contains tag FN aka fullname', function () {
      assert.match(c, /FN:Foo Jay/, 'fullname regexp matches');
    });

  });
});
