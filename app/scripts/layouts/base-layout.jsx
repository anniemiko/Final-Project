var React = require('react');

function BaseLayout(props){
  return(
    <div className="base-layout">
      <nav>
        <div className="nav-wrapper navbar">
          <a href="#" className="brand-logo center"><img src="images/9toShine.png" /></a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="#about">About</a></li>
            <li><a href="#habits">My Habits</a></li>
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a  href="#home">Logout</a></li>
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