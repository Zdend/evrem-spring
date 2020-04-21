
var UpcomingActions = require('../actions/upcoming-actions');
var Icon = FontAwesome.Icon;

var TodoContent = React.createClass({
	getInitialState: function() {
	  return {
		  todos: this.props.todos,
		  noteId: this.props.noteId,
		  isTypeToday: this.props.isTypeToday,
		  eventTime: this.props.eventTime
		};
	},
	
	componentWillReceiveProps: function(nextProps){
		this.setState({
			  todos: nextProps.todos,
			  noteId: nextProps.noteId,
			  isTypeToday: nextProps.isTypeToday,
			  eventTime: nextProps.eventTime
			});
	},

	render: function(){
			
		var self = this;
		return(
			<tbody>
			{this.state.todos.map(function(item, index){
				
				var textClasses = cx({
				    'uc-text-cell': true,
				    'striked-text': item.isDone,
				    'bold': !item.isDone && self.state.isTypeToday
				});
				
				var checkClasses = checkClasses = cx({
					'uc-check-btn': true,
					'uc-checked-btn': item.isDone
				});
					
				var iconCheck = "";
				if(item.isDone){
					iconCheck = <FontAwesome name="check"  />
				}else{
					iconCheck = <FontAwesome name="square-o" />
				}
				
				
				return(
					<tr key={index} data-noteid={self.state.noteId} data-todonoteid={item.todoNoteId}>
						<td onClick={self.editNote}><div>{self.state.eventTime}</div></td>
						<td onClick={self.editNote}><div className={textClasses}>{item.text}</div></td>
						<td onClick={self.checkTodoNote}><div className={checkClasses}>{iconCheck}</div></td>
					</tr>
				)
			})}
			</tbody>
		);
	},
	editNote: function(e){
		var noteId = jQuery(e.target).closest('tr').data("noteid");
		UpcomingActions.editNote(noteId);
	},
	checkTodoNote: function(e){
		var todoNoteId = jQuery(e.target).closest("tr").data("todonoteid");
		UpcomingActions.checkTodoNote(todoNoteId);
	}
});

module.exports = TodoContent;
