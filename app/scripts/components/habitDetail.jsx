var React = require('react');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;

class HabitDetailContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habit = new Habit();
    habit.set('objectId', props.id);
    habit.fetch().then(() => {
      this.setState({habit: habit});
    });
    this.saveHabit = this.saveHabit.bind(this);

    this.state = {
      habit: habit
    }
  }
  saveHabit(formData){
    var habit = this.state.habit;
    var user = User.current();
    habit.set({
      'description': formData.description,
      'motivation': formData.motivation
    });

    habit.setPointer('owner', '_User', user.get('objectId'));

    habit.save().then(()=>{
      this.setState({habit: habit})
    });
  }
  render(){
    var habit = this.state.habit;
    return (
      <div className="container">
        <h3>Habit details</h3>
        <HabitDetail saveHabit={this.saveHabit} habit={this.state.habit}/>
      </div>
    )
  }
}

class HabitDetail extends React.Component {
  constructor(props){
    super(props)
    this.handleMotivationChange = this.handleMotivationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      'description': this.props.habit.get('description'),
      'motivation': this.props.habit.get('motivation')
    }
  }
  componentWillReceiveProps(newProps){
    this.setState({
      description: newProps.habit.get('description'),
      motivation: newProps.habit.get('motivation')
    })
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
  }
  handleMotivationChange(e){
    this.setState({motivation: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.saveHabit(this.state);
  }
  addPocket(e){

  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group habit-detail">
          <label htmlFor="description">Your habit:</label>
          <input onChange={this.handleDescriptionChange} type='text' className="form-control" name="description" value={this.state.description} placeholder="Description"/>
        </div>
        <div className="form-group habit-detail">
          <label htmlFor="motivation">Your motivation for beginning/quitting this habit:</label>
          <input onChange={this.handleMotivationChange} type='text' className="form-control" name="motivation" value={this.state.motivation} placeholder="Motivation"/>
        </div>
          <input className="waves-effect btn orange" type="submit" value="Update Habit"/>
          <br></br>
            <button onClick={this.addPocket} className="waves-effect btn red">Add Pocket links</button>
            <br></br>
          <a className="waves-effect waves-light btn" href={"#habits"}>Back to Habits Dashboard</a>
      </form>
    )
  }
}

module.exports = {
  HabitDetailContainer
}
