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
            <img src="images/9toShineLogoSmall.png"/>
            <a onClick={this.toggleLogin} className="right waves-effect waves-light btn">Log In</a>
          </div>
        </nav>
        <div className="banner">
          <br></br>
          <div className="row col s12 header center">
            <img src="images/9toShineLarge.png" />
          </div>
          <div className="section center">
            <h5>A simple app to help you live a healthy and productive life</h5>
          </div>
          <div className="section center">
            <a onClick={this.toggleSignup} id="signup-button" className="btn-large waves-effect waves-light teal-lighten-5">Sign Me Up!</a>
          </div>
          <br></br>
        </div>
        <div className="container habit-info">
          <div className="row">
            <div className="col s4">
              <h4>Focus on the Why</h4>
              <p>When forming a new habit or quitting a bad habit, your reason for making the change is what will drive your success. Keep your motivation in mind with reminders.</p>
            </div>
            <div className="col s4">
              <h4>Accountability</h4>
              <p>Connect with others who are attempting the same habit change to keep yourself accountable. Invite your friends!</p>
            </div>
            <div className="col s4">
              <h4>Track your progress</h4>
              <p>Check off your habits daily and see your progress over the course of nine weeks. Try not to break the habit chain!</p>
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
