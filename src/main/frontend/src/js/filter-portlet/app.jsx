import styles from '../../css/filter.css';
var FilterStore = require('./stores/filter-store');
var FilterActions = require('./actions/filter-actions');
var FilterContainer = require('./components/filter-container.jsx');

export default class App extends React.Component{
	constructor(){
		super();
		FilterActions.registerNotes();
	}

	render(){
		return <FilterContainer />;
	}
}
