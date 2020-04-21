var AppDispatcher = require('../dispatcher/app-dispatcher');
var ProfileConstants = require('../constants/profile-constants');

var ProfileActions = {

  registerUser: function(user) {
	    AppDispatcher.dispatch({
	      actionType: ProfileConstants.REGISTER_USER,
	      user: user
	    });
  },
  registerTimeZones: function(timeZones) {
	  AppDispatcher.dispatch({
		  actionType: ProfileConstants.REGISTER_TIMEZONES,
		  timeZones: timeZones
	  });
  },
  registerUrls: function(urls) {
	  AppDispatcher.dispatch({
		  actionType: ProfileConstants.REGISTER_URLS,
		  urls: urls
	  });
  },
  timeZoneChange: function(timeZoneId) {
	  AppDispatcher.dispatch({
		  actionType: ProfileConstants.TIMEZONE_CHANGED,
		  timeZoneId: timeZoneId
	  });
  },
  saveUser: function() {
	  AppDispatcher.dispatch({
		  actionType: ProfileConstants.SAVE_USER
	  });
  },
  clearInfoMessage: function() {
	  AppDispatcher.dispatch({
		  actionType: ProfileConstants.CLEAR_INFO_MESSAGE
	  });
  }


 

};

module.exports = ProfileActions;