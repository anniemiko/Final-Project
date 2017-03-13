var React = require('react');

function BaseLayout(props){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-12">

        <div className="header">
          <img src="#" alt="" className="logo"/>
          <h2>Cramazing Habit App Name</h2>
          <a class="waves-effect waves-light btn" href="#modal1">Login</a> {/* turns into Logout link when user is logged in...*/}
        </div>

            {props.children}

        </div>
      </div>
    </div>
  )
}

module.exports = {
  BaseLayout
}
