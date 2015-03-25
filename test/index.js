var card = require('./card');

var contact = {
  name: {
    firstName: 'John',
    lastName: 'Smith',
    prefix: 'Mr'
  },
  nickname: 'Little John',
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
  ]
};

console.log(card(contact));
