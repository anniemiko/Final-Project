var React = require('react');
var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');

var Habit = require('../models/habits.js').Habit;
var User = require('../models/user.js').User;
var MaterializeModal = require('./materialize.jsx').MaterializeModal;

class AddHabitContainer extends MaterializeModal {
  constructor(props){
    super(props);
    var habit = new Habit();
    this.addHabit = this.addHabit.bind(this);
    this.state = {
     habit
    }
  }
  addHabit(formData){
      var habit = this.state.habit;
      var user = User.current();

      habit.set({
        'description': formData.habit,
        'motivation': formData.motivation
      });

      habit.setPointer('owner', '_User', user.get('objectId'));

      habit.save().then(()=>{
        this.props.hide()
      });
  }
  render(){
    return (
      <div className="modal" ref={(modal) => {this.modal = modal; }}>
        <AddHabitForm action={this.addHabit} SubmitBtn="Add Habit"/>
      </div>
    )
  }
}

class AddHabitForm extends React.Component {
  constructor(props){
    super(props);
    this.handleHabitChange = this.handleHabitChange.bind(this);
    this.handleMotivationChange = this.handleMotivationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      habit: ''
    }
  }
  handleHabitChange(e){
    this.setState({habit: e.target.value})
  }
  handleMotivationChange(e){
    this.setState({motivation: e.target.value})
  }
  handleSubmit(e){
      e.preventDefault();
      this.props.action(this.state);
  }
  render(){
    return (
      <div className="modal-content">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="habit">What habit would you like to start or quit?</label>
            <input onChange={this.handleHabitChange} type='text' className="form-control" name="habit" placeholder="habit description"/>
          </div>
          <div className="form-group">
            <label htmlFor="motivator">Why do you want to do this? What is your motivation for making this change?</label>
            <input onChange={this.handleMotivationChange} type='textarea' className="form-control" name="motivator" placeholder="habit motivation"/>
          </div>
          <input className="btn btn-primary modal-action modal-close" type="submit" value={this.props.SubmitBtn}/>
        </form>
      </div>
    )
  }
}

module.exports = {
  AddHabitContainer
}
