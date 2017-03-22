var React = require('react');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var StarCollection = require('../models/stars.js').StarCollection;
var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;

class HabitDetailContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habit = new Habit();
    var starCollection = new StarCollection();
    var habitId = props.id;

    habit.fetch().then(() => {
      this.setState({habit: habit});
    });
    this.saveHabit = this.saveHabit.bind(this);

    starCollection.urlSetter(habitId);
    starCollection.fetch().then(()=>{
      // console.log('response', starCollection);
      this.setState({starCollection: starCollection})
    })

    this.state = {
      habit: habit,
      starCollection: starCollection,
      habitId: habitId
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
    console.log(habit);
  }
  render(){
    var habit = this.state.habit;
    return (
      <BaseLayout>
        <div className="container">
          <h3>Habit details</h3>
          <HabitDetail saveHabit={this.saveHabit} habit={this.state.habit} starCollection={this.state.starCollection} habitId={this.state.habitId}/>
        </div>
      </BaseLayout>
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
      console.log(this.state);
  }
  // componentWillReceiveProps(newProps){
  //   this.setState({
  //     description: newProps.habit.get('description'),
  //     motivation: newProps.habit.get('motivation')
  //   })

// }
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
      // console.log(habit.get('objectId'));
    // console.log('habitDetail collection', this.props.starCollection);
    var starList = this.props.starCollection.map((star)=>{
      if (star.attributes.habitCheck.objectId == this.props.habitId) {
        return(
          <li key={star.cid} className="collection-item stars"><i className="medium material-icons green">stars</i><p className="stars-list">{star.get('timestamp')}</p></li>
        )
      }
    })
    return (
      <div className="habit-detail-screen">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group habit-detail">
            <label htmlFor="description">Your habit:</label>
            <input onChange={this.handleDescriptionChange} type='text' className="form-control" name="description" value={this.props.habit.description} placeholder="Description"/>
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
