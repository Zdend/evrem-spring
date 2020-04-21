var UtilService = {
		getEmptyNewUser: function(){
			return {
				email: '',
				password1: '',
				password2: '',
				token: '',
				timeZoneId: ''
			};
		}
		
}
module.exports = UtilService;