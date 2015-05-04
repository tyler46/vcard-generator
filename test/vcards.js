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
    {number: '4654 346', type: 'cell'},
    {number: '2432 543', type: 'iphone'},
    {number: '2532 535', type: 'home'}
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


describe('vcard testing', function () {

  describe('#Set correctly enclosing tags', function () {
    var c = card({});
    it('creates a string', function () {
      assert.isString(c, 'a stringified object');
    });

    it('starts with BEGIN tag', function () {
      assert.match(c, /^BEGIN:VCARD/, 'begin regexp found at start');
    });

    it('ends with END tag', function () {
      assert.match(c, /END:VCARD/, 'end regexp found at the end');
    });

    it('version is 3.0', function () {
      assert.match(c, /VERSION:3.0/, 'version regexp matches');
    });

    it('contains revision tag', function () {
      assert.match(c, /REV:/, 'revision regexp found');
    });

    it('contains UID tag', function () {
      assert.match(c, /UID:/, 'uid regexp found');
    });
  });

  describe('#Set correctly nickname', function () {
    var c = card({nickname: 'Jay'});


    it('contains nickname tag', function () {
      assert.match(c, /NICKNAME:Jay/, 'nickname regexp matches');
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

  describe('#Set correctly organization tag', function () {
    var c = card({organization: {name: 'Lakers', department: 'Basketball Team'}});

    it('contains ORG tag', function () {
      assert.match(c, /ORG:Lakers;Basketball Team/, 'organization regexp matches');
    });
  });

  describe('#Set address tag', function () {
    var c = card({url: {address: 'http://johnsmith.com', primary: true}});

    it('contains URL tag', function () {
      assert.match(c, /item1\.URL;type=pref\nitem1\.X-ABLabel: \_\$!<HomePage>!\$\_/, 'url regexp matches');
    });
  });

  describe('#Set title tag', function () {
    var c = card({title: 'Basketball Player'});

    it('contains TITLE tag', function () {
      assert.match(c, /TITLE:Basketball Player/, 'title regexp matches');
    });
  });

  describe('#Set photo tag', function () {
    var c = card({photo: 'http://www.example.com/dir_photos/my_photo.png'});

    it('contains PHOTO tag', function () {
      assert.match(c, /PHOTO;VALUE=URL;TYPE=URL:http:\/\/www\.example\.com\/dir_photos\/my_photo\.png/, 'photo regexp matches');
    });
  });

  describe('#Set email tag', function () {
    var c = card({email: [
      {address: 'jfoo@mail.com', type: 'home', primary: true},
      {address: 'jay@foo.org', type: 'work'},
      {address: 'jjf@dot.com'}
    ]});

    it('contains several EMAIL tags', function () {
      assert.match(c, /EMAIL;type=INTERNET;type=HOME;type=pref:jfoo\@mail\.com/, '1st email regexp matches');
      assert.match(c, /EMAIL;type=INTERNET;type=WORK:jay\@foo\.org/, '2nd email regexp matches');
      assert.match(c, /item1\.EMAIL;type=INTERNET:jjf\@dot\.com\nitem1\.X-ABLabel:\_\$!<Other>!\$\_/, '3rd email regexp matches');
    });
  });

  describe('#Set phone tag', function () {
    var c = card({phone: [
      {number: '4654 346', type: 'cell'},
      {number: '2432 543', type: 'iphone'},
      {number: '2532 535', type: 'home'}
    ]});

    it('contains several email tags', function () {
      assert.match(c, /TEL;type=CELL;type=VOICE:4654 346/, '1st phone number regexp matches');
      assert.match(c, /TEL;type=IPHONE;type=CELL;type=VOICE:2432 543/, '2nd phone number regexp matches');
      assert.match(c, /TEL;type=HOME;type=VOICE:2532 535/, '3rd phone number regexp matches');
    });
  });

  describe('#Set address tag', function () {
    var c = card({address: [
      {
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
      }]
    });

    it('contains two ADR tags', function () {
      assert.match(c, /item1\.ADR;type=HOME;type=pref;;;1 Madison Square\n5th Ave;New York;;WC2N;United States\nitem1\.X-ABADR:us/, '1st address regexp matches');
      assert.match(c, /item2\.ADR;type=WORK;;;25th LA Ave;Los Angeles;;LC2A;United States\nitem2\.X-ABADR:us/, '2nd address regexp matches');
    });
  });

  describe('#Set social profiles tags', function () {
    var c = card({'social-profiles': [
      {service: 'twitter', address: 'http://twitter.com/jjf'},
      {service: 'flickr', address: 'http://www.flickr.com/photos/jfpics'},
      {service: 'linkedin', address: 'http://www.linkedin.com/in/jfjob'},
      {service: 'myspace', address: 'http://www.myspace.com/ffmusic'},
      {service: 'weibo', address: 'http://weibo.com/n/jjib'},
      {service: 'facebook', address: 'http://www.facebook.com/jay.foo'}
      ]
    });

    it('contains X-SOCIALPROFILE tags', function () {
      assert.match(c, /X-SOCIALPROFILE;type=twitter;x-user=jjf:http:\/\/twitter\.com\/jjf/, 'twitter regexp matches');
      assert.match(c, /X-SOCIALPROFILE;type=flickr;x-user=jfpics:http:\/\/www\.flickr\.com\/photos\/jfpics/, 'flickr regexp matches');
      assert.match(c, /X-SOCIALPROFILE;type=linkedin;x-user=jfjob:http:\/\/www\.linkedin\.com\/in\/jfjob/, 'linkedin regexp matches');
      assert.match(c, /X-SOCIALPROFILE;type=myspace;x-user=ffmusic:http:\/\/www\.myspace\.com\/ffmusic/, 'myspace regexp matches');
      assert.match(c, /X-SOCIALPROFILE;type=weibo;x-user=jjib:http:\/\/weibo\.com\/n\/jjib/, 'weibo regexp matches');
      assert.match(c, /X-SOCIALPROFILE;type=facebook;x-user=jay\.foo:http:\/\/www\.facebook\.com\/jay\.foo/, 'facebook regexp matches');
    });


  });

});
