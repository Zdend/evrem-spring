
var CalendarStore = require('../stores/calendar-store');
var CalendarActions = require('../actions/calendar-actions');

function getEventsState() {
	  return {
	    events: CalendarStore.getEvents()
	  };
}

var CalendarContainer = React.createClass({
	getInitialState: function() {
	  return getEventsState();
	},
	componentDidMount: function() {


		jQuery('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			height: 650,
			editable: false,
			eventLimit: true,
			events: this.state.events,
			timeFormat: 'H(:mm)',
			dayClick: function(date, allDay, jsEvent, view) { 
				jQuery('#calendar').fullCalendar('gotoDate', date );
				jQuery('#calendar').fullCalendar('changeView', 'basicDay');
				
			},
			eventRender: function( event, element, view ) {
		    	jQuery(element).attr('title', event.title);
		    }
		});

		

		
		
		
	},
	render: function(){
		return (
			<div>
				<div id="calendar"></div>
			</div>
				
		);
	}
});

module.exports = CalendarContainer;
