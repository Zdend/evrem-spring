
var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;
var LoginActions = require('../actions/login-actions');

var SignupCaptcha = require('./signup-captcha.jsx');

var SignupBlock = React.createClass({
	 getInitialState: function() {
	    return {
	      email: this.props.newUser.email,
	      password1: this.props.newUser.password1,
	      password2: this.props.newUser.password2,
	      captcha: this.props.newUser.captcha
	    };
	},
	componentWillReceiveProps: function(nextProps){
      this.setState({
    	  email: nextProps.newUser.email,
    	  password1: nextProps.newUser.password1,
    	  password2: nextProps.newUser.password2,
    	  captcha: nextProps.newUser.captcha
      });
	},

	render: function(){
		return (
			<div>
				<h2>Sign up</h2>
				<input type="text" value={this.state.email} placeholder="Email" onChange={this.onEmailChange} onBlur={this.updateEmail} bsStyle="error" className="form-control"  />
				<br />
				<input type="password" value={this.state.password1} placeholder="Password" onChange={this.onPassword1Change} onBlur={this.updatePassword1} className="form-control"  />
				<br />
				<input type="password" value={this.state.password2} placeholder="Password again" onChange={this.onPassword2Change} onBlur={this.updatePassword2} className="form-control"  />
				<br />
				<SignupCaptcha newUser={this.state} />
			</div>
		);		
	},
	
	updateEmail: function(e){
		LoginActions.newUserEmailChange(e.target.value);
		LoginActions.loadTimeZones();
	},
	
	onEmailChange: function(e) {
	    this.setState({
	      email: e.target.value
	    });
	},
	
	updatePassword1: function(e){
		LoginActions.newUserPassword1Change(e.target.value);
	},
	
	onPassword1Change: function(e) {
		this.setState({
			password1: e.target.value
		});
	},
	
	updatePassword2: function(e){
		LoginActions.newUserPassword2Change(e.target.value);
	},
	
	onPassword2Change: function(e) {
		this.setState({
			password2: e.target.value
		});
	}
	

	
});

module.exports = SignupBlock;