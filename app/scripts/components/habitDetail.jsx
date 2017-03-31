var React = require('react');
var Materialize = require('materialize-css');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var StarCollection = require('../models/stars.js').StarCollection;
var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;

const SERVER_URL = "https://habit-proxy-server.herokuapp.com";

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
    this.saveLinks = this.saveLinks.bind(this);

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
    console.log('state', this.state);
  }
  saveHabit(formData){
    var habit = this.state.habit;
    var user = User.current();
    habit.set({
      'description': formData.description,
      'motivation': formData.motivation,
    });

    habit.setPointer('owner', '_User', user.get('objectId'));

    habit.save().then(()=>{
      this.setState({habit: habit})
    });
    console.log('saveHabit',habit);
  }
  saveLinks(pocketList){
    var habit = this.state.habit;
    habit.set({
      'articles': pocketList
    })
    habit.save().then(()=>{
      this.setState({habit: habit})
    });
  }
  render(){
    console.log('habit', this.state.habit);
    var habit = this.state.habit;
    return (
      <BaseLayout>
          <HabitDetail saveHabit={this.saveHabit} saveLinks={this.saveLinks} habit={this.state.habit} starCollection={this.state.starCollection} habitId={this.state.habitId}/>
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
      'articles': this.props.habit.get('articles'),
      editing: false
    }
    console.log('props.habit', this.props.habit);
      console.log('this.state', this.state);
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
     motivation: newProps.habit.get('motivation'),
     articles: newProps.habit.get('articles')
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
     var obj = response.list;
     console.log('values', Object.values(obj));
     var pocketList = Object.values(obj).map(function (key) { return key });
     console.log(pocketList);
     this.props.saveLinks(pocketList);
   })

 }
  render(){
    var starList = this.props.starCollection.map((star)=>{
      if (star.attributes.habitCheck.objectId == this.props.habitId) {
        return(
          <li key={star.cid} className="collection-item star"><i className="medium material-icons">stars</i><p className="stars-list">{star.get('timestamp')}</p></li>
        )
      }
    })
    var description = this.state.editing ? <input onChange={this.handleDescriptionChange} type='text' className="form-control" name="description" value={this.state.description}/> : <h5 className="habit-detail">{this.state.description}</h5>;
    var motivation = this.state.editing ? <input onChange={this.handleMotivationChange} type='text' className="form-control" name="motivation" value={this.state.motivation}/> : <h5 className="habit-detail">{this.state.motivation}</h5>;
    var pocket =  !localStorage.getItem('pocket_access_token') ?
        <button onClick={this.addPocket} className="waves-effect btn red">Connect to Pocket</button>
        : <div><i className="material-icons search">search</i><label className="searchAdd"htmlFor="links">Search Pocket articles for tag:</label>
      <input onChange={(e)=>{e.preventDefault(); this.setState({searchTerm: e.target.value})}} type="text" name="links"/>
          <button onClick={this.addPocketLinks} className="waves-effect btn orange darken-4">Add Pocket links to habit</button></div>;
    var title = !this.state.articles ? <p>Add an article</p> : this.state.articles.map((article)=>{
      return (
        <li key={article.item_id ? article.item_id : "" } className="collection-item articles col m4 s6">

            <a href={article.given_url ? article.given_url : article.resolved_url}>
              <div className="card small hoverable cyan darken-4">
            <div className="card-title">
              <h6>{article.given_title ? article.given_title : article.resolved_title}</h6>
              </div>
            </div></a>

            </li>
      )
  });
    return (
      <div className="habit-detail-screen">
        <div className="row">
          <div className="col m6 s12">
            <h4 className="light-green habit-detail-heading">Habit Details</h4>
            <form>
              <div className="form-group habit-detail">
                <label htmlFor="description">Your habit:</label>
                {description}
              </div>
              <div className="form-group habit-detail">
                <label htmlFor="motivation">Your motivation for beginning/quitting this habit:</label>
                {motivation}
              </div>
                <button onClick={this.handleSubmit} className="waves-effect btn amber darken-2" type="submit">{this.state.editing ? 'Save' : 'Edit'}</button>
            </form>
          </div>
          <div className="col m6 s12">
            <h4 className="habit-chain-heading">Habit Chain</h4>
              <ul className="collection valign stars">
                {starList}
              </ul>
          </div>
        </div>


          <br></br>
          <div className="row">
            <div className="col s12">
              <h4 className="deep-orange darken-3 related-articles-heading">Related Articles</h4>
              <div className="row">
                  <ul>{title}</ul>
              </div>
              <div className="row">
                {pocket}
              </div>
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
