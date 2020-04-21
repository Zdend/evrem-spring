export default {
	result: {},
	validateNote: function(note){
		this.result = {};
		
		if(note.text.trim().length<1){
			this.addMsg('noteText', 'Note text is empty, you have to write something.');
		}
		if(note.text.length > 2000){
			this.addMsg('noteText', 'Text is too long.');
		}
		if(note.hasTime){
			if(note.eventTime.trim().length<1){
				this.addMsg('eventTime', "Event date is empty. If you don't want to use it, disable it.");
			}else{
				var m = moment(note.eventTime, GlobalConstants.DATETIME_FORMAT, true);
				if(!m.isValid()){
					this.addMsg('eventTime', "Bad date format. Example 24/12/2014 22:30");
				}
			}
		}
		
		if(note.hasReminder){
			if(!note.remindInfo || !note.remindInfo.remindDate || note.remindInfo.remindDate.trim().length<1){
				this.addMsg('remindDate', "Remind date is empty. If you don't want to use it, disable it.");
			}else{
				var m = moment(note.remindInfo.remindDate, GlobalConstants.DATETIME_FORMAT, true);
				if(!m.isValid()){
					this.addMsg('remindDate', "Bad date format. Example 24/12/2014 22:30");
				}
			}
		}
		
		return this.result;
	},
	addMsg: function(fieldId, msg){
		if(typeof this.result[fieldId] === 'undefined'){
			this.result[fieldId] = {};
		}
		if(typeof this.result[fieldId].msg === 'undefined'){
			this.result[fieldId].msg = [];
		}
		this.result[fieldId].msg.push(msg);
	},
	hasError: function(){
		return !jQuery.isEmptyObject(this.result);
	},
	hasFieldError: function(fieldId){
		return typeof this.result[fieldId] !== 'undefined' && !jQuery.isEmptyObject(this.result[fieldId]);
	},
	getStringMessage: function(){
		if(!this.hasError()){
			return '';
		}
		var message = '';
		for (let id in this.result) {
			if(this.result[id].msg){
				message += ' '+ this.result[id].msg.join();
			}
		}
		return message;
	},
	getMessages: function(){
		if(!this.hasError()){
			return [];
		}
		var messages = [];
		for (let id in this.result) {
			if(this.result[id].msg){
				messages = messages.concat(this.result[id].msg);
			}
		}
		return messages;
	},
	clearResult: function(){
		this.result = {};
	}
};