

var SingleRow = require('./single-row.jsx'); 
var FilterActions = require('../actions/filter-actions');
var Button = ReactBootstrap.Button;

var DataGrid = React.createClass({
	getInitialState: function() {
	  return {
		  notes: this.props.notes,
		  allNotesVisible: this.props.allNotesVisible
		  };
	},
	componentWillReceiveProps: function(nextProps){
	      this.setState({
	    	  notes: nextProps.notes,
	    	  allNotesVisible: nextProps.allNotesVisible
	      });
	},
	render: function(){
		
		return (
			<div>
				<table className="fr-data-grid">
				 <tbody>
				  <tr>
				  	<th className="fr-color-th">Color</th>
				  	<th>Note text</th>
				  	<th className="fr-date-th">Event time</th>
				  	<th className="fr-date-th">Remind time</th>
				  	<th className="fr-date-th">Repeat period</th>
				  	<th className="fr-boolean-th">Done</th>
				  	<th className="fr-boolean-th">Wall</th>
				  	<th className="fr-boolean-th">Deleted</th>
				  	<th className="fr-date-th">Creation date</th>
				  	<th className="fr-date-th">Last modified</th>
				  </tr>
				  </tbody>
				  <tbody className="fr-grid-body">
					{this.state.notes.map(function(item, index){
						
						return <SingleRow key={index} note={item} />;
						
					})}
				  </tbody>
				</table>
				<Button bsStyle="primary" className="fr-more-btn" onClick={this.moreNotesClick} disabled={this.state.allNotesVisible}>More events..</Button>
			</div>
		);
	},
	
	moreNotesClick: function(){
		FilterActions.moreNotes();
	}
	

	
});

module.exports = DataGrid;
