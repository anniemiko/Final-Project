var React = require('react');
var Backbone = require('backbone');
var moment = require('moment');
var Materialize = require('materialize-css');
var $ = window.jQuery = require('jquery');
require('../../../node_modules/materialize-css/js/collapsible.js');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;
var User = require('../models/user.js').User;
var ChallengeCollection = require('../models/challenge.js').ChallengeCollection;
var Star = require('../models/stars.js').Star;

class ChallengesContainer extends React.Component{
  constructor(props){
    super(props)
     $('.collapsible').collapsible();
    var challengeCollection = new ChallengeCollection();
    var star = new Star();
    challengeCollection.whereClause = {};
    this.state = {
      challengeCollection: challengeCollection,
      challengeList: [{description: 'loading', objectId: '123'}],
      star: star
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
  addChallengeStar(challenge){
    var star = this.state.star;

    star.isNew() ? star.set('timestamp', moment().format('l')): star.set('timestamp', star.get('timestamp'));

    star.setPointer('owner', '_User', User.current().get('objectId'));
    star.set({'challenge' : {
      "objects":[
       {"__type":"Pointer", "className":"Challenge", "objectId": challenge.objectId}
      ]}
    })

    star.save().then(()=>{

    });
    this.state = {
     star
    }
  }
  generateParticipants(challenge) {
    var parts = challenge.participants;
    var list;
    if(parts) {
      list = parts.map(function(per){
        return (
          <li key={per.objectId} className="collection-item valign participants">
            <h6>{per.username}</h6>
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
          <div className="collapsible-header row">
              <h5 className="challenge col s9">{challenge.name}</h5>
              <button onClick={()=> this.addChallengeStar(challenge.objectId)} className="btn waves-effect teal col s3">Mark done for today</button>
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
          <h3>Challenges</h3>
          <ul className="collection valign collapsible" data-collapsible="accordion">
            {challenges}
          </ul>
      </BaseLayout>
    )
  }
}

module.exports = {
  ChallengesContainer
}
