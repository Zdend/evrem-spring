var Spinner = {
		_timeout: {},
		
		start: function(){
			jQuery('.spinner').toggleClass('active', true);
			this._timeout = setTimeout(function(){
				if(jQuery('.spinner').hasClass('active')){
					console.log('Something is wrong, please repeat your action.');
					Spinner.stop();
				}
			},60000);
		},
		stop: function(){
			jQuery('.spinner').toggleClass('active', false);
			clearTimeout(this._timeout);
		}
}

module.exports = Spinner;