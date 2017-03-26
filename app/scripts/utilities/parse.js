
// Parse Models sync function to set and remove headers
// deinitialize: {
//   X-Parse, null
// }

var $ = require('jquery');
var Backbone = require('backbone');

var parse = {
  base_url: '',
  initialize: function(config){
    config = config || {};
    if(config.base_url){
      this.base_url = config.base_url;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "habits");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", config.sessionId)
        }
      }
    })
  },
  deinitialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", null);
        xhr.setRequestHeader("X-Parse-REST-API-Key", null);
        xhr.setRequestHeader("X-Parse-Session-Token", null);
      }
    })
  }
}

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    var User = require('../models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Model.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  },
  parseInclude: function(field, value, objectId) {
   if(objectId) {
     value = {
       className: value,
       objectId: objectId,
       '__type': 'Pointer'
     };
   }
   this.includeClause[field] = value;
   return this;
 }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  includeClause: '',
  sync: function(){
    var User = require('../models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
  parseWhere: function(field, value, objectId){
    if(objectId){
      value = {
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }
    this.whereClause[field] = value;

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }

    return url;
  },
  urlSetter: function(url){
    var url = this.baseUrl;
    return url;
  },
  parse: function(data){
    return data.results;
  }
});

var ParseFile = ParseModel.extend({
  urlRoot: function(){
    return 'https://brand-new-app.herokuapp.com/files/' + this.get('name');
  }
})

module.exports = {
  parse,
  ParseModel,
  ParseCollection,
  ParseFile
}
