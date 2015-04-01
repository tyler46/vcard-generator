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
