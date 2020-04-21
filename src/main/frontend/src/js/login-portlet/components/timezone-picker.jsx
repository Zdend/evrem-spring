
var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var LoginActions = require('../actions/login-actions');
var LoginStore = require('../stores/login-store');


var TimezonePicker = React.createClass({
	 getInitialState: function(){
		 return({
			timeZones: LoginStore.getTimeZones() || [],
		 	value: ''
		 });
	 },
	  componentDidMount: function(){
		var offset = new Date().getTimezoneOffset();
		var offsetMillis = offset * 60 * 1000 * (-1);
		
		var i;
		for(i=0;i < this.state.timeZones.length; i++){
			var timeZone = this.state.timeZones[i];
			if(timeZone.offset === offsetMillis){
				this.setState({value: timeZone.timeZoneId});
				LoginActions.timeZoneChange(timeZone.timeZoneId);
				break;
			}
		}
	  },
	  render: function () {
		  
	    return (
		       <div className="lg-timezone-picker">
		      	  <h4 onClick={this.showOptions}>Pick your timezone</h4>

				  <div className="form-group">
					  <div className="input-group">
					      <select type="text" className="form-control" id="timezone-select"
					    	  onBlur={this.timeZoneChange}
					          onChange={this._onChange}
					      	  value={this.state.value}>
					      	{this.state.timeZones.map(function(item, index){
					      		return (<option key={index} value={item.timeZoneId}>{item.timeZoneId} {item.offsetTitle}</option>)
					      	})}
					      </select>
						  <span className="input-group-btn repeat-select-btn">
							  <button type="submit" className="btn btn-primary nocursor" onClick={this.showOptions}>
								  <FontAwesome name="globe" />
							  </button>
						  </span>
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
		LoginActions.timeZoneChange(timeZoneId);
	},
	
	_onChange: function(e){
	    this.setState({
		    value: e.target.value
		});
	}
	  
	  
	});

module.exports = TimezonePicker;