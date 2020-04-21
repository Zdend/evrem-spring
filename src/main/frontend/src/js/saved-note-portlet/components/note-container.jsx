import SavedNoteActions from'../actions/saved-note-actions';
import TodoContent from './todo-content.jsx';
import StorageService from '../../services/storage-service';

export default class NoteContainer extends React.Component{
	render(){
		let note = this.props.note;
		var classesCheckBtn = cx({
		    'sn-action-button': true,
		    'hide': !note.hasCheck,
		    'sn-checked-btn': note.isDone
		  });
		var classesCheckText = cx({
			'sn-inner-note-container': true,
			'striked-text': note.isDone
		});
		
		var noteContent;
		if(note.hasTodo){
			noteContent = <TodoContent todos={note.todos} noteId={note.noteId} />;
		}else{
			noteContent = <div className={classesCheckText}>{note.text}</div>;
		}
		
		let color = StorageService.getColorByName(note.color);
		let icon;
		if(note.hasIcon){
			let iconObject = StorageService.getIconByName(note.icon);
			let lighterColor = '#'+shadeColor1(color.replace('#',''), 10);
			icon = <div className="sn-icon" style={{backgroundColor: lighterColor}}><FontAwesome name={iconObject.type} /></div>
		}
		return (
			<div className="sn-grid-container" style={{backgroundColor: color}}>

				<div className="sn-actions-container">
					{icon}
					<div className="sn-action-button"><FontAwesome name="pencil" onClick={this.editNote.bind(this)} /></div>
					<div className={classesCheckBtn}><FontAwesome name="check" onClick={this.checkNote.bind(this)} /></div>
				</div>
				
				{noteContent}
			</div>
		);
	}
	
	editNote(){
		SavedNoteActions.editNote(this.props.note.noteId);
	}
	checkNote(){
		SavedNoteActions.checkNote(this.props.note.noteId);
	}

};
function shadeColor1(color, percent) {
	var num = parseInt(color,16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		G = (num >> 8 & 0x00FF) + amt,
		B = (num & 0x0000FF) + amt;
	return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
