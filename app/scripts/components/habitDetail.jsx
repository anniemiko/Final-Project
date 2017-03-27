var React = require('react');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var StarCollection = require('../models/stars.js').StarCollection;
var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;

const SERVER_URL = "http://localhost:3000";

class HabitDetailContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habit = new Habit();
    var starCollection = new StarCollection();
    var habitId = props.id;

    habit.set('objectId', props.id);
    habit.fetch().then(() => {
      this.setState({habit: habit});
      this.forceUpdate();
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
    console.log('habit', this.state.habit);
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
    this.addPocket = this.addPocket.bind(this);
    this.addPocketLinks = this.addPocketLinks.bind(this);

    this.state = {
      'description': this.props.habit.get('description'),
      'motivation': this.props.habit.get('motivation'),
      editing: false
    }
      console.log(this.state);
  }
  componentWillReceiveProps(newProps){

   if(localStorage.getItem('pocket_request_token')) {
     var pocket_request_token = localStorage.getItem('pocket_request_token');
     localStorage.removeItem('pocket_request_token');
     $.get(`${SERVER_URL}/token`, { request_token: pocket_request_token }).done(response => {
       localStorage.setItem('pocket_access_token', response);
     });
   }

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
    this.setState({editing: !this.state.editing})
  }
  addPocket(e){
   e.preventDefault();

   var habitId = this.props.habitId;

   if(!localStorage.getItem('pocket_access_token')){
     $.get(`${SERVER_URL}/request`, { habitId }).then(response => {
       localStorage.setItem('pocket_request_token', response.request_token );
       window.location.href = response.url;
     })
   }
 }
 addPocketLinks(){
   var tag = this.state.searchTerm;
   console.log(tag);
   var access_token = localStorage.getItem('pocket_access_token');
   $.get(`${SERVER_URL}/gett?access_token=${access_token}&tag=${tag}`).then(response => {
     console.log(response);
   })
 }
  render(){
    var starList = this.props.starCollection.map((star)=>{
      if (star.attributes.habitCheck.objectId == this.props.habitId) {
        return(
          <li key={star.cid} className="collection-item stars"><i className="medium material-icons">stars</i><p className="stars-list">{star.get('timestamp')}</p></li>
        )
      }
    })
    var description = this.state.editing ? <input onChange={this.handleDescriptionChange} type='text' className="form-control" name="description" value={this.state.description}/> : <h5>{this.state.description}</h5>;
    var motivation = this.state.editing ? <input onChange={this.handleMotivationChange} type='text' className="form-control" name="motivation" value={this.state.motivation}/> : <h5>{this.state.motivation}</h5>;
    var pocket =  !localStorage.getItem('pocket_access_token') ?
        <button onClick={this.addPocket} className="waves-effect btn red">Connect to Pocket</button>
        : <div><label htmlFor="links">Search Pocket articles for term:</label>
      <input onChange={(e)=>{e.preventDefault(); this.setState({searchTerm: e.target.value})}} type="text" name="links"/>
          <button onClick={this.addPocketLinks} className="waves-effect btn red">Add Pocket links to habit</button></div>;
    return (
      <div className="habit-detail-screen">
        <form>
          <div className="form-group habit-detail">
            <label htmlFor="description">Your habit:</label>
            {description}
          </div>
          <div className="form-group habit-detail">
            <label htmlFor="motivation">Your motivation for beginning/quitting this habit:</label>
            {motivation}
          </div>
            <button onClick={this.handleSubmit} className="waves-effect btn orange" type="submit">{this.state.editing ? 'Save' : 'Edit'}</button>
        </form>



          <br></br>
          <div className="row">
            <div className="col m6 s12">
                {pocket}
            </div>
            <div className="col m6 s12">
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
