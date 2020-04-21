
var ProfileStore = require('../stores/profile-store');
var ProfileActions = require('../actions/profile-actions');
var ProfileConstants = require('../constants/profile-constants');
var TimeZonePicker = require('./timezone-picker.jsx');
var InfoMessage = require('../../shared-components/info-message.jsx');
var Button = ReactBootstrap.Button;
var Icon = FontAwesome.Icon;

function getUserState() {
	  return {
	    user: ProfileStore.getUser(),
	    infoMessage: ProfileStore.getInfoMessage()
	  };
}

var ProfileContainer = React.createClass({
	getInitialState: function() {
	  return getUserState();
	},
	componentDidMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
	},
	render: function(){
		return (
			<div>
				<InfoMessage message={this.state.infoMessage} clearMessageHandler={ProfileActions.clearInfoMessage} />
				<TimeZonePicker timeZoneId={this.state.user.timeZoneId} />
				<Button bsStyle="primary" onClick={this.saveUser}><FontAwesome name="save" /> Save</Button>
			</div>
				
		);
	},
	_onChange: function() {
		this.setState(getUserState());
	},
	saveUser: function(){
		ProfileActions.saveUser();
	}
});

module.exports = ProfileContainer;
