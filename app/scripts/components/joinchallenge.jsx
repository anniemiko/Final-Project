var React = require('react');
var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');

var Challenge = require('../models/challenge.js').Challenge;
var User = require('../models/user.js').User;
var MaterializeModal = require('./materialize.jsx').MaterializeModal;

class JoinChallengeContainer extends MaterializeModal {
  constructor(props){
    super(props);
    var challenge = new Challenge();

    this.state = {
     challenge
    }
  }
  render(){
    return(
      <div className="modal" ref={(modal) => {this.modal = modal}}>
        <div className="modal-content">
          <a className="btn modal-action modal-close right">X</a>
          <h4>Choose a habit challenge to join:</h4>
          <p>list of challenges to join</p>
          <input className="btn btn-primary modal-action modal-close" type="submit" value="Join Challenge"/>
        </div>
      </div>
    )
  }
}

module.exports = {
  JoinChallengeContainer
}
