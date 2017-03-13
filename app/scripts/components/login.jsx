var React = require('react');
var Backbone = require('backbone');

var User = require('../models/user').User;

class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }
  login(creds){
    User.login(creds, function(user){
      Backbone.history.navigate('main/', {trigger: true});
    });
  }
  render(){
    return (
      <div id="modal1" className="modal">
        <h1>Login</h1>
        <LoginForm action={this.login} SubmitBtn="Login"/>
      </div>
    )
  }
}

class LoginForm extends React.Component {
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
    return (
      <div>
        <div className="modal-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.handleUsernameChange} className="form-control" name="username" id="username" type="text" placeholder="Enter username here" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password" type="text" placeholder="Password please" />
            </div>

            <input className="btn btn-primary" type="submit" value={this.props.SubmitBtn}/>
          </form>

          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Log In</a>
          </div>
        </div>
      </div>
    )
  }
};

module.exports = {
  LoginContainer
};
