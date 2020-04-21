
var FilterStore = require('../stores/filter-store');
var FilterActions = require('../actions/filter-actions');
var FilterConstants = require('../constants/filter-constants');
var DataGrid = require('./data-grid.jsx');
var VariableActions = require('./variable-actions.jsx');

function getNotesState() {
	  return {
	    notes: FilterStore.getNotes(),
	    allNotesVisible: FilterStore.getAreAllNotesVisible(),
	  };
} 

var FilterContainer = React.createClass({
	getInitialState: function() {
	  return getNotesState();
	},
	componentDidMount: function() {
		FilterStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		FilterStore.removeChangeListener(this._onChange);
	},
	render: function(){
		return (
			<div id="filter-container">
				<DataGrid notes={this.state.notes} allNotesVisible={this.state.allNotesVisible} />
				<VariableActions />
				<div className="cleaner"></div>
			</div>
				
		);
	},
	_onChange: function() {
		this.setState(getNotesState());
	}
});

module.exports = FilterContainer;
