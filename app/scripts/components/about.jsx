var React = require('react');
var Backbone = require('backbone');
var Materialize = require('materialize-css');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;

class AboutContainer extends React.Component {
render(){
  return(
    <BaseLayout>
      <h4 className="title">About</h4>
      <p>Eveyone has habits, some good and some bad. Most people feel they could be happier, healthier or more productive if they were able to build more good habits and quit the bad ones. This app has been developed to help people do exactly that.</p>
      <h5 className="center">Basics of Habit Formation</h5>
      <div className="row center">
        <div className="col s12 m5 card small about-box">
          <h6 className="about-heading">9 weeks</h6>
          <p className="about-p">Scientific studies have shown it takes approximately 66 days to form a habit. This is about 9 weeks, so we chose to call the app 9 to Shine to reflect the 9 weeks you will work on your habit.</p>
        </div>
        <div className="col s12 m5 card small about-box">
          <h6 className="about-heading">Habit chaining</h6>
          <p className="about-p">Marking off a completed or avoided habit every day to create an unbroken chain gives people a visual goal and greatly increases your likelihood to stick to the habit.</p>
        </div>
        <div className="col s12 m6">
          <h6 className="about-heading">Peer accountability</h6>
          <p className="about-p">Social relationships play a big part in our ability to change our lives. When you tell others you are attempting something, you end up feeling accountable to live up to your word. Additionally, working on a challenge together provides both support from friends and a little healthy competition to help you reach your goals.</p>
        </div>
        <div className="col s12 m6">
          <h6 className="about-heading">Motivation</h6>
          <p className="about-p">A big factor in staying motivated is remembering your why. Why do want to change this habit? What is the reason that will keep you going when you are feeling low?</p>
        </div>
      </div>
    </BaseLayout>
  )
}
}

module.exports = {
  AboutContainer
}
