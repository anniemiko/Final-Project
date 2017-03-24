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
    var userId = User.current().get('objectId');
    var challengeCollection = new ChallengeCollection();
    challengeCollection.fetch().then(()=>{this.setState({collection: challengeCollection})})
    this.state = {
     collection: challengeCollection
    }
  }
  handleSubmit(){
    challenge.setRelation('participants', 'Challenge', userId);
  }
  render(){
    var challengeList = this.state.collection.map((challenge)=>{
      return(
        <li key={challenge.cid} className="collection-item valign">
          <span>{challenge.get('name')}</span>
          <a onClick={this.handleSubmit} className="btn waves-effect blue right">Join Challenge</a>
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
