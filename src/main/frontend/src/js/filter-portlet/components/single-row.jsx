var Button = ReactBootstrap.Button;
import FilterActions from '../actions/filter-actions';
import StorageService from '../../services/storage-service';

var SingleRow = React.createClass({
	getInitialState: function() {
	  return {
		  note: this.props.note
		};
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
		  note: nextProps.note
		});
	},
	
	render: function(){
        let note = this.state.note;
        let isDoneIcon = <FontAwesome name={note.hasCheck?(note.isDone?"check":"close"):""} />;
        let isDeleted = <FontAwesome name={note.isDeleted?"trash":""} />;
        let showOnWall = <FontAwesome name={note.hasWall?"th-large":""} />;
        let textParsed = note.hasTodo? GlobalUtil.replaceAll(note.text,"\r\n"," | ") : note.text;
        let color = StorageService.getColorByName(note.color);
		let iconElement = '';
		if(note.hasIcon){
			let icon = StorageService.getIconByName(note.icon);
			iconElement = <FontAwesome name={icon.type} />
		}
		let period = StorageService.getPeriodByName(note.period);
		return(
				<tr onClick={this.editNote}>
					<td><div className="fr-color-cell" style={{backgroundColor: color}}>{iconElement}</div></td>
					<td><div className="fr-text-cell">{textParsed}</div></td>
					<td>{note.eventTime}</td>
					<td>{note.remindInfo?note.remindInfo.remindDate:''}</td>
					<td><div className="fr-centered-align">{period?period.title:''}</div></td>
					<td><div className="fr-centered-align">{isDoneIcon}</div></td>
					<td><div className="fr-centered-align">{showOnWall}</div></td>
					<td><div className="fr-centered-align">{isDeleted}</div></td>
					<td>{note.createdDate}</td>
					<td>{note.modifiedDate}</td>
				</tr>
		);
	},
	
	editNote: function(){
        FilterActions.editNote(this.state.note.noteId);
	}
});

module.exports = SingleRow;
