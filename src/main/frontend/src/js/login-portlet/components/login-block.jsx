
var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;
var LoginActions = require('../actions/login-actions');

var LoginBlock = React.createClass({
	 getInitialState: function() {
	    return {
	      email: this.props.user.email,
	      password: this.props.user.password,
	      rememberMe: this.props.user.rememberMe,
	    };
	},
	componentWillReceiveProps: function(nextProps){
      this.setState({
    	  email: nextProps.user.email,
    	  password: nextProps.user.password,
    	  rememberMe: nextProps.user.rememberMe
      });
	},
	
	render: function(){
		return (
			<div className="lg-login-block">
				<form method="post" action="/evrem/authenticate">
                    <h2>Log in</h2>
                    <input type="text" value={this.state.email} placeholder="Email" onChange={this.onEmailChange} onBlur={this.updateEmail} className="form-control" id="username" name="username" />
                    <br />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={this.onPasswordChange} onBlur={this.updatePassword} className="form-control" id="password" name="password" />
                    <br />
                    <input type="hidden" name={this.props.csrf.name} value={this.props.csrf.token} />
                    <button type="submit" className="btn btn-primary lg-login-btn">Log in</button>
                    <ul className="lg-remember-forgotten">
                        <li><a href="#">Forgotten password</a></li>
                        <li>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" checked={this.state.rememberMe} onClick={this.updateRememberMe} onChange={this.updateRememberMe} /> Remember me
                              </label>
                            </div>
                        </li>
                    </ul>
				</form>
				<div className="cleaner"></div>
			</div>
		);		
	},
	
	updateEmail: function(e){
		LoginActions.userEmailChange(e.target.value);
	},
	
	onEmailChange: function(e) {
	    this.setState({
	      email: e.target.value
	    });
	},
	
	updatePassword: function(e){
		LoginActions.userPasswordChange(e.target.value);
	},
	
	onPasswordChange: function(e) {
		this.setState({
			password: e.target.value
		});
	},

	updateRememberMe: function(e){
		LoginActions.userRememberMeChange(e.target.checked);
	},
	
	logIn: function(){
		LoginActions.evremLogIn();
	}
	
});

module.exports = LoginBlock;