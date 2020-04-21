import SavedNoteActions from '../actions/saved-note-actions';

export default class TodoContent extends React.Component{
	render(){
		var self = this;
		return(
			<div className="sn-inner-note-container">
			{this.props.todos.map(function(item, index){
				var iconCheck = '';
				
				var textClasses = cx({
				    'sn-todo-text': true,
				    'striked-text': item.isDone
				});
				
				var checkClasses = checkClasses = cx({
					'sn-check-btn': true
				});
					
				if(item.isDone){
					iconCheck = <FontAwesome name="check"  />
				}else{
					iconCheck = <FontAwesome name="square-o" />
				}
				
				return(
					<div key={index}>
						<div className={checkClasses} data-todonoteid={item.todoNoteId} onClick={self.checkTodoNote.bind(self)}>{iconCheck}</div>
						<div className={textClasses}>{item.text}</div>
					</div>
				)
			})}
			</div>
		);
	}
	
	checkTodoNote(e){
		var todoNoteId = jQuery(e.target).closest('div').data('todonoteid');
		SavedNoteActions.checkTodoNote(todoNoteId);
	}

}
