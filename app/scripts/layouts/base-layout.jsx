var React = require('react');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');
require('../../../node_modules/materialize-css/bin/materialize.js');
require('../../../node_modules/materialize-css/js/dropdown.js');

var User = require('../models/user.js').User;

class BaseLayout extends React.Component{
  constructor(props){
    super(props)
      $(".button-collapse").dropdown();
      $('.collapsible').collapsible();
  }
  componentDidMount(){
      $(".button-collapse").dropdown();
      $('.collapsible').collapsible();
  }
  render(){
  return(
    <div className="base-layout">
      <nav>
        <div className="nav-wrapper navbar">
          <a className="brand-logo center"><img src="images/9toShine.png" /></a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="#about">About</a></li>
            <li><a href="#habits">My Habits</a></li>
            <li><a href="#challenges">Challenges</a></li>
            <li><a href="#friends">Friends</a></li>
          </ul>
          <ul id="nav-mobile-logout" className="right hide-on-med-and-down">
            <li><a onClick={User.logout} href="#home">Logout</a></li>
          </ul>
        </div>
      </nav>
      <a href="#!" data-activates="mobile-demo" className="button-collapse dropdown-button hide-on-large-only" onClick={$(".dropdown-button").dropdown()}><i className="material-icons">menu</i></a>
      <ul className="dropdown-content" id="mobile-demo">
        <li><a href="#about">About</a></li>
        <li><a href="#habits">My Habits</a></li>
        <li><a href="#challenges">Challenges</a></li>
        <li><a href="#friends">Friends</a></li>
        <li><a href="#home">Logout</a></li>
      </ul>
      <div className="background">
        <div className="container main">
              {this.props.children}
        </div>
      </div>
      <div className="footer">
        <p className="copyright">Designed and built by Andrea Baty &copy; 2017</p>
      </div>
    </div>
  )
}
}

module.exports = {
  BaseLayout
}
