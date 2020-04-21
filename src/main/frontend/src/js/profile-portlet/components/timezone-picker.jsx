
var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var ProfileActions = require('../actions/profile-actions');
var ProfileStore = require('../stores/profile-store');

var TimezonePicker = React.createClass({
	 getInitialState: function(){
		 return({
			timeZones: ProfileStore.getTimeZones() || [],
		 	value: this.props.timeZoneId
		 });
	 },
	 componentWillReceiveProps: function(nextProps){
		this.setState({
			value: nextProps.timeZoneId
		}) 
	 },
	  render: function () {
		  
	    return (
		       <div className="lg-timezone-picker">
		      	  <h4 onClick={this.showOptions}>Pick your timezone</h4>

				  <div className="form-group">
					  <div className="input-append">
					      <select type='text' className="form-control" id="timezone-select" 
					    	  onBlur={this.timeZoneChange}
					          onChange={this._onChange}
					      	  value={this.state.value}>
					      	{this.state.timeZones.map(function(item, index){
					      		return (<option key={index} value={item.timeZoneId}>{item.timeZoneId} {item.offsetTitle}</option>)
					      	})}
					      </select>
					      <button type="submit" className="btn btn-primary nocursor" onClick={this.showOptions}> 
					      	<span className="fa fa-globe"></span>      		
					      </button>
					  </div>
				  </div>
			 </div>
	    );
	  },

	 showOptions: function(){
		 jQuery('#timezone-select').show().focus().click();
	 },
	
	timeZoneChange: function(e){
		jQuery("#timezone-select").prop('size', 1);
		var timeZoneId = e.target.value;
		ProfileActions.timeZoneChange(timeZoneId);
	},
	
	_onChange: function(e){
	    this.setState({
		    value: e.target.value
		});
	}
	  
	  
	});

module.exports = TimezonePicker;