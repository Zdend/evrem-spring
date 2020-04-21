var UpcomingActions = require('../actions/upcoming-actions');
var UpcomingConstants = require('../constants/upcoming-constants');
var TodoContent = require('./todo-content.jsx'); 
var TextContent = require('./text-content.jsx'); 

var TermBlock = React.createClass({
	getInitialState: function() {
	  return { notes: this.props.notes };
	},
	componentWillReceiveProps: function(nextProps){
	      this.setState({
	    	  notes: nextProps.notes
	      });
	},
	render: function(){
		var isTypeToday = this.props.type === UpcomingConstants.TODAY;
		var headerTitle = this.props.title + (isTypeToday ? (" "+moment().format(GlobalConstants.DAYMONTH_FORMAT)):"");
		return (
			<div className="col-lg-4">
				<h2>{headerTitle}</h2>
				<hr />
				<table>
				    <colgroup>
				       <col span="1" className={isTypeToday?"uc-time-col":"uc-date-col"} />
				       <col span="1" className="uc-text-col" />
				       <col span="1" className="uc-check-col" />
				    </colgroup>
					{this.state.notes.map(function(item, index){
						var mEventTime;
						if(isTypeToday){
							mEventTime = moment(item.eventTime, GlobalConstants.DATETIME_FORMAT, true).format(GlobalConstants.TIME_FORMAT);
						}else{
							mEventTime = moment(item.eventTime, GlobalConstants.DATETIME_FORMAT, true).format(GlobalConstants.DATETIME_SHORT_FORMAT);
						}
						
						var rowContent;
						if(item.hasTodo){
							rowContent = <TodoContent key={index} todos={item.todos} noteId={item.noteId} eventTime={mEventTime} isTypeToday={isTypeToday} />;
						}else{
							rowContent = <TextContent key={index} note={item} eventTime={mEventTime} isTypeToday={isTypeToday} />;
						}
						
						return rowContent;
						
					})}
				</table>
				
				
			</div>
				
		);
	}
	

	
});

module.exports = TermBlock;
