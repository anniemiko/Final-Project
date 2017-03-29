var React = require('react');
var Backbone = require('backbone');
var Materialize = require('materialize-css');
var $ = window.jQuery = require('jquery');
require('../../../node_modules/materialize-css/js/collapsible.js');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;
var User = require('../models/user.js').User;
var ChallengeCollection = require('../models/challenge.js').ChallengeCollection;

class ChallengesContainer extends React.Component{
  constructor(props){
    super(props)
     $('.collapsible').collapsible();
    var challengeCollection = new ChallengeCollection();
    challengeCollection.whereClause = {};
    this.state = {
      challengeCollection: challengeCollection,
      challengeList: [{description: 'loading', objectId: '123'}]
    }
  }
  componentWillMount(){
    self = this;
    this.state.challengeCollection.parseWhere('members', "_User", User.current().get('objectId')).fetch().then((challenge)=>{
      var challengeList = challenge.results;
      self.setState({challengeList: challengeList})
    });

    this.generateParticipants = this.generateParticipants.bind(this);

  }

  generateParticipants(challenge) {
    var parts = challenge.participants;
    var list;
    if(parts) {
      list = parts.map(function(per){
        return (
          <li key={per.objectId} className="collection-item valign">
            <h5>{per.username}</h5>
          </li>
        )
      })
    }
    return list;
  }
  render(){
    var challenges = this.state.challengeList.map((challenge)=>{
      return(
        <li key={challenge.objectId} className="collection-item valign">
          <div className="collapsible-header">
          {challenge.name}
          </div>
          <div className="collapsible-body">
            <p>{challenge.description}</p>
            <h6>Participants:</h6>
            <ul>{this.generateParticipants(challenge)}</ul>
          </div>
        </li>
      )
    })
    return (
      <BaseLayout>
        <div className="container">
          <h3>Challenges</h3>
          <ul className="collection valign collapsible" data-collapsible="accordion">
            {challenges}
          </ul>
        </div>
      </BaseLayout>
    )
  }
}

module.exports = {
  ChallengesContainer
}
