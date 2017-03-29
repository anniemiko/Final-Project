var React = require('react');
var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
var Materialize = require('materialize-css');

var MaterializeModal = require('./materialize.jsx').MaterializeModal;
var ParseFile = require('../utilities/parse.js').ParseFile;
var User = require('../models/user').User;

class SignupContainer extends MaterializeModal {
  constructor(props){
    super(props);
    this.createAccount = this.createAccount.bind(this);
  }
  createAccount(creds){
    User.signup(creds, function(){
      Backbone.history.navigate('habits', {trigger: true});
    });

  }
  render(){
    return (
      <div className="modal" ref={(modal) => {this.modal = modal}}>
        <SignupForm action={this.createAccount} SubmitBtn="Create Account"/>
      </div>
    )
  }
};

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      pic: {}
    };
  }
  handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handleEmailChange(e){
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handlePicChange(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = ()=>{
      this.setState({preview: reader.result});
    }
    reader.readAsDataURL(file);

    this.setState({pic: file});
  }
  handleSubmit(e){
      e.preventDefault();
      var pic = this.state.pic;
      if(pic.name){
        var fileUpload = new ParseFile(pic);
        fileUpload.save({}, {
          data: pic
        }).then((response)=>{
          var imageUrl = response.url;
          var userData = $.extend({}, this.state);
          delete userData.preview;
          userData.pic = {url: response.url, name: pic.name};
          this.props.action(userData);
        })
      }else{
        this.props.action(this.state);
      }
  }
  render(){
    return(
      <div>
        <div className="modal-content">
          <a className="btn modal-action modal-close right">X</a>
          <h4>Create an account</h4>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="username">What would you like your username to be?</label>
              <input onChange={this.handleUsernameChange} className="form-control" name="username" id="username" type="text" placeholder="Enter username here" />
            </div>

            <div className="form-group">
              <label htmlFor="email">What is your email address?</label>
              <input onChange={this.handleEmailChange} className="form-control" name="email" id="email" type="text" placeholder="Enter email here" />
            </div>



            <div className="form-group">
              <label htmlFor="password">Create password</label>
              <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password" type="password" placeholder="Enter password here" />
            </div>

            <div className="form-group">
              <label htmlFor="username">Upload a profile pic:</label>
                <input onChange={this.handlePicChange} type="file"/>
                <img src={this.state.preview} />
            </div>

            <input className="btn btn-primary modal-action modal-close" type="submit" value={this.props.SubmitBtn}/>
          </form>
        </div>
    </div>
    )
  }
};


module.exports = {
  SignupContainer
}
