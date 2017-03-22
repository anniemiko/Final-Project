var $ = require('jquery');

// $.ajaxSetup({
//     beforeSend: function(xhr){
//       xhr.setRequestHeader('X-Accept', 'application/x-www-form-urlencoded');
//
//     }
//   });

//** Step 2 - Get Request Token **//
var url = 'http://localhost:3000/v3/oauth/request?habitId=WoKCDu2Xwq';

$.get(url).then((code)=> {
  console.log(code);
  localStorage.setItem('pocket', JSON.stringify(code));
})

// ** Step 3 Redirect **//
var code = JSON.parse(localStorage.getItem('pocket')).code;
// console.log(code);
window.open('https://getpocket.com/auth/authorize?request_token=' + code + '&redirect_uri=https://anniemiko.github.io/Final-Project/')

// ** Step 5 Convert request token into Pocket access token **//

var urlAccess = 'http://localhost:3000/v3/oauth/authorize';
$.get(urlAccess).then((access)=> {
  console.log(access);
  localStorage.setItem('pocketaccess', JSON.stringify(access));
})




// module.exports = pocket-access-token;
