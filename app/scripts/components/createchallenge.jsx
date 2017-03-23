var React = require('react');
var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');

var Challenge = require('../models/challenge.js').Challenge;
var User = require('../models/user.js').User;
var MaterializeModal = require('./materialize.jsx').MaterializeModal;

class CreateChallengeContainer extends MaterializeModal {
  constructor(props){
    super(props);
    var challenge = new Challenge();
    this.createChallenge = this.createChallenge.bind(this);
    this.state = {
     challenge
    }
  }
  createChallenge(formData){
      var challenge = this.state.habit;
      var user = User.current();

      challenge.set({
        'name': formData.name,
        'description': formData.description
      });

      challenge.setPointer('owner', '_User', user.get('objectId'));

      challenge.save().then(()=>{
        this.props.hide();
      });
      this.state = {
       challenge
      }
  }
  render(){
    return (
      <div className="modal" ref={(modal) => {this.modal = modal}}>
        <CreateChallengeForm action={this.createChallenge} SubmitBtn="Create Challenge"/>
      </div>
    )
  }
}

class CreateChallengeForm extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      challenge: ''
    }
  }
  handleNameChange(e){
    this.setState({name: e.target.value})
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
  }
  handleSubmit(e){
      e.preventDefault();
      this.props.action(this.state);
  }
  render(){
    return (
      <div className="modal-content">
        <a className="btn modal-action modal-close right">X</a>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">What would you like to call this challenge?</label>
            <input onChange={this.handleNameChange} type='text' className="form-control" name="name" placeholder="challenge name"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Describe the habit challenge</label>
            <input onChange={this.handleDescriptionChange} type='text' className="form-control" name="description" placeholder="habit description"/>
          </div>
          <input className="btn btn-primary modal-action modal-close" type="submit" value={this.props.SubmitBtn}/>
        </form>
      </div>
    )
  }
}

module.exports = {
  CreateChallengeContainer
}
