

var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FilterActions = require('../actions/filter-actions');


var EmptyTrashConfirm = React.createClass({
	
	 mixins: [OverlayMixin],

	  getInitialState: function () {
	    return {
	      isModalOpen: false
	    };
	  },

	  handleToggle: function () {
	    this.setState({
	      isModalOpen: !this.state.isModalOpen
	    });
	  },
	  
	  render: function () {
	    return (
	    		<Button bsStyle="danger" onClick={this.handleToggle}><FontAwesome name="trash-o" /> Remove permanently</Button>
	    );
	  },

	  renderOverlay: function () {
	    if (!this.state.isModalOpen) {
	      return <span/>;
	    }
	    
	    return (
	        <Modal title="Throwing out your trash" onRequestHide={this.handleToggle} className="fr-empty-trash-confirmation">
	          <div className="modal-body">
	          	<h5>Do you really want to permanently remove all previsously deleted notes?</h5>
	          	<h5>This action cannot be taken back.</h5>
	          </div>
	          <div className="modal-footer">
	            <Button onClick={this.handleToggle}>Close</Button>
	            <Button bsStyle="primary" onClick={this.emptyTrash}>Yes, empty trash!</Button>
	          </div>
	        </Modal>
	      );
	  },
		
	emptyTrash: function(){
		FilterActions.emptyTrash();
		this.handleToggle();
	}
	});

module.exports = EmptyTrashConfirm;