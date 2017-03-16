var React = require('react');
var LoginContainer = require('./login.jsx').LoginContainer;
var SignupContainer = require('./signup.jsx').SignupContainer;

class HomeContainer extends React.Component{
  constructor(props){
    super(props)
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);

    this.state = {
      showLogin: false,
      showSignup: false,
    }
  }
  toggleLogin(){
    this.setState({showLogin: true, showSignup: false})
  }
  toggleSignup(){
    this.setState({showSignup: true, showLogin: false})
  }
  render(){
    return(
      <div>
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <h4>Logo</h4>
            <a onClick={this.toggleLogin} className="right waves-effect waves-light btn">Log In</a>
          </div>
        </nav>
        <div className="container banner">
          <br></br>
          <div className="row col s12">
            <h1 className="header center">Super Amazing Habit Forming App</h1>
          </div>
          <div className="section center">
            <h5>An app to help you live a productive and happy life</h5>
          </div>
          <div className="section center">
            <a onClick={this.toggleSignup} id="signup-button" className="btn-large waves-effect waves-light teal">Sign Me Up!</a>
          </div>
          <br></br>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s4">
              <h4>Focus on the Why</h4>
              <p></p>
            </div>
            <div className="col s4">
              <h4>Accountability</h4>
            </div>
            <div className="col s4">
              <h4>Track your progress</h4>
            </div>
          </div>
        </div>
        <LoginContainer show={this.state.showLogin}/>
        <SignupContainer show={this.state.showSignup}/>
      </div>
    )
  }
}



module.exports = {
  HomeContainer
}
