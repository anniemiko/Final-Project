var React = require('react');

class HomeContainer extends React.Component{
  render(){
    return(
      <div>
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <h1>Logo</h1>
            <a className="right waves-effect waves-light btn" href="#modal1">Log In</a>
          </div>
        </nav>
        <div className="container">
          <br></br>
          <h1 className="header center">Super Amazing Habit Forming App</h1>
          <div className="row center">
            <h5>An app to help you live a productive and happy life</h5>
          </div>
          <div className="row center">
            <a href="#modal2" id="signup-button" className="btn-large waves-effect waves-light teal">Sign Me Up!</a>
          </div>
          <br></br>
        </div>
      </div>
    )
  }
}

module.exports = {
  HomeContainer
}
