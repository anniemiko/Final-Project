var React = require('react');
var Backbone = require('backbone');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;
var User = require('../models/user.js').User;
var ChallengeCollection = require('../models/challenge.js').ChallengeCollection;

class ChallengesContainer extends React.Component{
  constructor(props){
    super(props)
    var challengeCollection = new ChallengeCollection();

    this.state = {
      challengeCollection: challengeCollection
    }
  }
  componentDidMount(){
    self = this;
    this.state.challengeCollection.parseWhere('members', "_User", User.current().get('objectId')).fetch().then((challenge)=>{
      console.log('user challenges', challenge);
      var challengeList = challenge.results;
      self.setState({challengeList: challengeList})
    });

    console.log('challengeList', this.state.challengeList);
    // challengeCollection.parseWhere('objectId', props.challengeID).parseInclude('owner, going').fetch()
  }
  render(){
    console.log('challengeList', this.state.challengeList);

    return (
      <BaseLayout>
        <div></div>
      </BaseLayout>
    )
  }
}

module.exports = {
  ChallengesContainer
}
