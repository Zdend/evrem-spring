var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var LoginActions = require('../actions/login-actions');
var LoginStore = require('../stores/login-store');
var TimeZonePicker = require('./timezone-picker.jsx');
import GlobalConstants from '../../global-constants';

var SignupCaptcha = React.createClass({

    mixins: [OverlayMixin],

    getInitialState: function () {
        return {
            isModalOpen: false,
            termsAgreement: false
        };
    },

    handleToggle: function () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        }, this.loadModalComponents);
    },

    loadModalComponents: function () {
        if (this.state.isModalOpen) {
            var self = this;
            var captchaContainer = grecaptcha.render('lg-signup-captcha', {
                'sitekey': GlobalConstants.CAPTCHA_SITE_KEY,
                'callback': function (response) {
                    LoginActions.setCaptchaToken(response);
                    self.setState({
                        termsAgreement: true
                    });
                }
            });
        }
    },

    render: function () {
        var disabled = !this.props.newUser.email || !this.props.newUser.password1 || !this.props.newUser.password2;

        return (
            <Button onClick={this.handleToggle} bsStyle="primary" disabled={disabled}>Sign up</Button>
        );
    },

    renderOverlay: function () {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <Modal title="Confirm your registration" onRequestHide={this.handleToggle}
                   className="lg-registration-confirmation">
                <div className="modal-body">
                    <h4>Are you human?</h4>

                    <div id="lg-signup-captcha"></div>
                    <TimeZonePicker />
                </div>

                <div className="modal-footer">
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button bsStyle="primary" onClick={this.signUp}>Register</Button>
                </div>
            </Modal>
        );
    },

    signUp: function () {
        if (this.state.termsAgreement) {
            LoginActions.signUp();
            this.handleToggle();
        }
    },

    checkTerms: function () {
        this.setState({
            termsAgreement: !this.state.termsAgreement
        });
    }

});

module.exports = SignupCaptcha;