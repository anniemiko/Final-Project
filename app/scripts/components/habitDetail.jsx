var React = require('react');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var StarCollection = require('../models/stars.js').StarCollection;

class HabitDetailContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habit = new Habit();
    var starCollection = new StarCollection();
    habit.set('objectId', props.id);
    habit.fetch().then(() => {
      this.setState({habit: habit});
    });
    this.saveHabit = this.saveHabit.bind(this);
    starCollection.fetch().then(()=>{
      this.setState({starCollection: starCollection});
    });

    // this.state.collection.parseWhere('habitCheck', '_Habits', 'objectId').fetch().then(()=>{this.setState({starCollection: starCollection})})
    this.state = {
      habit: habit,
      starCollection: starCollection
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
        <HabitDetail saveHabit={this.saveHabit} habit={this.state.habit} starCollection={this.state.starCollection}/>
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
    var starList = this.props.starCollection.map((star)=>{
      return(
        <li key={star.cid} className="collection-item"><i className="medium material-icons green">stars</i></li>
        )
      })
      console.log(starList);
    return (
      <div className="habit-detail-screen">
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
        </form>
          <br></br>
          <div className="row">
            <div className="col s6">
                <button onClick={this.addPocket} className="waves-effect btn red">Add Pocket links</button>
            </div>
            <div className="col s6">
              <h4>Habit Chain</h4>
                <ul className="collection valign">
                  {starList}
                </ul>
            </div>

          </div>

          <br></br>
          <a className="waves-effect waves-light btn" href={"#habits"}>Back to Habits Dashboard</a>
      </div>
    )
  }
}

module.exports = {
  HabitDetailContainer
}
