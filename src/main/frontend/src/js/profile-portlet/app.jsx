
var ProfileActions = require('./actions/profile-actions');
var ProfileContainer = require('./components/profile-container.jsx');

Liferay.Portlet.ready(
    function(portletId, node) {
    	if(portletId.indexOf('profileportlet_WAR_supportportlet') !== -1){
    		var initialData = JSON.parse(jQuery('#data-profile').text());
    		ProfileActions.registerUser(initialData.user);
    		ProfileActions.registerTimeZones(initialData.timeZones);
    		ProfileActions.registerUrls(initialData.urls);
    		
    		React.render(<ProfileContainer />, document.querySelector('#profile-container'));
    	}
    	
    }
);


