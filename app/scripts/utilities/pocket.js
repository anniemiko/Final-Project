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
var code = JSON.parse(localStorage.getItem('pocket'));
console.log(code);
// window.location = 'https://getpocket.com/v3/oauth/authorize?reqest_token=' + code + '&redirect_uri=#habit'
// var urlResponse = 'https://getpocket.com/v3/oauth/authorize';
// $.get(urlResponse, {
//   'consumer_key': '64510-02865d3dfc874b4fa05491f8',
//   'code': code
// }).then((access)=> {
//   console.log(access);
//   localStorage.setItem('pocket', JSON.stringify(access));
// })


// var PocketModel = Backbone.Model.extend({
//   idAttribute: 'objectId',
//   sync: function(){
//     var User = require('../models/user').User;
//     var user = User.current();
//
//     if(user){
//       parse.initialize({sessionId: user.get('sessionToken')});
//     }else{
//       parse.initialize();
//     }
//
//     var xhr = Backbone.Model.prototype.sync.apply(this, arguments);
//
//     parse.deinitialize();
//
//     return xhr;
//   },
//   save: function(key, val, options){
//     delete this.attributes.createdAt;
//     delete this.attributes.updatedAt;
//
//     return Backbone.Model.prototype.save.apply(this, arguments);
//   },
//   setPointer: function(field, parseClass, objectId){
//     var pointerObject = {
//       "__type": "Pointer",
//       "className": parseClass,
//       "objectId": objectId
//     };
//
//     this.set(field, pointerObject);
//
//     return this;
//   }
// });
//
// var ParseCollection = Backbone.Collection.extend({
//   whereClause: {},
//   sync: function(){
//     var User = require('../models/user').User;
//     var user = User.current();
//
//     if(user){
//       parse.initialize({sessionId: user.get('sessionToken')});
//     }else{
//       parse.initialize();
//     }
//
//     var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);
//
//     parse.deinitialize();
//
//     return xhr;
//   },
//   parseWhere: function(field, value, objectId){
//     if(objectId){
//       value = {
//         field: field,
//         className: value,
//         objectId: objectId,
//         '__type': 'Pointer'
//       };
//     }
//     this.whereClause[field] = value;
//
//     return this;
//   },
//   url: function(){
//     var url = this.baseUrl;
//
//     if(Object.keys(this.whereClause).length > 0){
//       url += '?where=' + JSON.stringify(this.whereClause);
//       this.whereClause = {};
//     }
//
//     return url;
//   },
//   parse: function(data){
//     return data.results;
//   }
// });

// module.exports = ajaxSetUp;
