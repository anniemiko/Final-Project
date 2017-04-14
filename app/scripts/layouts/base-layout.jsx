var React = require('react');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');
require('../../../node_modules/materialize-css/bin/materialize.js');
require('../../../node_modules/materialize-css/js/dropdown.js');
require('../../../node_modules/materialize-css/js/chips.js');

var User = require('../models/user.js').User;

class BaseLayout extends React.Component{
  constructor(props){
    super(props)
      $(".button-collapse").dropdown();
      $('.collapsible').collapsible();
      var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg';
      this.state = {
        profilePic
      }
  }
  componentDidMount(){
      $(".button-collapse").dropdown();
      $('.collapsible').collapsible();
      $('.chips').material_chip();
  }
  render(){
  return(
    <div className="base-layout page-flexbox-wrapper">
      <header>
        <nav>
          <div className="nav-wrapper navbar">
            <a className="brand-logo center"><img src="images/9toShine.png" /></a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><a href="#about">About</a></li>
              <li><a href="#habits">My Habits</a></li>
              <li><a href="#challenges">Challenges</a></li>
              <li><a href="#friends">Friends</a></li>
            </ul>
            <ul id="nav-mobile-logout" className="right">
              <li><span className="chip valign-wrapper">
                <img className="circle responsive-img" src={this.state.profilePic} alt={User.current().get('pic').name}/>
                  {User.current().get('username')}</span>
                </li>
              <li className="hide-on-med-and-down"><a onClick={User.logout} href="#home">Logout</a></li>
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
      </header>
      <main>
        <div className="background">
          <div className="container main">
                {this.props.children}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer">
          <p className="copyright">Designed and built by Andrea Baty &copy; 2017</p>
        </div>
      </footer>
    </div>
  )
}
}

module.exports = {
  BaseLayout
}
