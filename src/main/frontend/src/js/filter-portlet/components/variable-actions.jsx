
var FilterActions = require('../actions/filter-actions');
var Button = ReactBootstrap.Button;
var EmptyTrashConfirm = require('./empty-trash-confirm.jsx');


var VariableActions = React.createClass({
	
	render: function(){

		return(
				<div className="fr-variable-actions">
					<Button bsStyle="primary" onClick={this.exportAll}><FontAwesome name="file-excel-o" /> Export</Button>
					<EmptyTrashConfirm />
				</div>
		);
	},
	exportAll: function(){
		FilterActions.exportAll();
	}

});

module.exports = VariableActions;
