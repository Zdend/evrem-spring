var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = Events.EventEmitter;
var ProfileConstants = require('../constants/profile-constants');

var _user = {};
var _timeZones = [];
var _urls = {};
var _infoMessage = '';

function saveUser(){
	Spinner.start();
	jQuery.ajax({
		type: 'POST',
		dataType : 'json',
		url: _urls['saveUser'],
		data: {jsonUser: JSON.stringify(_user)},
		success :function(result) {
			_infoMessage = 'User has been successfully saved.';
			ProfileStore.emitChange();
			return result.payload;
		},
		complete: function(){
			Spinner.stop();
		}
	});
}


//FUNCTIONS
var ProfileStore = assign({}, EventEmitter.prototype, {
	
	getUser: function() {
		return _user;
	},
	getInfoMessage: function() {
		return _infoMessage;
	},
	getTimeZones: function() {
		return _timeZones;
	},
	emitChange: function() {
		this.emit(GlobalConstants.CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(GlobalConstants.CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(GlobalConstants.CHANGE_EVENT, callback);
    },
    dispatchToken: AppDispatcher.register(function (payload) {

	switch(payload.actionType) {
	case ProfileConstants.REGISTER_USER:
		_user = payload.user;
		break;
	case ProfileConstants.REGISTER_TIMEZONES:
		_timeZones = payload.timeZones;
		break;
	case ProfileConstants.REGISTER_URLS:
		_urls = payload.urls;
		return true;
	case ProfileConstants.TIMEZONE_CHANGED:
		_user.timeZoneId = payload.timeZoneId;
		break;
	case ProfileConstants.SAVE_USER:
		saveUser();
		return true;
	case ProfileConstants.CLEAR_INFO_MESSAGE:
		_infoMessage = '';
		break;
		
		
	default:
		return true;
	}

	ProfileStore.emitChange();

	return true;
    })
});

module.exports = ProfileStore;