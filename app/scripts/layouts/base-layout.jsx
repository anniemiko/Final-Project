var React = require('react');

var User = require('../models/user.js').User;

function BaseLayout(props){
  return(
    <div className="base-layout">
      <nav>
        <div className="nav-wrapper navbar">
          <a href="#" className="brand-logo center"><img src="images/9toShine.png" /></a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="#about">About</a></li>
            <li><a href="#habits">My Habits</a></li>
            <li><a href="#friends">Friends</a></li>
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a onClick={User.logout} href="#home">Logout</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><a href="#about">About</a></li>
            <li><a href="#habits">My Habits</a></li>
            <li><a href="#home">Logout</a></li>
          </ul>
        </div>
      </nav>

            {props.children}

    </div>
  )
}

module.exports = {
  BaseLayout
}
