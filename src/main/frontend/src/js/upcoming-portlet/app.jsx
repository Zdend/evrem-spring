import styles from '../../css/upcoming.css';
import UpcomingActions from './actions/upcoming-actions';
import UpcomingContainer from'./components/upcoming-container.jsx';


export default class App extends React.Component{
	constructor(){
		super();
		UpcomingActions.registerNotes();
	}

	render(){
		return <UpcomingContainer />;
	}
}

