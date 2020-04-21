import styles from '../../css/saved-note.css';
import SavedNoteStore from './stores/saved-note-store';
import SavedNoteActions from './actions/saved-note-actions';
import WallContainer from './components/wall-container.jsx';

export default class App extends React.Component{
	constructor() {
        super();
        SavedNoteActions.registerNotes();
    }
	render(){
		return <WallContainer />;
	}
}
//setInterval(function(){
//	SavedNoteActions.saveCoordinates();
//},10000);

