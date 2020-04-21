var UtilService = {

		sortNotesByDate: function(notes, isAscending){
			var i;
			
			notes.sort(function(a,b){
				var aEventTime = moment(a.eventTime, GlobalConstants.DATETIME_FORMAT, true);
				var bEventTime = moment(b.eventTime, GlobalConstants.DATETIME_FORMAT, true);
				if(isAscending){
					return aEventTime.isAfter(bEventTime);
				}else{
					return aEventTime.isBefore(bEventTime);
				}
			});

			return notes;
		},
		getNotesBetween: function(notes, from, to){
			var i;
			var resultNotes = [];
			for(i = 0; i < notes.length; i++){
				var m = moment(notes[i].eventTime, GlobalConstants.DATETIME_FORMAT, true);
				var isAfter = false;
				if(m.isAfter(from) || m.isSame(from) || from === null){
					isAfter = true;
				}
				
				var isBefore = false;
				if(m.isBefore(to) || m.isSame(to) || to === null){
					isBefore = true;
				}
				
				if(isAfter && isBefore){
					resultNotes.push(notes[i]);
				}
				
			}
			
			return resultNotes;
		},
		
		getMaximumEventsCount: function(todayNotes, pastNotes, futureNotes){
			var mostNotes = this.getEventsCount(futureNotes);
			
			if(this.getEventsCount(todayNotes) > mostNotes){
				mostNotes = this.getEventsCount(todayNotes);
			}
			if(this.getEventsCount(pastNotes) > mostNotes){
				mostNotes = this.getEventsCount(pastNotes);
			}
			return mostNotes;
		},
		
		getEventsCount: function(notes){
			var eventsCount = 0;
			var i;
			for(i=0; i < notes.length; i++){
				if(notes[i].hasTodo){
					eventsCount += notes[i].todos.length;
				}else{
					eventsCount += 1;
				}
			}
			return eventsCount;
		},
		
		getEventsSlicedByCount: function(notes, count){
			var newNotes = jQuery.extend(true, [], notes);
			var resultArray = [];
			var eventsCount = 0;
			var i;
			for(i=0; i < newNotes.length && eventsCount < count; i++){
				var noteEventsCount = this.getEventsCount([newNotes[i]]);
				if(noteEventsCount <= count){
					resultArray.push(newNotes[i]);
					eventsCount += noteEventsCount;
				}else{
					if(newNotes[i].hasTodo){
						var residueCount = count - eventsCount;
						var todos = newNotes[i].todos.slice(0, residueCount);
						newNotes[i].todos = todos;
						eventsCount += residueCount;
					}
					resultArray.push(newNotes[i]);
				}
			}
			return resultArray;
		}
		
}
module.exports = UtilService;