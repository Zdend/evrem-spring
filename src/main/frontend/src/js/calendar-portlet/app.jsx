import styles from '../../css/calendar.css';
import CalendarActions from './actions/calendar-actions';
import CalendarContainer from './components/calendar-container.jsx';

export default class App extends React.Component{
	constructor() {
		super();
		CalendarActions.registerNotes();
	}
	render(){
		return <CalendarContainer />;
	}
}


