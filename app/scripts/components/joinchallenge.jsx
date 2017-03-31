var React = require('react');
var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');

var ChallengeCollection = require('../models/challenge.js').ChallengeCollection;
var User = require('../models/user.js').User;
var MaterializeModal = require('./materialize.jsx').MaterializeModal;

class JoinChallengeContainer extends MaterializeModal {
  constructor(props){
    super(props);
    var user = User.current();
    var userId = User.current().get('objectId');
    var challengeCollection = new ChallengeCollection();
    this.handleSubmit = this.handleSubmit.bind(this);
    challengeCollection.whereClause = {};
    challengeCollection.fetch().then(()=>{this.setState({challengeCollection: challengeCollection})})

    this.state = {
     challengeCollection: challengeCollection,
     user: user,
     userId: userId,
     participants: []
    }
  }
  handleSubmit(challenge){
    // console.log('challenge', challenge);

    challenge.set({'members' : {
      "__op":"AddRelation",
      "objects":[
       {"__type":"Pointer", "className":"_User", "objectId": this.state.userId}
      ]}
    })

    var participants = challenge.get('participants') || [];
    participants.push({"__type":"Pointer","className":"_User","objectId":User.current().get('objectId')});

    challenge.set({participants});
    challenge.save();
  }
  render(){
    // console.log('challenge collection', this.state.challengeCollection);
    var challengeList = this.state.challengeCollection.map((challenge)=>{
      return(
        <li key={challenge.cid} className="collection-item valign col s12">
          <span>{challenge.get('name')}</span>
          <a href="#challenges" onClick={()=>this.handleSubmit(challenge)} type="submit" className="btn waves-effect blue right col s4">Join Challenge</a>
        </li>
      )
    })
    return(
      <div className="modal" ref={(modal) => {this.modal = modal}}>
        <div className="modal-content">
          <a className="btn modal-action modal-close right">X</a>
          <h4>Choose a habit challenge to join:</h4>
          <ul className="collection valign">{challengeList}</ul>
          <input className="btn btn-primary modal-action modal-close" type="submit" value="Done"/>
        </div>
      </div>
    )
  }
}

module.exports = {
  JoinChallengeContainer
}
