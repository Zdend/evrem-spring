var AppDispatcher = require('../../core/dispatcher');
var LoginConstants = require('../constants/login-constants');
var UtilService = require('../services/util-service');

import StorageService from '../../services/storage-service';

var _user = {
		email: 'admin@evrem.net',
		password: 'Admin0',
		rememberMe: false
};
var _newUser = UtilService.getEmptyNewUser();

var _timeZones = [];
let _csrf = {};




//FUNCTIONS
var LoginStore = assign({}, EventEmitter.prototype, {
	
	getUser: function() {
		return _user;
	},
	getNewUser: function() {
		return _newUser;
	},
	getTimeZones: function(){
		return _timeZones;
	},
	getCsrf: function(){
		return _csrf;
	},
	emitChange: function() {
		this.emit(GlobalConstants.CHANGE_EVENT);
	},
	addChangeListener: function(callback, context) {
		this.on(GlobalConstants.CHANGE_EVENT, callback, context);
	},
	removeChangeListener: function(callback, context) {
		this.removeListener(GlobalConstants.CHANGE_EVENT, callback, context);
	},
    dispatchToken: AppDispatcher.register(function (payload) {

        switch (payload.actionType) {
            case LoginConstants.REGISTER_INITIAL_DATA:
                _user.email = payload.initialData.email;
                _user.rememberMe = payload.initialData.rememberMe;
                break;
			case LoginConstants.REGISTER_CSRF_TOKEN:
                _csrf = payload.csrf;
                break;
            case LoginConstants.USER_EMAIL_CHANGE:
                _user.email = payload.email;
                break;
            case LoginConstants.USER_PASSWORD_CHANGE:
                _user.password = payload.password;
                break;
            case LoginConstants.USER_REMEMBERME_CHANGE:
                _user.rememberMe = payload.rememberMe;
                break;
            case LoginConstants.NEWUSER_EMAIL_CHANGE:
                _newUser.email = payload.email;
                break;
            case LoginConstants.NEWUSER_PASSWORD1_CHANGE:
                _newUser.password1 = payload.password1;
                break;
            case LoginConstants.NEWUSER_PASSWORD2_CHANGE:
                _newUser.password2 = payload.password2;
                break;
            case LoginConstants.EVREM_LOG_IN:
                break;
            case LoginConstants.EVREM_SIGN_UP:
                break;
            case LoginConstants.SET_CAPTCHA_TOKEN:
                _newUser.token = payload.token;
                break;
            case LoginConstants.LOAD_TIME_ZONES:
                _timeZones = StorageService.getTimezones();
                return true;
            case LoginConstants.TIME_ZONE_CHANGE:
                _newUser.timeZoneId = payload.timeZoneId;
                break;

            default:
                return true;
        }

        LoginStore.emitChange();

        return true;
    })
});

module.exports = LoginStore;