var React = require('react');
var Backbone = require('backbone');

var User = require('../models/user').User;

class SignupContainer extends React.Component {
  constructor(props){
    super(props);
    this.signup = this.login.bind(this);
  }
  createAccount(creds){
    User.signup(creds);
    Backbone.history.navigate('main/', {trigger: true});
  }
  render(){
    return (
      <div id="modal2" className="modal">
        <h1>Sign Up</h1>
        <SignupForm action={this.createAccount} SubmitBtn="Create Account"/>
      </div>
    )
  }
};

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handleSubmit(e){
      e.preventDefault();
      this.props.action(this.state);
  }
  render(){
    return(
      <div>
        <div className="modal-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">What would you like your username to be?</label>
              <input onChange={this.handleUsernameChange} className="form-control" name="username" id="username" type="text" placeholder="Enter username here" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Create password</label>
              <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password" type="text" placeholder="Enter password here" />
            </div>

            <input className="btn btn-primary" type="submit" value={this.props.SubmitBtn}/>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Sign Up</a>
        </div>
    </div>
    )
  }
};


module.exports = {
  SignupContainer
}
