var $ = require('jquery');
var React = require('react');

class MaterializeModal extends React.Component {
  constructor(props){
    super(props)
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount(){
    $(this.modal).modal({
      dismissible: true
    });

    if(this.props.show){
      this.open()
    }else{
      this.close()
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.show){
      this.open()
    }else{
      this.close()
    }
  }
  open(){
    $(this.modal).modal('open');
  }
  close(){
      $(this.modal).modal('close');
  }
  // render(){
  //   <div className="modal" ref={(modal) => {this.moda; = modal; }}>
  //
  //   </div>
  // }
}

module.exports = {
  MaterializeModal
}
