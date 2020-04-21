import UpcomingStore from '../stores/upcoming-store';
import UpcomingActions from '../actions/upcoming-actions';
import UpcomingConstants from '../constants/upcoming-constants';
import TermBlock from'./term-block.jsx';
let Button = ReactBootstrap.Button;

function getNotesState() {
	  return {
	    today: UpcomingStore.getTodayNotes(),
	    future: UpcomingStore.getFutureNotes(),
	    past: UpcomingStore.getPastNotes(),
	    allNotesVisible: UpcomingStore.getAreAllNotesVisible()
	  };
}

export default class UpcomingContainer extends React.Component{
	constructor(){
		super();
		this.state = getNotesState();
	}
	componentDidMount() {
		UpcomingStore.addChangeListener(this._onChange, this);
	}
	componentWillUnmount() {
		UpcomingStore.removeChangeListener(this._onChange, this);
	}
	render(){
		return (
			<div id="upcoming-container">
				<TermBlock notes={this.state.past} title="Past" type={UpcomingConstants.PAST} />
				<TermBlock notes={this.state.today} title="Today" type={UpcomingConstants.TODAY} />
				<TermBlock notes={this.state.future} title="Future" type={UpcomingConstants.FUTURE} />
				<Button bsStyle="primary" className="uc-more-btn" onClick={this._moreEventClick} disabled={this.state.allNotesVisible}>More events..</Button>
			</div>
		);
	}
	_onChange() {
		this.setState(getNotesState());
	}
	_moreEventClick(){
		UpcomingActions.moreEvents();
	}
};

module.exports = UpcomingContainer;
