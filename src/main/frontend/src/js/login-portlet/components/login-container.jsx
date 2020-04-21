var LoginStore = require('../stores/login-store');
var LoginActions = require('../actions/login-actions');
var LoginBlock = require('./login-block.jsx');
var SocialLoginBlock = require('./social-login-block.jsx');
var SignupBlock = require('./signup-block.jsx');

function getUserState() {
    return {
        user: LoginStore.getUser(),
        csrf: LoginStore.getCsrf(),
        newUser: LoginStore.getNewUser()
    };
}

var App = React.createClass({
    getInitialState: function () {
        return getUserState();
    },
    componentDidMount: function () {
        LoginStore.addChangeListener(this._onChange, this);
    },
    componentWillUnmount: function () {
        LoginStore.removeChangeListener(this._onChange, this);
    },
    render: function () {
        return (
            <div id="login-container">
                <div className="lg-centered-box">
                    <div className="lg-header-wrapper">
                        <div className="lg-header-logo"></div>

                        <h1 className="lg-title-welcome">Welcome to evrem</h1>

                        <p className="lg-title-description">Organise your life and never forget anything with this
                            awesome
                            <span className="lg-desc-bold"> event reminder</span>..
                        </p>
                    </div>
                    <div className="lg-login-wrapper">
                        <div className="lg-login-inner">
                            <LoginBlock user={this.state.user} csrf={this.state.csrf} />
                            <hr />
                            <SocialLoginBlock />
                            <hr />
                            <SignupBlock newUser={this.state.newUser}/>
                        </div>
                    </div>
                    <div className="lg-footer-wrapper">
                        Made with love in 2015
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getUserState());
    }
});
module.exports = App;